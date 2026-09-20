"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";

type ProposicaoPrincipal = {
  id: number;
  uri?: string;
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
  dataApresentacao?: string;
  origemAssociacao?:
    | "proposicoesAfetadas"
    | "efeitosRegistrados"
    | "objetosPossiveis";
};

type Votacao = {
  id?: string;
  uri?: string;
  data?: string;
  dataHoraRegistro?: string;
  siglaOrgao?: string;
  uriOrgao?: string;
  uriEvento?: string;
  proposicaoObjeto?: string | null;
  uriProposicaoObjeto?: string | null;
  descricao?: string;
  aprovacao?: number | null;
  proposicaoPrincipal?: ProposicaoPrincipal | null;
};

type MateriaAgrupada = {
  proposicao: ProposicaoPrincipal;
  votacoes: Votacao[];
};

type Autor = {
  nome?: string;
};

type Tema = {
  tema?: string;
};

type DadosProposicao = {
  id?: number;
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
  ementaDetalhada?: string;
  dataApresentacao?: string;
  statusProposicao?: {
    descricaoSituacao?: string;
    regime?: string;
    siglaOrgao?: string;
  };
};

type Deputado = {
  id?: number;
  nome?: string;
  siglaPartido?: string;
  siglaUf?: string;
  urlFoto?: string;
};

type VotoIndividual = {
  tipoVoto?: string;
  dataRegistroVoto?: string;
  deputado_?: Deputado;
};

const niveis = [
  {
    id: "salvador" as Nivel,
    titulo: "Salvador",
    subtitulo: "Vereadores",
  },
  {
    id: "bahia" as Nivel,
    titulo: "Bahia",
    subtitulo: "Deputados estaduais",
  },
  {
    id: "brasil" as Nivel,
    titulo: "Brasil",
    subtitulo: "Congresso Nacional",
  },
];

function textoSeguro(valor?: string | null) {
  if (!valor) return null;

  const texto = valor.trim();

  return texto.length > 0 ? texto : null;
}

function normalizarTexto(valor?: string | null) {
  return (valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
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

function identificacaoProposicao(
  proposicao: ProposicaoPrincipal
) {
  const sigla =
    proposicao.siglaTipo || "Proposição";

  if (proposicao.numero && proposicao.ano) {
    return `${sigla} ${proposicao.numero}/${proposicao.ano}`;
  }

  return sigla;
}

function corVoto(voto?: string) {
  const valor = normalizarTexto(voto);

  if (
    valor === "sim" ||
    valor === "favoravel"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    valor === "nao" ||
    valor === "contrario"
  ) {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (valor.includes("absten")) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (valor.includes("obstru")) {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function explicarTipoProposicao(
  sigla?: string
) {
  switch ((sigla || "").toUpperCase()) {
    case "PL":
      return "Projeto de Lei";

    case "PLP":
      return "Projeto de Lei Complementar";

    case "PEC":
      return "Proposta de Emenda à Constituição";

    case "MPV":
      return "Medida Provisória";

    case "PDL":
      return "Projeto de Decreto Legislativo";

    case "PRC":
      return "Projeto de Resolução";

    default:
      return null;
  }
}

function explicarDecisao(votacao: Votacao) {
  const descricao =
    textoSeguro(votacao.descricao) || "";

  const objeto =
    textoSeguro(votacao.proposicaoObjeto) || "";

  const base = normalizarTexto(
    `${objeto} ${descricao}`
  );

  if (base.includes("redacao final")) {
    return {
      tipo: "principal",
      titulo: "Decisão sobre o texto final",
      explicacao:
        "Os deputados decidiram sobre a redação final preparada depois das etapas anteriores de análise da matéria.",
      nomeOficial:
        objeto || "Redação final",
    };
  }

  if (
    base.includes("merito") ||
    base.includes("mérito")
  ) {
    return {
      tipo: "principal",
      titulo:
        "Decisão sobre o conteúdo da matéria",
      explicacao:
        "Nesta decisão, os deputados analisaram o conteúdo da matéria ou de parte central dela.",
      nomeOficial: objeto || null,
    };
  }

  if (base.includes("urgencia")) {
    return {
      tipo: "procedimento",
      titulo:
        "Decisão sobre acelerar a análise",
      explicacao:
        "Os deputados decidiram se a matéria deveria seguir por um caminho mais rápido de análise. Isso não significa, por si só, aprovar ou rejeitar o conteúdo completo.",
      nomeOficial:
        objeto || "Requerimento de urgência",
    };
  }

  if (
    base.includes("retirada de pauta") ||
    base.includes("retirada")
  ) {
    return {
      tipo: "procedimento",
      titulo:
        "Decisão sobre retirar a matéria da análise naquele momento",
      explicacao:
        "Os deputados decidiram sobre um pedido para retirar a matéria da análise naquele momento. Isso é diferente de aprovar ou rejeitar seu conteúdo.",
      nomeOficial: objeto || null,
    };
  }

  if (
    base.includes("adiamento") ||
    base.includes("adiar")
  ) {
    return {
      tipo: "procedimento",
      titulo:
        "Decisão sobre adiar a análise",
      explicacao:
        "Os deputados decidiram se a análise ou votação deveria ser adiada para outro momento.",
      nomeOficial: objeto || null,
    };
  }

  if (base.includes("destaque")) {
    return {
      tipo: "especifica",
      titulo:
        "Decisão sobre uma parte específica",
      explicacao:
        "Uma parte específica do texto foi separada para ser decidida. Esse resultado não deve ser interpretado automaticamente como apoio ou rejeição à matéria inteira.",
      nomeOficial:
        objeto || "Destaque",
    };
  }

  if (
    base.includes("subemenda") ||
    base.includes("emenda")
  ) {
    return {
      tipo: "especifica",
      titulo:
        "Decisão sobre uma alteração no texto",
      explicacao:
        "Os deputados decidiram sobre uma mudança proposta no texto. O resultado se refere a essa alteração específica.",
      nomeOficial:
        objeto || "Emenda",
    };
  }

  if (
    base.includes("substitutivo")
  ) {
    return {
      tipo: "especifica",
      titulo:
        "Decisão sobre um texto que substitui a versão anterior",
      explicacao:
        "Foi colocado em análise um texto apresentado para substituir a versão que estava sendo discutida.",
      nomeOficial:
        objeto || "Substitutivo",
    };
  }

  if (base.includes("parecer")) {
    return {
      tipo: "tecnica",
      titulo:
        "Decisão relacionada a uma análise da matéria",
      explicacao:
        "Esta decisão está ligada a um parecer, que é um documento no qual um parlamentar ou comissão apresenta uma análise sobre a matéria.",
      nomeOficial:
        objeto || "Parecer",
    };
  }

  return {
    tipo: "nao-classificada",
    titulo:
      "Outra decisão relacionada à matéria",
    explicacao:
      "A fonte oficial registra esta votação como relacionada à matéria. A explicação automática desta etapa ainda não foi validada pelo Observa Salvador.",
    nomeOficial: objeto || null,
  };
}

function prioridadeDecisao(
  votacao: Votacao
) {
  const tipo =
    explicarDecisao(votacao).tipo;

  if (tipo === "principal") return 1;
  if (tipo === "especifica") return 2;
  if (tipo === "procedimento") return 3;
  if (tipo === "tecnica") return 4;

  return 5;
}

function extrairPlacar(
  descricao?: string
) {
  if (!descricao) return [];

  const resultados: {
    nome: string;
    quantidade: string;
  }[] = [];

  const padroes = [
    {
      nome: "Sim",
      regex: /Sim:\s*(\d+)/i,
    },
    {
      nome: "Não",
      regex: /N[aã]o:\s*(\d+)/i,
    },
    {
      nome: "Abstenção",
      regex:
        /Absten[cç][aã]o:\s*(\d+)/i,
    },
    {
      nome: "Total",
      regex: /Total:\s*(\d+)/i,
    },
  ];

  padroes.forEach((item) => {
    const encontrado =
      descricao.match(item.regex);

    if (encontrado?.[1]) {
      resultados.push({
        nome: item.nome,
        quantidade: encontrado[1],
      });
    }
  });

  return resultados;
}

function agruparVotacoes(
  votacoes: Votacao[]
) {
  const mapa = new Map<
    number,
    MateriaAgrupada
  >();

  votacoes.forEach((votacao) => {
    const proposicao =
      votacao.proposicaoPrincipal;

    if (!proposicao?.id) {
      return;
    }

    const existente =
      mapa.get(proposicao.id);

    if (existente) {
      existente.votacoes.push(votacao);

      if (
        !existente.proposicao.ementa &&
        proposicao.ementa
      ) {
        existente.proposicao.ementa =
          proposicao.ementa;
      }

      return;
    }

    mapa.set(proposicao.id, {
      proposicao: {
        ...proposicao,
      },
      votacoes: [votacao],
    });
  });

  return Array.from(mapa.values())
    .map((materia) => ({
      ...materia,

      votacoes: [...materia.votacoes].sort(
        (a, b) => {
          const prioridadeA =
            prioridadeDecisao(a);

          const prioridadeB =
            prioridadeDecisao(b);

          if (
            prioridadeA !== prioridadeB
          ) {
            return prioridadeA - prioridadeB;
          }

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
      ),
    }))
    .sort((a, b) => {
      const ultimaA = Math.max(
        ...a.votacoes.map((votacao) =>
          new Date(
            votacao.dataHoraRegistro ||
              votacao.data ||
              0
          ).getTime()
        )
      );

      const ultimaB = Math.max(
        ...b.votacoes.map((votacao) =>
          new Date(
            votacao.dataHoraRegistro ||
              votacao.data ||
              0
          ).getTime()
        )
      );

      return ultimaB - ultimaA;
    });
}

function VotacaoCard({
  votacao,
}: {
  votacao: Votacao;
}) {
  const [aberto, setAberto] =
    useState(false);

  const [
    votosAbertos,
    setVotosAbertos,
  ] = useState(false);

  const [
    carregandoVotos,
    setCarregandoVotos,
  ] = useState(false);

  const [
    erroVotos,
    setErroVotos,
  ] = useState("");

  const [votos, setVotos] = useState<
    VotoIndividual[]
  >([]);

  const explicacao =
    explicarDecisao(votacao);

  const placar =
    extrairPlacar(votacao.descricao);

  const votosBahia = useMemo(() => {
    return votos
      .filter(
        (voto) =>
          voto.deputado_?.siglaUf === "BA"
      )
      .sort((a, b) =>
        (
          a.deputado_?.nome || ""
        ).localeCompare(
          b.deputado_?.nome || "",
          "pt-BR"
        )
      );
  }, [votos]);

  const contagemVotos =
    useMemo(() => {
      const resultado: Record<
        string,
        number
      > = {};

      votosBahia.forEach((voto) => {
        const tipo =
          textoSeguro(voto.tipoVoto) ||
          "Outro";

        resultado[tipo] =
          (resultado[tipo] || 0) + 1;
      });

      return resultado;
    }, [votosBahia]);

  async function carregarVotos() {
    if (!votacao.id) return;

    if (votosAbertos) {
      setVotosAbertos(false);
      return;
    }

    if (
      votos.length > 0 ||
      erroVotos
    ) {
      setVotosAbertos(true);
      return;
    }

    try {
      setCarregandoVotos(true);
      setErroVotos("");

      const resposta = await fetch(
        `/api/camara/votacoes/${encodeURIComponent(
          votacao.id
        )}/votos`
      );

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível consultar os votos individuais desta decisão."
        );
      }

      const resultado =
        await resposta.json();

      setVotos(
        Array.isArray(resultado.dados)
          ? resultado.dados
          : []
      );

      setVotosAbertos(true);
    } catch (erro) {
      console.error(erro);

      setErroVotos(
        erro instanceof Error
          ? erro.message
          : "Não foi possível consultar os votos."
      );

      setVotosAbertos(true);
    } finally {
      setCarregandoVotos(false);
    }
  }

  const etiqueta =
    explicacao.tipo === "principal"
      ? {
          texto: "Decisão importante",
          classe:
            "bg-emerald-50 text-emerald-700",
        }
      : explicacao.tipo === "especifica"
        ? {
            texto: "Parte específica",
            classe:
              "bg-violet-50 text-violet-700",
          }
        : explicacao.tipo ===
            "procedimento"
          ? {
              texto:
                "Como a matéria será analisada",
              classe:
                "bg-amber-50 text-amber-800",
            }
          : explicacao.tipo === "tecnica"
            ? {
                texto: "Etapa técnica",
                classe:
                  "bg-slate-100 text-slate-600",
              }
            : {
                texto:
                  "Outra decisão registrada",
                classe:
                  "bg-slate-100 text-slate-600",
              };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() =>
          setAberto(!aberto)
        }
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left md:px-5"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {formatarData(
              votacao.data ||
                votacao.dataHoraRegistro
            ) && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-600">
                {formatarData(
                  votacao.data ||
                    votacao.dataHoraRegistro
                )}
              </span>
            )}

            <span
              className={`rounded-md px-2 py-1 text-[9px] font-extrabold ${etiqueta.classe}`}
            >
              {etiqueta.texto}
            </span>
          </div>

          <h4 className="mt-2 text-[14px] font-extrabold leading-5 text-blue-950">
            {explicacao.titulo}
          </h4>

          <p className="mt-1 max-w-[700px] text-[11px] leading-5 text-slate-600">
            {explicacao.explicacao}
          </p>

          {votacao.proposicaoObjeto && (
            <p className="mt-2 text-[9px] font-bold text-slate-400">
              Registro relacionado a:{" "}
              {votacao.proposicaoObjeto}
            </p>
          )}
        </div>

        <span className="shrink-0 text-xl font-bold text-blue-600">
          {aberto ? "−" : "+"}
        </span>
      </button>

      {aberto && (
        <div className="border-t border-slate-200 px-4 py-4 md:px-5">
          {placar.length > 0 && (
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                Resultado geral registrado
                pela Câmara
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {placar.map((item) => (
                  <span
                    key={item.nome}
                    className={`rounded-md border px-3 py-2 text-[10px] font-extrabold ${
                      item.nome === "Sim"
                        ? corVoto("Sim")
                        : item.nome ===
                            "Não"
                          ? corVoto("Não")
                          : item.nome ===
                              "Abstenção"
                            ? corVoto(
                                "Abstenção"
                              )
                            : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {item.quantidade}{" "}
                    {item.nome.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {votacao.descricao && (
            <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                O que consta no registro
                oficial
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-700">
                {votacao.descricao}
              </p>

              {explicacao.nomeOficial && (
                <p className="mt-2 text-[10px] text-slate-500">
                  Nome ou identificação
                  usada oficialmente:{" "}
                  <strong>
                    {
                      explicacao.nomeOficial
                    }
                  </strong>
                </p>
              )}
            </div>
          )}

          {votacao.id && (
            <button
              type="button"
              onClick={carregarVotos}
              disabled={
                carregandoVotos
              }
              className="mt-4 rounded-lg bg-blue-950 px-4 py-3 text-[10px] font-extrabold text-white disabled:opacity-50"
            >
              {carregandoVotos
                ? "Consultando votos..."
                : votosAbertos
                  ? "Ocultar votos da Bahia"
                  : "Como votaram os deputados federais eleitos pela Bahia?"}
            </button>
          )}

          {votosAbertos && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                Representantes da Bahia
              </p>

              <h5 className="mt-1 text-[16px] font-extrabold text-blue-950">
                Votos individuais
                registrados
              </h5>

              <p className="mt-1 max-w-[720px] text-[10px] leading-5 text-slate-500">
                Aqui aparecem apenas
                parlamentares cujo voto
                individual foi retornado
                pela fonte oficial e
                identificado com BA. A
                ausência de um nome nesta
                lista não recebe uma
                explicação automática.
              </p>

              {erroVotos ? (
                <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[11px] font-bold text-rose-700">
                  {erroVotos}
                </div>
              ) : votosBahia.length ===
                0 ? (
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] leading-5 text-slate-600">
                    Esta consulta não
                    retornou votos
                    individuais
                    identificados com BA.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(
                      contagemVotos
                    ).map(
                      ([
                        tipo,
                        quantidade,
                      ]) => (
                        <span
                          key={tipo}
                          className={`rounded-md border px-3 py-2 text-[10px] font-extrabold ${corVoto(
                            tipo
                          )}`}
                        >
                          {quantidade}{" "}
                          {tipo.toUpperCase()}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                    {votosBahia.map(
                      (voto, index) => {
                        const deputado =
                          voto.deputado_;

                        const tipo =
                          textoSeguro(
                            voto.tipoVoto
                          ) ||
                          "Não informado";

                        return (
                          <div
                            key={`${deputado?.id}-${index}`}
                            className={`grid gap-2 px-4 py-3 sm:grid-cols-[1fr_130px_110px] sm:items-center ${
                              index > 0
                                ? "border-t border-slate-200"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {deputado?.urlFoto ? (
                                <img
                                  src={
                                    deputado.urlFoto
                                  }
                                  alt=""
                                  className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                                />
                              ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[9px] font-extrabold text-blue-700">
                                  BA
                                </div>
                              )}

                              <span className="text-[11px] font-extrabold text-blue-950">
                                {deputado?.nome ||
                                  "Nome não informado"}
                              </span>
                            </div>

                            <span className="text-[10px] font-bold text-slate-500">
                              {deputado?.siglaPartido ||
                                "Partido não informado"}
                            </span>

                            <span
                              className={`w-fit rounded-md border px-2 py-1 text-[9px] font-extrabold ${corVoto(
                                tipo
                              )}`}
                            >
                              {tipo.toUpperCase()}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MateriaCard({
  materia,
}: {
  materia: MateriaAgrupada;
}) {
  const [aberta, setAberta] =
    useState(false);

  const [carregando, setCarregando] =
    useState(false);

  const [erro, setErro] =
    useState("");

  const [detalhes, setDetalhes] =
    useState<DadosProposicao | null>(
      null
    );

  const [autores, setAutores] =
    useState<Autor[]>([]);

  const [temas, setTemas] =
    useState<Tema[]>([]);

  async function abrirMateria() {
    if (aberta) {
      setAberta(false);
      return;
    }

    setAberta(true);

    if (detalhes) {
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      const id =
        materia.proposicao.id;

      const [
        respostaDetalhes,
        respostaAutores,
        respostaTemas,
      ] = await Promise.all([
        fetch(
          `/api/camara/proposicoes/${id}`
        ),
        fetch(
          `/api/camara/proposicoes/${id}/autores`
        ),
        fetch(
          `/api/camara/proposicoes/${id}/temas`
        ),
      ]);

      if (!respostaDetalhes.ok) {
        throw new Error(
          "Não foi possível consultar os detalhes desta matéria."
        );
      }

      const dadosDetalhes =
        await respostaDetalhes.json();

      const dadosAutores =
        respostaAutores.ok
          ? await respostaAutores.json()
          : { dados: [] };

      const dadosTemas =
        respostaTemas.ok
          ? await respostaTemas.json()
          : { dados: [] };

      setDetalhes(
        dadosDetalhes.dados ||
          dadosDetalhes.data ||
          dadosDetalhes ||
          null
      );

      setAutores(
        Array.isArray(
          dadosAutores.dados
        )
          ? dadosAutores.dados
          : []
      );

      setTemas(
        Array.isArray(
          dadosTemas.dados
        )
          ? dadosTemas.dados
          : []
      );
    } catch (erro) {
      console.error(erro);

      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível consultar esta matéria."
      );
    } finally {
      setCarregando(false);
    }
  }

  const votacoesPrincipais =
    materia.votacoes.filter(
      (votacao) => {
        const tipo =
          explicarDecisao(
            votacao
          ).tipo;

        return (
          tipo === "principal" ||
          tipo === "especifica"
        );
      }
    );

  const votacoesSecundarias =
    materia.votacoes.filter(
      (votacao) => {
        const tipo =
          explicarDecisao(
            votacao
          ).tipo;

        return (
          tipo === "procedimento" ||
          tipo === "tecnica" ||
          tipo === "nao-classificada"
        );
      }
    );

  const tipoPorExtenso =
    explicarTipoProposicao(
      materia.proposicao.siglaTipo
    );

  const ultimaData =
    [...materia.votacoes]
      .map(
        (votacao) =>
          votacao.dataHoraRegistro ||
          votacao.data
      )
      .filter(
        (data): data is string =>
          Boolean(data)
      )
      .sort()
      .reverse()[0];

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={abrirMateria}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-extrabold text-blue-700">
              {identificacaoProposicao(
                materia.proposicao
              )}
            </span>

            <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-extrabold text-emerald-700">
              {
                materia.votacoes
                  .length
              }{" "}
              {materia.votacoes
                .length === 1
                ? "decisão encontrada"
                : "decisões encontradas"}
            </span>

            {ultimaData && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-600">
                Última:{" "}
                {formatarData(
                  ultimaData
                )}
              </span>
            )}
          </div>

          {tipoPorExtenso && (
            <p className="mt-2 text-[9px] font-bold uppercase tracking-wide text-slate-400">
              {tipoPorExtenso}
            </p>
          )}

          <h3 className="mt-1 max-w-[790px] text-[15px] font-extrabold leading-6 text-blue-950">
            {materia.proposicao
              .ementa ||
              "Abra para entender esta matéria e as decisões registradas."}
          </h3>

          <p className="mt-2 text-[10px] font-bold text-blue-600">
            {aberta
              ? "Fechar informações"
              : "Entender a matéria e ver como votaram"}
          </p>
        </div>

        <span className="shrink-0 text-xl font-bold text-blue-600">
          {aberta ? "−" : "+"}
        </span>
      </button>

      {aberta && (
        <div className="border-t border-slate-200">
          {carregando ? (
            <div className="px-5 py-7 text-center">
              <p className="text-[11px] font-bold text-slate-500">
                Consultando informações
                oficiais...
              </p>
            </div>
          ) : erro ? (
            <div className="px-5 py-5">
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[11px] font-bold text-rose-700">
                {erro}
              </div>
            </div>
          ) : (
            <>
              <div className="bg-blue-950 px-5 py-5 text-white md:px-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                  Primeiro: o que é
                  esta matéria?
                </p>

                <p className="mt-2 max-w-[800px] text-[13px] leading-6 text-blue-50">
                  {detalhes?.ementaDetalhada ||
                    detalhes?.ementa ||
                    materia.proposicao
                      .ementa ||
                    "A fonte oficial não trouxe uma descrição para esta matéria."}
                </p>
              </div>

              <div className="grid border-b border-slate-200 md:grid-cols-3">
                <div className="px-5 py-4 md:px-6">
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                    Quem apresentou?
                  </p>

                  <p className="mt-1 text-[11px] font-extrabold text-blue-950">
                    {autores.length > 0
                      ? autores
                          .slice(0, 3)
                          .map(
                            (autor) =>
                              autor.nome
                          )
                          .filter(Boolean)
                          .join(", ")
                      : "Não informado nesta consulta"}
                  </p>
                </div>

                <div className="border-t border-slate-200 px-5 py-4 md:border-l md:border-t-0 md:px-6">
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                    Sobre qual assunto?
                  </p>

                  <p className="mt-1 text-[11px] font-extrabold text-blue-950">
                    {temas.length > 0
                      ? temas
                          .slice(0, 3)
                          .map(
                            (tema) =>
                              tema.tema
                          )
                          .filter(Boolean)
                          .join(", ")
                      : "Tema não informado"}
                  </p>
                </div>

                <div className="border-t border-slate-200 px-5 py-4 md:border-l md:border-t-0 md:px-6">
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                    Situação atual
                  </p>

                  <p className="mt-1 text-[11px] font-extrabold text-blue-950">
                    {detalhes
                      ?.statusProposicao
                      ?.descricaoSituacao ||
                      "Consulte o andamento oficial"}
                  </p>
                </div>
              </div>

              <div className="px-5 py-5 md:px-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-extrabold text-blue-700">
                    ?
                  </div>

                  <div>
                    <p className="text-[12px] font-extrabold text-blue-950">
                      O que foi decidido?
                    </p>

                    <p className="mt-1 max-w-[740px] text-[11px] leading-5 text-slate-600">
                      Esta matéria pode
                      ter passado por mais
                      de uma votação. Cada
                      cartão abaixo mostra
                      uma decisão
                      diferente. Abra a
                      decisão para ver o
                      resultado e, quando
                      houver registro
                      individual, os votos
                      dos deputados
                      federais eleitos
                      pela Bahia.
                    </p>
                  </div>
                </div>

                {votacoesPrincipais.length >
                  0 && (
                  <div className="mt-5">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                      Decisões para
                      entender primeiro
                    </p>

                    <div className="mt-2 space-y-2">
                      {votacoesPrincipais.map(
                        (
                          votacao,
                          index
                        ) => (
                          <VotacaoCard
                            key={
                              votacao.id ||
                              `principal-${index}`
                            }
                            votacao={
                              votacao
                            }
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                {votacoesSecundarias.length >
                  0 && (
                  <details className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <summary className="cursor-pointer px-4 py-3 text-[11px] font-extrabold text-blue-950">
                      Ver outras decisões
                      e etapas (
                      {
                        votacoesSecundarias.length
                      }
                      )
                    </summary>

                    <div className="space-y-2 border-t border-slate-200 p-3">
                      {votacoesSecundarias.map(
                        (
                          votacao,
                          index
                        ) => (
                          <VotacaoCard
                            key={
                              votacao.id ||
                              `secundaria-${index}`
                            }
                            votacao={
                              votacao
                            }
                          />
                        )
                      )}
                    </div>
                  </details>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/projetos-e-propostas/${materia.proposicao.id}`}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[10px] font-extrabold text-blue-700"
                  >
                    Ver página completa
                    da matéria →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </article>
  );
}

export default function ComoVotaramPage() {
  const [nivel, setNivel] =
    useState<Nivel>("brasil");

  const [busca, setBusca] =
    useState("");

  const [
    buscaAplicada,
    setBuscaAplicada,
  ] = useState("");

  const [pagina, setPagina] =
    useState(1);

  const [votacoes, setVotacoes] =
    useState<Votacao[]>([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  const [
    temProximaPagina,
    setTemProximaPagina,
  ] = useState(false);

  useEffect(() => {
    async function carregarVotacoes() {
      if (nivel !== "brasil") {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const parametros =
          new URLSearchParams();

        parametros.set(
          "pagina",
          String(pagina)
        );

        /*
          Buscamos um conjunto pequeno de votações.
          Os detalhes de cada votação são enriquecidos
          pela nossa rota interna.
        */
        parametros.set("itens", "20");

        const resposta = await fetch(
          `/api/camara/votacoes?${parametros.toString()}`
        );

        if (!resposta.ok) {
          throw new Error(
            "Não foi possível consultar as votações da Câmara."
          );
        }

        const resultado =
          await resposta.json();

        const dados =
          Array.isArray(
            resultado.votacoesComMateriaPrincipal
          )
            ? resultado.votacoesComMateriaPrincipal
            : Array.isArray(
                  resultado.dados
                )
              ? resultado.dados.filter(
                  (
                    votacao: Votacao
                  ) =>
                    Boolean(
                      votacao.proposicaoPrincipal
                    )
                )
              : [];

        setVotacoes(dados);

        const links =
          Array.isArray(resultado.links)
            ? resultado.links
            : [];

        setTemProximaPagina(
          links.some(
            (link: {
              rel?: string;
            }) =>
              link.rel === "next"
          )
        );
      } catch (erro) {
        console.error(erro);

        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as votações."
        );

        setVotacoes([]);
        setTemProximaPagina(false);
      } finally {
        setCarregando(false);
      }
    }

    carregarVotacoes();
  }, [nivel, pagina]);

  const materias =
    useMemo(() => {
      const agrupadas =
        agruparVotacoes(votacoes);

      const termo =
        normalizarTexto(
          buscaAplicada.trim()
        );

      if (!termo) {
        return agrupadas;
      }

      return agrupadas.filter(
        (materia) => {
          const identificacao =
            identificacaoProposicao(
              materia.proposicao
            );

          const texto =
            normalizarTexto(
              `${identificacao} ${
                materia.proposicao
                  .ementa || ""
              }`
            );

          return texto.includes(termo);
        }
      );
    }, [votacoes, buscaAplicada]);

  function pesquisar(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setBuscaAplicada(
      busca.trim()
    );
  }

  function limparBusca() {
    setBusca("");
    setBuscaAplicada("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-[15px] font-extrabold text-blue-950"
          >
            Observa Salvador
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-blue-700"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1000px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <span className="inline-flex rounded-md bg-violet-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-violet-700">
          COMO VOTARAM?
        </span>

        <h1 className="mt-4 max-w-[800px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Primeiro entenda o que
          estava sendo decidido.
          Depois veja como cada
          representante votou.
        </h1>

        <p className="mt-4 max-w-[760px] text-[14px] leading-6 text-slate-600">
          Aqui partimos de votações
          registradas pela Câmara dos
          Deputados e organizamos as
          decisões pela matéria a que
          elas estão relacionadas.
        </p>

        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4">
          <p className="text-[11px] font-extrabold text-blue-950">
            Por que uma matéria pode
            aparecer com várias
            decisões?
          </p>

          <p className="mt-1 max-w-[780px] text-[11px] leading-5 text-slate-600">
            Durante a análise de uma
            matéria, os deputados podem
            decidir sobre diferentes
            pontos: o conteúdo, mudanças
            no texto ou questões sobre
            como a análise deve
            continuar. Por isso,
            mostramos primeiro a matéria
            e depois cada decisão
            relacionada.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-5 md:px-8">
        <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          Onde aconteceu a decisão?
        </p>

        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
          {niveis.map(
            (item, index) => {
              const ativo =
                nivel === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setNivel(item.id);
                    setPagina(1);
                    setBusca("");
                    setBuscaAplicada("");
                  }}
                  className={`px-5 py-4 text-left ${
                    index > 0
                      ? "border-t border-slate-200 sm:border-l sm:border-t-0"
                      : ""
                  } ${
                    ativo
                      ? "bg-blue-950 text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="text-[13px] font-extrabold">
                    {item.titulo}
                  </p>

                  <p
                    className={`mt-1 text-[10px] ${
                      ativo
                        ? "text-blue-200"
                        : "text-slate-500"
                    }`}
                  >
                    {item.subtitulo}
                  </p>
                </button>
              );
            }
          )}
        </div>
      </section>

      {nivel !== "brasil" ? (
        <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-4 md:px-8">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-5">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
              {nivel === "salvador"
                ? "SALVADOR"
                : "BAHIA"}
            </p>

            <h2 className="mt-1 text-[18px] font-extrabold text-blue-950">
              {nivel === "salvador"
                ? "Votações dos vereadores de Salvador"
                : "Votações dos deputados estaduais da Bahia"}
            </h2>

            <p className="mt-2 max-w-[700px] text-[11px] leading-5 text-slate-600">
              Esta fonte ainda será
              integrada. Não vamos
              preencher votos
              manualmente nem misturar
              dados de instituições
              diferentes.
            </p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-4 md:px-8">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                  CÂMARA DOS DEPUTADOS
                </p>

                <h2 className="mt-1 text-[20px] font-extrabold text-blue-950">
                  Matérias com votações
                  registradas
                </h2>

                <p className="mt-1 max-w-[590px] text-[11px] leading-5 text-slate-600">
                  Cada matéria aparece
                  uma vez. Dentro dela,
                  reunimos as decisões
                  encontradas nesta
                  consulta.
                </p>
              </div>

              <form
                onSubmit={pesquisar}
                className="flex w-full gap-2 md:max-w-[410px]"
              >
                <input
                  type="text"
                  value={busca}
                  onChange={(event) =>
                    setBusca(
                      event.target.value
                    )
                  }
                  placeholder="Filtrar esta página..."
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3 text-[11px] outline-none focus:border-blue-400"
                />

                <button
                  type="submit"
                  className="rounded-lg bg-blue-950 px-4 py-3 text-[10px] font-extrabold text-white"
                >
                  Buscar
                </button>
              </form>
            </div>

            {buscaAplicada && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-blue-50 px-3 py-2">
                <p className="text-[10px] text-blue-800">
                  Filtrando esta página
                  por:{" "}
                  <strong>
                    {buscaAplicada}
                  </strong>
                </p>

                <button
                  type="button"
                  onClick={limparBusca}
                  className="shrink-0 text-[9px] font-extrabold text-blue-700"
                >
                  LIMPAR
                </button>
              </div>
            )}
          </div>

          {carregando ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white px-5 py-8 text-center">
              <p className="text-[11px] font-bold text-slate-500">
                Consultando votações e
                organizando as matérias...
              </p>
            </div>
          ) : erro ? (
            <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-5">
              <p className="text-[11px] font-extrabold text-rose-700">
                {erro}
              </p>
            </div>
          ) : materias.length === 0 ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white px-5 py-6 text-center">
              <p className="text-[11px] font-bold text-slate-500">
                {buscaAplicada
                  ? "Nenhuma matéria desta página corresponde ao filtro informado."
                  : "Nenhuma matéria com associação automática segura foi encontrada nesta página de votações."}
              </p>
            </div>
          ) : (
            <>
              <div className="mt-3 space-y-3">
                {materias.map(
                  (materia) => (
                    <MateriaCard
                      key={
                        materia
                          .proposicao.id
                      }
                      materia={materia}
                    />
                  )
                )}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <button
                  type="button"
                  disabled={
                    pagina === 1
                  }
                  onClick={() =>
                    setPagina(
                      (atual) =>
                        Math.max(
                          1,
                          atual - 1
                        )
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-extrabold text-blue-700 disabled:opacity-40"
                >
                  ← Anterior
                </button>

                <span className="text-[10px] font-bold text-slate-500">
                  Página de votações{" "}
                  {pagina}
                </span>

                <button
                  type="button"
                  disabled={
                    !temProximaPagina
                  }
                  onClick={() =>
                    setPagina(
                      (atual) =>
                        atual + 1
                    )
                  }
                  className="rounded-lg bg-blue-950 px-3 py-2 text-[10px] font-extrabold text-white disabled:opacity-40"
                >
                  Próxima →
                </button>
              </div>
            </>
          )}

          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-5 py-4">
            <p className="text-[9px] font-extrabold uppercase tracking-wide text-amber-800">
              SOBRE A BUSCA
            </p>

            <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-slate-700">
              Nesta primeira versão, a
              busca acima filtra apenas
              as matérias que já foram
              carregadas na página
              atual. Ela ainda não faz
              uma pesquisa completa em
              todo o histórico da
              Câmara.
            </p>
          </div>

          <div className="mt-3 rounded-xl bg-blue-950 px-5 py-4 text-white">
            <p className="text-[9px] font-extrabold uppercase tracking-wide text-blue-200">
              GUARDE ESTA IDEIA
            </p>

            <p className="mt-2 max-w-[760px] text-[12px] leading-5 text-blue-50">
              Antes de perguntar{" "}
              <strong>
                “como ele votou?”
              </strong>
              , descubra{" "}
              <strong>
                “o que exatamente
                estava sendo decidido?”
              </strong>
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-rose-100 bg-rose-50 px-5 py-4">
            <p className="text-[9px] font-extrabold uppercase tracking-wide text-rose-700">
              O OBSERVA SALVADOR NÃO
              DECIDE POR VOCÊ
            </p>

            <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-slate-700">
              O site não classifica um
              voto como certo ou errado.
              Mostramos o que estava
              sendo decidido, o registro
              disponível e a fonte para
              que cada pessoa forme sua
              própria opinião.
            </p>
          </div>
        </section>
      )}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-[13px] font-extrabold text-blue-950">
            Observa Salvador
          </p>

          <p className="text-[12px] text-slate-500">
            Entenda, acompanhe e
            fiscalize.
          </p>
        </div>
      </footer>
    </main>
  );
}