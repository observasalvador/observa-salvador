const temas = [
  {
    icon: "📖",
    title: "Política do Zero",
    description: "Conceitos simples para começar",
    color: "bg-blue-50",
    href: "/politica-do-zero",
  },
  {
    icon: "🏛️",
    title: "Quem faz o quê",
    description: "Entenda os poderes e as funções",
    color: "bg-cyan-50",
    href: "/quem-faz-o-que",
  },
  {
    icon: "👥",
    title: "Quem me representa",
    description: "Vereadores, deputados e mais",
    color: "bg-rose-50",
  },
  {
    icon: "🗳️",
    title: "Como votaram",
    description: "Acompanhe votações de forma simples",
    color: "bg-blue-50",
  },
  {
    icon: "💡",
    title: "Projetos e Propostas",
    description: "O que está em debate na sua cidade",
    color: "bg-amber-50",
  },
  {
    icon: "🪙",
    title: "Para onde vai o dinheiro",
    description: "Receitas, gastos e contratos",
    color: "bg-orange-50",
  },
  {
    icon: "🚧",
    title: "Obras Públicas",
    description: "Veja o andamento das obras",
    color: "bg-orange-50",
  },
  {
    icon: "⚖️",
    title: "Histórico Público e Judicial",
    description: "Processos, decisões e situação pública",
    color: "bg-sky-50",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7FAFE] text-[#071D49]">
      {/* CABEÇALHO */}
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073B78] text-2xl shadow-sm">
              🌊
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#073B78] md:text-2xl">
                Observa <span className="text-[#0879E8]">Salvador</span>
              </h1>

              <p className="text-[11px] font-semibold text-slate-500 md:text-xs">
                Entenda, acompanhe e fiscalize.
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a className="transition hover:text-blue-700" href="#entenda">
              Entenda
            </a>

            <a className="transition hover:text-blue-700" href="#acompanhe">
              Acompanhe
            </a>

            <a className="transition hover:text-blue-700" href="#fiscalize">
              Fiscalize
            </a>
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl md:hidden"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 md:text-sm">
              Informação pública em linguagem simples
            </span>

            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#071D49] md:text-6xl">
              O que você quer
              <span className="text-[#0879E8]"> entender </span>
              hoje?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Informação sobre política, serviços públicos e dinheiro público
              explicada de forma clara, verificável e acessível.
            </p>

            {/* BUSCA */}
            <div className="mx-auto mt-8 flex max-w-3xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_10px_40px_rgba(15,50,100,0.08)]">
              <div className="pl-3 text-xl text-slate-400">⌕</div>

              <input
                type="text"
                placeholder="Buscar temas, pessoas, leis, obras..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 md:text-base"
              />

              <button className="rounded-xl bg-[#0879E8] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section
        id="entenda"
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16"
      >
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0879E8] md:text-sm">
            Comece por aqui
          </p>

          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[#071D49] md:text-4xl">
            Informação para entender sua cidade
          </h3>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Escolha um assunto e veja informações públicas explicadas de forma
            simples e contextualizada.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {temas.map((tema) => (
            <a
              key={tema.title}
              href={tema.href || "#"}
              className={`${tema.color} group cursor-pointer rounded-[26px] border border-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-6`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                {tema.icon}
              </div>

              <h4 className="text-lg font-extrabold leading-tight text-[#071D49]">
                {tema.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {tema.description}
              </p>

              <div className="mt-5 text-sm font-bold text-[#0879E8] opacity-0 transition group-hover:opacity-100">
                Explorar →
              </div>
            </a>
          ))}
        </div>

        {/* EXPLICA PRA MIM */}
        <section className="mt-8 overflow-hidden rounded-[30px] bg-gradient-to-r from-[#075DC7] to-[#0788EF] shadow-[0_20px_50px_rgba(7,93,199,0.18)]">
          <div className="grid items-center gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:px-10 md:py-10">
            <div className="flex gap-5">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl md:flex">
                💬
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                  Linguagem acessível
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
                  Explica pra mim
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-blue-50">
                  Encontrou um termo, uma lei ou uma expressão complicada?
                  Receba uma explicação simples, com contexto e indicação das
                  fontes utilizadas.
                </p>
              </div>
            </div>

            <button className="rounded-2xl bg-white px-6 py-4 font-bold text-[#075DC7] shadow-sm transition hover:bg-blue-50">
              Quero entender →
            </button>
          </div>
        </section>
      </section>

      {/* PILARES */}
      <section id="acompanhe" className="border-y border-blue-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-4 md:px-8">
          <div>
            <div className="text-2xl">🛡️</div>

            <h4 className="mt-3 font-extrabold text-[#071D49]">
              Informação confiável
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Fontes identificadas e informação contextualizada.
            </p>
          </div>

          <div>
            <div className="text-2xl">👥</div>

            <h4 className="mt-3 font-extrabold text-[#071D49]">
              Linguagem acessível
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Conteúdo apresentado sem linguagem desnecessariamente complicada.
            </p>
          </div>

          <div>
            <div className="text-2xl">🌱</div>

            <h4 className="mt-3 font-extrabold text-[#071D49]">
              Cidadania na prática
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Ferramentas para compreender e acompanhar o poder público.
            </p>
          </div>

          <div>
            <div className="text-2xl">📍</div>

            <h4 className="mt-3 font-extrabold text-[#071D49]">
              Feito em Salvador
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Informação pública com foco inicial na realidade da cidade.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCÍPIO EDITORIAL */}
      <section id="fiscalize" className="bg-[#EDF5FF]">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center md:px-8 md:py-16">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0879E8] shadow-sm">
            Nosso compromisso
          </span>

          <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-[#071D49] md:text-4xl">
            Informação para você formar sua própria opinião.
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
            O Observa Salvador não diz ao cidadão o que pensar nem em quem
            votar. Apresentamos informações verificáveis, contexto e fontes
            para que cada pessoa possa chegar às próprias conclusões.
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-[#062E63] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xl font-extrabold">
              Observa <span className="text-sky-400">Salvador</span>
            </p>

            <p className="mt-1 text-sm text-blue-100">
              Entenda, acompanhe e fiscalize.
            </p>
          </div>

          <div className="text-sm leading-6 text-blue-100 md:text-right">
            <p>Informação • Participação • Transparência</p>

            <p className="font-semibold text-white">
              Uma cidade mais consciente.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}