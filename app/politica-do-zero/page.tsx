import Link from "next/link";

const temas = [
  {
    numero: "01",
    icone: "💬",
    titulo: "O que é política?",
    descricao:
      "Entenda como decisões sobre saúde, transporte, escola, segurança, impostos e outros assuntos do dia a dia também fazem parte da política.",
    href: "/politica-do-zero/o-que-e-politica",
  },
  {
    numero: "02",
    icone: "🧭",
    titulo: "Quem é responsável pelo quê?",
    descricao:
      "Prefeito, governador ou presidente? Entenda quem cuida de cada coisa e saiba por onde começar quando existe um problema.",
    href: "/politica-do-zero/quem-e-responsavel",
  },
  {
    numero: "03",
    icone: "🏛️",
    titulo: "Estado e Governo são a mesma coisa?",
    descricao:
      "Entenda o que é o Estado, o que é o governo e por que o governo pode mudar sem o Estado deixar de existir.",
    href: "/politica-do-zero/estado-e-governo",
  },
  {
    numero: "04",
    icone: "👤",
    titulo: "Prefeito, governador e presidente: o que cada um faz?",
    descricao:
      "Conheça o papel dos chefes do Poder Executivo no Município, no Estado e na União — e entenda por que nenhum deles pode decidir tudo sozinho.",
    href: "/politica-do-zero/prefeito-governador-presidente",
  },
  {
    numero: "05",
    icone: "⚖️",
    titulo: "Os três Poderes",
    descricao:
      "Entenda as diferenças entre Executivo, Legislativo e Judiciário, o papel de cada Poder e por que eles não exercem a mesma função.",
    href: "/politica-do-zero/tres-poderes",
  },
  {
    numero: "06",
    icone: "🗳️",
    titulo: "Vereador, deputado estadual, deputado federal e senador",
    descricao:
      "Entenda onde cada representante atua, quem ele representa e a diferença entre Câmara Municipal, Assembleia Legislativa, Câmara dos Deputados e Senado Federal.",
    href: "/politica-do-zero/vereadores-deputados-senadores",
  },
  {
    numero: "07",
    icone: "📜",
    titulo: "O que é uma lei?",
    descricao:
      "Entenda para que servem as leis, quem pode apresentar propostas e como uma ideia pode se transformar em uma regra válida para a sociedade.",
    href: "/politica-do-zero/o-que-e-uma-lei",
  },
  {
    numero: "08",
    icone: "💰",
    titulo: "De onde vem o dinheiro público?",
    descricao:
      "Entenda impostos, taxas e outras receitas públicas e descubra de onde vem o dinheiro usado pelo poder público.",
    href: "/politica-do-zero/de-onde-vem-o-dinheiro",
  },
  {
    numero: "09",
    icone: "📊",
    titulo: "Quem decide como o dinheiro será gasto?",
    descricao:
      "Entenda orçamento público, prioridades de governo e a participação do Legislativo na definição e fiscalização dos gastos públicos.",
    href: "/politica-do-zero/como-o-dinheiro-e-gasto",
  },
  {
    numero: "10",
    icone: "🔎",
    titulo: "Como eu acompanho e fiscalizo?",
    descricao:
      "Aprenda onde consultar gastos, obras, contratos e decisões públicas e conheça caminhos para pedir informações, cobrar providências e denunciar irregularidades.",
    href: "/politica-do-zero/como-fiscalizar",
  },
];

export default function PoliticaDoZero() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold text-blue-950">
            Observa Salvador
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      {/* APRESENTAÇÃO */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-12 md:pt-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            POLÍTICA DO ZERO
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            Entenda como a política funciona, começando do começo.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Você não precisa entender de política para começar. A trilha parte
            de situações do dia a dia e explica, em linguagem simples, quem
            decide, quem administra, de onde vem o dinheiro e como o cidadão
            pode acompanhar o poder público.
          </p>
        </div>

        {/* ORIENTAÇÃO */}
        <div className="mt-9 rounded-3xl border border-blue-100 bg-blue-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="font-bold text-blue-950">
              Comece pelo 01 ou escolha o assunto que quer entender.
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              Os conteúdos se conectam, mas você pode consultar qualquer tema
              separadamente.
            </p>
          </div>

          <div className="mt-4 shrink-0 text-4xl md:mt-0">🧭</div>
        </div>
      </section>

      {/* TRILHA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              SUA TRILHA
            </p>

            <h2 className="mt-2 text-2xl font-bold text-blue-950">
              Política do Zero
            </h2>
          </div>

          <p className="hidden text-sm font-medium text-slate-500 sm:block">
            10 temas essenciais
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {temas.map((tema) => (
            <Link
              key={tema.numero}
              href={tema.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  {tema.icone}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-blue-600">
                      {tema.numero}
                    </span>

                    <span className="h-px w-7 bg-blue-200" />
                  </div>

                  <h3 className="mt-2 text-xl font-bold leading-7 text-blue-950 transition group-hover:text-blue-700">
                    {tema.titulo}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {tema.descricao}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-700">
                    Entender este tema
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMO A TRILHA SE CONECTA */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            UMA COISA LEVA À OUTRA
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-950">
            Do problema do dia a dia até a fiscalização.
          </h2>

          <div className="mt-7 grid gap-3 md:grid-cols-5">
            {[
              ["1", "Qual é o problema?"],
              ["2", "Quem é responsável?"],
              ["3", "Quem administra?"],
              ["4", "Quem decide e fiscaliza?"],
              ["5", "Onde posso acompanhar e cobrar?"],
            ].map(([numero, texto]) => (
              <div
                key={numero}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <span className="text-sm font-bold text-blue-600">
                  {numero}
                </span>

                <p className="mt-2 font-semibold leading-6 text-blue-950">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPROMISSO EDITORIAL */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-blue-950 p-7 text-white md:p-9">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
            COMPROMISSO DO OBSERVA SALVADOR
          </p>

          <h2 className="mt-3 max-w-2xl text-2xl font-bold">
            Informação para você formar sua própria opinião.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-blue-100">
            O Observa Salvador apresenta informações verificáveis, contexto e
            fontes para ajudar o cidadão a compreender o funcionamento do poder
            público. A plataforma não escolhe uma posição política pelo
            cidadão nem recomenda em quem votar.
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-blue-950">
            Observa Salvador
          </p>

          <p className="text-sm text-slate-500">
            Entenda, acompanhe e fiscalize.
          </p>
        </div>
      </footer>
    </main>
  );
}