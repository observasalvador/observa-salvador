import Link from "next/link";

const temas = [
  {
    numero: "01",
    icone: "🏛️",
    titulo: "O que é política?",
    descricao:
      "Entenda por que política não é apenas eleição, partido ou candidato — e como decisões públicas aparecem no seu dia a dia.",
    href: "/politica-do-zero/o-que-e-politica",
  },
  {
  numero: "02",
  icone: "🧭",
  titulo: "Quem é responsável pelo quê?",
  descricao:
    "Prefeito, governador ou presidente? Entenda quem cuida de cada coisa e saiba quem cobrar quando existe um problema.",
  href: "/politica-do-zero/quem-e-responsavel",
  },
  {
    numero: "03",
    icone: "📍",
    titulo: "Município, Estado e União",
    descricao:
      "Entenda quem cuida de quê e por que Prefeitura, Governo do Estado e Governo Federal possuem responsabilidades diferentes.",
  },
  {
    numero: "04",
    icone: "⚖️",
    titulo: "Os três Poderes",
    descricao:
      "Conheça as funções do Executivo, Legislativo e Judiciário e entenda como eles se relacionam.",
  },
  {
    numero: "05",
    icone: "📜",
    titulo: "O que é uma lei?",
    descricao:
      "Aprenda de forma simples como surgem as leis e quem participa das decisões que criam regras para a sociedade.",
  },
  {
    numero: "06",
    icone: "💰",
    titulo: "O que são impostos?",
    descricao:
      "Entenda por que o poder público arrecada recursos e como tributos ajudam a financiar políticas e serviços públicos.",
  },
  {
    numero: "07",
    icone: "📊",
    titulo: "Como funciona o dinheiro público?",
    descricao:
      "Veja como o dinheiro entra no orçamento, como os gastos são autorizados e onde o cidadão pode acompanhar essas informações.",
  },
];

export default function PoliticaDoZero() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#071B45]">
      {/* CABEÇALHO */}
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#083B7A] text-2xl shadow-sm">
              🌊
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight">
                Observa <span className="text-[#087BEA]">Salvador</span>
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Entenda, acompanhe e fiscalize.
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      {/* APRESENTAÇÃO */}
      <section className="bg-gradient-to-b from-blue-50 to-[#F7F9FC]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-[#087BEA] shadow-sm">
              POLÍTICA DO ZERO
            </span>

            <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Política parece complicada.
              <span className="block text-[#087BEA]">
                Não precisa ser.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Comece pelos conceitos fundamentais e entenda, passo a passo,
              como o poder público funciona e como suas decisões chegam até
              você.
            </p>
          </div>
        </div>
      </section>

      {/* TRILHA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#087BEA]">
            Comece por aqui
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Uma trilha para entender o básico
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Você não precisa conhecer termos jurídicos ou políticos. Escolha
            um assunto e avance no seu ritmo.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {temas.map((tema) => (
            <a
              key={tema.numero}
              href={tema.href || "#"}
              className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  {tema.icone}
                </div>

                <div className="flex-1">
                  <p className="text-xs font-extrabold tracking-[0.18em] text-[#087BEA]">
                    PASSO {tema.numero}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                    {tema.titulo}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {tema.descricao}
                  </p>

                  <div className="mt-5 font-bold text-[#087BEA]">
                    Entender este assunto →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EXPLICA PRA MIM */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[32px] bg-gradient-to-r from-[#0965D1] to-[#1097F4] p-8 text-white shadow-xl md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-100">
                Ficou com alguma dúvida?
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                Explica pra mim
              </h2>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-blue-50">
                Encontrou uma palavra, expressão ou conceito que não entendeu?
                O Observa Salvador pode apresentar uma explicação em linguagem
                simples e indicar as fontes utilizadas.
              </p>
            </div>

            <button className="shrink-0 rounded-2xl bg-white px-7 py-4 font-extrabold text-[#0965D1] shadow-sm transition hover:bg-blue-50">
              Quero entender →
            </button>
          </div>
        </div>
      </section>

      {/* PRINCÍPIO EDITORIAL */}
      <section className="border-t border-blue-100 bg-[#EAF3FF]">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#087BEA]">
            Nosso compromisso
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
            Informação para você formar sua própria opinião.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Apresentamos informações verificáveis, contexto e fontes. O
            Observa Salvador não escolhe uma posição política pelo cidadão nem
            recomenda em quem votar.
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-[#073872] text-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div>
            <div className="text-xl font-extrabold">
              Observa <span className="text-cyan-300">Salvador</span>
            </div>
            <p className="mt-1 text-sm text-blue-100">
              Entenda, acompanhe e fiscalize.
            </p>
          </div>

          <div className="text-sm font-semibold text-blue-100">
            Informação • Participação • Transparência
          </div>
        </div>
      </footer>
    </main>
  );
}