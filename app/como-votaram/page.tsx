"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";

type Proposicao = {
  id: number;
  uri?: string;
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
};

type Autor = {
  nome?: string;
  tipo?: string;
  codTipo?: number;
  uri?: string;
  ordemAssinatura?: number;
  proponente?: number;
};

type Tema = {
  codTema?: number;
  tema?: string;
  relevancia?: number;
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

type Deputado = {
  id?: number;
  uri?: string;
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

type DadosProposicao = {
  id?: number;
  uri?: string;
  siglaTipo?: string;
  numero?: number;
  ano?: number;
  ementa?: string;
  ementaDetalhada?: string;
  keywords?: string;
  descricaoTipo?: string;
  dataApresentacao?: string;
  statusProposicao?: {
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
  };
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

function identificacaoProposicao(proposicao: Proposicao) {
  const sigla = proposicao.siglaTipo || "Proposição";
  const numero = proposicao.numero || "";
  const ano = proposicao.ano || "";

  if (numero && ano) {
    return `${sigla} ${numero}/${ano}`;
  }

  return sigla;
}

function corVoto(voto?: string) {
  const valor = (voto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (valor === "sim" || valor === "favoravel") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (valor === "nao" || valor === "contrario") {
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

function explicarDecisao(votacao: Votacao) {
  const descricao = textoSeguro(votacao.descricao) || "";
  const objeto = textoSeguro(votacao.proposicaoObjeto) || "";

  const base = `${objeto} ${descricao}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (base.includes("urgencia")) {
    return {
      tipo: "procedimento",
      titulo: "Decisão sobre acelerar a análise",
      explicacao:
        "Os deputados decidiram se a análise deveria seguir com um tratamento de urgência. Isso não significa, por si só, aprovar ou rejeitar todo o conteúdo da proposta.",
      nomeOficial: objeto || "Requerimento de urgência",
    };
  }

  if (base.includes("retirada de pauta") || base.includes("retirada")) {
    return {
      tipo: "procedimento",
      titulo: "Decisão sobre retirar a matéria da análise naquele momento",
      explicacao:
        "A votação tratou de um pedido de retirada. Isso é diferente de uma decisão final sobre todo o conteúdo da proposta.",
      nomeOficial: objeto || null,
    };
  }

  if (base.includes("destaque")) {
    return {
      tipo: "especifica",
      titulo: "Decisão sobre uma parte específica",
      explicacao:
        "Foi separada uma questão específica para votação. Por isso, esse resultado não deve ser interpretado automaticamente como apoio ou rejeição à proposta inteira.",
      nomeOficial: objeto || "Destaque",
    };
  }

  if (base.includes("emenda")) {
    return {
      tipo: "especifica",
      titulo: "Decisão sobre uma alteração proposta no texto",
      explicacao:
        "A votação está relacionada a uma proposta de alteração do texto. O resultado deve ser entendido dentro dessa alteração específica.",
      nomeOficial: objeto || "Emenda",
    };
  }

  if (base.includes("parecer")) {
    return {
      tipo: "tecnica",
      titulo: "Decisão relacionada a um parecer",
      explicacao:
        "Um parecer apresenta uma análise e uma posição sobre uma matéria. Esta votação está relacionada a esse documento e não deve ser confundida automaticamente com a votação final da proposta.",
      nomeOficial: objeto || "Parecer",
    };
  }

  if (
    base.includes("redacao final") ||
    base.includes("redação final")
  ) {
    return {
      tipo: "principal",
      titulo: "Decisão sobre a redação final",
      explicacao:
        "Esta etapa trata do texto final preparado após as decisões anteriores. O registro oficial abaixo mostra o resultado dessa votação.",
      nomeOficial: objeto || "Redação final",
    };
  }

  return {
    tipo: "nao-classificada",
    titulo: "Outra decisão relacionada à proposta",
    explicacao:
      "O registro oficial indica uma votação relacionada a esta proposta, mas o Observa Salvador ainda não possui uma tradução automática validada para explicar com segurança o objeto exato dessa decisão.",
    nomeOficial: objeto || null,
  };
}

function extrairPlacar(descricao?: string) {
  if (!descricao) return [];

  const resultados: { nome: string; quantidade: string }[] = [];

  const padroes = [
    { nome: "Sim", regex: /Sim:\s*(\d+)/i },
    { nome: "Não", regex: /N[aã]o:\s*(\d+)/i },
    { nome: "Abstenção", regex: /Absten[cç][aã]o:\s*(\d+)/i },
    { nome: "Total", regex: /Total:\s*(\d+)/i },
  ];

  padroes.forEach((item) => {
    const encontrado = descricao.match(item.regex);

    if (encontrado?.[1]) {
      resultados.push({
        nome: item.nome,
        quantidade: encontrado[1],
      });
    }
  });

  return resultados;
}

function VotacaoCard({ votacao }: { votacao: Votacao }) {
  const [aberto, setAberto] = useState(false);
  const [votosAbertos, setVotosAbertos] = useState(false);
  const [carregandoVotos, setCarregandoVotos] = useState(false);
  const [erroVotos, setErroVotos] = useState("");
  const [votos, setVotos] = useState<VotoIndividual[]>([]);

  const explicacao = explicarDecisao(votacao);
  const placar = extrairPlacar(votacao.descricao);

  const votosBahia = useMemo(() => {
    return votos
      .filter((voto) => voto.deputado_?.siglaUf === "BA")
      .sort((a, b) =>
        (a.deputado_?.nome || "").localeCompare(
          b.deputado_?.nome || "",
          "pt-BR"
        )
      );
  }, [votos]);

  const contagemVotos = useMemo(() => {
    const resultado: Record<string, number> = {};

    votosBahia.forEach((voto) => {
      const tipo = textoSeguro(voto.tipoVoto) || "Outro";
      resultado[tipo] = (resultado[tipo] || 0) + 1;
    });

    return resultado;
  }, [votosBahia]);

  async function carregarVotos() {
    if (!votacao.id) return;

    if (votosAbertos) {
      setVotosAbertos(false);
      return;
    }

    if (votos.length > 0) {
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

      const resultado = await resposta.json();

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

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left md:px-5"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {formatarData(votacao.data) && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-600">
                {formatarData(votacao.data)}
              </span>
            )}

            {explicacao.tipo === "principal" && (
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-extrabold text-emerald-700">
                Decisão importante
              </span>
            )}

            {explicacao.tipo === "procedimento" && (
              <span className="rounded-md bg-amber-50 px-2 py-1 text-[9px] font-extrabold text-amber-800">
                Como a proposta será analisada
              </span>
            )}

            {explicacao.tipo === "especifica" && (
              <span className="rounded-md bg-violet-50 px-2 py-1 text-[9px] font-extrabold text-violet-700">
                Parte específica
              </span>
            )}

            {explicacao.tipo === "tecnica" && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-extrabold text-slate-600">
                Etapa técnica
              </span>
            )}
          </div>

          <h4 className="mt-2 text-[14px] font-extrabold leading-5 text-blue-950">
            {explicacao.titulo}
          </h4>

          <p className="mt-1 max-w-[700px] text-[11px] leading-5 text-slate-600">
            {explicacao.explicacao}
          </p>
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
                Resultado geral registrado pela Câmara
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {placar.map((item) => (
                  <span
                    key={item.nome}
                    className={`rounded-md border px-3 py-2 text-[10px] font-extrabold ${
                      item.nome === "Sim"
                        ? corVoto("Sim")
                        : item.nome === "Não"
                          ? corVoto("Não")
                          : item.nome === "Abstenção"
                            ? corVoto("Abstenção")
                            : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {item.quantidade} {item.nome.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {votacao.descricao && (
            <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                Registro oficial
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-700">
                {votacao.descricao}
              </p>

              {explicacao.nomeOficial && (
                <p className="mt-2 text-[10px] text-slate-500">
                  Nome ou identificação usada oficialmente:{" "}
                  <strong>{explicacao.nomeOficial}</strong>
                </p>
              )}
            </div>
          )}

          {votacao.id && (
            <button
              type="button"
              onClick={carregarVotos}
              disabled={carregandoVotos}
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
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                Representantes da Bahia
              </p>

              <h5 className="mt-1 text-[16px] font-extrabold text-blue-950">
                Votos individuais registrados
              </h5>

              <p className="mt-1 max-w-[720px] text-[10px] leading-5 text-slate-500">
                Mostramos apenas os registros individuais que a
                fonte oficial identifica com BA. A ausência de um
                nome não recebe uma explicação automática.
              </p>

              {erroVotos ? (
                <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[11px] font-bold text-rose-700">
                  {erroVotos}
                </div>
              ) : votosBahia.length === 0 ? (
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] leading-5 text-slate-600">
                    Esta consulta não retornou votos individuais
                    identificados com BA.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(contagemVotos).map(
                      ([tipo, quantidade]) => (
                        <span
                          key={tipo}
                          className={`rounded-md border px-3 py-2 text-[10px] font-extrabold ${corVoto(
                            tipo
                          )}`}
                        >
                          {quantidade} {tipo.toUpperCase()}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                    {votosBahia.map((voto, index) => {
                      const deputado = voto.deputado_;
                      const tipo =
                        textoSeguro(voto.tipoVoto) ||
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
                                src={deputado.urlFoto}
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
                    })}
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

function PropostaCard({ proposicao }: { proposicao: Proposicao }) {
  const [aberta, setAberta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const [detalhes, setDetalhes] =
    useState<DadosProposicao | null>(null);

  const [autores, setAutores] = useState<Autor[]>([]);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [votacoes, setVotacoes] = useState<Votacao[]>([]);

  async function abrirProposta() {
    if (aberta) {
      setAberta(false);
      return;
    }

    setAberta(true);

    if (detalhes) return;

    try {
      setCarregando(true);
      setErro("");

      const [
        respostaDetalhes,
        respostaAutores,
        respostaTemas,
        respostaVotacoes,
      ] = await Promise.all([
        fetch(`/api/camara/proposicoes/${proposicao.id}`),
        fetch(
          `/api/camara/proposicoes/${proposicao.id}/autores`
        ),
        fetch(
          `/api/camara/proposicoes/${proposicao.id}/temas`
        ),
        fetch(
          `/api/camara/proposicoes/${proposicao.id}/votacoes`
        ),
      ]);

      if (!respostaDetalhes.ok) {
        throw new Error(
          "Não foi possível consultar os detalhes desta proposta."
        );
      }

      const dadosDetalhes = await respostaDetalhes.json();

      const dadosAutores = respostaAutores.ok
        ? await respostaAutores.json()
        : { dados: [] };

      const dadosTemas = respostaTemas.ok
        ? await respostaTemas.json()
        : { dados: [] };

      const dadosVotacoes = respostaVotacoes.ok
        ? await respostaVotacoes.json()
        : { dados: [] };

      setDetalhes(
        dadosDetalhes.dados ||
          dadosDetalhes.data ||
          dadosDetalhes ||
          null
      );

      setAutores(
        Array.isArray(dadosAutores.dados)
          ? dadosAutores.dados
          : []
      );

      setTemas(
        Array.isArray(dadosTemas.dados)
          ? dadosTemas.dados
          : []
      );

      setVotacoes(
        Array.isArray(dadosVotacoes.dados)
          ? dadosVotacoes.dados
          : []
      );
    } catch (erro) {
      console.error(erro);

      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível consultar esta proposta."
      );
    } finally {
      setCarregando(false);
    }
  }

  const votacoesPrincipais = votacoes.filter((votacao) => {
    const tipo = explicarDecisao(votacao).tipo;

    return (
      tipo === "principal" ||
      tipo === "procedimento" ||
      tipo === "especifica"
    );
  });

  const outrasVotacoes = votacoes.filter((votacao) => {
    const tipo = explicarDecisao(votacao).tipo;

    return (
      tipo === "tecnica" ||
      tipo === "nao-classificada"
    );
  });

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={abrirProposta}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-extrabold text-blue-700">
              {identificacaoProposicao(proposicao)}
            </span>

            <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-extrabold text-emerald-700">
              Fonte oficial
            </span>
          </div>

          <h3 className="mt-2 text-[15px] font-extrabold leading-5 text-blue-950">
            {proposicao.ementa ||
              "Consulte os detalhes desta proposta"}
          </h3>

          <p className="mt-2 text-[10px] font-bold text-blue-600">
            {aberta
              ? "Fechar informações"
              : "Entender a proposta e ver as votações"}
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
                Consultando informações oficiais...
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
                  Primeiro: o que é esta proposta?
                </p>

                <p className="mt-2 max-w-[780px] text-[13px] leading-6 text-blue-50">
                  {detalhes?.ementaDetalhada ||
                    detalhes?.ementa ||
                    proposicao.ementa ||
                    "A fonte oficial não trouxe uma descrição para esta proposta."}
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
                          .map((autor) => autor.nome)
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
                          .map((tema) => tema.tema)
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
                    {detalhes?.statusProposicao?.descricaoSituacao ||
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
                      Agora sim: o que foi votado?
                    </p>

                    <p className="mt-1 max-w-[720px] text-[11px] leading-5 text-slate-600">
                      Uma mesma proposta pode passar por várias
                      decisões. Por isso, mostramos cada votação
                      separadamente e explicamos o que estava sendo
                      decidido antes de mostrar os votos.
                    </p>
                  </div>
                </div>

                {votacoes.length === 0 ? (
                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-[11px] font-extrabold text-blue-950">
                      Nenhuma votação foi encontrada para esta
                      proposta nesta consulta.
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      Isso não significa que a proposta foi aprovada
                      ou rejeitada. Significa apenas que não
                      encontramos uma votação relacionada neste
                      conjunto de dados.
                    </p>
                  </div>
                ) : (
                  <>
                    {votacoesPrincipais.length > 0 && (
                      <div className="mt-5">
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                          Decisões para entender primeiro
                        </p>

                        <div className="mt-2 space-y-2">
                          {votacoesPrincipais.map(
                            (votacao, index) => (
                              <VotacaoCard
                                key={
                                  votacao.id ||
                                  `principal-${index}`
                                }
                                votacao={votacao}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {outrasVotacoes.length > 0 && (
                      <details className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        <summary className="cursor-pointer px-4 py-3 text-[11px] font-extrabold text-blue-950">
                          Ver outras decisões e etapas técnicas (
                          {outrasVotacoes.length})
                        </summary>

                        <div className="space-y-2 border-t border-slate-200 p-3">
                          {outrasVotacoes.map(
                            (votacao, index) => (
                              <VotacaoCard
                                key={
                                  votacao.id ||
                                  `outra-${index}`
                                }
                                votacao={votacao}
                              />
                            )
                          )}
                        </div>
                      </details>
                    )}
                  </>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/projetos-e-propostas/${proposicao.id}`}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[10px] font-extrabold text-blue-700"
                  >
                    Ver página completa da proposta →
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
  const [nivel, setNivel] = useState<Nivel>("brasil");
  const [busca, setBusca] = useState("");
  const [buscaAplicada, setBuscaAplicada] = useState("");
  const [pagina, setPagina] = useState(1);
  const [proposicoes, setProposicoes] = useState<Proposicao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProposicoes() {
      if (nivel !== "brasil") return;

      try {
        setCarregando(true);
        setErro("");

        const parametros = new URLSearchParams();

        parametros.set("pagina", String(pagina));
        parametros.set("itens", "15");

        if (buscaAplicada.trim()) {
          parametros.set("busca", buscaAplicada.trim());
        }

        const resposta = await fetch(
          `/api/camara/proposicoes?${parametros.toString()}`
        );

        if (!resposta.ok) {
          throw new Error(
            "Não foi possível consultar as propostas da Câmara."
          );
        }

        const resultado = await resposta.json();

        setProposicoes(
          Array.isArray(resultado.dados)
            ? resultado.dados
            : []
        );
      } catch (erro) {
        console.error(erro);

        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as propostas."
        );

        setProposicoes([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarProposicoes();
  }, [nivel, pagina, buscaAplicada]);

  function pesquisar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPagina(1);
    setBuscaAplicada(busca);
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

        <h1 className="mt-4 max-w-[780px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Primeiro entenda a proposta. Depois veja como cada
          representante votou.
        </h1>

        <p className="mt-4 max-w-[760px] text-[14px] leading-6 text-slate-600">
          Procure uma proposta ou assunto. O Observa Salvador
          mostra o que estava sendo discutido, quais decisões
          ocorreram e, quando existe registro individual, como
          votaram os representantes.
        </p>

        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4">
          <p className="text-[11px] font-extrabold text-blue-950">
            Por que fazemos assim?
          </p>

          <p className="mt-1 max-w-[760px] text-[11px] leading-5 text-slate-600">
            Um deputado pode votar várias vezes durante a análise
            de uma mesma proposta. Uma votação pode decidir sobre
            o texto, uma alteração ou até sobre a forma como a
            proposta será analisada. Por isso, um simples
            “SIM” ou “NÃO” sem contexto pode confundir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-5 md:px-8">
        <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          Onde aconteceu a decisão?
        </p>

        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
          {niveis.map((item, index) => {
            const ativo = nivel === item.id;

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
                    ativo ? "text-blue-200" : "text-slate-500"
                  }`}
                >
                  {item.subtitulo}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {nivel !== "brasil" ? (
        <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-4 md:px-8">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-5">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
              {nivel === "salvador" ? "SALVADOR" : "BAHIA"}
            </p>

            <h2 className="mt-1 text-[18px] font-extrabold text-blue-950">
              {nivel === "salvador"
                ? "Votações dos vereadores de Salvador"
                : "Votações dos deputados estaduais da Bahia"}
            </h2>

            <p className="mt-2 max-w-[700px] text-[11px] leading-5 text-slate-600">
              Esta fonte ainda será integrada. Não vamos preencher
              votos manualmente nem misturar dados de instituições
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
                  Procure uma proposta
                </h2>

                <p className="mt-1 max-w-[590px] text-[11px] leading-5 text-slate-600">
                  Você pode procurar pelo assunto ou pela
                  identificação da proposta.
                </p>
              </div>

              <form
                onSubmit={pesquisar}
                className="flex w-full gap-2 md:max-w-[410px]"
              >
                <input
                  type="text"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Ex.: segurança, saúde, educação..."
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
              <div className="mt-3 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                <p className="text-[10px] text-blue-800">
                  Buscando por:{" "}
                  <strong>{buscaAplicada}</strong>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setBusca("");
                    setBuscaAplicada("");
                    setPagina(1);
                  }}
                  className="text-[9px] font-extrabold text-blue-700"
                >
                  LIMPAR
                </button>
              </div>
            )}
          </div>

          {carregando ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white px-5 py-8 text-center">
              <p className="text-[11px] font-bold text-slate-500">
                Consultando propostas...
              </p>
            </div>
          ) : erro ? (
            <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-5">
              <p className="text-[11px] font-extrabold text-rose-700">
                {erro}
              </p>
            </div>
          ) : proposicoes.length === 0 ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white px-5 py-6 text-center">
              <p className="text-[11px] font-bold text-slate-500">
                Nenhuma proposta encontrada nesta consulta.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-3 space-y-3">
                {proposicoes.map((proposicao) => (
                  <PropostaCard
                    key={proposicao.id}
                    proposicao={proposicao}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <button
                  type="button"
                  disabled={pagina === 1}
                  onClick={() =>
                    setPagina((atual) => Math.max(1, atual - 1))
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-extrabold text-blue-700 disabled:opacity-40"
                >
                  ← Anterior
                </button>

                <span className="text-[10px] font-bold text-slate-500">
                  Página {pagina}
                </span>

                <button
                  type="button"
                  disabled={proposicoes.length < 15}
                  onClick={() => setPagina((atual) => atual + 1)}
                  className="rounded-lg bg-blue-950 px-3 py-2 text-[10px] font-extrabold text-white disabled:opacity-40"
                >
                  Próxima →
                </button>
              </div>
            </>
          )}

          <div className="mt-4 rounded-xl bg-blue-950 px-5 py-4 text-white">
            <p className="text-[9px] font-extrabold uppercase tracking-wide text-blue-200">
              GUARDE ESTA IDEIA
            </p>

            <p className="mt-2 max-w-[760px] text-[12px] leading-5 text-blue-50">
              Antes de perguntar{" "}
              <strong>“como ele votou?”</strong>, descubra{" "}
              <strong>
                “o que exatamente estava sendo decidido?”
              </strong>
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-rose-100 bg-rose-50 px-5 py-4">
            <p className="text-[9px] font-extrabold uppercase tracking-wide text-rose-700">
              O OBSERVA SALVADOR NÃO DECIDE POR VOCÊ
            </p>

            <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-slate-700">
              O site não classifica um voto como certo ou errado.
              Mostramos o que estava sendo decidido, o registro
              disponível e a fonte para que cada pessoa forme sua
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
            Entenda, acompanhe e fiscalize.
          </p>
        </div>
      </footer>
    </main>
  );
}