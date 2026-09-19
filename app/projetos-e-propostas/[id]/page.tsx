"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Autor = {
  uri?: string;
  nome?: string;
  codTipo?: number;
  tipo?: string;
  ordemAssinatura?: number;
  proponente?: number;
};

type Tema = {
  codTema?: number;
  tema?: string;
  relevancia?: number;
};

type Tramitacao = {
  dataHora?: string;
  sequencia?: number;
  siglaOrgao?: string;
  uriOrgao?: string;
  regime?: string;
  descricaoTramitacao?: string;
  codTipoTramitacao?: string;
  descricaoSituacao?: string;
  codSituacao?: number;
  despacho?: string;
  url?: string;
  ambito?: string;
};

type Proposicao = {
  id: number;
  uri?: string;
  siglaTipo?: string;
  codTipo?: number;
  numero?: number;
  ano?: number;
  ementa?: string;
  ementaDetalhada?: string;
  keywords?: string;
  dataApresentacao?: string;
  uriOrgaoNumerador?: string;
  uriPropAnterior?: string;
  uriPropPrincipal?: string;
  descricaoTipo?: string;
  statusProposicao?: Tramitacao;
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
  aprovacao?: number;
};

type DeputadoVoto = {
  id?: number;
  nome?: string;
  siglaPartido?: string;
  siglaUf?: string;
  urlFoto?: string;
};

type VotoIndividual = {
  tipoVoto?: string;
  dataRegistroVoto?: string;
  deputado_?: DeputadoVoto;
};

type RespostaProposicao = {
  fonte: string;
  atualizadoEm: string;
  dados: Proposicao | null;
};

type RespostaAutores = {
  fonte: string;
  atualizadoEm: string;
  proposicaoId: number;
  dados: Autor[];
};

type RespostaTemas = {
  fonte: string;
  atualizadoEm: string;
  proposicaoId: number;
  dados: Tema[];
};

type RespostaTramitacoes = {
  fonte: string;
  atualizadoEm: string;
  proposicaoId: number;
  dados: Tramitacao[];
};

type RespostaVotacoes = {
  fonte: string;
  atualizadoEm: string;
  proposicaoId: number;
  dados: Votacao[];
};

type RespostaVotos = {
  fonte: string;
  atualizadoEm: string;
  votacaoId: string;
  dados: VotoIndividual[];
};

type TraducaoMovimentacao = {
  titulo: string;
  explicacao: string | null;
  termoOficial: string | null;
};

type TraducaoOrgao = {
  nome: string;
  explicacao: string | null;
  termoOficial: string;
};

function textoSeguro(texto?: string | null) {
  if (!texto) return null;

  const limpo = texto.trim();

  return limpo.length > 0 ? limpo : null;
}

function formatarData(data?: string) {
  if (!data) return null;

  const valor = new Date(data);

  if (Number.isNaN(valor.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(valor);
}

function traduzirMovimentacao(
  descricao?: string
): TraducaoMovimentacao {
  const oficial = textoSeguro(descricao);

  if (!oficial) {
    return {
      titulo: "Houve uma atualização no processo.",
      explicacao: null,
      termoOficial: null,
    };
  }

  const normalizado = oficial
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (
    normalizado.includes("apresentacao de proposicao") ||
    normalizado.includes("apresentacao da proposicao")
  ) {
    return {
      titulo: "A proposta foi apresentada oficialmente.",
      explicacao:
        "Isso significa que ela passou a fazer parte do processo legislativo e pode começar a seguir as etapas previstas para sua análise.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("distribuicao") ||
    normalizado.includes("distribuido")
  ) {
    return {
      titulo:
        "A proposta foi encaminhada para uma área responsável por analisá-la.",
      explicacao:
        "Na Câmara, diferentes comissões e órgãos cuidam de partes específicas da análise. O registro oficial informa para onde a proposta foi encaminhada.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("designacao de relator") ||
    normalizado.includes("designado relator") ||
    normalizado.includes("designada relatora")
  ) {
    return {
      titulo:
        "Uma pessoa foi escolhida para acompanhar e analisar a proposta.",
      explicacao:
        "Essa pessoa é chamada oficialmente de relator ou relatora. Ela pode estudar o texto e apresentar uma avaliação dentro da etapa em que a proposta se encontra.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("parecer") &&
    (normalizado.includes("aprovacao") ||
      normalizado.includes("aprovado"))
  ) {
    return {
      titulo:
        "Foi registrada uma decisão favorável a um parecer.",
      explicacao:
        "Parecer é uma análise formal feita durante o caminho da proposta. Isso não significa, por si só, que a proposta já virou lei.",
      termoOficial: oficial,
    };
  }

  if (normalizado.includes("parecer")) {
    return {
      titulo:
        "Foi registrada uma etapa relacionada à análise da proposta.",
      explicacao:
        "O nome oficial usado nessa etapa menciona um parecer. Parecer é uma análise formal feita durante o processo.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("apens") ||
    normalizado.includes("desapens")
  ) {
    return {
      titulo:
        "O registro informa uma mudança na relação desta proposta com outra.",
      explicacao:
        "Algumas propostas que tratam de assuntos relacionados podem passar a tramitar juntas. A expressão oficial usada pela Câmara aparece abaixo.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("recebimento") ||
    normalizado.includes("recebido")
  ) {
    return {
      titulo:
        "Uma área da Câmara registrou o recebimento da proposta.",
      explicacao:
        "Esse tipo de registro ajuda a acompanhar por quais setores a proposta passou.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("encaminhamento") ||
    normalizado.includes("encaminhado")
  ) {
    return {
      titulo:
        "A proposta foi encaminhada para outra etapa ou área.",
      explicacao:
        "O registro oficial abaixo informa como a Câmara identificou essa movimentação.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("publicacao") ||
    normalizado.includes("publicado")
  ) {
    return {
      titulo:
        "Uma informação relacionada à proposta foi publicada oficialmente.",
      explicacao:
        "A publicação faz parte do registro público do caminho percorrido pela proposta.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("retirada") ||
    normalizado.includes("retirado")
  ) {
    return {
      titulo:
        "O registro informa uma retirada relacionada à proposta.",
      explicacao:
        "Para saber exatamente o que foi retirado e qual foi o efeito dessa etapa, é importante consultar o texto oficial mostrado abaixo.",
      termoOficial: oficial,
    };
  }

  if (
    normalizado.includes("arquiv") ||
    normalizado.includes("arquivado")
  ) {
    return {
      titulo:
        "O registro informa que a proposta foi arquivada.",
      explicacao:
        "Arquivamento significa que a tramitação foi encerrada naquela situação. O motivo e a possibilidade de retomada dependem das regras aplicáveis ao caso.",
      termoOficial: oficial,
    };
  }

  return {
    titulo: "A Câmara registrou uma nova movimentação.",
    explicacao:
      "Esta etapa ainda não possui uma tradução automática validada pelo Observa Salvador. Por isso, mostramos abaixo o texto oficial sem tentar adivinhar seu significado.",
    termoOficial: oficial,
  };
}

function traduzirOrgao(
  sigla?: string
): TraducaoOrgao | null {
  const oficial = textoSeguro(sigla);

  if (!oficial) return null;

  const chave = oficial.toUpperCase();

  const traducoes: Record<
    string,
    Omit<TraducaoOrgao, "termoOficial">
  > = {
    MESA: {
      nome: "Na Mesa da Câmara dos Deputados",
      explicacao:
        "A Mesa dirige os trabalhos administrativos e legislativos da Câmara. Quando essa sigla aparece no registro, ela identifica essa área da instituição.",
    },

    PLEN: {
      nome: "No Plenário da Câmara",
      explicacao:
        "O Plenário é o espaço em que os deputados se reúnem para discutir e votar matérias quando elas chegam a essa etapa.",
    },

    CCJC: {
      nome:
        "Na comissão que analisa questões de Constituição e Justiça",
      explicacao:
        "Essa comissão verifica, entre outros pontos, questões jurídicas e constitucionais relacionadas às propostas que passam por ela.",
    },

    CFT: {
      nome:
        "Na comissão que analisa questões de finanças e tributação",
      explicacao:
        "Essa comissão examina assuntos financeiros e tributários dentro das competências previstas para ela.",
    },
  };

  const traducao = traducoes[chave];

  if (traducao) {
    return {
      ...traducao,
      termoOficial: oficial,
    };
  }

  return {
    nome: "Área registrada pela Câmara",
    explicacao:
      "O Observa Salvador ainda não possui uma explicação validada para esta sigla. Por isso, mostramos o código oficial sem atribuir um significado que possa estar errado.",
    termoOficial: oficial,
  };
}

function traduzirRegime(regime?: string) {
  const oficial = textoSeguro(regime);

  if (!oficial) return null;

  const normalizado = oficial
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalizado.includes("ordinari")) {
    return {
      titulo: "Segue o procedimento normal de análise.",
      explicacao:
        "O registro oficial chama esse ritmo de tramitação de regime ordinário.",
      oficial,
    };
  }

  if (normalizado.includes("urgencia")) {
    return {
      titulo:
        "A proposta está seguindo um procedimento de urgência.",
      explicacao:
        "Urgência é um regime que altera a prioridade e os prazos de análise conforme as regras aplicáveis ao processo.",
      oficial,
    };
  }

  if (normalizado.includes("prioridade")) {
    return {
      titulo:
        "A proposta está seguindo um procedimento com prioridade.",
      explicacao:
        "A Câmara registra oficialmente esse modo de tramitação como regime de prioridade.",
      oficial,
    };
  }

  return {
    titulo: "A Câmara informou um regime de tramitação.",
    explicacao:
      "O Observa Salvador ainda não possui uma tradução automática validada para esse termo.",
    oficial,
  };
}

function corDoVoto(tipo?: string) {
  const voto = (tipo || "").toLowerCase();

  if (voto === "sim") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    voto === "não" ||
    voto === "nao"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (voto.includes("absten")) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (voto.includes("obstru")) {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function CartaoVotacao({
  votacao,
}: {
  votacao: Votacao;
}) {
  const [aberto, setAberto] = useState(false);
  const [carregandoVotos, setCarregandoVotos] =
    useState(false);
  const [erroVotos, setErroVotos] = useState("");
  const [votos, setVotos] = useState<VotoIndividual[]>([]);

  const idVotacao = textoSeguro(votacao.id);

  const data =
    formatarData(votacao.dataHoraRegistro) ||
    formatarData(votacao.data);

  const objeto = textoSeguro(
    votacao.proposicaoObjeto
  );

  const descricao = textoSeguro(
    votacao.descricao
  );

  const votosBahia = useMemo(() => {
    return votos
      .filter(
        (voto) =>
          voto.deputado_?.siglaUf?.toUpperCase() === "BA"
      )
      .sort((a, b) =>
        (a.deputado_?.nome || "").localeCompare(
          b.deputado_?.nome || "",
          "pt-BR"
        )
      );
  }, [votos]);

  async function carregarVotos() {
    if (!idVotacao) return;

    if (aberto) {
      setAberto(false);
      return;
    }

    if (votos.length > 0) {
      setAberto(true);
      return;
    }

    try {
      setCarregandoVotos(true);
      setErroVotos("");

      const resposta = await fetch(
        `/api/camara/votacoes/${encodeURIComponent(
          idVotacao
        )}/votos`
      );

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível consultar os votos individuais desta votação."
        );
      }

      const resultado: RespostaVotos =
        await resposta.json();

      setVotos(
        Array.isArray(resultado.dados)
          ? resultado.dados
          : []
      );

      setAberto(true);
    } catch (error) {
      console.error(error);

      setErroVotos(
        error instanceof Error
          ? error.message
          : "Não foi possível consultar os votos desta votação."
      );

      setAberto(true);
    } finally {
      setCarregandoVotos(false);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-[#fafbfd]">
      <div className="p-4 md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {data && (
              <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#1769e0]">
                {data}
              </p>
            )}

            <h3 className="mt-1 text-[14px] font-black text-[#071b3d]">
              O que estava sendo decidido?
            </h3>
          </div>

          {votacao.siglaOrgao && (
            <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[8px] font-extrabold text-[#1769e0]">
              {votacao.siglaOrgao === "PLEN"
                ? "Plenário da Câmara"
                : `Registro oficial: ${votacao.siglaOrgao}`}
            </span>
          )}
        </div>

        {objeto ? (
          <div className="mt-4 rounded-xl border border-blue-100 bg-white p-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
              Objeto desta votação
            </p>

            <p className="mt-1 text-[13px] font-black text-[#071b3d]">
              {objeto}
            </p>

            <p className="mt-2 text-[10px] leading-5 text-slate-500">
              Este é o nome usado pela Câmara para identificar
              o que foi colocado em votação nesta etapa.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-[10px] leading-5 text-amber-800">
              A consulta não informou de forma separada o nome
              do objeto desta votação. Por isso, o texto oficial
              abaixo deve ser lido com atenção.
            </p>
          </div>
        )}

        {descricao && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
              Resultado informado pela Câmara
            </p>

            <p className="mt-2 text-[11px] leading-5 text-slate-700">
              {descricao}
            </p>
          </div>
        )}

        <div className="mt-3 flex gap-3 rounded-xl border border-amber-100 bg-[#fffaf0] p-4">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-amber-400" />

          <div>
            <p className="text-[10px] font-black text-[#071b3d]">
              Entenda este voto
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-600">
              “Sim” ou “Não” se refere ao que estava sendo
              decidido nesta votação específica. Isso não
              significa automaticamente apoio ou rejeição ao
              conteúdo inteiro da proposta.
            </p>
          </div>
        </div>

        {idVotacao && (
          <button
            type="button"
            onClick={carregarVotos}
            disabled={carregandoVotos}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#1769e0] px-4 py-2.5 text-[10px] font-extrabold text-white transition hover:bg-[#0f58c2] disabled:cursor-wait disabled:opacity-60"
          >
            {carregandoVotos
              ? "Consultando votos..."
              : aberto
                ? "Ocultar votos registrados na Bahia"
                : "Ver votos registrados na Bahia"}
          </button>
        )}
      </div>

      {aberto && (
        <div className="border-t border-slate-200 bg-white p-4 md:p-5">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#1769e0]">
            Bahia
          </p>

          <h4 className="mt-1 text-[15px] font-black text-[#071b3d]">
            Como votaram os deputados federais com voto
            registrado pela Bahia?
          </h4>

          <p className="mt-2 max-w-[720px] text-[10px] leading-5 text-slate-500">
            A lista abaixo mostra apenas os votos individuais
            retornados pela fonte oficial e identificados com a
            sigla BA.
          </p>

          {erroVotos ? (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-[10px] font-bold text-red-700">
                {erroVotos}
              </p>
            </div>
          ) : votosBahia.length > 0 ? (
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {votosBahia.map((voto, index) => {
                const deputado = voto.deputado_;
                const nome =
                  textoSeguro(deputado?.nome) ||
                  "Nome não informado";

                const partido =
                  textoSeguro(deputado?.siglaPartido);

                const tipo =
                  textoSeguro(voto.tipoVoto) ||
                  "Não informado";

                return (
                  <div
                    key={`${deputado?.id}-${tipo}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-[#fafbfd] p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {deputado?.urlFoto ? (
                        <img
                          src={deputado.urlFoto}
                          alt=""
                          className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-400">
                          BA
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-black text-[#071b3d]">
                          {nome}
                        </p>

                        <p className="mt-1 text-[9px] font-semibold text-slate-400">
                          {partido
                            ? `${partido} · BA`
                            : "BA"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-[9px] font-black ${corDoVoto(
                        tipo
                      )}`}
                    >
                      {tipo}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] leading-5 text-slate-600">
                A consulta não retornou votos individuais
                identificados com a sigla BA para esta votação.
                O Observa Salvador não atribui automaticamente
                um motivo para a ausência de um nome nessa lista.
              </p>
            </div>
          )}

          <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-cyan-700">
              Importante
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-600">
              Esta lista representa os registros devolvidos pela
              consulta oficial para esta votação específica. Ela
              não deve ser usada, sozinha, para concluir a posição
              geral de um parlamentar sobre toda a proposta.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function PaginaProposicao() {
  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : String(params.id || "");

  const [proposicao, setProposicao] =
    useState<Proposicao | null>(null);

  const [autores, setAutores] =
    useState<Autor[]>([]);

  const [temas, setTemas] =
    useState<Tema[]>([]);

  const [tramitacoes, setTramitacoes] =
    useState<Tramitacao[]>([]);

  const [votacoes, setVotacoes] =
    useState<Votacao[]>([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  useEffect(() => {
    async function carregar() {
      if (!id) return;

      try {
        setCarregando(true);
        setErro("");

        const [
          respostaProposicao,
          respostaAutores,
          respostaTemas,
          respostaTramitacoes,
          respostaVotacoes,
        ] = await Promise.all([
          fetch(`/api/camara/proposicoes/${id}`),
          fetch(`/api/camara/proposicoes/${id}/autores`),
          fetch(`/api/camara/proposicoes/${id}/temas`),
          fetch(`/api/camara/proposicoes/${id}/tramitacoes`),
          fetch(`/api/camara/proposicoes/${id}/votacoes`),
        ]);

        if (!respostaProposicao.ok) {
          throw new Error(
            "Não foi possível carregar esta proposição."
          );
        }

        const resultadoProposicao: RespostaProposicao =
          await respostaProposicao.json();

        if (!resultadoProposicao.dados) {
          throw new Error(
            "A proposição não foi encontrada."
          );
        }

        setProposicao(resultadoProposicao.dados);

        if (respostaAutores.ok) {
          const resultadoAutores: RespostaAutores =
            await respostaAutores.json();

          setAutores(
            Array.isArray(resultadoAutores.dados)
              ? resultadoAutores.dados
              : []
          );
        } else {
          setAutores([]);
        }

        if (respostaTemas.ok) {
          const resultadoTemas: RespostaTemas =
            await respostaTemas.json();

          setTemas(
            Array.isArray(resultadoTemas.dados)
              ? resultadoTemas.dados
              : []
          );
        } else {
          setTemas([]);
        }

        if (respostaTramitacoes.ok) {
          const resultadoTramitacoes: RespostaTramitacoes =
            await respostaTramitacoes.json();

          setTramitacoes(
            Array.isArray(resultadoTramitacoes.dados)
              ? resultadoTramitacoes.dados
              : []
          );
        } else {
          setTramitacoes([]);
        }

        if (respostaVotacoes.ok) {
          const resultadoVotacoes: RespostaVotacoes =
            await respostaVotacoes.json();

          setVotacoes(
            Array.isArray(resultadoVotacoes.dados)
              ? resultadoVotacoes.dados
              : []
          );
        } else {
          setVotacoes([]);
        }
      } catch (error) {
        console.error(error);

        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar esta proposição."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  const tramitacoesOrdenadas = useMemo(() => {
    return [...tramitacoes].sort((a, b) => {
      const dataA = a.dataHora
        ? new Date(a.dataHora).getTime()
        : 0;

      const dataB = b.dataHora
        ? new Date(b.dataHora).getTime()
        : 0;

      if (dataA !== dataB) {
        return dataB - dataA;
      }

      return (b.sequencia ?? 0) - (a.sequencia ?? 0);
    });
  }, [tramitacoes]);

  const votacoesOrdenadas = useMemo(() => {
    return [...votacoes].sort((a, b) => {
      const dataA = a.dataHoraRegistro
        ? new Date(a.dataHoraRegistro).getTime()
        : a.data
          ? new Date(a.data).getTime()
          : 0;

      const dataB = b.dataHoraRegistro
        ? new Date(b.dataHoraRegistro).getTime()
        : b.data
          ? new Date(b.data).getTime()
          : 0;

      return dataB - dataA;
    });
  }, [votacoes]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#f5f8fc]">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 py-4 md:px-8">
            <Link
              href="/projetos-e-propostas"
              className="text-xs font-bold text-[#1769e0]"
            >
              ← Projetos e Propostas
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-9 w-9 animate-pulse rounded-full bg-blue-100" />

            <p className="mt-5 text-sm font-extrabold text-[#071b3d]">
              Buscando informações oficiais...
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Consultando os dados desta proposição.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (erro || !proposicao) {
    return (
      <main className="min-h-screen bg-[#f5f8fc]">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 py-4 md:px-8">
            <Link
              href="/projetos-e-propostas"
              className="text-xs font-bold text-[#1769e0]"
            >
              ← Projetos e Propostas
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-[900px] px-5 py-12 md:px-8">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
            <p className="font-extrabold text-red-800">
              Não conseguimos abrir esta proposição.
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              {erro}
            </p>

            <Link
              href="/projetos-e-propostas"
              className="mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-xs font-extrabold text-[#1769e0] shadow-sm"
            >
              Voltar para a pesquisa
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const status = proposicao.statusProposicao;

  const dataApresentacao = formatarData(
    proposicao.dataApresentacao
  );

  const dataStatus = formatarData(
    status?.dataHora
  );

  const ementa = textoSeguro(
    proposicao.ementa
  );

  const ementaDetalhada = textoSeguro(
    proposicao.ementaDetalhada
  );

  const situacao = textoSeguro(
    status?.descricaoSituacao
  );

  const despacho = textoSeguro(
    status?.despacho
  );

  const autoresValidos = autores.filter(
    (autor) => textoSeguro(autor.nome)
  );

  const temasValidos = temas.filter(
    (tema) => textoSeguro(tema.tema)
  );

  const orgaoAtual = traduzirOrgao(
    status?.siglaOrgao
  );

  const regimeAtual = traduzirRegime(
    status?.regime
  );

  const movimentacaoAtual =
    traduzirMovimentacao(
      status?.descricaoTramitacao
    );

  const identificacao =
    proposicao.siglaTipo &&
    proposicao.numero &&
    proposicao.ano
      ? `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`
      : `Proposição ${proposicao.id}`;

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      {/* HEADER */}

      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#071b3d] text-xs font-black text-white">
              OS
            </div>

            <div>
              <p className="text-[14px] font-black leading-none text-[#071b3d]">
                Observa Salvador
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Entenda • acompanhe • fiscalize
              </p>
            </div>
          </Link>

          <Link
            href="/projetos-e-propostas"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-extrabold text-[#1769e0]"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#071b3d]">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#1769e0]/25 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-cyan-200">
              Projetos e Propostas
            </span>

            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-blue-100">
              Câmara dos Deputados
            </span>
          </div>

          <div className="mt-7 grid gap-8 md:grid-cols-[1fr_260px] md:items-end">
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-cyan-300">
                {identificacao}
              </p>

              <h1 className="mt-3 max-w-[680px] text-[34px] font-black leading-[1.05] tracking-tight text-white md:text-[48px]">
                Entenda esta proposta
              </h1>

              <p className="mt-4 max-w-[650px] text-[13px] leading-6 text-blue-100/80">
                Veja o que foi apresentado, quem apresentou,
                sobre quais assuntos trata, qual caminho a
                proposta já percorreu e quais votações foram
                registradas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                Apresentação
              </p>

              <p className="mt-2 text-[13px] font-extrabold text-white">
                {dataApresentacao || "Data não informada"}
              </p>

              <div className="mt-4 h-px bg-white/10" />

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <p className="text-[10px] font-bold text-blue-100">
                  Dados obtidos de fonte oficial
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-5 py-7 md:px-8 md:py-9">
        {/* DESCRIÇÃO + AUTORIA */}

        <div className="grid gap-4 lg:grid-cols-[1.65fr_0.85fr]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1 bg-gradient-to-r from-[#1769e0] via-cyan-400 to-cyan-300" />

            <div className="p-5 md:p-7">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#1769e0]">
                01 · Registro oficial
              </p>

              <h2 className="mt-1 text-[17px] font-black text-[#071b3d]">
                O que o registro oficial diz?
              </h2>

              <div className="mt-5 rounded-xl bg-[#f5f8fc] p-4 md:p-5">
                {ementa ? (
                  <p className="text-[13px] leading-6 text-slate-700">
                    {ementa}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    A fonte consultada não apresentou uma descrição.
                  </p>
                )}
              </div>

              <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
                <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-amber-400" />

                <p className="text-[10px] leading-5 text-slate-500">
                  Este é o texto do registro oficial. Ele ainda
                  não é um resumo produzido pelo Observa Salvador
                  em linguagem simplificada.
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1 bg-gradient-to-r from-[#f0b429] to-amber-300" />

            <div className="p-5 md:p-6">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-amber-600">
                02 · Autoria
              </p>

              <h2 className="mt-1 text-[17px] font-black text-[#071b3d]">
                Quem apresentou?
              </h2>

              {autoresValidos.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {autoresValidos.map(
                    (autor, index) => (
                      <div
                        key={`${autor.nome}-${index}`}
                        className="rounded-xl border border-slate-100 bg-[#fafbfc] px-4 py-3"
                      >
                        <p className="text-[13px] font-extrabold text-[#071b3d]">
                          {autor.nome}
                        </p>

                        {textoSeguro(autor.tipo) && (
                          <p className="mt-1 text-[9px] text-slate-400">
                            Classificação oficial:{" "}
                            {autor.tipo}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-4 text-xs text-slate-500">
                  A consulta não trouxe autoria.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* TEMAS */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
          <div className="grid md:grid-cols-[230px_1fr]">
            <div className="bg-[#f4f0ff] p-5 md:p-6">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-violet-600">
                03 · Assuntos
              </p>

              <h2 className="mt-1 text-[18px] font-black text-[#071b3d]">
                Sobre o que ela trata?
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-slate-600">
                A Câmara relaciona as propostas a áreas
                temáticas para ajudar a identificar os assuntos
                envolvidos.
              </p>
            </div>

            <div className="p-5 md:p-6">
              {temasValidos.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {temasValidos.map(
                    (tema, index) => (
                      <div
                        key={`${tema.codTema}-${tema.tema}-${index}`}
                        className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-3"
                      >
                        <p className="text-[11px] font-extrabold text-[#071b3d]">
                          {tema.tema}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Nenhum tema foi informado pela fonte consultada.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* SITUAÇÃO ATUAL */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[270px_1fr]">
            <div className="bg-gradient-to-br from-[#0b3d73] to-[#1769e0] p-5 text-white md:p-6">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-cyan-200">
                04 · Situação atual
              </p>

              <h2 className="mt-1 text-[20px] font-black">
                Onde está agora?
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-blue-100">
                Primeiro mostramos o significado em linguagem
                comum. O termo oficial aparece como informação
                complementar.
              </p>
            </div>

            <div className="p-5 md:p-7">
              {situacao && (
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-600">
                    Situação informada
                  </p>

                  <p className="mt-1 text-[15px] font-black leading-6 text-[#071b3d]">
                    {situacao}
                  </p>

                  {dataStatus && (
                    <p className="mt-1 text-[10px] text-slate-400">
                      Registro de {dataStatus}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {movimentacaoAtual.termoOficial && (
                  <div className="rounded-xl bg-[#f7f9fc] p-4">
                    <p className="text-[9px] font-extrabold uppercase text-[#1769e0]">
                      O que aconteceu
                    </p>

                    <p className="mt-2 text-[11px] font-extrabold leading-5 text-[#071b3d]">
                      {movimentacaoAtual.titulo}
                    </p>

                    {movimentacaoAtual.explicacao && (
                      <p className="mt-2 text-[9px] leading-4 text-slate-500">
                        {movimentacaoAtual.explicacao}
                      </p>
                    )}

                    <p className="mt-3 border-t border-slate-200 pt-2 text-[8px] leading-4 text-slate-400">
                      Nome usado oficialmente:{" "}
                      {movimentacaoAtual.termoOficial}
                    </p>
                  </div>
                )}

                {orgaoAtual && (
                  <div className="rounded-xl bg-[#f7f9fc] p-4">
                    <p className="text-[9px] font-extrabold uppercase text-[#1769e0]">
                      Onde está
                    </p>

                    <p className="mt-2 text-[11px] font-extrabold leading-5 text-[#071b3d]">
                      {orgaoAtual.nome}
                    </p>

                    {orgaoAtual.explicacao && (
                      <p className="mt-2 text-[9px] leading-4 text-slate-500">
                        {orgaoAtual.explicacao}
                      </p>
                    )}

                    <p className="mt-3 border-t border-slate-200 pt-2 text-[8px] text-slate-400">
                      Código usado oficialmente:{" "}
                      {orgaoAtual.termoOficial}
                    </p>
                  </div>
                )}

                {regimeAtual && (
                  <div className="rounded-xl bg-[#f7f9fc] p-4">
                    <p className="text-[9px] font-extrabold uppercase text-[#1769e0]">
                      Ritmo de análise
                    </p>

                    <p className="mt-2 text-[11px] font-extrabold leading-5 text-[#071b3d]">
                      {regimeAtual.titulo}
                    </p>

                    <p className="mt-2 text-[9px] leading-4 text-slate-500">
                      {regimeAtual.explicacao}
                    </p>

                    <p className="mt-3 border-t border-slate-200 pt-2 text-[8px] text-slate-400">
                      Nome usado oficialmente:{" "}
                      {regimeAtual.oficial}
                    </p>
                  </div>
                )}
              </div>

              {despacho && (
                <details className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <summary className="cursor-pointer px-4 py-3 text-[10px] font-extrabold text-[#1769e0]">
                    Ver texto oficial do último despacho
                  </summary>

                  <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-[10px] leading-5 text-slate-600">
                      {despacho}
                    </p>
                  </div>
                </details>
              )}
            </div>
          </div>
        </section>

        {/* CAMINHO DA PROPOSTA */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm">
          <div className="border-b border-cyan-100 bg-[#edfbff] p-5 md:p-6">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-cyan-700">
              05 · Histórico
            </p>

            <h2 className="mt-1 text-[20px] font-black text-[#071b3d]">
              Qual caminho essa proposta já percorreu?
            </h2>

            <p className="mt-2 max-w-[720px] text-[11px] leading-5 text-slate-600">
              Cada registro abaixo representa uma movimentação
              informada pela Câmara. As mais recentes aparecem
              primeiro.
            </p>
          </div>

          <div className="p-5 md:p-6">
            {tramitacoesOrdenadas.length > 0 ? (
              <div className="relative">
                <div className="absolute bottom-0 left-[5px] top-1 w-px bg-slate-200 md:left-[7px]" />

                <div className="space-y-3">
                  {tramitacoesOrdenadas.map(
                    (tramitacao, index) => {
                      const traducao =
                        traduzirMovimentacao(
                          tramitacao.descricaoTramitacao
                        );

                      const orgao =
                        traduzirOrgao(
                          tramitacao.siglaOrgao
                        );

                      const data =
                        formatarData(
                          tramitacao.dataHora
                        );

                      const despachoItem =
                        textoSeguro(
                          tramitacao.despacho
                        );

                      return (
                        <div
                          key={`${tramitacao.dataHora}-${tramitacao.sequencia}-${index}`}
                          className="relative pl-7 md:pl-9"
                        >
                          <span className="absolute left-0 top-4 h-[11px] w-[11px] rounded-full border-[3px] border-white bg-[#1769e0] ring-2 ring-blue-100 md:h-[15px] md:w-[15px]" />

                          <div className="rounded-xl border border-slate-100 bg-[#fafbfd] p-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                {data && (
                                  <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#1769e0]">
                                    {data}
                                  </p>
                                )}

                                <p className="mt-1 text-[12px] font-black leading-5 text-[#071b3d]">
                                  {traducao.titulo}
                                </p>
                              </div>

                              {orgao && (
                                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-[8px] font-extrabold text-[#1769e0]">
                                  {orgao.nome}
                                </span>
                              )}
                            </div>

                            {traducao.explicacao && (
                              <p className="mt-2 max-w-[760px] text-[10px] leading-5 text-slate-600">
                                {traducao.explicacao}
                              </p>
                            )}

                            {(traducao.termoOficial ||
                              orgao ||
                              despachoItem) && (
                              <details className="mt-3">
                                <summary className="cursor-pointer text-[9px] font-extrabold text-slate-500">
                                  Ver informações oficiais desta etapa
                                </summary>

                                <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3">
                                  {traducao.termoOficial && (
                                    <div>
                                      <p className="text-[8px] font-extrabold uppercase tracking-wide text-slate-400">
                                        Movimentação registrada
                                      </p>

                                      <p className="mt-1 text-[9px] leading-4 text-slate-600">
                                        {traducao.termoOficial}
                                      </p>
                                    </div>
                                  )}

                                  {orgao && (
                                    <div className="mt-3">
                                      <p className="text-[8px] font-extrabold uppercase tracking-wide text-slate-400">
                                        Área informada
                                      </p>

                                      <p className="mt-1 text-[9px] leading-4 text-slate-600">
                                        {orgao.termoOficial}
                                      </p>
                                    </div>
                                  )}

                                  {despachoItem && (
                                    <div className="mt-3">
                                      <p className="text-[8px] font-extrabold uppercase tracking-wide text-slate-400">
                                        Texto do despacho
                                      </p>

                                      <p className="mt-1 text-[9px] leading-4 text-slate-600">
                                        {despachoItem}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </details>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-xs text-slate-500">
                  A fonte consultada não retornou movimentações
                  para esta proposição.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* VOTAÇÕES */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[270px_1fr]">
            <div className="bg-gradient-to-br from-[#071b3d] to-[#1769e0] p-5 text-white md:p-6">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-cyan-200">
                06 · Votações
              </p>

              <h2 className="mt-1 text-[20px] font-black">
                O que já foi colocado em votação?
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-blue-100">
                Uma mesma proposta pode passar por decisões
                diferentes. Por isso, mostramos separadamente o
                que estava sendo decidido em cada votação.
              </p>
            </div>

            <div className="p-5 md:p-6">
              {votacoesOrdenadas.length > 0 ? (
                <div className="space-y-3">
                  {votacoesOrdenadas.map(
                    (votacao, index) => (
                      <CartaoVotacao
                        key={
                          votacao.id ||
                          `${votacao.data}-${index}`
                        }
                        votacao={votacao}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-5">
                  <p className="text-[12px] font-extrabold text-[#071b3d]">
                    Nenhuma votação relacionada foi retornada
                    pela consulta.
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-slate-500">
                    Isso significa apenas que esta consulta não
                    trouxe uma votação relacionada para exibir
                    nesta página.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* EMENTA DETALHADA */}

        {ementaDetalhada &&
          ementaDetalhada !== ementa && (
            <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-violet-600">
                Mais informações no registro
              </p>

              <h2 className="mt-1 text-[16px] font-black text-[#071b3d]">
                A Câmara também informa
              </h2>

              <p className="mt-3 text-[12px] leading-6 text-slate-600">
                {ementaDetalhada}
              </p>
            </section>
          )}

        {/* NÃO CONFUNDA */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-[#fff8df] to-[#fffdf5]">
          <div className="flex flex-col md:flex-row">
            <div className="flex items-center justify-center bg-amber-400 px-5 py-4 md:w-[150px]">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#493300]">
                Não confunda
              </p>
            </div>

            <div className="p-5 md:px-6">
              <p className="text-[13px] font-black text-[#071b3d]">
                Movimentação ou votação de uma etapa não
                significa necessariamente aprovação final da
                proposta.
              </p>

              <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-slate-600">
                Uma proposta pode passar por várias etapas e por
                diferentes votações. Por isso, é importante
                observar exatamente o que estava sendo decidido
                em cada momento.
              </p>
            </div>
          </div>
        </section>

        {/* INTEGRAÇÃO */}

        <section className="mt-4 rounded-2xl border border-cyan-100 bg-[#eefdff] p-5 md:p-6">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-cyan-700">
            Integração dos dados
          </p>

          <h2 className="mt-1 text-[16px] font-black text-[#071b3d]">
            Os principais dados desta proposta já estão
            conectados.
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Detalhes",
              "Autoria",
              "Temas",
              "Caminho",
              "Votações",
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-emerald-100 bg-white px-3 py-2 text-[9px] font-extrabold text-emerald-700"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </section>

        {/* FONTE + EDITORIAL */}

        <section className="mt-4 grid gap-3 md:grid-cols-[1fr_1.35fr]">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
              Fonte oficial
            </p>

            <p className="mt-1 text-[11px] font-extrabold text-[#071b3d]">
              Câmara dos Deputados · Dados Abertos
            </p>
          </div>

          <div className="rounded-2xl bg-[#071b3d] p-5 text-white">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-cyan-300">
              Informação para formar sua própria opinião
            </p>

            <p className="mt-2 text-[10px] leading-5 text-blue-100">
              O Observa Salvador apresenta informações
              verificáveis, contexto e fontes. A plataforma não
              escolhe uma posição política pelo cidadão nem
              recomenda em quem votar.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-4 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-[12px] font-black text-[#071b3d]">
            Observa Salvador
          </p>

          <p className="text-[10px] text-slate-400">
            Entenda, acompanhe e fiscalize.
          </p>
        </div>
      </footer>
    </main>
  );
}