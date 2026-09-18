"use client";

import { useState } from "react";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <path d="M5 16h21" />
      <path d="m19 9 7 7-7 7" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <rect x="4" y="8" width="24" height="17" rx="2" />
      <circle cx="16" cy="16.5" r="4" />
      <path d="M8 12h2M22 21h2" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <path d="M6 20h20l-2-8H8z" />
      <path d="m10 12 2.5-5h7L22 12" />
      <path d="M6 20v5h3M26 20v5h-3" />
      <circle cx="10" cy="21" r="1" fill="currentColor" />
      <circle cx="22" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <circle cx="14" cy="14" r="8" />
      <path d="m20 20 7 7" />
    </svg>
  );
}

export default function ComoODinheiroCircula() {
  const [resposta, setResposta] = useState<"sim" | "nao" | null>(null);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[920px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-[15px] font-extrabold tracking-tight text-[#082b6f]"
          >
            Observa Salvador
          </Link>

          <Link
            href="/politica-do-zero"
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            ← Política do Zero
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[920px] px-5 py-8 md:px-8 md:py-10">
        {/* PASSO */}
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
            PASSO 08
          </span>

          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            PARTE 3 DE 3
          </span>
        </div>

        {/* ABERTURA */}
        <div className="mt-4 max-w-[720px]">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#082b6f] md:text-[42px]">
            Como o dinheiro circula?
          </h1>

          <p className="mt-3 text-[17px] font-bold text-blue-600 md:text-[18px]">
            Quem recebe um imposto nem sempre fica com todo o dinheiro.
          </p>

          <p className="mt-4 text-[15px] leading-6 text-slate-600 md:text-[16px]">
            Imagine que um dinheiro foi arrecadado pelo Governo Federal ou
            pelo Governo do Estado. Em alguns casos, uma parte desse dinheiro
            deve ser repassada para outros governos.
          </p>
        </div>

        {/* IDEIA PRINCIPAL */}
        <div className="mt-7 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] shadow-sm">
          <div className="grid md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="flex items-center gap-4 px-5 py-5 md:px-6">
              <div className="shrink-0 text-blue-100">
                <ArrowIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                  GUARDE ESTA IDEIA
                </p>

                <h2 className="mt-1 text-[19px] font-extrabold leading-6 text-white">
                  O dinheiro pode passar de um governo para outro.
                </h2>
              </div>
            </div>

            <div className="border-t border-blue-700/60 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[13px] leading-5 text-blue-50">
                Isso não acontece porque um governo resolveu dar dinheiro para
                outro. Existem regras que dizem quando e como esses repasses
                devem acontecer.
              </p>
            </div>
          </div>
        </div>

        {/* EXEMPLO SIMPLES */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            PRIMEIRO, PENSE ASSIM
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            O dinheiro pode fazer este caminho:
          </h2>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid md:grid-cols-[1fr_50px_1fr_50px_1fr] md:items-center">
              <div className="px-4 py-5 text-center">
                <p className="text-[10px] font-extrabold text-blue-500">
                  01
                </p>

                <p className="mt-1 text-[15px] font-extrabold text-[#082b6f]">
                  O dinheiro é arrecadado
                </p>

                <p className="mt-1 text-[12px] leading-5 text-slate-500">
                  Um governo recebe determinado imposto ou outra receita.
                </p>
              </div>

              <div className="hidden justify-center text-blue-300 md:flex">
                <ArrowIcon />
              </div>

              <div className="border-y border-slate-200 px-4 py-5 text-center md:border-x md:border-y-0">
                <p className="text-[10px] font-extrabold text-blue-500">
                  02
                </p>

                <p className="mt-1 text-[15px] font-extrabold text-[#082b6f]">
                  A regra manda dividir
                </p>

                <p className="mt-1 text-[12px] leading-5 text-slate-500">
                  A Constituição ou uma lei pode determinar que uma parte seja
                  repassada.
                </p>
              </div>

              <div className="hidden justify-center text-blue-300 md:flex">
                <ArrowIcon />
              </div>

              <div className="px-4 py-5 text-center">
                <p className="text-[10px] font-extrabold text-blue-500">
                  03
                </p>

                <p className="mt-1 text-[15px] font-extrabold text-[#082b6f]">
                  Outro governo recebe
                </p>

                <p className="mt-1 text-[12px] leading-5 text-slate-500">
                  Esse dinheiro chega ao Estado ou Município que tem direito a
                  receber uma parte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FPM */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            EXEMPLO 1
          </p>

          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-4 px-5 py-5 md:grid-cols-[55px_1fr]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MoneyIcon />
              </div>

              <div>
                <p className="text-[18px] font-extrabold text-[#082b6f]">
                  FPM
                </p>

                <p className="text-[11px] font-bold text-blue-600">
                  Fundo de Participação dos Municípios
                </p>

                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  Pense no FPM como um caminho pelo qual dinheiro arrecadado
                  pela União chega aos municípios.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] font-extrabold">
                  <span className="rounded-md bg-blue-50 px-3 py-2 text-blue-700">
                    União
                  </span>

                  <span className="text-blue-400">→</span>

                  <span className="rounded-md bg-blue-50 px-3 py-2 text-blue-700">
                    FPM
                  </span>

                  <span className="text-blue-400">→</span>

                  <span className="rounded-md bg-green-50 px-3 py-2 text-green-700">
                    Municípios
                  </span>
                </div>

                <p className="mt-3 text-[12px] leading-5 text-slate-500">
                  Ou seja: um Município não vive apenas do dinheiro que ele
                  mesmo arrecada diretamente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IPVA */}
        <div className="mt-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            EXEMPLO 2
          </p>

          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-4 px-5 py-5 md:grid-cols-[55px_1fr]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CarIcon />
              </div>

              <div>
                <p className="text-[18px] font-extrabold text-[#082b6f]">
                  E o IPVA do carro?
                </p>

                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  O IPVA é um imposto estadual. Mas o Estado não fica com todo
                  o valor arrecadado.
                </p>

                <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3">
                  <p className="text-[13px] font-extrabold leading-5 text-[#082b6f]">
                    A Constituição determina que 50% da arrecadação do IPVA
                    pertença aos municípios, seguindo as regras previstas para
                    essa divisão.
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] font-extrabold">
                  <span className="rounded-md bg-blue-50 px-3 py-2 text-blue-700">
                    Estado arrecada
                  </span>

                  <span className="text-blue-400">→</span>

                  <span className="rounded-md bg-green-50 px-3 py-2 text-green-700">
                    Município recebe sua parte
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NÃO CONFUNDA */}
        <div className="mt-5 overflow-hidden rounded-xl border border-amber-200 bg-[#fff9e9]">
          <div className="grid md:grid-cols-[210px_1fr] md:items-center">
            <div className="px-4 py-4 md:px-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-700">
                NÃO CONFUNDA
              </p>

              <p className="mt-1 text-[14px] font-extrabold leading-5 text-[#082b6f]">
                Quem arrecada não fica sempre com tudo.
              </p>
            </div>

            <div className="border-t border-amber-200 px-4 py-4 md:border-l md:border-t-0 md:px-5">
              <p className="text-[13px] leading-5 text-slate-700">
                Para entender de onde veio o dinheiro de uma Prefeitura, não
                basta olhar os impostos municipais. Ela também pode receber
                recursos de outros governos.
              </p>
            </div>
          </div>
        </div>

        {/* SIGA O DINHEIRO */}
        <div className="mt-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 text-blue-600">
              <SearchIcon />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-600">
                AGORA SIGA O DINHEIRO
              </p>

              <h2 className="mt-1 text-[20px] font-extrabold text-[#082b6f]">
                Até chegar a um serviço público, existe um caminho.
              </h2>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid md:grid-cols-4 md:divide-x md:divide-slate-200">
              <div className="px-4 py-4 text-center">
                <p className="text-[10px] font-extrabold text-blue-500">
                  01
                </p>
                <p className="mt-1 text-[13px] font-extrabold text-[#082b6f]">
                  Dinheiro entra
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  O poder público recebe recursos.
                </p>
              </div>

              <div className="border-t border-slate-200 px-4 py-4 text-center md:border-t-0">
                <p className="text-[10px] font-extrabold text-blue-500">
                  02
                </p>
                <p className="mt-1 text-[13px] font-extrabold text-[#082b6f]">
                  Pode ser dividido
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Uma parte pode ir para outro governo.
                </p>
              </div>

              <div className="border-t border-slate-200 px-4 py-4 text-center md:border-t-0">
                <p className="text-[10px] font-extrabold text-blue-500">
                  03
                </p>
                <p className="mt-1 text-[13px] font-extrabold text-[#082b6f]">
                  Entra no orçamento
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  O dinheiro precisa seguir as regras do orçamento.
                </p>
              </div>

              <div className="border-t border-slate-200 px-4 py-4 text-center md:border-t-0">
                <p className="text-[10px] font-extrabold text-green-600">
                  04
                </p>
                <p className="mt-1 text-[13px] font-extrabold text-[#082b6f]">
                  Pode virar ação
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Serviço, compra, obra ou outra ação pública.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PONTE PARA ORÇAMENTO */}
        <div className="mt-7 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] shadow-sm">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="px-5 py-5 md:px-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                MAS ATENÇÃO
              </p>

              <h2 className="mt-1 text-[19px] font-extrabold leading-6 text-white">
                Receber dinheiro não significa poder gastar como quiser.
              </h2>
            </div>

            <div className="border-t border-blue-700/60 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[13px] leading-5 text-blue-50">
                O dinheiro público precisa seguir regras. Existem planos,
                orçamento e controles sobre como ele pode ser usado.
              </p>

              <p className="mt-2 text-[12px] font-bold text-blue-200">
                Então surge uma nova pergunta: quem decide onde esse dinheiro
                será usado?
              </p>
            </div>
          </div>
        </div>

        {/* TESTE */}
        <div className="mt-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            TESTE RÁPIDO
          </p>

          <h2 className="mt-1.5 text-[18px] font-extrabold text-[#082b6f]">
            Uma Prefeitura recebeu dinheiro da União.
          </h2>

          <p className="mt-1 text-[13px] leading-5 text-slate-600">
            Isso significa que todo o dinheiro da Prefeitura foi arrecadado
            diretamente por ela?
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setResposta("sim")}
              className={`rounded-lg border px-4 py-3 text-left text-[13px] font-bold transition ${
                resposta === "sim"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              Sim. Cada governo usa apenas o que arrecada.
            </button>

            <button
              type="button"
              onClick={() => setResposta("nao")}
              className={`rounded-lg border px-4 py-3 text-left text-[13px] font-bold transition ${
                resposta === "nao"
                  ? "border-green-300 bg-green-50 text-green-900"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              Não. Ela também pode receber dinheiro de outros governos.
            </button>
          </div>

          {resposta === "sim" && (
            <div className="mt-3 border-l-[3px] border-amber-400 pl-3">
              <p className="text-[13px] font-extrabold text-amber-800">
                Não é assim.
              </p>

              <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                Uma Prefeitura arrecada receitas próprias, mas também pode
                receber recursos vindos da União e do Estado.
              </p>
            </div>
          )}

          {resposta === "nao" && (
            <div className="mt-3 border-l-[3px] border-green-500 pl-3">
              <p className="text-[13px] font-extrabold text-green-800">
                Isso.
              </p>

              <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                Parte do dinheiro usado por um Município pode ter sido
                arrecadada originalmente por outro governo.
              </p>
            </div>
          )}
        </div>

        {/* FECHAMENTO */}
        <div className="mt-7 border-l-[3px] border-blue-600 py-1 pl-4">
          <p className="text-[14px] font-extrabold text-[#082b6f]">
            O que você precisa guardar:
          </p>

          <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-slate-600">
            O dinheiro público pode ser arrecadado por um governo e chegar a
            outro. Por isso, para entender um gasto público, precisamos saber
            de onde o dinheiro veio e quem ficou responsável por usá-lo.
          </p>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <Link
            href="/politica-do-zero/de-onde-vem-o-dinheiro/tipos-de-receitas"
            className="text-[13px] font-bold text-slate-500 transition hover:text-blue-700"
          >
            ← Voltar
          </Link>

          <Link
            href="/politica-do-zero/quem-decide-o-gasto"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Passo 09: quem decide como gastar? →
          </Link>
        </div>

        {/* PROGRESSO */}
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          <div className="h-1 rounded-full bg-blue-600" />
          <div className="h-1 rounded-full bg-blue-600" />
          <div className="h-1 rounded-full bg-blue-600" />
        </div>
      </section>
    </main>
  );
}