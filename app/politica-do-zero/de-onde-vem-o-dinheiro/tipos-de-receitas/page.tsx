"use client";

import { useState } from "react";
import Link from "next/link";

type Tipo =
  | "tributos"
  | "municipio"
  | "estado"
  | "uniao"
  | "outras";

const tipos = {
  tributos: {
    numero: "01",
    titulo: "Tributos",
    resumo: "Impostos, taxas e outras espécies",
    pergunta: "É tudo imposto?",
    explicacao:
      "Não. Imposto é apenas um tipo de tributo. A Constituição também prevê taxas, contribuição de melhoria e outras espécies tributárias com regras próprias.",
    exemplo:
      "IPTU, ISS, IPVA e Imposto de Renda são impostos. Mas a arrecadação pública não se limita a eles.",
    destaque: "Tributo ≠ imposto",
  },

  municipio: {
    numero: "02",
    titulo: "Receitas do Município",
    resumo: "Ex.: IPTU, ISS e outras receitas",
    pergunta: "Salvador arrecada dinheiro diretamente?",
    explicacao:
      "Sim. O Município possui receitas próprias. Entre elas estão tributos de competência municipal e outras receitas previstas na legislação.",
    exemplo:
      "IPTU e ISS são exemplos de impostos municipais. Salvador também pode receber dinheiro por outras fontes.",
    destaque: "Município também arrecada",
  },

  estado: {
    numero: "03",
    titulo: "Receitas do Estado",
    resumo: "Ex.: ICMS, IPVA e outras receitas",
    pergunta: "A Bahia também possui arrecadação própria?",
    explicacao:
      "Sim. Os estados possuem tributos de sua competência e também podem obter recursos por outras fontes previstas em lei.",
    exemplo:
      "ICMS e IPVA são exemplos conhecidos de impostos estaduais.",
    destaque: "Estado também arrecada",
  },

  uniao: {
    numero: "04",
    titulo: "Receitas da União",
    resumo: "Ex.: Imposto de Renda e outras receitas",
    pergunta: "E o Governo Federal?",
    explicacao:
      "A União também possui receitas próprias, incluindo tributos de sua competência e outras fontes de recursos.",
    exemplo:
      "O Imposto de Renda é um exemplo de imposto federal. Mas nem todo dinheiro arrecadado pela União fica necessariamente com ela.",
    destaque: "União também arrecada",
  },

  outras: {
    numero: "05",
    titulo: "Outras receitas",
    resumo: "Patrimônio, serviços e outras fontes",
    pergunta: "Existe dinheiro público que não vem de tributo?",
    explicacao:
      "Sim. O poder público pode receber receitas que não são tributos. Existem, por exemplo, receitas patrimoniais, receitas de determinados serviços e outras fontes previstas na legislação.",
    exemplo:
      "Em certas situações, o uso de um bem público pode gerar receita patrimonial. Também existem receitas de serviços e outras categorias.",
    destaque: "Nem toda receita é tributo",
  },
};

function CoinsIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <ellipse cx="16" cy="8" rx="9" ry="4" />
      <path d="M7 8v6c0 2.2 4 4 9 4s9-1.8 9-4V8" />
      <path d="M7 14v6c0 2.2 4 4 9 4s9-1.8 9-4v-6" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <path d="M5 28h22" />
      <path d="M8 28V10h16v18" />
      <path d="M6 10 16 4l10 6" />
      <path d="M12 14v3M20 14v3M12 21v3M20 21v3" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <path d="M8 29V4" />
      <path d="M9 6h15l-3 5 3 5H9" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <rect x="4" y="8" width="24" height="18" rx="3" />
      <path d="M4 12h24" />
      <path d="M21 17h7v5h-7a2.5 2.5 0 0 1 0-5Z" />
    </svg>
  );
}

function OtherIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <circle cx="16" cy="16" r="11" />
      <path d="M10 16h12M16 10v12" />
    </svg>
  );
}

const icones = {
  tributos: <CoinsIcon />,
  municipio: <BuildingIcon />,
  estado: <FlagIcon />,
  uniao: <WalletIcon />,
  outras: <OtherIcon />,
};

export default function TiposDeReceitas() {
  const [selecionado, setSelecionado] = useState<Tipo>("tributos");

  const atual = tipos[selecionado];

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
            PARTE 2 DE 3
          </span>
        </div>

        {/* INTRODUÇÃO */}
        <div className="mt-4 max-w-[720px]">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#082b6f] md:text-[42px]">
            Tipos de receitas públicas
          </h1>

          <p className="mt-3 text-[17px] font-bold text-blue-600 md:text-[18px]">
            Nem todo dinheiro público vem de impostos.
          </p>

          <p className="mt-4 text-[15px] leading-6 text-slate-600 md:text-[16px]">
            O poder público pode receber recursos por diferentes caminhos.
            Agora vamos separar essas ideias sem complicar.
          </p>
        </div>

        {/* IDEIA PRINCIPAL */}
        <div className="mt-7 flex items-start gap-4 rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] px-5 py-5 text-white shadow-sm md:px-6">
          <div className="mt-0.5 shrink-0">
            <CoinsIcon />
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
              A IDEIA MAIS IMPORTANTE
            </p>

            <p className="mt-1 text-[17px] font-extrabold leading-6">
              Receita pública é o dinheiro que entra nos cofres públicos
              conforme as regras aplicáveis.
            </p>

            <p className="mt-2 text-[13px] leading-5 text-blue-100">
              Tributos são uma fonte importante, mas não são a única.
            </p>
          </div>
        </div>

        {/* ESCOLHA */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            CLIQUE PARA ENTENDER
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            De onde o dinheiro pode vir?
          </h2>

          <p className="mt-2 text-[13px] leading-5 text-slate-500">
            Escolha uma opção. A explicação aparecerá logo abaixo.
          </p>

          {/* LISTA */}
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {(Object.keys(tipos) as Tipo[]).map((tipo, index) => {
              const item = tipos[tipo];
              const ativo = selecionado === tipo;

              return (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setSelecionado(tipo)}
                  className={`grid w-full grid-cols-[46px_1fr_24px] items-center gap-3 px-4 py-3.5 text-left transition md:grid-cols-[52px_1fr_24px] md:px-5 ${
                    index !== 0 ? "border-t border-slate-200" : ""
                  } ${
                    ativo
                      ? "bg-blue-50"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      ativo
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {icones[tipo]}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-blue-400">
                        {item.numero}
                      </span>

                      <p className="text-[14px] font-extrabold text-[#082b6f]">
                        {item.titulo}
                      </p>
                    </div>

                    <p className="mt-0.5 text-[12px] text-slate-500">
                      {item.resumo}
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
        </div>

        {/* CONTEÚDO SELECIONADO */}
        <div className="mt-4 overflow-hidden rounded-xl border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              {icones[selecionado]}
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                ENTENDA
              </p>

              <h3 className="text-[17px] font-extrabold text-[#082b6f]">
                {atual.pergunta}
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="px-5 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                EM PALAVRAS SIMPLES
              </p>

              <p className="mt-2 text-[13px] leading-6 text-slate-700">
                {atual.explicacao}
              </p>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 md:border-l md:border-t-0">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                EXEMPLO
              </p>

              <p className="mt-2 text-[13px] leading-6 text-slate-600">
                {atual.exemplo}
              </p>
            </div>
          </div>

          <div className="border-t border-blue-100 px-5 py-3">
            <p className="text-[12px] font-extrabold text-blue-700">
              → {atual.destaque}
            </p>
          </div>
        </div>

        {/* NÃO CONFUNDA */}
        <div className="mt-5 overflow-hidden rounded-xl border border-amber-200 bg-[#fff9e9]">
          <div className="grid md:grid-cols-[190px_1fr] md:items-center">
            <div className="px-4 py-4 md:px-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-700">
                NÃO CONFUNDA
              </p>

              <p className="mt-1 text-[14px] font-extrabold leading-5 text-[#082b6f]">
                Receita pública é maior que “imposto”.
              </p>
            </div>

            <div className="border-t border-amber-200 px-4 py-4 md:border-l md:border-t-0 md:px-5">
              <p className="text-[13px] leading-5 text-slate-700">
                Quando alguém diz que todo dinheiro público “vem dos
                impostos”, está simplificando demais. Existem{" "}
                <strong>outras formas de receita pública.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* EXEMPLO VISUAL */}
        <div className="mt-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            PENSE ASSIM
          </p>

          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid md:grid-cols-3 md:divide-x md:divide-slate-200">
              <div className="px-4 py-4 text-center">
                <p className="text-[11px] font-extrabold uppercase text-blue-500">
                  TRIBUTOS
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#082b6f]">
                  Uma fonte
                </p>
              </div>

              <div className="border-t border-slate-200 px-4 py-4 text-center md:border-t-0">
                <p className="text-[11px] font-extrabold uppercase text-blue-500">
                  OUTRAS RECEITAS
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#082b6f]">
                  Outras fontes
                </p>
              </div>

              <div className="border-t border-slate-200 px-4 py-4 text-center md:border-t-0">
                <p className="text-[11px] font-extrabold uppercase text-green-600">
                  RESULTADO
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#082b6f]">
                  Recursos públicos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PONTE */}
        <div className="mt-6 border-l-[3px] border-green-500 py-1 pl-4">
          <p className="text-[14px] font-extrabold text-[#082b6f]">
            Mas falta uma peça importante.
          </p>

          <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-slate-600">
            Um governo também pode receber recursos arrecadados por outro.
            É isso que vamos entender na próxima página.
          </p>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <Link
            href="/politica-do-zero/de-onde-vem-o-dinheiro"
            className="text-[13px] font-bold text-slate-500 transition hover:text-blue-700"
          >
            ← Voltar
          </Link>

          <Link
            href="/politica-do-zero/de-onde-vem-o-dinheiro/como-o-dinheiro-circula"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Próximo: como o dinheiro circula →
          </Link>
        </div>

        {/* PROGRESSO */}
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          <div className="h-1 rounded-full bg-blue-600" />
          <div className="h-1 rounded-full bg-blue-600" />
          <div className="h-1 rounded-full bg-slate-200" />
        </div>
      </section>
    </main>
  );
}