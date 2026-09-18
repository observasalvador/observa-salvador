import Link from "next/link";

function PeopleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-11 w-11"
    >
      <circle cx="24" cy="14" r="6" />
      <circle cx="11" cy="18" r="4.5" />
      <circle cx="37" cy="18" r="4.5" />
      <path d="M14 38v-5c0-6 4.5-10 10-10s10 4 10 10v5" />
      <path d="M3 38v-4c0-5 3.5-8 8-8 2 0 3.8.6 5.2 1.7" />
      <path d="M45 38v-4c0-5-3.5-8-8-8-2 0-3.8.6-5.2 1.7" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="h-7 w-7"
    >
      <path d="M4 14 16 4l12 10" />
      <path d="M7 12v16h18V12" />
      <path d="M12 28v-9h8v9" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="h-7 w-7"
    >
      <path d="M8 3h11l6 6v20H8z" />
      <path d="M19 3v7h6" />
      <path d="M12 16h9M12 21h9" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
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

export default function DeOndeVemODinheiro() {
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
            className="text-xs font-bold text-blue-600 transition hover:text-blue-800"
          >
            ← Política do Zero
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-[920px] px-5 py-8 md:px-8 md:py-10">
        {/* PASSO */}
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
            PASSO 08
          </span>

          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            PARTE 1 DE 3
          </span>
        </div>

        {/* HERO */}
        <div className="mt-4 max-w-[720px]">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#082b6f] md:text-[42px]">
            De onde vem o dinheiro público?
          </h1>

          <p className="mt-3 text-[17px] font-bold text-blue-600 md:text-[18px]">
            Se uma obra é pública, quem está pagando por ela?
          </p>

          <p className="mt-4 text-[15px] leading-6 text-slate-600 md:text-[16px]">
            Quando vemos uma praça reformada, uma escola funcionando ou um
            serviço público sendo prestado, existe dinheiro por trás daquela
            atividade.
          </p>

          <p className="mt-1.5 text-[15px] leading-6 text-slate-600 md:text-[16px]">
            Esse dinheiro não aparece do nada. Ele vem de diferentes{" "}
            <strong className="font-bold text-slate-800">
              receitas públicas.
            </strong>
          </p>
        </div>

        {/* PRIMEIRA IDEIA */}
        <div className="mt-7 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] shadow-sm">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="flex items-center gap-4 px-5 py-5 md:px-6">
              <div className="shrink-0 text-blue-100">
                <PeopleIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                  PRIMEIRA IDEIA
                </p>

                <h2 className="mt-1 text-[19px] font-extrabold leading-6 text-white md:text-[21px]">
                  O dinheiro público não é
                  <br className="hidden sm:block" /> “dinheiro do governo”.
                </h2>
              </div>
            </div>

            <div className="border-t border-blue-700/60 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[13px] leading-[1.65] text-blue-50 md:text-[14px]">
                Prefeito, governador e presidente administram recursos
                públicos dentro das regras previstas em lei. Grande parte
                desses recursos vem da arrecadação, mas existem também outras
                fontes de receita.
              </p>
            </div>
          </div>
        </div>

        {/* COTIDIANO */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            ISSO ESTÁ MAIS PERTO DO QUE PARECE
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            O dinheiro começa no nosso dia a dia.
          </h2>

          <p className="mt-2 max-w-[690px] text-[14px] leading-6 text-slate-600">
            Veja três situações simples. Não precisa decorar as siglas agora.
            O importante é perceber que diferentes situações podem gerar
            arrecadação pública.
          </p>

          {/* LISTA ÚNICA */}
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* IPTU */}
            <div className="grid grid-cols-[52px_1fr] items-center gap-3 px-4 py-4 md:grid-cols-[64px_1fr] md:px-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <HouseIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                  UM IMÓVEL EM SALVADOR
                </p>

                <p className="mt-0.5 text-[15px] font-extrabold text-[#082b6f]">
                  Pode existir IPTU
                </p>

                <p className="mt-0.5 text-[12px] leading-5 text-slate-500 md:text-[13px]">
                  Imposto municipal relacionado à propriedade predial e
                  territorial urbana.
                </p>
              </div>
            </div>

            {/* ISS */}
            <div className="grid grid-cols-[52px_1fr] items-center gap-3 border-t border-slate-200 px-4 py-4 md:grid-cols-[64px_1fr] md:px-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <DocumentIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                  UMA PRESTAÇÃO DE SERVIÇO
                </p>

                <p className="mt-0.5 text-[15px] font-extrabold text-[#082b6f]">
                  Pode existir ISS
                </p>

                <p className="mt-0.5 text-[12px] leading-5 text-slate-500 md:text-[13px]">
                  Imposto municipal relacionado aos serviços previstos na
                  legislação.
                </p>
              </div>
            </div>

            {/* IPVA */}
            <div className="grid grid-cols-[52px_1fr] items-center gap-3 border-t border-slate-200 px-4 py-4 md:grid-cols-[64px_1fr] md:px-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CarIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                  UM VEÍCULO
                </p>

                <p className="mt-0.5 text-[15px] font-extrabold text-[#082b6f]">
                  Pode existir IPVA
                </p>

                <p className="mt-0.5 text-[12px] leading-5 text-slate-500 md:text-[13px]">
                  Imposto estadual relacionado à propriedade de veículos
                  automotores.
                </p>
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
                Tributo não é a mesma
                <br className="hidden md:block" /> coisa que imposto.
              </p>
            </div>

            <div className="border-t border-amber-200 px-4 py-4 md:border-l md:border-t-0 md:px-5">
              <p className="text-[13px] leading-5 text-slate-700">
                <strong>Tributo</strong> é uma categoria mais ampla.{" "}
                <strong>Imposto é apenas um tipo de tributo.</strong> Existem
                outros tipos, que veremos na próxima parte.
              </p>
            </div>
          </div>
        </div>

        {/* FECHAMENTO */}
        <div className="mt-6 flex gap-3 border-l-[3px] border-blue-500 py-1 pl-4">
          <div>
            <p className="text-[14px] font-extrabold text-[#082b6f]">
              O que você precisa guardar desta página:
            </p>

            <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-slate-600">
              Município, Estado e União podem receber dinheiro de diferentes
              fontes. E nem todo recurso utilizado por um governo foi
              arrecadado diretamente por ele.
            </p>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5">
          <Link
            href="/politica-do-zero"
            className="text-[13px] font-bold text-slate-500 transition hover:text-blue-700"
          >
            ← Voltar
          </Link>

          <Link
            href="/politica-do-zero/de-onde-vem-o-dinheiro/tipos-de-receitas"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Próximo: tipos de receitas →
          </Link>
        </div>

        {/* PROGRESSO */}
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          <div className="h-1 rounded-full bg-blue-600" />
          <div className="h-1 rounded-full bg-slate-200" />
          <div className="h-1 rounded-full bg-slate-200" />
        </div>
      </section>
    </main>
  );
}