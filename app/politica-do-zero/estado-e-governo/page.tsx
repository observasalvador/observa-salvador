"use client";

import { useState } from "react";
import Link from "next/link";

export default function EstadoEGoverno() {
  const [resposta, setResposta] = useState<string | null>(null);

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
            PASSO 03
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            Estado e Governo são a mesma coisa?
          </h1>

          <p className="mt-5 text-xl font-semibold text-blue-700">
            Não. E entender essa diferença ajuda a compreender boa parte da
            política.
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Pense no que acontece depois de uma eleição: o prefeito, o
            governador ou o presidente podem mudar. Mas Salvador, a Bahia e o
            Brasil continuam existindo — assim como suas instituições e
            serviços públicos.
          </p>
        </div>

        {/* EXEMPLOS */}
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl">🏙️</div>

            <p className="mt-4 font-bold text-blue-950">
              O prefeito muda.
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              O Município de Salvador continua existindo.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl">📍</div>

            <p className="mt-4 font-bold text-blue-950">
              O governador muda.
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              O Estado da Bahia continua existindo.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <img
              src="/bandeira-brasil.svg"
              alt="Bandeira do Brasil"
              className="h-8 w-12 rounded object-cover"
            />

            <p className="mt-4 font-bold text-blue-950">
              O presidente muda.
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              A União continua existindo.
            </p>
          </div>
        </div>

        {/* ESTADO X GOVERNO */}
        <div className="mt-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              ENTENDA A DIFERENÇA
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-950">
              Estado × Governo
            </h2>

            <p className="mt-3 text-lg leading-8 text-slate-600">
              As duas palavras aparecem o tempo todo nas notícias, mas não
              significam a mesma coisa.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {/* ESTADO */}
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-2xl">
                🏛️
              </div>

              <h3 className="mt-5 text-2xl font-bold text-blue-950">
                Estado
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                É a estrutura pública organizada que continua existindo mesmo
                quando os governantes mudam.
              </p>

              <div className="mt-5 space-y-2 text-slate-700">
                <p>✓ possui instituições públicas</p>
                <p>✓ possui órgãos e servidores</p>
                <p>✓ funciona segundo leis e competências</p>
                <p>✓ continua existindo após as eleições</p>
              </div>

              <div className="mt-5 rounded-2xl bg-white p-4">
                <p className="text-sm font-bold text-blue-700">
                  EXEMPLO
                </p>

                <p className="mt-2 leading-6 text-slate-700">
                  O Estado da Bahia não deixa de existir quando termina o
                  mandato de um governador.
                </p>
              </div>
            </div>

            {/* GOVERNO */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-2xl">
                👥
              </div>

              <h3 className="mt-5 text-2xl font-bold text-blue-950">
                Governo
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                É quem conduz politicamente a administração pública durante
                determinado período, dentro das regras e competências
                existentes.
              </p>

              <div className="mt-5 space-y-2 text-slate-700">
                <p>✓ exerce suas funções por determinado período</p>
                <p>✓ define prioridades e políticas públicas</p>
                <p>✓ dirige a administração sob sua responsabilidade</p>
                <p>✓ pode mudar após uma eleição</p>
              </div>

              <div className="mt-5 rounded-2xl bg-white p-4">
                <p className="text-sm font-bold text-amber-700">
                  EXEMPLO
                </p>

                <p className="mt-2 leading-6 text-slate-700">
                  Um governador pode terminar seu mandato e outro assumir. O
                  governo muda, mas o Estado da Bahia permanece.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NÃO CONFUNDA */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-xl">
              💡
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                NÃO CONFUNDA
              </p>

              <h2 className="mt-1 text-xl font-bold text-blue-950">
                O lugar não é a mesma coisa que o governo daquele lugar.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-blue-950">
                Município de Salvador
              </p>
              <p className="my-1 font-bold text-amber-600">≠</p>
              <p className="text-slate-600">Governo municipal</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-blue-950">
                Estado da Bahia
              </p>
              <p className="my-1 font-bold text-amber-600">≠</p>
              <p className="text-slate-600">
                Governo do Estado da Bahia
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-blue-950">
                União
              </p>
              <p className="my-1 font-bold text-amber-600">≠</p>
              <p className="text-slate-600">Governo Federal</p>
            </div>
          </div>

          <p className="mt-5 leading-7 text-slate-700">
            Quando uma eleição troca os governantes, ela não cria um novo
            Município, um novo Estado ou uma nova União. O que muda é quem
            exerce o governo naquele período.
          </p>
        </div>

        {/* TESTE RÁPIDO */}
        <div className="mt-10 rounded-3xl bg-blue-950 p-7 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
            TESTE RÁPIDO
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Depois de uma eleição, um novo governador assume a Bahia.
          </h2>

          <p className="mt-2 text-lg text-blue-100">
            O que aconteceu com o Estado da Bahia?
          </p>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => setResposta("acabou")}
              className={`rounded-2xl border p-4 text-left font-semibold transition ${
                resposta === "acabou"
                  ? "border-amber-300 bg-amber-100 text-amber-950"
                  : "border-blue-700 bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              {resposta === "acabou" ? "✕ " : ""}
              O Estado da Bahia acabou e começou outro.
            </button>

            <button
              onClick={() => setResposta("nome")}
              className={`rounded-2xl border p-4 text-left font-semibold transition ${
                resposta === "nome"
                  ? "border-amber-300 bg-amber-100 text-amber-950"
                  : "border-blue-700 bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              {resposta === "nome" ? "✕ " : ""}
              O Estado passou a ter o nome do novo governador.
            </button>

            <button
              onClick={() => setResposta("continua")}
              className={`rounded-2xl border p-4 text-left font-semibold transition ${
                resposta === "continua"
                  ? "border-green-300 bg-green-100 text-green-950"
                  : "border-blue-700 bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              {resposta === "continua" ? "✓ " : ""}
              O Estado continuou existindo; quem mudou foi o governo.
            </button>
          </div>

          {resposta === "continua" && (
            <div className="mt-5 rounded-2xl bg-green-100 p-5 text-green-950">
              <p className="font-bold">✓ Isso!</p>

              <p className="mt-2 leading-7">
                A eleição pode mudar quem governa, mas o Estado da Bahia
                continua existindo. Suas instituições e estruturas públicas
                não desaparecem porque um novo governador assumiu.
              </p>
            </div>
          )}

          {resposta && resposta !== "continua" && (
            <div className="mt-5 rounded-2xl bg-amber-100 p-5 text-amber-950">
              <p className="font-bold">Ainda não.</p>

              <p className="mt-2 leading-7">
                Quando muda o governador, a Bahia não deixa de existir. O que
                muda é quem exerce o governo naquele período. Tente novamente.
              </p>
            </div>
          )}
        </div>

        {/* FECHAMENTO */}
        <div className="mt-10 rounded-3xl bg-blue-50 p-7 md:flex md:items-center md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              GUARDE ESTA IDEIA
            </p>

            <h2 className="mt-2 text-2xl font-bold text-blue-950">
              Governos mudam. O Estado permanece.
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Saber essa diferença ajuda a entender quem administra, quem toma
              decisões e quem pode ser cobrado por cada serviço ou política
              pública.
            </p>
          </div>

          <div className="mt-6 shrink-0 md:mt-0">
            <span className="text-5xl">🏛️</span>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/politica-do-zero"
            className="font-semibold text-slate-600 hover:text-blue-800"
          >
            ← Voltar para Política do Zero
          </Link>

          <Link
            href="/politica-do-zero"
            className="rounded-xl bg-blue-700 px-6 py-3 text-center font-semibold text-white hover:bg-blue-800"
          >
            Continuar aprendendo →
          </Link>
        </div>
      </section>
    </main>
  );
}