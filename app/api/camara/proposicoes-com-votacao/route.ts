import { NextRequest, NextResponse } from "next/server";

const CAMARA_API =
  "https://dadosabertos.camara.leg.br/api/v2";

type Proposicao = {
  id: number;
  uri?: string;
  siglaTipo?: string;
  codTipo?: number;
  numero?: number;
  ano?: number;
  ementa?: string;
  dataApresentacao?: string;
};

type Votacao = {
  id?: string;
  uri?: string;
  data?: string;
  dataHoraRegistro?: string;
  siglaOrgao?: string;
  uriOrgao?: string;
  uriEvento?: string;
  proposicaoObjeto?: string;
  uriProposicaoObjeto?: string;
  descricao?: string;
  aprovacao?: number | null;
};

async function buscarJson(url: string) {
  const resposta = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status} ao consultar a Câmara dos Deputados.`
    );
  }

  return resposta.json();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pagina = Math.max(
      1,
      Number(searchParams.get("pagina") || "1")
    );

    const itensDesejados = Math.min(
      15,
      Math.max(
        1,
        Number(searchParams.get("itens") || "10")
      )
    );

    const busca = searchParams.get("busca")?.trim();

    /*
      Nesta rota, uma "página" significa uma página de resultados
      que realmente possuem pelo menos uma votação relacionada.

      Para encontrar esses resultados, analisamos vários PLs
      retornados pela Câmara até completar a quantidade desejada.
    */
    const quantidadePorConsulta = 50;

    /*
      Limitamos o número de páginas consultadas na Câmara para
      evitar uma quantidade excessiva de requisições em uma única
      chamada do Observa Salvador.
    */
    const maximoPaginasCamara = 6;

    /*
      Para permitir "Anterior" e "Próxima", precisamos encontrar
      também os resultados das páginas anteriores do Observa
      Salvador.

      Exemplo:
      página 2 com 10 itens = precisamos encontrar até 20 PLs
      com votação e então devolver os itens 11 a 20.
    */
    const quantidadeNecessaria =
      pagina * itensDesejados;

    const proposicoesComVotacao: Array<
      Proposicao & {
        quantidadeVotacoes: number;
        ultimaVotacao?: Votacao | null;
      }
    > = [];

    let paginaCamara = 1;
    let terminouFonte = false;

    while (
      proposicoesComVotacao.length <
        quantidadeNecessaria &&
      paginaCamara <= maximoPaginasCamara &&
      !terminouFonte
    ) {
      const parametros = new URLSearchParams({
        pagina: String(paginaCamara),
        itens: String(quantidadePorConsulta),
        ordem: "DESC",
        ordenarPor: "id",
      });

      /*
        Nesta primeira versão controlada do "Como votaram",
        usamos apenas PL como proposta principal.
      */
      parametros.append("siglaTipo", "PL");

      if (busca) {
        parametros.set("keywords", busca);
      }

      const resultadoProposicoes = await buscarJson(
        `${CAMARA_API}/proposicoes?${parametros.toString()}`
      );

      const proposicoes: Proposicao[] =
        Array.isArray(resultadoProposicoes.dados)
          ? resultadoProposicoes.dados
          : [];

      if (proposicoes.length === 0) {
        terminouFonte = true;
        break;
      }

      /*
        Consultamos as votações em pequenos grupos paralelos.

        Isso evita disparar dezenas de requisições simultâneas
        para a API oficial.
      */
      const tamanhoGrupo = 5;

      for (
        let inicio = 0;
        inicio < proposicoes.length;
        inicio += tamanhoGrupo
      ) {
        const grupo = proposicoes.slice(
          inicio,
          inicio + tamanhoGrupo
        );

        const resultadosGrupo = await Promise.all(
          grupo.map(async (proposicao) => {
            try {
              const resultadoVotacoes =
                await buscarJson(
                  `${CAMARA_API}/proposicoes/${proposicao.id}/votacoes`
                );

              const votacoes: Votacao[] =
                Array.isArray(resultadoVotacoes.dados)
                  ? resultadoVotacoes.dados
                  : [];

              if (votacoes.length === 0) {
                return null;
              }

              const votacoesOrdenadas = [...votacoes].sort(
                (a, b) => {
                  const dataA = new Date(
                    a.dataHoraRegistro ||
                      a.data ||
                      0
                  ).getTime();

                  const dataB = new Date(
                    b.dataHoraRegistro ||
                      b.data ||
                      0
                  ).getTime();

                  return dataB - dataA;
                }
              );

              return {
                ...proposicao,
                quantidadeVotacoes: votacoes.length,
                ultimaVotacao:
                  votacoesOrdenadas[0] || null,
              };
            } catch (erro) {
              /*
                Se apenas uma proposição falhar, não derrubamos
                toda a consulta.

                Também não inventamos que ela não possui votação:
                simplesmente não a incluímos neste resultado.
              */
              console.error(
                `Erro ao consultar votações da proposição ${proposicao.id}:`,
                erro
              );

              return null;
            }
          })
        );

        for (const resultado of resultadosGrupo) {
          if (resultado) {
            proposicoesComVotacao.push(resultado);
          }
        }

        if (
          proposicoesComVotacao.length >=
          quantidadeNecessaria
        ) {
          break;
        }
      }

      /*
        Se a Câmara devolveu menos registros do que pedimos,
        entendemos que chegamos ao fim dessa consulta.
      */
      if (
        proposicoes.length <
        quantidadePorConsulta
      ) {
        terminouFonte = true;
      }

      paginaCamara += 1;
    }

    const inicio =
      (pagina - 1) * itensDesejados;

    const fim = inicio + itensDesejados;

    const dadosPagina =
      proposicoesComVotacao.slice(inicio, fim);

    return NextResponse.json({
      fonte: "Câmara dos Deputados",
      atualizadoEm: new Date().toISOString(),

      criterio: {
        tipoPrincipal: "PL",
        somenteComVotacaoRelacionada: true,
      },

      pagina,
      itensPorPagina: itensDesejados,

      dados: dadosPagina,

      paginacao: {
        temPaginaAnterior: pagina > 1,
        /*
          Só afirmamos que existe próxima página quando
          efetivamente encontramos resultados além do limite
          inicial desta página.
        */
        temProximaPagina:
          proposicoesComVotacao.length >
          fim,
      },

      diagnostico: {
        paginasDaCamaraConsultadas:
          Math.min(
            paginaCamara - 1,
            maximoPaginasCamara
          ),

        proposicoesComVotacaoEncontradas:
          proposicoesComVotacao.length,

        limitePaginasDaCamara:
          maximoPaginasCamara,
      },
    });
  } catch (erro) {
    console.error(
      "Erro ao buscar proposições com votação:",
      erro
    );

    return NextResponse.json(
      {
        erro:
          "Não foi possível consultar as propostas com votação na Câmara dos Deputados.",
      },
      {
        status: 500,
      }
    );
  }
}