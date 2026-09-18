"use client";

import { useState } from "react";
import Link from "next/link";

type Etapa = "problema" | "ppa" | "ldo" | "loa" | "execucao";

const etapas = {
  problema: {
    numero: "01",
    titulo: "O problema aparece",
    nome: "A rua alaga quando chove",
    texto:
      "Imagine uma moradora de Salvador. Toda vez que chove forte, a rua onde ela mora alaga. A água dificulta a passagem e pode entrar nas casas.",
    pergunta:
      "Se existe dinheiro público, por que a Prefeitura não manda fazer a obra imediatamente?",
    resumo: "Primeiro precisamos entender que o dinheiro público precisa ser planejado.",
  },

  ppa: {
    numero: "02",
    titulo: "É preciso planejar",
    nome: "PPA — Plano Plurianual",
    texto:
      "Antes de pensar apenas no próximo mês, o governo precisa planejar o que pretende fazer nos próximos anos. É aqui que aparecem os grandes objetivos e programas do governo.",
    pergunta:
      "Pense assim: quais problemas importantes queremos enfrentar nos próximos anos?",
    resumo:
      "O PPA é o planejamento para quatro anos. Ele organiza grandes objetivos e metas do governo.",
  },

  ldo: {
    numero: "03",
    titulo: "É preciso olhar para o próximo ano",
    nome: "LDO — Lei de Diretrizes Orçamentárias",
    texto:
      "O governo não consegue fazer tudo ao mesmo tempo. A cada ano, é preciso definir prioridades e regras que vão orientar a preparação do orçamento do ano seguinte.",
    pergunta:
      "Pense assim: dentro do que planejamos, o que terá prioridade no próximo ano?",
    resumo:
      "A LDO faz a ligação entre o planejamento de vários anos e o orçamento do próximo ano.",
  },

  loa: {
    numero: "04",
    titulo: "É preciso colocar no orçamento",
    nome: "LOA — Lei Orçamentária Anual",
    texto:
      "Chegamos ao orçamento do ano. A LOA estima quanto dinheiro deverá entrar e fixa as despesas que poderão ser feitas naquele ano.",
    pergunta:
      "Pense assim: quanto esperamos receber e onde o dinheiro poderá ser usado neste ano?",
    resumo:
      "A LOA é o orçamento anual. É nela que receitas e despesas do ano aparecem de forma organizada.",
  },

  execucao: {
    numero: "05",
    titulo: "Agora vem a execução",
    nome: "Do orçamento para a vida real",
    texto:
      "Mesmo depois de o gasto aparecer no orçamento, a obra não surge automaticamente. Ainda existem etapas administrativas e legais para transformar o planejamento em algo concreto.",
    pergunta:
      "Ter dinheiro previsto significa que amanhã haverá máquinas trabalhando na rua?",
    resumo:
      "Não. Previsão no orçamento e obra concluída são coisas diferentes.",
  },
};

function RainIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-9 w-9"
    >
      <path d="M11 24h18a7 7 0 0 0 0-14 10 10 0 0 0-19-1A7.5 7.5 0 0 0 11 24Z" />
      <path d="m13 29-2 5M21 29l-2 5M29 29l-2 5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <rect x="5" y="7" width="22" height="20" rx="2" />
      <path d="M10 4v6M22 4v6M5 13h22" />
      <path d="M10 18h4M18 18h4M10 22h4" />
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

function PeopleIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <circle cx="16" cy="9" r="4" />
      <circle cx="7" cy="12" r="3" />
      <circle cx="25" cy="12" r="3" />
      <path d="M9 27v-4c0-4 3-7 7-7s7 3 7 7v4" />
      <path d="M2 27v-3c0-3 2-5 5-5 1 0 2 .2 3 .8" />
      <path d="M30 27v-3c0-3-2-5-5-5-1 0-2 .2-3 .8" />
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

export default function QuemDecideOGasto() {
  const [selecionada, setSelecionada] = useState<Etapa>("problema");
  const [resposta, setResposta] = useState<"sim" | "nao" | null>(null);

  const atual = etapas[selecionada];

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
            PASSO 09
          </span>
        </div>

        {/* HERO */}
        <div className="mt-4 max-w-[740px]">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#082b6f] md:text-[42px]">
            Quem decide como o dinheiro será gasto?
          </h1>

          <p className="mt-3 text-[17px] font-bold text-blue-600 md:text-[18px]">
            Existe dinheiro público. Mas quem decide onde ele vai ser usado?
          </p>

          <p className="mt-4 text-[15px] leading-6 text-slate-600 md:text-[16px]">
            Para entender isso, esqueça as siglas por alguns minutos. Vamos
            começar com um problema que poderia acontecer perto da sua casa.
          </p>
        </div>

        {/* HISTÓRIA */}
        <div className="mt-7 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] shadow-sm">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="flex items-center gap-4 px-5 py-5 md:px-6">
              <div className="shrink-0 text-blue-100">
                <RainIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                  IMAGINE ESTA SITUAÇÃO
                </p>

                <h2 className="mt-1 text-[19px] font-extrabold leading-6 text-white">
                  Toda vez que chove,
                  <br />
                  a rua alaga.
                </h2>
              </div>
            </div>

            <div className="border-t border-blue-700/60 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[13px] leading-5 text-blue-50">
                Uma moradora vê o problema todos os anos. A água toma a rua,
                atrapalha a passagem e pode chegar às casas.
              </p>

              <p className="mt-2 text-[13px] font-bold leading-5 text-white">
                Ela pergunta: “Por que o governo não pega o dinheiro e resolve
                isso?”
              </p>
            </div>
          </div>
        </div>

        {/* RESPOSTA INICIAL */}
        <div className="mt-6 border-l-[3px] border-blue-500 py-1 pl-4">
          <p className="text-[14px] font-extrabold text-[#082b6f]">
            Porque dinheiro público não funciona como uma carteira pessoal.
          </p>

          <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-slate-600">
            Antes de gastar, o poder público precisa planejar, preparar o
            orçamento e seguir regras.
          </p>
        </div>

        {/* CAMINHO */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            ACOMPANHE O CAMINHO
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            Da rua alagada até o orçamento
          </h2>

          <p className="mt-2 max-w-[700px] text-[13px] leading-5 text-slate-500">
            Clique em cada etapa. Primeiro entenda a lógica. Depois vamos
            aprender os nomes oficiais.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {(Object.keys(etapas) as Etapa[]).map((chave, index) => {
              const item = etapas[chave];
              const ativo = selecionada === chave;

              return (
                <button
                  key={chave}
                  type="button"
                  onClick={() => setSelecionada(chave)}
                  className={`grid w-full grid-cols-[40px_1fr_22px] items-center gap-3 px-4 py-3.5 text-left transition md:px-5 ${
                    index !== 0 ? "border-t border-slate-200" : ""
                  } ${ativo ? "bg-blue-50" : "bg-white hover:bg-slate-50"}`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold ${
                      ativo
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.numero}
                  </div>

                  <div>
                    <p className="text-[13px] font-extrabold text-[#082b6f]">
                      {item.titulo}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {chave === "problema"
                        ? "Começamos pela vida real"
                        : chave === "ppa"
                        ? "Pensar nos próximos anos"
                        : chave === "ldo"
                        ? "Escolher prioridades para o próximo ano"
                        : chave === "loa"
                        ? "Organizar o dinheiro daquele ano"
                        : "Transformar planejamento em ação"}
                    </p>
                  </div>

                  <span
                    className={`text-lg ${
                      ativo ? "text-blue-600" : "text-slate-300"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* DETALHE */}
          <div className="mt-4 overflow-hidden rounded-xl border border-blue-200 bg-white shadow-sm">
            <div className="border-b border-blue-100 bg-blue-50 px-5 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                {atual.numero} · {atual.titulo}
              </p>

              <h3 className="mt-1 text-[18px] font-extrabold text-[#082b6f]">
                {atual.nome}
              </h3>
            </div>

            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <div className="px-5 py-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  EM PALAVRAS SIMPLES
                </p>

                <p className="mt-2 text-[13px] leading-6 text-slate-700">
                  {atual.texto}
                </p>
              </div>

              <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 md:border-l md:border-t-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                  PENSE ASSIM
                </p>

                <p className="mt-2 text-[13px] font-bold leading-6 text-[#082b6f]">
                  {atual.pergunta}
                </p>
              </div>
            </div>

            <div className="border-t border-blue-100 px-5 py-3">
              <p className="text-[12px] font-bold leading-5 text-blue-700">
                → {atual.resumo}
              </p>
            </div>
          </div>
        </div>

        {/* AGORA OS NOMES */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-600">
            AGORA QUE VOCÊ ENTENDEU O CAMINHO
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            Esses passos têm nomes.
          </h2>

          <p className="mt-2 max-w-[700px] text-[13px] leading-5 text-slate-600">
            Você não precisa decorar as siglas. Primeiro lembre o que cada uma
            faz.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* PPA */}
            <div className="grid gap-3 px-5 py-4 md:grid-cols-[70px_1fr_230px] md:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CalendarIcon />
              </div>

              <div>
                <p className="text-[16px] font-extrabold text-[#082b6f]">
                  PPA
                </p>

                <p className="text-[11px] font-bold text-blue-600">
                  Plano Plurianual
                </p>
              </div>

              <p className="text-[12px] leading-5 text-slate-600">
                Pense nos <strong>próximos quatro anos</strong>: quais são os
                grandes objetivos e metas?
              </p>
            </div>

            {/* LDO */}
            <div className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[70px_1fr_230px] md:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CalendarIcon />
              </div>

              <div>
                <p className="text-[16px] font-extrabold text-[#082b6f]">
                  LDO
                </p>

                <p className="text-[11px] font-bold text-blue-600">
                  Lei de Diretrizes Orçamentárias
                </p>
              </div>

              <p className="text-[12px] leading-5 text-slate-600">
                Pense no <strong>próximo ano</strong>: quais são as prioridades
                e quais regras vão orientar o orçamento?
              </p>
            </div>

            {/* LOA */}
            <div className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[70px_1fr_230px] md:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MoneyIcon />
              </div>

              <div>
                <p className="text-[16px] font-extrabold text-[#082b6f]">
                  LOA
                </p>

                <p className="text-[11px] font-bold text-blue-600">
                  Lei Orçamentária Anual
                </p>
              </div>

              <p className="text-[12px] leading-5 text-slate-600">
                Pense no <strong>dinheiro daquele ano</strong>: quanto deve
                entrar e quais despesas estão previstas?
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3">
            <p className="text-[12px] font-bold leading-5 text-blue-800">
              PPA = planejar os próximos anos → LDO = orientar o próximo ano →
              LOA = orçamento daquele ano.
            </p>
          </div>
        </div>

        {/* QUEM PARTICIPA */}
        <div className="mt-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 text-blue-600">
              <PeopleIcon />
            </div>

            <div className="w-full">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                QUEM PARTICIPA?
              </p>

              <h2 className="mt-1 text-[20px] font-extrabold text-[#082b6f]">
                Não é uma decisão de uma pessoa só.
              </h2>
            </div>
          </div>

          <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
            <div className="grid gap-1 py-3 md:grid-cols-[210px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Poder Executivo
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Prepara as propostas do PPA, da LDO e da LOA e, depois de
                aprovadas, executa o orçamento seguindo as regras.
              </p>
            </div>

            <div className="grid gap-1 py-3 md:grid-cols-[210px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Poder Legislativo
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Discute e vota essas propostas, pode apresentar mudanças
                dentro das regras e fiscaliza o uso do dinheiro público.
              </p>
            </div>

            <div className="grid gap-1 py-3 md:grid-cols-[210px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Órgãos públicos
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Dentro de suas funções, ajudam a transformar o orçamento em
                serviços, compras, contratos, obras e outras ações.
              </p>
            </div>

            <div className="grid gap-1 py-3 md:grid-cols-[210px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Cidadão
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Pode acompanhar as decisões e fiscalizar como o dinheiro está
                sendo usado.
              </p>
            </div>
          </div>
        </div>

        {/* NÃO CONFUNDA */}
        <div className="mt-6 overflow-hidden rounded-xl border border-amber-200 bg-[#fff9e9]">
          <div className="grid md:grid-cols-[220px_1fr] md:items-center">
            <div className="px-4 py-4 md:px-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-700">
                NÃO CONFUNDA
              </p>

              <p className="mt-1 text-[14px] font-extrabold leading-5 text-[#082b6f]">
                Estar no orçamento não significa obra pronta.
              </p>
            </div>

            <div className="border-t border-amber-200 px-4 py-4 md:border-l md:border-t-0 md:px-5">
              <p className="text-[13px] leading-5 text-slate-700">
                O orçamento é uma etapa importante. Depois ainda existem
                procedimentos para o dinheiro ser realmente gasto e para uma
                obra ou serviço sair do papel.
              </p>
            </div>
          </div>
        </div>

        {/* TESTE */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            TESTE RÁPIDO
          </p>

          <h2 className="mt-1.5 text-[18px] font-extrabold text-[#082b6f]">
            Uma obra apareceu no orçamento.
          </h2>

          <p className="mt-1 text-[13px] leading-5 text-slate-600">
            Isso significa que ela já está garantida e será feita
            imediatamente?
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
              Sim. Se apareceu, a obra já está garantida.
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
              Não. Ainda existem outras etapas.
            </button>
          </div>

          {resposta === "sim" && (
            <div className="mt-3 border-l-[3px] border-amber-400 pl-3">
              <p className="text-[13px] font-extrabold text-amber-800">
                Cuidado.
              </p>

              <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                Estar previsto no orçamento não significa que a obra já foi
                contratada, iniciada ou concluída.
              </p>
            </div>
          )}

          {resposta === "nao" && (
            <div className="mt-3 border-l-[3px] border-green-500 pl-3">
              <p className="text-[13px] font-extrabold text-green-800">
                Isso.
              </p>

              <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                O orçamento é uma parte do caminho. Depois precisamos
                acompanhar o que realmente aconteceu com aquele dinheiro.
              </p>
            </div>
          )}
        </div>

        {/* FISCALIZAÇÃO */}
        <div className="mt-8 border-y border-slate-200 py-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 text-blue-600">
              <SearchIcon />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-600">
                VOLTANDO PARA A RUA ALAGADA
              </p>

              <h2 className="mt-1 text-[18px] font-extrabold text-[#082b6f]">
                Agora a moradora já sabe fazer perguntas melhores.
              </h2>

              <div className="mt-3 space-y-2 text-[13px] leading-5 text-slate-600">
                <p>→ Existe alguma ação planejada para enfrentar esse problema?</p>
                <p>→ Existe dinheiro previsto no orçamento?</p>
                <p>→ Qual órgão é responsável?</p>
                <p>→ O dinheiro já começou a ser gasto?</p>
                <p>→ Existe contrato ou obra em andamento?</p>
              </div>
            </div>
          </div>
        </div>

        {/* FECHAMENTO */}
        <div className="mt-6 border-l-[3px] border-blue-600 py-1 pl-4">
          <p className="text-[14px] font-extrabold text-[#082b6f]">
            Guarde esta ideia:
          </p>

          <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-slate-600">
            O orçamento transforma planos em autorização para usar dinheiro
            público. Mas o cidadão ainda precisa acompanhar se aquilo que foi
            planejado realmente saiu do papel.
          </p>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <Link
            href="/politica-do-zero/de-onde-vem-o-dinheiro/como-o-dinheiro-circula"
            className="text-[13px] font-bold text-slate-500 transition hover:text-blue-700"
          >
            ← Voltar
          </Link>

          <Link
            href="/politica-do-zero/como-acompanhar-e-fiscalizar"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Passo 10: acompanhar e fiscalizar →
          </Link>
        </div>
      </section>
    </main>
  );
}