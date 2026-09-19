"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";
type Voto = "Sim" | "Não";

type Parlamentar = {
  nome: string;
  partido: string;
  voto: Voto;
};

const niveis = [
  { id: "salvador" as Nivel, titulo: "Salvador", subtitulo: "Vereadores" },
  {
    id: "bahia" as Nivel,
    titulo: "Bahia",
    subtitulo: "Deputados estaduais",
  },
  {
    id: "brasil" as Nivel,
    titulo: "Brasil",
    subtitulo: "Deputados federais e senadores",
  },
];

const votosBahia: Parlamentar[] = [
  { nome: "Adolfo Viana", partido: "PSDB", voto: "Sim" },
  { nome: "Afonso Florence", partido: "PT", voto: "Não" },
  { nome: "Alice Portugal", partido: "PCdoB", voto: "Sim" },
  { nome: "Arthur Oliveira Maia", partido: "União", voto: "Sim" },
  { nome: "Bacelar", partido: "PV", voto: "Não" },
  { nome: "Capitão Alden", partido: "PL", voto: "Sim" },
  { nome: "Charles Fernandes", partido: "PSD", voto: "Sim" },
  { nome: "Claudio Cajado", partido: "PP", voto: "Sim" },
  { nome: "Dal Barreto", partido: "União", voto: "Sim" },
  { nome: "Daniel Almeida", partido: "PCdoB", voto: "Não" },
  { nome: "Diego Coronel", partido: "Republicanos", voto: "Sim" },
  { nome: "Félix Mendonça Júnior", partido: "PDT", voto: "Não" },
  { nome: "Gabriel Nunes", partido: "PSD", voto: "Sim" },
  { nome: "Ivoneide Caetano", partido: "PT", voto: "Não" },
  { nome: "Jorge Solla", partido: "PT", voto: "Não" },
  { nome: "José Carlos Araújo", partido: "PDT", voto: "Não" },
  { nome: "José Rocha", partido: "União", voto: "Sim" },
  { nome: "Joseildo Ramos", partido: "PT", voto: "Não" },
  { nome: "Marcelo Nilo", partido: "Republicanos", voto: "Sim" },
  { nome: "Márcio Marinho", partido: "Republicanos", voto: "Sim" },
  { nome: "Mário Negromonte Jr.", partido: "PSB", voto: "Não" },
  { nome: "Neto Carletto", partido: "Avante", voto: "Sim" },
  { nome: "Pastor Sargento Isidório", partido: "Avante", voto: "Sim" },
  { nome: "Paulo Azi", partido: "União", voto: "Sim" },
  { nome: "Paulo Magalhães", partido: "PSD", voto: "Sim" },
  { nome: "Rogéria Santos", partido: "Republicanos", voto: "Sim" },
  { nome: "Sérgio Brito", partido: "PSD", voto: "Não" },
  { nome: "Valmir Assunção", partido: "PT", voto: "Não" },
  { nome: "Waldenor Pereira", partido: "PT", voto: "Não" },
  { nome: "Zé Neto", partido: "PT", voto: "Não" },
];

const fonteVotacao =
  "https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?codCasa=1&ideVotacao=13821&indTipoSessao=E&indTipoSessaoLegislativa=O&numLegislatura=57&numSessao=131&numSessaoLegislativa=4&tipo=uf";

const fonteProposta =
  "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2606189";

export default function ComoVotaram() {
  const [nivel, setNivel] = useState<Nivel>("brasil");
  const [entendaAberto, setEntendaAberto] = useState(true);
  const [registroAberto, setRegistroAberto] = useState(false);
  const [votacaoAberta, setVotacaoAberta] = useState(true);
  const [detalhesAbertos, setDetalhesAbertos] = useState(false);
  const [busca, setBusca] = useState("");

  const votosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    if (!termo) return votosBahia;

    return votosBahia.filter(
      (item) =>
        item.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
        item.partido.toLocaleLowerCase("pt-BR").includes(termo)
    );
  }, [busca]);

  const quantidadeSim = votosBahia.filter(
    (item) => item.voto === "Sim"
  ).length;

  const quantidadeNao = votosBahia.filter(
    (item) => item.voto === "Não"
  ).length;

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
            className="text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1000px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <span className="inline-flex rounded-md bg-violet-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-violet-700">
          COMO VOTARAM?
        </span>

        <h1 className="mt-4 max-w-[780px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Entenda a decisão antes de olhar o voto.
        </h1>

        <p className="mt-4 max-w-[750px] text-[15px] leading-6 text-slate-600">
          Aqui você descobre o que estava sendo decidido, o que cada opção
          significava e, quando existe registro oficial, como cada
          representante votou.
        </p>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-[1000px] px-5 md:px-8">
        <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
          <button
            type="button"
            onClick={() => setEntendaAberto(!entendaAberto)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                COMECE POR AQUI
              </p>

              <p className="mt-1 text-[15px] font-extrabold text-blue-950">
                Como uma votação funciona?
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              {entendaAberto ? "−" : "+"}
            </span>
          </button>

          {entendaAberto && (
            <div className="border-t border-slate-200 px-5 py-5 md:px-6">
              <p className="max-w-[760px] text-[13px] leading-6 text-slate-700">
                Vereadores, deputados e senadores participam de várias decisões.
                Mas nem toda votação significa simplesmente ser a favor ou
                contra um projeto inteiro.
              </p>

              <div className="mt-5 grid gap-2 md:grid-cols-4">
                {[
                  [
                    "1",
                    "Existe um assunto",
                    "Uma proposta ou outra decisão precisa ser analisada.",
                  ],
                  [
                    "2",
                    "Existe uma pergunta",
                    "É preciso saber exatamente o que está sendo decidido naquele momento.",
                  ],
                  [
                    "3",
                    "Cada voto tem um sentido",
                    "SIM e NÃO respondem àquela decisão específica.",
                  ],
                  [
                    "4",
                    "Conferimos a fonte",
                    "O Observa Salvador mostra o registro oficial disponível.",
                  ],
                ].map(([numero, titulo, texto]) => (
                  <div
                    key={numero}
                    className={`rounded-lg px-4 py-3 ${
                      numero === "4" ? "bg-blue-50" : "bg-slate-50"
                    }`}
                  >
                    <span className="text-[10px] font-extrabold text-blue-600">
                      {numero}
                    </span>

                    <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                      {titulo}
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      {texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* EXPLICAÇÃO DO REGISTRO */}
      <section className="mx-auto max-w-[1000px] px-5 pt-3 md:px-8">
        <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
          <button
            type="button"
            onClick={() => setRegistroAberto(!registroAberto)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
                UMA DIFERENÇA IMPORTANTE
              </p>

              <p className="mt-1 text-[14px] font-extrabold text-blue-950">
                Dá para saber como cada representante votou?
              </p>
            </div>

            <span className="text-xl font-bold text-amber-700">
              {registroAberto ? "−" : "+"}
            </span>
          </button>

          {registroAberto && (
            <div className="border-t border-amber-200 px-5 py-5 md:px-6">
              <p className="max-w-[760px] text-[12px] leading-5 text-slate-700">
                Depende. Em algumas votações, o voto fica registrado junto ao
                nome de cada pessoa. Em outras, o resultado pode existir sem uma
                lista mostrando o voto individual de todos.
              </p>

              <div className="mt-4 rounded-lg bg-white px-4 py-4">
                <p className="text-[12px] font-extrabold text-blue-950">
                  Quando conseguimos ligar o voto ao nome
                </p>

                <p className="mt-2 text-[11px] leading-5 text-slate-600">
                  Podemos consultar quem registrou SIM, quem registrou NÃO e
                  outros registros daquela decisão.
                </p>

                <div className="mt-3 border-l-2 border-blue-400 pl-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                    Agora aprenda o nome
                  </p>

                  <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                    Votação nominal
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-600">
                    É o nome usado quando o registro permite identificar como
                    cada pessoa votou.
                  </p>

                  <p className="mt-2 text-[11px] font-bold text-blue-700">
                    Pense assim: nominal → ligado ao nome.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* NÍVEIS */}
      <section className="mx-auto max-w-[1000px] px-5 pt-8 md:px-8">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          Onde aconteceu a decisão?
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
                  ativo ? "bg-blue-950 text-white" : "hover:bg-slate-50"
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

      {/* ÁREAS AINDA NÃO PREENCHIDAS */}
      {nivel !== "brasil" && (
        <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-5 md:px-8">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-6 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
              {nivel === "salvador" ? "SALVADOR" : "BAHIA"}
            </p>

            <h2 className="mt-1 text-[20px] font-extrabold text-blue-950">
              {nivel === "salvador"
                ? "Votações da Câmara Municipal de Salvador"
                : "Votações da Assembleia Legislativa da Bahia"}
            </h2>

            <p className="mt-2 max-w-[700px] text-[12px] leading-5 text-slate-600">
              Esta área será preenchida apenas com votações que possam ser
              confirmadas em fontes oficiais.
            </p>
          </div>
        </section>
      )}

      {/* PRIMEIRA VOTAÇÃO REAL */}
      {nivel === "brasil" && (
        <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-5 md:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setVotacaoAberta(!votacaoAberta)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-extrabold uppercase text-emerald-700">
                    Votação real
                  </span>

                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-600">
                    1º de julho de 2026
                  </span>
                </div>

                <p className="mt-2 text-[15px] font-extrabold text-blue-950">
                  A Câmara deveria analisar este projeto com mais rapidez?
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Projeto relacionado a uma área de proteção ambiental em Santa
                  Catarina
                </p>
              </div>

              <span className="text-xl font-bold text-blue-600">
                {votacaoAberta ? "−" : "+"}
              </span>
            </button>

            {votacaoAberta && (
              <div className="border-t border-slate-200">
                {/* ENTENDA RÁPIDO */}
                <div className="bg-blue-950 px-5 py-5 text-white md:px-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                    ENTENDA EM 30 SEGUNDOS
                  </p>

                  <p className="mt-2 max-w-[780px] text-[13px] leading-6 text-blue-50">
                    Existia um projeto relacionado à redução de uma área de
                    proteção ambiental em Santa Catarina. Nesta votação, os
                    deputados ainda não estavam decidindo diretamente se o
                    conteúdo final do projeto seria aprovado ou rejeitado.
                  </p>

                  <p className="mt-3 max-w-[780px] text-[13px] font-bold leading-6 text-white">
                    Eles estavam decidindo se a análise desse projeto deveria
                    receber urgência.
                  </p>
                </div>

                {/* O QUE ESTAVA SENDO DECIDIDO */}
                <div className="px-5 py-5 md:px-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                    O QUE ESTAVA SENDO DECIDIDO?
                  </p>

                  <h2 className="mt-2 text-[20px] font-extrabold text-blue-950">
                    Dar ou não urgência à análise do projeto.
                  </h2>

                  <p className="mt-3 max-w-[760px] text-[12px] leading-5 text-slate-700">
                    A decisão era sobre um pedido para que o Projeto de Lei
                    849/2025 passasse a ser analisado com urgência pela Câmara.
                  </p>

                  <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4">
                    <p className="text-[11px] font-extrabold text-blue-950">
                      O que significa “urgência” aqui?
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Significa dar um caminho mais rápido para a análise da
                      proposta dentro da Câmara.
                    </p>

                    <p className="mt-2 text-[10px] font-bold text-blue-700">
                      Portanto, esta votação era sobre a velocidade e o caminho
                      da análise — não era, sozinha, a decisão final sobre todo
                      o conteúdo do projeto.
                    </p>
                  </div>
                </div>

                {/* SIM E NÃO */}
                <div className="border-t border-slate-200 px-5 py-5 md:px-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                    NESTA VOTAÇÃO, O QUE SIGNIFICAVA CADA OPÇÃO?
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-4">
                      <span className="rounded-md bg-white px-2 py-1 text-[11px] font-extrabold text-emerald-700">
                        SIM
                      </span>

                      <p className="mt-3 text-[12px] font-extrabold text-blue-950">
                        Dar urgência à análise
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-600">
                        O deputado votou a favor de colocar o projeto em um
                        caminho de análise mais rápido.
                      </p>
                    </div>

                    <div className="rounded-lg border border-rose-100 bg-rose-50 px-4 py-4">
                      <span className="rounded-md bg-white px-2 py-1 text-[11px] font-extrabold text-rose-700">
                        NÃO
                      </span>

                      <p className="mt-3 text-[12px] font-extrabold text-blue-950">
                        Não dar urgência à análise
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-600">
                        O deputado votou contra dar esse tratamento de urgência
                        à análise do projeto.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-[11px] font-extrabold text-amber-900">
                      Atenção
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-700">
                      Esse voto, sozinho, não permite dizer como o deputado
                      votaria sobre o conteúdo final do projeto.
                    </p>
                  </div>
                </div>

                {/* RESULTADO NACIONAL */}
                <div className="border-t border-slate-200 px-5 py-5 md:px-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                    O QUE ACONTECEU?
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-extrabold text-emerald-700">
                      279 SIM
                    </span>

                    <span className="rounded-lg bg-rose-50 px-3 py-2 text-[11px] font-extrabold text-rose-700">
                      162 NÃO
                    </span>

                    <span className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-extrabold text-amber-800">
                      1 ABSTENÇÃO
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] font-extrabold text-blue-950">
                    O pedido de urgência foi aprovado.
                  </p>

                  <p className="mt-1 max-w-[720px] text-[11px] leading-5 text-slate-600">
                    Esse é o resultado da Câmara dos Deputados como um todo.
                    Agora podemos olhar especificamente para os votos
                    registrados dos parlamentares da Bahia.
                  </p>
                </div>

                {/* BAHIA */}
                <div className="border-t border-slate-200 px-5 py-5 md:px-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                    FOCO NA BAHIA
                  </p>

                  <h3 className="mt-1 text-[19px] font-extrabold text-blue-950">
                    Como votaram os parlamentares da Bahia que aparecem no
                    registro?
                  </h3>

                  <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-slate-600">
                    O registro oficial consultado mostra voto individual de 30
                    parlamentares da Bahia nesta votação.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-slate-100 px-3 py-2 text-[10px] font-bold text-slate-700">
                      30 votos registrados
                    </span>

                    <span className="rounded-md bg-emerald-50 px-3 py-2 text-[10px] font-extrabold text-emerald-700">
                      {quantidadeSim} SIM
                    </span>

                    <span className="rounded-md bg-rose-50 px-3 py-2 text-[10px] font-extrabold text-rose-700">
                      {quantidadeNao} NÃO
                    </span>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="buscar-deputado"
                      className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500"
                    >
                      Procure um nome ou partido
                    </label>

                    <input
                      id="buscar-deputado"
                      type="text"
                      value={busca}
                      onChange={(event) => setBusca(event.target.value)}
                      placeholder="Ex.: Alice Portugal ou PT"
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[12px] outline-none transition placeholder:text-slate-400 focus:border-blue-400"
                    />
                  </div>

                  <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                    {votosFiltrados.length > 0 ? (
                      votosFiltrados.map((pessoa, index) => (
                        <div
                          key={pessoa.nome}
                          className={`grid gap-2 px-4 py-3 sm:grid-cols-[1fr_130px_100px] sm:items-center ${
                            index !== 0 ? "border-t border-slate-200" : ""
                          }`}
                        >
                          <p className="text-[12px] font-extrabold text-blue-950">
                            {pessoa.nome}
                          </p>

                          <span className="text-[10px] font-bold text-slate-500">
                            {pessoa.partido}
                          </span>

                          <span
                            className={`inline-flex w-fit rounded-md px-2.5 py-1.5 text-[10px] font-extrabold ${
                              pessoa.voto === "Sim"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {pessoa.voto.toUpperCase()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-[11px] font-bold text-slate-500">
                          Nenhum nome encontrado.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-extrabold text-blue-950">
                      E os outros nomes?
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-600">
                      Esta lista mostra os parlamentares da Bahia que aparecem
                      com voto no registro oficial consultado. O Observa
                      Salvador não vai transformar automaticamente quem não
                      aparece nessa lista em “ausente”, porque isso exigiria
                      verificar o motivo e os demais registros daquela sessão.
                    </p>
                  </div>
                </div>

                {/* DETALHES TÉCNICOS */}
                <div className="border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setDetalhesAbertos(!detalhesAbertos)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                  >
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                        PARA QUEM QUER IR ALÉM
                      </p>

                      <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                        Ver os nomes e números oficiais
                      </p>
                    </div>

                    <span className="font-bold text-blue-600">
                      {detalhesAbertos ? "−" : "+"}
                    </span>
                  </button>

                  {detalhesAbertos && (
                    <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 md:px-6">
                      <p className="text-[11px] leading-5 text-slate-600">
                        Você não precisa decorar essas informações. Elas servem
                        para identificar exatamente qual decisão estamos
                        mostrando.
                      </p>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-lg bg-white px-3 py-3">
                          <p className="text-[9px] font-extrabold uppercase text-slate-400">
                            Projeto relacionado
                          </p>
                          <p className="mt-1 text-[11px] font-bold text-slate-700">
                            PL 849/2025
                          </p>
                        </div>

                        <div className="rounded-lg bg-white px-3 py-3">
                          <p className="text-[9px] font-extrabold uppercase text-slate-400">
                            O que foi votado
                          </p>
                          <p className="mt-1 text-[11px] font-bold text-slate-700">
                            Pedido de urgência
                          </p>
                        </div>

                        <div className="rounded-lg bg-white px-3 py-3">
                          <p className="text-[9px] font-extrabold uppercase text-slate-400">
                            Nome oficial
                          </p>
                          <p className="mt-1 text-[11px] font-bold text-slate-700">
                            REQ 1233/2026
                          </p>
                        </div>

                        <div className="rounded-lg bg-white px-3 py-3">
                          <p className="text-[9px] font-extrabold uppercase text-slate-400">
                            Data
                          </p>
                          <p className="mt-1 text-[11px] font-bold text-slate-700">
                            1º de julho de 2026
                          </p>
                        </div>

                        <div className="rounded-lg bg-white px-3 py-3 sm:col-span-2">
                          <p className="text-[9px] font-extrabold uppercase text-slate-400">
                            Onde aconteceu
                          </p>
                          <p className="mt-1 text-[11px] font-bold text-slate-700">
                            Plenário da Câmara dos Deputados
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* FONTES */}
                <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 md:px-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                    CONFIRA NAS FONTES OFICIAIS
                  </p>

                  <p className="mt-2 max-w-[700px] text-[10px] leading-4 text-slate-500">
                    Não precisa confiar apenas no resumo do Observa Salvador.
                    Você pode abrir o registro original da Câmara.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={fonteVotacao}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-blue-950 px-3.5 py-2.5 text-[10px] font-extrabold text-white hover:bg-blue-900"
                    >
                      Ver votação oficial ↗
                    </a>

                    <a
                      href={fonteProposta}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[10px] font-extrabold text-blue-700 hover:bg-blue-50"
                    >
                      Ver informações oficiais ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* REGRA DE LEITURA */}
          <div className="mt-4 rounded-xl bg-blue-950 px-5 py-4 text-white md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-200">
              GUARDE ESTA IDEIA
            </p>

            <p className="mt-2 max-w-[760px] text-[12px] leading-5 text-blue-50">
              Antes de perguntar “como ele votou?”, pergunte:
              <strong className="text-white">
                {" "}
                “o que exatamente estava sendo decidido?”
              </strong>
            </p>

            <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-blue-200">
              Só depois disso o SIM ou o NÃO pode ser entendido corretamente.
            </p>
          </div>

          {/* NEUTRALIDADE */}
          <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-5 py-4 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-rose-700">
              O OBSERVA SALVADOR NÃO DECIDE POR VOCÊ
            </p>

            <p className="mt-2 max-w-[760px] text-[12px] leading-5 text-slate-700">
              O site não classifica o voto como certo ou errado. Mostramos o
              que estava sendo decidido, o registro disponível e as fontes
              oficiais para que cada pessoa forme sua própria opinião.
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