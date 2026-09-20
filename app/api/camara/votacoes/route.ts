import { NextRequest, NextResponse } from "next/server";

const CAMARA_API =
  "https://dadosabertos.camara.leg.br/api/v2";

type Proposicao = {
  id?: number;
  uri?: string;
  siglaTipo?: string;
  codTipo?: number;
  numero?: number;
  ano?: number;
  ementa?: string;
  dataApresentacao?: string;
};

type EfeitoRegistrado = {
  uriProposicao?: string;
  tituloProposicao?: string;
  descResultado?: string;
  dataHoraResultado?: string;
  descUltimaAberturaVotacao?: string | null;
  dataHoraUltimaAberturaVotacao?: string | null;
  descUltimaApresentacaoProposicao?: string | null;
  dataHoraUltimaApresentacaoProposicao?: string | null;
  uriProposicaoCitada?: string | null;
  tituloProposicaoCitada?: string | null;
};

type Votacao = {
  id?: string;
  uri?: string;
  data?: string;
  dataHoraRegistro?: string;

  siglaOrgao?: string;
  uriOrgao?: string;
  idOrgao?: number;

  uriEvento?: string;
  idEvento?: number;

  proposicaoObjeto?: string | null;
  uriProposicaoObjeto?: string | null;

  descricao?: string;
  aprovacao?: number | null;

  descUltimaAberturaVotacao?: string | null;
  dataHoraUltimaAberturaVotacao?: string | null;

  ultimaApresentacaoProposicao?: {
    dataHoraRegistro?: string | null;
    descricao?: string | null;
    uriProposicaoCitada?: string | null;
  } | null;

  efeitosRegistrados?: EfeitoRegistrado[];

  objetosPossiveis?: Proposicao[];

  proposicoesAfetadas?: Proposicao[];
};

type ProposicaoPrincipal = {
  id: number;
  uri?: string;
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
  dataApresentacao?: string;

  origemAssociacao:
    | "proposicoesAfetadas"
    | "efeitosRegistrados"
    | "objetosPossiveis";
};

/*
  Tipos que podem representar uma matéria legislativa principal
  nesta primeira etapa do Observa Salvador.

  Não incluímos aqui documentos acessórios como:
  REQ, DTQ, RPD, EMP, pareceres e redações finais.

  Eles continuam disponíveis dentro da votação, mas não são
  tratados automaticamente como a matéria principal.
*/
const TIPOS_PRINCIPAIS = new Set([
  "PL",
  "PLP",
  "PEC",
  "MPV",
  "PDL",
  "PRC",
]);

function tipoPrincipalPermitido(
  siglaTipo?: string | null
) {
  if (!siglaTipo) {
    return false;
  }

  return TIPOS_PRINCIPAIS.has(
    siglaTipo.toUpperCase()
  );
}

function extrairIdDaUri(
  uri?: string | null
) {
  if (!uri) {
    return null;
  }

  const encontrado = uri.match(
    /\/proposicoes\/(\d+)(?:\/)?$/
  );

  if (!encontrado?.[1]) {
    return null;
  }

  const id = Number(encontrado[1]);

  return Number.isFinite(id)
    ? id
    : null;
}

function transformarEmPrincipal(
  proposicao: Proposicao,
  origemAssociacao:
    | "proposicoesAfetadas"
    | "efeitosRegistrados"
    | "objetosPossiveis"
): ProposicaoPrincipal | null {
  if (
    !proposicao.id ||
    !tipoPrincipalPermitido(
      proposicao.siglaTipo
    )
  ) {
    return null;
  }

  return {
    id: proposicao.id,
    uri: proposicao.uri,
    siglaTipo: proposicao.siglaTipo,
    numero: proposicao.numero,
    ano: proposicao.ano,
    ementa: proposicao.ementa,
    dataApresentacao:
      proposicao.dataApresentacao,
    origemAssociacao,
  };
}

function encontrarProposicaoPrincipal(
  votacao: Votacao
): ProposicaoPrincipal | null {
  const afetadas = Array.isArray(
    votacao.proposicoesAfetadas
  )
    ? votacao.proposicoesAfetadas
    : [];

  const objetos = Array.isArray(
    votacao.objetosPossiveis
  )
    ? votacao.objetosPossiveis
    : [];

  const efeitos = Array.isArray(
    votacao.efeitosRegistrados
  )
    ? votacao.efeitosRegistrados
    : [];

  /*
    REGRA 1 — PRIORIDADE MÁXIMA

    Se a Câmara informa quais proposições foram afetadas pela
    votação, usamos essa relação antes de qualquer tentativa
    de inferência.

    Porém, ainda evitamos escolher arbitrariamente quando
    houver mais de uma matéria principal possível.
  */
  const afetadasPrincipais =
    afetadas.filter(
      (proposicao) =>
        proposicao.id &&
        tipoPrincipalPermitido(
          proposicao.siglaTipo
        )
    );

  if (afetadasPrincipais.length === 1) {
    return transformarEmPrincipal(
      afetadasPrincipais[0],
      "proposicoesAfetadas"
    );
  }

  /*
    REGRA 2 — EFEITOS REGISTRADOS

    Quando proposicoesAfetadas não produz uma única matéria
    principal, verificamos se algum objeto principal também
    aparece explicitamente nos efeitos registrados.
  */
  const candidatosConfirmadosPorEfeito =
    objetos.filter((objeto) => {
      if (
        !objeto.id ||
        !tipoPrincipalPermitido(
          objeto.siglaTipo
        )
      ) {
        return false;
      }

      return efeitos.some((efeito) => {
        const idEfeito =
          extrairIdDaUri(
            efeito.uriProposicao
          );

        return idEfeito === objeto.id;
      });
    });

  if (
    candidatosConfirmadosPorEfeito.length ===
    1
  ) {
    return transformarEmPrincipal(
      candidatosConfirmadosPorEfeito[0],
      "efeitosRegistrados"
    );
  }

  /*
    REGRA 3 — OBJETO POSSÍVEL ÚNICO

    Último recurso automático:

    se existir apenas UMA matéria principal entre todos os
    objetos possíveis, podemos associá-la.

    Se houver duas ou mais, não escolhemos.
  */
  const objetosPrincipais =
    objetos.filter(
      (objeto) =>
        objeto.id &&
        tipoPrincipalPermitido(
          objeto.siglaTipo
        )
    );

  if (objetosPrincipais.length === 1) {
    return transformarEmPrincipal(
      objetosPrincipais[0],
      "objetosPossiveis"
    );
  }

  /*
    Relação ambígua.

    O Observa Salvador não escolhe uma proposição por
    aproximação textual ou por palpite.
  */
  return null;
}

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

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const pagina =
      searchParams.get("pagina") || "1";

    const itensSolicitados = Math.min(
      20,
      Math.max(
        1,
        Number(
          searchParams.get("itens") ||
            "10"
        )
      )
    );

    const dataInicio =
      searchParams.get("dataInicio");

    const dataFim =
      searchParams.get("dataFim");

    const parametros =
      new URLSearchParams();

    parametros.set(
      "pagina",
      pagina
    );

    parametros.set(
      "itens",
      String(itensSolicitados)
    );

    parametros.set(
      "ordem",
      "DESC"
    );

    parametros.set(
      "ordenarPor",
      "dataHoraRegistro"
    );

    if (dataInicio) {
      parametros.set(
        "dataInicio",
        dataInicio
      );
    }

    if (dataFim) {
      parametros.set(
        "dataFim",
        dataFim
      );
    }

    /*
      ETAPA 1

      Partimos das votações que realmente aconteceram.
    */
    const resultadoLista =
      await buscarJson(
        `${CAMARA_API}/votacoes?${parametros.toString()}`
      );

    const votacoesBasicas: Votacao[] =
      Array.isArray(
        resultadoLista.dados
      )
        ? resultadoLista.dados
        : [];

    /*
      ETAPA 2

      Buscamos os detalhes de cada votação para obter:

      - proposições afetadas;
      - objetos possíveis;
      - efeitos registrados;
      - descrição detalhada da decisão.
    */
    const votacoesEnriquecidas: Array<
      Votacao & {
        proposicaoPrincipal:
          | ProposicaoPrincipal
          | null;
      }
    > = [];

    const tamanhoGrupo = 5;

    for (
      let inicio = 0;
      inicio <
      votacoesBasicas.length;
      inicio += tamanhoGrupo
    ) {
      const grupo =
        votacoesBasicas.slice(
          inicio,
          inicio + tamanhoGrupo
        );

      const resultadosGrupo =
        await Promise.all(
          grupo.map(
            async (votacao) => {
              if (!votacao.id) {
                return {
                  ...votacao,
                  proposicaoPrincipal:
                    null,
                };
              }

              try {
                const resultadoDetalhes =
                  await buscarJson(
                    `${CAMARA_API}/votacoes/${encodeURIComponent(
                      votacao.id
                    )}`
                  );

                const detalhes: Votacao =
                  resultadoDetalhes.dados ||
                  resultadoDetalhes.data ||
                  resultadoDetalhes ||
                  {};

                const proposicaoPrincipal =
                  encontrarProposicaoPrincipal(
                    detalhes
                  );

                return {
                  ...votacao,
                  ...detalhes,
                  proposicaoPrincipal,
                };
              } catch (erro) {
                console.error(
                  `Erro ao consultar detalhes da votação ${votacao.id}:`,
                  erro
                );

                return {
                  ...votacao,
                  proposicaoPrincipal:
                    null,
                };
              }
            }
          )
        );

      votacoesEnriquecidas.push(
        ...resultadosGrupo
      );
    }

    /*
      Criamos também uma lista separada das votações para as
      quais conseguimos identificar uma matéria principal.

      Ainda mantemos "dados" completo durante esta etapa de
      desenvolvimento para podermos conferir os casos que não
      foram associados automaticamente.
    */
    const votacoesComMateriaPrincipal =
      votacoesEnriquecidas.filter(
        (votacao) =>
          votacao.proposicaoPrincipal !==
          null
      );

    const votacoesSemMateriaPrincipal =
      votacoesEnriquecidas.filter(
        (votacao) =>
          votacao.proposicaoPrincipal ===
          null
      );

    return NextResponse.json({
      fonte:
        "Câmara dos Deputados",

      atualizadoEm:
        new Date().toISOString(),

      dados:
        votacoesEnriquecidas,

      votacoesComMateriaPrincipal,

      resumo: {
        votacoesConsultadas:
          votacoesEnriquecidas.length,

        votacoesComMateriaPrincipal:
          votacoesComMateriaPrincipal.length,

        votacoesSemMateriaPrincipal:
          votacoesSemMateriaPrincipal.length,
      },

      criterios: {
        tiposPrincipaisConsiderados:
          Array.from(
            TIPOS_PRINCIPAIS
          ),

        prioridadeAssociacao: [
          "proposicoesAfetadas",
          "efeitosRegistrados",
          "objetosPossiveis",
        ],

        regraAmbiguidade:
          "Quando há mais de uma matéria principal possível e não existe relação suficiente para escolher uma única, nenhuma associação automática é feita.",
      },

      links: Array.isArray(
        resultadoLista.links
      )
        ? resultadoLista.links
        : [],
    });
  } catch (erro) {
    console.error(
      "Erro ao consultar votações da Câmara:",
      erro
    );

    return NextResponse.json(
      {
        erro:
          "Ocorreu um erro ao buscar as votações da Câmara dos Deputados.",
      },
      {
        status: 500,
      }
    );
  }
}