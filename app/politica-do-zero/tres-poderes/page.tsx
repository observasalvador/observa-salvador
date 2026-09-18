"use client";

import { useState } from "react";
import Link from "next/link";

type Poder = "executivo" | "legislativo" | "judiciario";

const poderes = {
  executivo: {
    nome: "Executivo",
    chamada: "Administra e coloca políticas públicas em prática.",
    simples:
      "É o Poder ligado à administração do governo. É aqui que estão prefeito, governador e presidente, cada um no seu nível.",
    exemplo:
      "A Prefeitura decide executar a reforma de uma praça municipal. A administração organiza o projeto, o dinheiro, a contratação e a execução do serviço, seguindo as regras aplicáveis.",
    pessoas:
      "Prefeito, governador e presidente são exemplos de chefes do Poder Executivo.",
    proximo:
      "Você já conheceu esses três cargos no tema anterior.",
  },

  legislativo: {
    nome: "Legislativo",
    chamada: "Faz leis e fiscaliza o Executivo.",
    simples:
      "É onde representantes eleitos discutem e votam leis, analisam o orçamento e fiscalizam ações do Poder Executivo.",
    exemplo:
      "Imagine que a Prefeitura está gastando dinheiro público em uma obra. A Câmara Municipal pode fiscalizar a atuação do Executivo dentro de suas atribuições.",
    pessoas:
      "Vereadores, deputados estaduais, deputados federais e senadores fazem parte do Poder Legislativo em diferentes níveis.",
    proximo:
      "No próximo tema, você vai entender a diferença entre cada um deles.",
  },

  judiciario: {
    nome: "Judiciário",
    chamada: "Julga conflitos e decide casos levados à Justiça.",
    simples:
      "É o Poder formado por órgãos da Justiça. Ele atua quando precisa decidir conflitos e questões jurídicas que chegam ao Judiciário.",
    exemplo:
      "Imagine que uma pessoa entende que um direito seu foi desrespeitado e leva o caso à Justiça. O Judiciário analisa o processo e decide de acordo com o Direito.",
    pessoas:
      "Juízes e tribunais fazem parte da estrutura do Poder Judiciário.",
    proximo:
      "O Judiciário não administra a Prefeitura nem funciona como uma Câmara de Vereadores.",
  },
};

export default function TresPoderes() {
  const [poderSelecionado, setPoderSelecionado] =
    useState<Poder>("executivo");

  const [resposta, setResposta] = useState<string | null>(null);

  const poder = poderes[poderSelecionado];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold text-blue-950">
            Observa Salvador
          </Link>

          <Link
            href="/politica-do-zero"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Política do Zero
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* ABERTURA */}
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            PASSO 05
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            Os três Poderes
          </h1>

          <p className="mt-5 text-xl font-semibold text-blue-700">
            Prefeito, governador e presidente não podem decidir tudo sozinhos.
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            No Brasil, existem três Poderes que exercem funções diferentes:
            Executivo, Legislativo e Judiciário.
          </p>
        </div>

        {/* IDEIA INICIAL */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            PENSE ASSIM
          </p>

          <p className="mt-2 leading-7 text-slate-700">
            Imagine se uma única pessoa pudesse{" "}
            <strong>administrar, fazer todas as leis e ainda julgar os conflitos.</strong>
          </p>

          <p className="mt-2 font-semibold leading-7 text-blue-950">
            O poder ficaria concentrado demais. Por isso, essas funções são
            distribuídas entre Poderes diferentes.
          </p>
        </div>

        {/* VISÃO RÁPIDA */}
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            PRIMEIRO, GUARDE O BÁSICO
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid md:grid-cols-3 md:divide-x md:divide-slate-200">
              <button
                onClick={() => setPoderSelecionado("executivo")}
                className={`p-5 text-left transition ${
                  poderSelecionado === "executivo"
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-blue-600">
                    Executivo
                  </span>

                  <span className="text-blue-600">→</span>
                </div>

                <p className="mt-2 font-semibold leading-6 text-blue-950">
                  Administra e coloca políticas públicas em prática.
                </p>
              </button>

              <button
                onClick={() => setPoderSelecionado("legislativo")}
                className={`border-t border-slate-200 p-5 text-left transition md:border-t-0 ${
                  poderSelecionado === "legislativo"
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-blue-600">
                    Legislativo
                  </span>

                  <span className="text-blue-600">→</span>
                </div>

                <p className="mt-2 font-semibold leading-6 text-blue-950">
                  Faz leis e fiscaliza o Executivo.
                </p>
              </button>

              <button
                onClick={() => setPoderSelecionado("judiciario")}
                className={`border-t border-slate-200 p-5 text-left transition md:border-t-0 ${
                  poderSelecionado === "judiciario"
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-blue-600">
                    Judiciário
                  </span>

                  <span className="text-blue-600">→</span>
                </div>

                <p className="mt-2 font-semibold leading-6 text-blue-950">
                  Julga conflitos e decide casos levados à Justiça.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* CONTEÚDO INTERATIVO */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-5 border-b border-blue-100 bg-blue-50 px-6 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                VOCÊ ESCOLHEU
              </p>

              <h2 className="mt-1 text-2xl font-bold text-blue-950">
                Poder {poder.nome}
              </h2>
            </div>

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-700 sm:flex">
              {poderSelecionado === "executivo" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V10h14v11" />
                  <path d="M8 21v-6h8v6" />
                  <path d="M3 10h18L12 3 3 10Z" />
                </svg>
              )}

              {poderSelecionado === "legislativo" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path d="M4 5h16" />
                  <path d="M6 9h12" />
                  <path d="M6 13h12" />
                  <path d="M6 17h8" />
                  <path d="M4 3v18" />
                </svg>
              )}

              {poderSelecionado === "judiciario" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path d="M12 3v18" />
                  <path d="M5 6h14" />
                  <path d="m5 6-3 6h6L5 6Z" />
                  <path d="m19 6-3 6h6l-3-6Z" />
                  <path d="M8 21h8" />
                </svg>
              )}
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                EM PALAVRAS SIMPLES
              </p>

              <p className="mt-2 text-lg font-bold leading-7 text-blue-950">
                {poder.chamada}
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                {poder.simples}
              </p>

              <div className="mt-5 border-l-4 border-blue-500 pl-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  QUEM APARECE AQUI?
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {poder.pessoas}
                </p>

                <p className="mt-1 text-sm font-semibold leading-6 text-blue-700">
                  {poder.proximo}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                EXEMPLO DO DIA A DIA
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                {poder.exemplo}
              </p>
            </div>
          </div>
        </div>

        {/* NÃO É UMA ESCADA */}
        <div className="mt-10 rounded-2xl bg-blue-950 px-6 py-6 text-white">
          <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                IMPORTANTE
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Um Poder não é simplesmente “chefe” dos outros.
              </h2>
            </div>

            <div className="border-t border-blue-800 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="leading-7 text-blue-100">
                Executivo, Legislativo e Judiciário exercem funções diferentes.
                A Constituição diz que eles são{" "}
                <strong className="text-white">
                  independentes e harmônicos entre si.
                </strong>
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-200">
                Na prática, existem controles e relações entre os Poderes.
                Isso ajuda a evitar que todas as decisões fiquem concentradas
                em um único lugar.
              </p>
            </div>
          </div>
        </div>

        {/* SITUAÇÃO INTERATIVA */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            AGORA É COM VOCÊ
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            A Câmara quer verificar como o governo está usando dinheiro
            público em uma obra.
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Qual Poder está exercendo uma função de fiscalização nesse exemplo?
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              onClick={() => setResposta("executivo")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "executivo"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "executivo" ? "✕ " : ""}
              Executivo
            </button>

            <button
              onClick={() => setResposta("legislativo")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "legislativo"
                  ? "border-green-300 bg-green-50 text-green-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "legislativo" ? "✓ " : ""}
              Legislativo
            </button>

            <button
              onClick={() => setResposta("judiciario")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "judiciario"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "judiciario" ? "✕ " : ""}
              Judiciário
            </button>
          </div>

          {resposta === "legislativo" && (
            <div className="mt-4 border-l-4 border-green-500 pl-4">
              <p className="font-bold text-green-800">
                Isso.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                Nesse exemplo, o Legislativo está fiscalizando a atuação do
                Executivo. Fiscalizar o governo é uma das funções importantes
                do Poder Legislativo.
              </p>
            </div>
          )}

          {resposta && resposta !== "legislativo" && (
            <div className="mt-4 border-l-4 border-amber-400 pl-4">
              <p className="font-bold text-amber-800">
                Tente novamente.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                A pergunta fala de uma Câmara fiscalizando como o governo usa
                dinheiro público. Pense em qual Poder as Câmaras fazem parte.
              </p>
            </div>
          )}
        </div>

        {/* NÃO CONFUNDA */}
        <div className="mt-10 border-y border-slate-200 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            NÃO CONFUNDA
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-bold text-blue-950">
                Executivo não faz tudo
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Administrar o governo não significa poder tomar qualquer
                decisão sozinho.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-950">
                Legislativo não executa obras
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Vereadores, deputados e senadores podem legislar, fiscalizar e
                participar das decisões sobre orçamento, mas não são eles que
                executam diretamente uma obra pública.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-950">
                Judiciário não governa a cidade
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                A função do Judiciário é diferente da administração cotidiana
                feita pelo Poder Executivo.
              </p>
            </div>
          </div>
        </div>

        {/* PONTE PARA O PASSO 06 */}
        <div className="mt-9 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            PRÓXIMO TEMA
          </p>

          <div className="mt-2 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-blue-950">
                Vereador, deputado estadual, deputado federal e senador são a
                mesma coisa?
              </h2>

              <p className="mt-2 leading-7 text-slate-700">
                Não. Todos estão ligados ao Legislativo, mas atuam em lugares
                diferentes e possuem funções e responsabilidades próprias.
              </p>
            </div>

            <Link
              href="/politica-do-zero/vereadores-deputados-senadores"
              className="mt-5 inline-flex shrink-0 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 md:mt-0"
            >
              Entender a diferença →
            </Link>
          </div>
        </div>

        {/* FONTES */}
        <div className="mt-9 border-t border-slate-200 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            FONTES PARA CONFERIR
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            A Constituição Federal estabelece a existência dos Poderes
            Legislativo, Executivo e Judiciário e define suas atribuições.
            O conteúdo acima foi simplificado para facilitar o primeiro
            contato com o assunto.
          </p>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <Link
            href="/politica-do-zero"
            className="font-semibold text-slate-600 hover:text-blue-800"
          >
            ← Voltar para Política do Zero
          </Link>
        </div>
      </section>
    </main>
  );
}