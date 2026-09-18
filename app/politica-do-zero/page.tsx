import Link from "next/link";

type Tema = {
  numero: string;
  titulo: string;
  descricao: string;
  href: string;
  grupo: "base" | "decisoes" | "pratica";
  destaque?: string;
};

const temas: Tema[] = [
  {
    numero: "01",
    titulo: "O que é política?",
    descricao:
      "Veja como decisões sobre transporte, escola, segurança, impostos e outros assuntos do dia a dia também fazem parte da política.",
    href: "/politica-do-zero/o-que-e-politica",
    grupo: "base",
  },
  {
    numero: "02",
    titulo: "Quem é responsável pelo quê?",
    descricao:
      "Prefeitura, Governo da Bahia ou Governo Federal? Aprenda por onde começar quando existe um problema.",
    href: "/politica-do-zero/quem-e-responsavel",
    grupo: "base",
  },
  {
    numero: "03",
    titulo: "Estado e Governo são a mesma coisa?",
    descricao:
      "Entenda por que os governos mudam, mas o Estado e suas instituições continuam existindo.",
    href: "/politica-do-zero/estado-e-governo",
    grupo: "base",
  },
  {
    numero: "04",
    titulo: "Prefeito, governador e presidente",
    descricao:
      "Entenda o que cada um administra e por que presidente, governador e prefeito não são chefes uns dos outros.",
    href: "/politica-do-zero/prefeito-governador-presidente",
    grupo: "base",
  },
  {
    numero: "05",
    titulo: "Os três Poderes",
    descricao:
      "Entenda por que quem governa não pode decidir tudo sozinho e conheça Executivo, Legislativo e Judiciário.",
    href: "/politica-do-zero/tres-poderes",
    grupo: "base",
  },
  {
    numero: "06",
    titulo: "Vereador, deputados e senador",
    descricao:
      "Descubra onde cada representante atua: Município, Estado ou União.",
    href: "/politica-do-zero/vereadores-deputados-senadores",
    grupo: "base",
  },
  {
    numero: "07",
    titulo: "O que é uma lei?",
    descricao:
      "Acompanhe o caminho de uma proposta e entenda como ela pode se transformar em lei.",
    href: "/politica-do-zero/o-que-e-uma-lei",
    grupo: "decisoes",
  },
  {
    numero: "08",
    titulo: "De onde vem o dinheiro público?",
    descricao:
      "Entenda como o dinheiro entra nos cofres públicos, quais são as principais receitas e como recursos podem passar de um governo para outro.",
    href: "/politica-do-zero/de-onde-vem-o-dinheiro",
    grupo: "decisoes",
    destaque: "3 partes",
  },
  {
    numero: "09",
    titulo: "Quem decide como o dinheiro será gasto?",
    descricao:
      "Parta de um problema do bairro para entender planejamento, prioridades e orçamento público.",
    href: "/politica-do-zero/quem-decide-o-gasto",
    grupo: "decisoes",
  },
  {
    numero: "10",
    titulo: "Como eu acompanho e fiscalizo?",
    descricao:
      "Aprenda a procurar responsáveis, valores, contratos, pagamentos e informações sobre uma obra ou serviço público.",
    href: "/politica-do-zero/como-acompanhar-e-fiscalizar",
    grupo: "pratica",
  },
];

const grupos = [
  {
    id: "base",
    numero: "1",
    titulo: "Primeiro, entenda quem faz o quê",
    descricao:
      "Comece pelas bases: política, responsabilidades, governos, Poderes e representantes.",
  },
  {
    id: "decisoes",
    numero: "2",
    titulo: "Depois, entenda como as decisões viram ações",
    descricao:
      "Veja como entram as leis, o dinheiro público, o planejamento e o orçamento.",
  },
  {
    id: "pratica",
    numero: "3",
    titulo: "Por fim, use isso na prática",
    descricao:
      "Aprenda a procurar informações e acompanhar o que o poder público está fazendo.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function PathIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-7 w-7"
    >
      <circle cx="7" cy="7" r="3" />
      <circle cx="25" cy="25" r="3" />
      <path d="M7 10v4c0 3 2 5 5 5h8c3 0 5 2 5 5v-2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function PoliticaDoZero() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-[15px] font-extrabold tracking-tight text-[#082b6f]"
          >
            Observa Salvador
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-blue-600 transition hover:text-blue-800"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1000px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <div className="max-w-[760px]">
          <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
            POLÍTICA DO ZERO
          </span>

          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#082b6f] md:text-[44px]">
            Entenda como o poder público funciona, começando do começo.
          </h1>

          <p className="mt-4 max-w-[700px] text-[15px] leading-6 text-slate-600 md:text-[16px]">
            Você não precisa saber nada sobre política para começar. A trilha
            parte de situações do dia a dia e, passo a passo, mostra quem é
            responsável, quem decide, de onde vem o dinheiro e como você pode
            acompanhar.
          </p>
        </div>

        {/* COMO USAR */}
        <div className="mt-6 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
          <div className="grid md:grid-cols-[58px_1fr_auto] md:items-center">
            <div className="flex items-center justify-center bg-blue-50 px-4 py-4 text-blue-600 md:h-full">
              <PathIcon />
            </div>

            <div className="border-t border-blue-100 px-5 py-4 md:border-l md:border-t-0">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Nunca estudou política? Comece pelo Passo 01.
              </p>

              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                Os assuntos foram colocados em uma ordem para que uma coisa
                ajude você a entender a próxima. Se quiser, também pode abrir
                diretamente um assunto específico.
              </p>
            </div>

            <div className="border-t border-blue-100 px-5 py-4 md:border-l md:border-t-0">
              <Link
                href="/politica-do-zero/o-que-e-politica"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-[12px] font-extrabold text-white transition hover:bg-blue-700"
              >
                Começar pelo 01
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRILHA */}
      <section className="mx-auto max-w-[1000px] px-5 pb-12 md:px-8">
        <div className="flex items-end justify-between gap-5 border-b border-slate-200 pb-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
              SUA TRILHA
            </p>

            <h2 className="mt-1 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
              10 passos para entender do básico à fiscalização
            </h2>
          </div>

          <p className="hidden text-[12px] font-bold text-slate-400 sm:block">
            Comece do zero ou escolha um tema
          </p>
        </div>

        <div className="mt-6 space-y-9">
          {grupos.map((grupo) => {
            const temasDoGrupo = temas.filter(
              (tema) => tema.grupo === grupo.id
            );

            return (
              <div key={grupo.id}>
                {/* TÍTULO DO BLOCO */}
                <div className="mb-3 grid gap-2 md:grid-cols-[38px_1fr] md:items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#082b6f] text-[11px] font-extrabold text-white">
                    {grupo.numero}
                  </div>

                  <div>
                    <h3 className="text-[15px] font-extrabold text-[#082b6f]">
                      {grupo.titulo}
                    </h3>

                    <p className="mt-0.5 text-[12px] leading-5 text-slate-500">
                      {grupo.descricao}
                    </p>
                  </div>
                </div>

                {/* AULAS */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {temasDoGrupo.map((tema, index) => (
                    <Link
                      key={tema.numero}
                      href={tema.href}
                      className={`group grid gap-3 px-4 py-4 transition hover:bg-blue-50/60 sm:grid-cols-[48px_1fr_auto] sm:items-center md:px-5 ${
                        index !== 0 ? "border-t border-slate-200" : ""
                      }`}
                    >
                      {/* NÚMERO */}
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[12px] font-extrabold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                        {tema.numero}
                      </div>

                      {/* CONTEÚDO */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-[14px] font-extrabold leading-5 text-[#082b6f] transition group-hover:text-blue-700 md:text-[15px]">
                            {tema.titulo}
                          </h4>

                          {tema.destaque && (
                            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-amber-700">
                              {tema.destaque}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 max-w-[700px] text-[12px] leading-5 text-slate-500">
                          {tema.descricao}
                        </p>
                      </div>

                      {/* SETA */}
                      <div className="hidden items-center gap-1 text-[11px] font-extrabold text-blue-600 sm:flex">
                        Abrir
                        <span className="transition-transform group-hover:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RACIOCÍNIO COMPLETO */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            UMA COISA LEVA À OUTRA
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            Do problema do bairro até a fiscalização.
          </h2>

          <p className="mt-2 max-w-[700px] text-[13px] leading-5 text-slate-500">
            Ao terminar a trilha, a ideia é que você consiga seguir este
            raciocínio quando encontrar um problema ou quiser entender uma
            decisão pública.
          </p>

          {/* FLUXO */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div className="grid md:grid-cols-7">
              {[
                ["01", "Problema"],
                ["02", "Responsável"],
                ["03", "Governo"],
                ["04", "Decisão"],
                ["05", "Dinheiro"],
                ["06", "Gasto"],
                ["07", "Fiscalização"],
              ].map(([numero, texto], index) => (
                <div
                  key={numero}
                  className={`relative px-3 py-4 text-center ${
                    index !== 0
                      ? "border-t border-slate-200 md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <p className="text-[9px] font-extrabold text-blue-500">
                    {numero}
                  </p>

                  <p className="mt-1 text-[12px] font-extrabold text-[#082b6f]">
                    {texto}
                  </p>

                  {index < 6 && (
                    <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-white px-0.5 text-blue-300 md:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* EXEMPLO */}
          <div className="mt-5 grid gap-3 md:grid-cols-[170px_1fr] md:items-start">
            <p className="text-[12px] font-extrabold text-blue-700">
              Na prática:
            </p>

            <p className="text-[13px] leading-6 text-slate-600">
              “Tem um problema no meu bairro. Quem deveria cuidar disso? Qual
              governo é responsável? Quem toma a decisão? Existe dinheiro para
              resolver? Quanto foi gasto? Onde eu posso conferir?”
            </p>
          </div>
        </div>
      </section>

      {/* O QUE A PESSOA LEVA */}
      <section className="mx-auto max-w-[1000px] px-5 py-10 md:px-8">
        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-600">
              AO FINAL DA TRILHA
            </p>

            <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
              Você não precisa decorar a máquina pública.
            </h2>

            <p className="mt-3 text-[13px] leading-6 text-slate-600">
              O objetivo é aprender a fazer as perguntas certas e saber onde
              procurar respostas.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {[
              "Identificar qual governo pode ser responsável.",
              "Entender quem administra e quem fiscaliza.",
              "Entender de onde vem o dinheiro público.",
              "Perceber que orçamento e gasto não são a mesma coisa.",
              "Procurar documentos e informações oficiais.",
            ].map((texto, index) => (
              <div
                key={texto}
                className={`flex items-start gap-3 px-4 py-3 ${
                  index !== 0 ? "border-t border-slate-200" : ""
                }`}
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckIcon />
                </div>

                <p className="text-[12px] font-semibold leading-5 text-slate-700">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPROMISSO EDITORIAL */}
        <div className="mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68]">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="px-5 py-5 md:px-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                COMPROMISSO DO OBSERVA SALVADOR
              </p>

              <h2 className="mt-1.5 text-[18px] font-extrabold leading-6 text-white">
                Informação para você formar sua própria opinião.
              </h2>
            </div>

            <div className="border-t border-blue-700/60 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[13px] leading-5 text-blue-50">
                O Observa Salvador apresenta informações verificáveis, contexto
                e fontes para ajudar você a entender o funcionamento do poder
                público.
              </p>

              <p className="mt-2 text-[12px] font-bold leading-5 text-blue-200">
                A plataforma não escolhe uma posição política por você nem
                recomenda em quem votar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-[13px] font-extrabold text-[#082b6f]">
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