"use client";

import { useState } from "react";
import Link from "next/link";

type Cargo = "prefeito" | "governador" | "presidente";

const cargos = {
  prefeito: {
    nome: "Prefeito",
    nivel: "Município",
    exemplo: "Em nosso caso: Salvador",
    termo: "Poder Executivo Municipal",
    destaque: "O prefeito está à frente do governo do Município.",
    explicacao:
      "Em Salvador, é o prefeito quem dirige a administração municipal. Ele trabalha com secretarias, órgãos, servidores e outras estruturas da Prefeitura.",
    situacao:
      "Imagine que a coleta de lixo deixou de passar na sua rua. Em Salvador, a limpeza urbana faz parte da estrutura municipal. A cobrança, nesse exemplo, começa no Município.",
    atencao:
      "Isso não quer dizer que o prefeito recolha o lixo pessoalmente ou possa resolver tudo sozinho. Existem órgãos responsáveis pelos serviços, leis, orçamento e fiscalização.",
  },

  governador: {
    nome: "Governador",
    nivel: "Estado",
    exemplo: "Em nosso caso: Bahia",
    termo: "Poder Executivo Estadual",
    destaque: "O governador está à frente do governo do Estado.",
    explicacao:
      "Na Bahia, o governador dirige a administração estadual com o apoio de secretarias, órgãos e servidores do Estado.",
    situacao:
      "Imagine uma viatura da Polícia Militar fazendo patrulhamento no seu bairro. A Polícia Militar da Bahia faz parte da estrutura estadual. Ela não é uma polícia da Prefeitura de Salvador.",
    atencao:
      "Isso não significa que todo assunto de segurança pública dependa somente do governador. Existem diferentes órgãos e responsabilidades. Aqui, o exemplo serve para mostrar uma estrutura que pertence ao Estado.",
  },

  presidente: {
    nome: "Presidente",
    nivel: "União",
    exemplo: "Brasil",
    termo: "Poder Executivo Federal",
    destaque: "O presidente está à frente do Poder Executivo da União.",
    explicacao:
      "No Governo Federal também existem ministérios, órgãos e servidores responsáveis por diferentes serviços e políticas públicas.",
    situacao:
      "Imagine que você precisa tirar um passaporte em Salvador. O documento é emitido pela Polícia Federal. Mesmo sendo atendido em Salvador, você está usando um serviço da estrutura federal.",
    atencao:
      "O presidente não administra todos os serviços existentes no Brasil. Estados e Municípios possuem suas próprias responsabilidades e autonomia.",
  },
};

export default function PrefeitoGovernadorPresidente() {
  const [cargoSelecionado, setCargoSelecionado] =
    useState<Cargo>("prefeito");

  const cargo = cargos[cargoSelecionado];

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
            PASSO 04
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            Prefeito, governador e presidente: o que cada um faz?
          </h1>

          <p className="mt-5 text-xl font-semibold text-blue-700">
            Eles ocupam cargos diferentes e cuidam de governos diferentes.
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Para saber quem cobrar quando existe um problema, primeiro é
            importante entender onde cada um atua.
          </p>
        </div>

        {/* SITUAÇÃO INICIAL */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            PENSE EM UMA SITUAÇÃO
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            Um serviço público do seu bairro parou de funcionar.
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Você deve cobrar do prefeito, do governador ou do presidente?
            <span className="font-semibold text-blue-950">
              {" "}Depende de quem é responsável por aquele serviço.
            </span>
          </p>
        </div>

        {/* ESCOLHA */}
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            ESCOLHA QUEM VOCÊ QUER CONHECER
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-950">
            Quem faz o quê?
          </h2>

          <p className="mt-2 text-slate-600">
            Clique em um cargo para entender onde ele atua.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {/* PREFEITO */}
            <button
              onClick={() => setCargoSelecionado("prefeito")}
              className={`rounded-2xl border px-5 py-5 text-left transition ${
                cargoSelecionado === "prefeito"
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
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
                </div>

                <div>
                  <p className="text-lg font-bold text-blue-950">
                    Prefeito
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    Município
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Em nosso caso: Salvador
              </p>

              <p className="mt-3 text-sm font-bold text-blue-700">
                Quero entender →
              </p>
            </button>

            {/* GOVERNADOR */}
            <button
              onClick={() => setCargoSelecionado("governador")}
              className={`rounded-2xl border px-5 py-5 text-left transition ${
                cargoSelecionado === "governador"
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-6 w-6"
                  >
                    <path d="M4 20h16" />
                    <path d="M6 20V9h12v11" />
                    <path d="M9 20v-5h6v5" />
                    <path d="M5 9 12 4l7 5" />
                    <path d="M8 12h2M14 12h2" />
                  </svg>
                </div>

                <div>
                  <p className="text-lg font-bold text-blue-950">
                    Governador
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    Estado
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Em nosso caso: Bahia
              </p>

              <p className="mt-3 text-sm font-bold text-blue-700">
                Quero entender →
              </p>
            </button>

            {/* PRESIDENTE */}
            <button
              onClick={() => setCargoSelecionado("presidente")}
              className={`rounded-2xl border px-5 py-5 text-left transition ${
                cargoSelecionado === "presidente"
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img
                    src="/bandeira-brasil.svg"
                    alt="Bandeira do Brasil"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-lg font-bold text-blue-950">
                    Presidente
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    União
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Brasil
              </p>

              <p className="mt-3 text-sm font-bold text-blue-700">
                Quero entender →
              </p>
            </button>
          </div>
        </div>

        {/* FICHA DO CARGO */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-blue-100 bg-blue-50 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {cargo.nivel}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-blue-950">
                {cargo.nome}
              </h2>
            </div>

            <p className="text-sm font-medium text-slate-600">
              {cargo.exemplo}
            </p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                EM PALAVRAS SIMPLES
              </p>

              <p className="mt-2 text-lg font-bold leading-7 text-blue-950">
                {cargo.destaque}
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                {cargo.explicacao}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                EXEMPLO PERTO DE VOCÊ
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                {cargo.situacao}
              </p>
            </div>
          </div>

          <div className="grid border-t border-slate-200 md:grid-cols-2 md:divide-x md:divide-slate-200">
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                ATENÇÃO
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {cargo.atencao}
              </p>
            </div>

            <div className="bg-blue-50/60 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                NOME QUE VOCÊ VAI OUVIR
              </p>

              <p className="mt-2 font-bold text-blue-950">
                {cargo.termo}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Esse é o nome usado para identificar essa parte do poder
                público.
              </p>
            </div>
          </div>
        </div>

        {/* UM NÃO MANDA NO OUTRO */}
        <div className="mt-10 rounded-3xl bg-blue-950 px-6 py-7 text-white md:px-8">
          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                UMA CONFUSÃO MUITO COMUM
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                O presidente é chefe do governador?
              </h2>

              <p className="mt-2 font-bold text-blue-200">
                Não.
              </p>

              <p className="mt-3 max-w-xl leading-7 text-blue-100">
                O governador também não é chefe do prefeito. Cada um atua em
                um nível diferente do poder público.
              </p>
            </div>

            {/* COMPARAÇÃO COMPACTA */}
            <div className="overflow-hidden rounded-2xl border border-blue-700">
              <div className="grid grid-cols-3 divide-x divide-blue-700">
                <div className="px-3 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-blue-300">
                    União
                  </p>
                  <p className="mt-1 font-bold">
                    Presidente
                  </p>
                </div>

                <div className="px-3 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-blue-300">
                    Estado
                  </p>
                  <p className="mt-1 font-bold">
                    Governador
                  </p>
                </div>

                <div className="px-3 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-blue-300">
                    Município
                  </p>
                  <p className="mt-1 font-bold">
                    Prefeito
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-blue-800 pt-5">
            <p className="font-semibold leading-7">
              Não pense nisso como uma escada:
              <span className="font-normal text-blue-100">
                {" "}
                presidente em cima, governador no meio e prefeito embaixo.
              </span>
            </p>

            <p className="mt-2 text-sm leading-6 text-blue-200">
              União, Estados e Municípios têm suas próprias responsabilidades.
              Por isso, o importante é descobrir quem é responsável por cada
              assunto.
            </p>
          </div>
        </div>

        {/* EXEMPLO PRÁTICO */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            NA PRÁTICA
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            Um semáforo de uma avenida da cidade está quebrado há vários dias.
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Você começaria procurando o presidente só porque ele ocupa um
            cargo nacional?
          </p>

          <div className="mt-4 border-l-4 border-green-500 pl-4">
            <p className="font-bold text-green-800">
              Não.
            </p>

            <p className="mt-1 leading-7 text-slate-700">
              Primeiro é preciso descobrir quem administra aquela via e quem é
              responsável pela sinalização naquele local. O cargo que parece
              “maior” não é automaticamente o responsável.
            </p>
          </div>

          <p className="mt-4 font-semibold leading-7 text-blue-950">
            Guarde a regra: descubra quem é responsável pelo serviço antes de
            decidir quem cobrar.
          </p>
        </div>

        {/* PONTE PARA OS TRÊS PODERES */}
        <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            AGORA TEM UMA NOVA PERGUNTA
          </p>

          <div className="mt-2 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-blue-950">
                Prefeito, governador e presidente podem decidir tudo sozinhos?
              </h2>

              <p className="mt-2 leading-7 text-slate-700">
                Não. Os três fazem parte do{" "}
                <strong>Poder Executivo</strong>. Mas o Executivo é apenas um
                dos três Poderes.
              </p>

              <p className="mt-1 font-semibold text-blue-950">
                Existem também o Legislativo e o Judiciário.
              </p>
            </div>

            <Link
              href="/politica-do-zero/tres-poderes"
              className="mt-5 inline-flex shrink-0 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 md:mt-0"
            >
              Conhecer os três Poderes →
            </Link>
          </div>
        </div>

        {/* FONTES */}
        <div className="mt-9 border-t border-slate-200 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            FONTES PARA CONFERIR
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            O conteúdo foi organizado em linguagem simples a partir da
            Constituição Federal, da Constituição do Estado da Bahia e de
            informações oficiais dos órgãos públicos citados.
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