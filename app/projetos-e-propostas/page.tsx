"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";

type Proposicao = {
  id: number;
  uri: string;
  siglaTipo: string;
  codTipo: number;
  numero: number;
  ano: number;
  ementa: string;
  dataApresentacao?: string;
};

type RespostaAPI = {
  fonte: string;
  atualizadoEm: string;
  dados: Proposicao[];
  links: {
    rel: string;
    href: string;
  }[];
};

const niveis = [
  {
    id: "salvador" as Nivel,
    titulo: "Salvador",
    subtitulo: "Câmara Municipal",
  },
  {
    id: "bahia" as Nivel,
    titulo: "Bahia",
    subtitulo: "Assembleia Legislativa",
  },
  {
    id: "brasil" as Nivel,
    titulo: "Brasil",
    subtitulo: "Câmara dos Deputados",
  },
];

function nomeTipo(sigla: string) {
  const tipos: Record<string, string> = {
    PL: "Projeto de Lei",
    PLP: "Projeto de Lei Complementar",
    PEC: "Proposta de Emenda à Constituição",
    PDL: "Projeto de Decreto Legislativo",
    PRC: "Projeto de Resolução",
    MPV: "Medida Provisória",
    REQ: "Requerimento",
    RIC: "Pedido de Informação",
  };

  return tipos[sigla] || sigla;
}

function formatarData(data?: string) {
  if (!data) return null;

  const dataFormatada = new Date(data);

  if (Number.isNaN(dataFormatada.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dataFormatada);
}

export default function ProjetosEPropostas() {
  const [nivel, setNivel] = useState<Nivel>("brasil");

  const [proposicoes, setProposicoes] = useState<Proposicao[]>([]);
  const [buscaDigitada, setBuscaDigitada] = useState("");
  const [buscaAplicada, setBuscaAplicada] = useState("");

  const [pagina, setPagina] = useState(1);
  const [temProximaPagina, setTemProximaPagina] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState("");

  const [explicacaoAberta, setExplicacaoAberta] = useState(true);

  async function carregarProposicoes(
    numeroPagina: number,
    busca: string,
    adicionar = false
  ) {
    try {
      if (adicionar) {
        setCarregandoMais(true);
      } else {
        setCarregando(true);
      }

      setErro("");

      const parametros = new URLSearchParams({
        pagina: String(numeroPagina),
        itens: "20",
      });

      if (busca.trim()) {
        parametros.set("busca", busca.trim());
      }

      const resposta = await fetch(
        `/api/camara/proposicoes?${parametros.toString()}`
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os dados.");
      }

      const dados: RespostaAPI = await resposta.json();

      if (adicionar) {
        setProposicoes((anteriores) => [
          ...anteriores,
          ...(dados.dados || []),
        ]);
      } else {
        setProposicoes(dados.dados || []);
      }

      setTemProximaPagina(
        (dados.links || []).some((link) => link.rel === "next")
      );
    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível consultar os dados da Câmara dos Deputados neste momento."
      );
    } finally {
      setCarregando(false);
      setCarregandoMais(false);
    }
  }

  useEffect(() => {
    carregarProposicoes(1, "", false);
  }, []);

  function pesquisar() {
    const termo = buscaDigitada.trim();

    setBuscaAplicada(termo);
    setPagina(1);

    carregarProposicoes(1, termo, false);
  }

  function limparPesquisa() {
    setBuscaDigitada("");
    setBuscaAplicada("");
    setPagina(1);

    carregarProposicoes(1, "", false);
  }

  function carregarMais() {
    const proximaPagina = pagina + 1;

    setPagina(proximaPagina);

    carregarProposicoes(
      proximaPagina,
      buscaAplicada,
      true
    );
  }

  function pesquisarTema(tema: string) {
    setBuscaDigitada(tema);
    setBuscaAplicada(tema);
    setPagina(1);

    carregarProposicoes(1, tema, false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1050px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-[15px] font-extrabold text-blue-950"
          >
            Observa Salvador
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1050px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-cyan-700">
          PROJETOS E PROPOSTAS
        </span>

        <h1 className="mt-4 max-w-[820px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Descubra o que está sendo proposto antes de virar regra.
        </h1>

        <p className="mt-4 max-w-[760px] text-[15px] leading-6 text-slate-600">
          Pesquise propostas, entenda o que está sendo discutido e acompanhe o
          caminho de cada uma.
        </p>
      </section>

      {/* NÃO CONFUNDA */}
      <section className="mx-auto max-w-[1050px] px-5 md:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 md:px-6">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
            NÃO CONFUNDA
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="rounded-md bg-white px-3 py-2 text-[12px] font-extrabold text-blue-950">
              Uma proposta foi apresentada
            </span>

            <span className="hidden font-bold text-amber-600 sm:block">≠</span>

            <span className="rounded-md bg-white px-3 py-2 text-[12px] font-extrabold text-blue-950">
              A proposta virou lei
            </span>
          </div>

          <p className="mt-3 max-w-[780px] text-[11px] leading-5 text-slate-700">
            Apresentar uma proposta é apenas o começo. Ela ainda pode passar
            por análise, mudanças e votações antes de existir um resultado.
          </p>
        </div>
      </section>

      {/* EXPLICAÇÃO */}
      <section className="mx-auto max-w-[1050px] px-5 pt-3 md:px-8">
        <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
          <button
            type="button"
            onClick={() => setExplicacaoAberta(!explicacaoAberta)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                COMECE POR AQUI
              </p>

              <p className="mt-1 text-[14px] font-extrabold text-blue-950">
                Nem tudo que aparece aqui é um projeto de lei
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              {explicacaoAberta ? "−" : "+"}
            </span>
          </button>

          {explicacaoAberta && (
            <div className="border-t border-slate-200 px-5 py-5 md:px-6">
              <p className="max-w-[780px] text-[12px] leading-5 text-slate-700">
                Na Câmara existem vários tipos de propostas e documentos. Um
                deputado pode apresentar um projeto de lei, pedir informações,
                fazer um requerimento ou participar de outros procedimentos.
              </p>

              <div className="mt-4 border-l-2 border-blue-400 pl-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                  Agora aprenda o nome
                </p>

                <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                  Proposição
                </p>

                <p className="mt-1 max-w-[720px] text-[11px] leading-5 text-slate-600">
                  É um nome usado pela Câmara para diferentes tipos de
                  propostas e documentos apresentados no processo legislativo.
                </p>

                <p className="mt-2 text-[11px] font-bold text-blue-700">
                  Projeto de lei é um tipo de proposição, mas nem toda
                  proposição é um projeto de lei.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* NÍVEIS */}
      <section className="mx-auto max-w-[1050px] px-5 pt-8 md:px-8">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          Onde você quer pesquisar?
        </p>

        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
          {niveis.map((item, index) => {
            const ativo = nivel === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setNivel(item.id)}
                className={`px-5 py-4 text-left transition ${
                  index !== 0
                    ? "border-t border-slate-200 sm:border-l sm:border-t-0"
                    : ""
                } ${
                  ativo
                    ? "bg-blue-950 text-white"
                    : "hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-[14px] font-extrabold ${
                    ativo ? "text-white" : "text-blue-950"
                  }`}
                >
                  {item.titulo}
                </p>

                <p
                  className={`mt-0.5 text-[11px] ${
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

      {/* SALVADOR E BAHIA */}
      {nivel !== "brasil" && (
        <section className="mx-auto max-w-[1050px] px-5 pb-12 pt-5 md:px-8">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-6 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
              {nivel === "salvador" ? "SALVADOR" : "BAHIA"}
            </p>

            <h2 className="mt-1 text-[20px] font-extrabold text-blue-950">
              {nivel === "salvador"
                ? "Propostas da Câmara Municipal de Salvador"
                : "Propostas da Assembleia Legislativa da Bahia"}
            </h2>

            <p className="mt-2 max-w-[720px] text-[12px] leading-5 text-slate-600">
              A integração automática desta fonte ainda será construída. Não
              vamos misturar dados da Câmara dos Deputados com decisões
              municipais ou estaduais.
            </p>
          </div>
        </section>
      )}

      {/* BRASIL */}
      {nivel === "brasil" && (
        <>
          {/* BUSCA */}
          <section className="mx-auto max-w-[1050px] px-5 pt-5 md:px-8">
            <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                    PESQUISAR NA CÂMARA DOS DEPUTADOS
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Os resultados abaixo vêm da base oficial da Câmara.
                  </p>
                </div>

                <span className="rounded-md bg-emerald-50 px-2.5 py-1.5 text-[9px] font-extrabold uppercase text-emerald-700">
                  Dados oficiais
                </span>
              </div>

              <form
                className="mt-4 flex flex-col gap-2 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  pesquisar();
                }}
              >
                <input
                  type="text"
                  value={buscaDigitada}
                  onChange={(event) =>
                    setBuscaDigitada(event.target.value)
                  }
                  placeholder="Ex.: transporte, iluminação, imposto..."
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[12px] outline-none transition placeholder:text-slate-400 focus:border-blue-400"
                />

                <button
                  type="submit"
                  disabled={carregando}
                  className="rounded-lg bg-blue-950 px-5 py-3 text-[11px] font-extrabold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Pesquisar
                </button>

                {buscaAplicada && (
                  <button
                    type="button"
                    onClick={limparPesquisa}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Limpar
                  </button>
                )}
              </form>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Saúde",
                  "Transporte",
                  "Segurança",
                  "Educação",
                  "Impostos",
                  "Habitação",
                ].map((tema) => (
                  <button
                    key={tema}
                    type="button"
                    onClick={() => pesquisarTema(tema)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {tema}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* RESULTADOS */}
          <section className="mx-auto max-w-[1050px] px-5 pb-12 pt-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                  RESULTADOS
                </p>

                <h2 className="mt-1 text-[18px] font-extrabold text-blue-950">
                  {buscaAplicada
                    ? `Resultados para “${buscaAplicada}”`
                    : "Proposições recentes"}
                </h2>
              </div>

              {!carregando && !erro && (
                <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
                  {proposicoes.length} carregadas
                </span>
              )}
            </div>

            {carregando && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-8 text-center">
                <p className="text-[12px] font-extrabold text-blue-950">
                  Consultando a Câmara dos Deputados...
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Estamos buscando os registros oficiais.
                </p>
              </div>
            )}

            {!carregando && erro && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-5 py-5">
                <p className="text-[12px] font-extrabold text-rose-800">
                  Não conseguimos carregar os dados.
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-600">
                  {erro}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    carregarProposicoes(1, buscaAplicada, false)
                  }
                  className="mt-3 rounded-lg bg-white px-3 py-2 text-[10px] font-extrabold text-blue-700"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!carregando && !erro && proposicoes.length === 0 && (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
                <p className="text-[12px] font-extrabold text-blue-950">
                  Nenhum resultado encontrado.
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Tente pesquisar outra palavra.
                </p>
              </div>
            )}

            {!carregando && !erro && proposicoes.length > 0 && (
              <>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {proposicoes.map((proposicao, index) => {
                    const data = formatarData(
                      proposicao.dataApresentacao
                    );

                    return (
                      <article
                        key={proposicao.id}
                        className={`px-5 py-4 md:px-6 ${
                          index !== 0
                            ? "border-t border-slate-200"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 max-w-[790px]">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-extrabold text-blue-700">
                                {nomeTipo(proposicao.siglaTipo)}
                              </span>

                              <span className="text-[10px] font-extrabold text-slate-500">
                                {proposicao.siglaTipo}{" "}
                                {proposicao.numero}/{proposicao.ano}
                              </span>

                              {data && (
                                <span className="text-[10px] text-slate-400">
                                  Apresentada em {data}
                                </span>
                              )}
                            </div>

                            <h3 className="mt-3 text-[12px] font-extrabold uppercase tracking-wide text-slate-400">
                              O que diz o registro oficial
                            </h3>

                            <p className="mt-1 text-[12px] leading-5 text-slate-700">
                              {proposicao.ementa ||
                                "A fonte consultada não apresentou uma descrição neste resultado."}
                            </p>

                            <p className="mt-3 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                              Fonte: Câmara dos Deputados
                            </p>
                          </div>

                          <Link
                            href={`/projetos-e-propostas/${proposicao.id}`}
                            className="shrink-0 rounded-lg border border-blue-200 bg-white px-3 py-2 text-center text-[10px] font-extrabold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                          >
                            Entender proposta →
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {temProximaPagina && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={carregarMais}
                      disabled={carregandoMais}
                      className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-[11px] font-extrabold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {carregandoMais
                        ? "Carregando..."
                        : "Carregar mais resultados"}
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="mt-5 rounded-xl border border-cyan-100 bg-cyan-50 px-5 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-cyan-800">
                ESTAMOS CONSTRUINDO A LEITURA COMPLETA
              </p>

              <p className="mt-2 max-w-[800px] text-[11px] leading-5 text-slate-700">
                Esta página já consulta proposições reais da Câmara dos
                Deputados e permite abrir cada registro individualmente. Nas
                próximas etapas, vamos conectar autoria, temas, caminho da
                proposta e votações relacionadas.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-5 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-rose-700">
                INFORMAÇÃO PARA VOCÊ FORMAR SUA PRÓPRIA OPINIÃO
              </p>

              <p className="mt-2 max-w-[800px] text-[11px] leading-5 text-slate-700">
                O Observa Salvador apresenta informações verificáveis,
                contexto e fontes. A plataforma não escolhe uma posição
                política pelo cidadão nem recomenda em quem votar.
              </p>
            </div>
          </section>
        </>
      )}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1050px] flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
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