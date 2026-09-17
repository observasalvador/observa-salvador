export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-slate-900">

      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">
              Observa Salvador
            </h1>
            <p className="text-xs font-semibold text-blue-600">
              Entenda, acompanhe e fiscalize.
            </p>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#entenda" className="hover:text-blue-700">
              Entenda
            </a>
            <a href="#acompanhe" className="hover:text-blue-700">
              Acompanhe
            </a>
            <a href="#fiscalize" className="hover:text-blue-700">
              Fiscalize
            </a>
          </nav>
        </div>
      </header>

      {/* APRESENTAÇÃO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Informação pública em linguagem simples
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-blue-950 md:text-5xl">
            O que você quer entender hoje?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Política, serviços públicos e dinheiro público explicados de forma
            clara, verificável e acessível.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <input
              type="text"
              placeholder="Ex.: Para onde vai o dinheiro dos meus impostos?"
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      {/* TEMAS */}
      <section id="entenda" className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Comece por aqui
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            Entenda o poder público sem complicação
          </h3>

          <p className="mt-3 max-w-2xl text-slate-600">
            Escolha um assunto para entender como as decisões públicas afetam
            sua cidade e sua vida.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-3xl">🏛️</div>
            <h4 className="text-xl font-bold">Quem faz o quê?</h4>
            <p className="mt-2 leading-7 text-slate-600">
              Entenda as funções do prefeito, vereadores, governos estadual e
              federal.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-3xl">💰</div>
            <h4 className="text-xl font-bold">Dinheiro público</h4>
            <p className="mt-2 leading-7 text-slate-600">
              Veja de onde vêm os recursos públicos e como eles podem ser
              utilizados.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-3xl">📊</div>
            <h4 className="text-xl font-bold">Orçamento de Salvador</h4>
            <p className="mt-2 leading-7 text-slate-600">
              Entenda receitas, despesas e prioridades do orçamento municipal.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-3xl">🗳️</div>
            <h4 className="text-xl font-bold">Eleições</h4>
            <p className="mt-2 leading-7 text-slate-600">
              Saiba como funcionam eleições, mandatos, partidos e o sistema
              eleitoral.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-3xl">📜</div>
            <h4 className="text-xl font-bold">Leis e decisões</h4>
            <p className="mt-2 leading-7 text-slate-600">
              Acompanhe como uma proposta se transforma em lei e quem participa
              das decisões.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 text-3xl">🔎</div>
            <h4 className="text-xl font-bold">Fiscalize</h4>
            <p className="mt-2 leading-7 text-slate-600">
              Aprenda onde consultar contratos, gastos, licitações e outras
              informações públicas.
            </p>
          </article>

        </div>
      </section>

      {/* PRINCÍPIO EDITORIAL */}
      <section className="border-y border-blue-100 bg-blue-50">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
            Nosso compromisso
          </p>

          <h3 className="mt-3 text-2xl font-bold text-blue-950">
            Informação para você formar sua própria opinião.
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-700">
            O Observa Salvador não diz ao cidadão o que pensar nem em quem
            votar. Apresentamos informações verificáveis, contexto e fontes para
            que cada pessoa possa chegar às próprias conclusões.
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="font-bold text-blue-900">Observa Salvador</p>
          <p className="mt-1 text-sm text-slate-500">
            Entenda, acompanhe e fiscalize.
          </p>
        </div>
      </footer>

    </main>
  );
}
