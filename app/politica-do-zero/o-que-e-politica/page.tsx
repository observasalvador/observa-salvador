export default function OQueEPolitica() {
  return (
    <main className="min-h-screen bg-[#F5F9FF] text-[#071D49]">

      {/* CABEÇALHO */}
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-2xl font-extrabold tracking-tight">
              Observa <span className="text-[#0879E8]">Salvador</span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Entenda, acompanhe e fiscalize.
            </p>
          </div>

          <a
            href="/politica-do-zero"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#071D49] transition hover:border-blue-300 hover:bg-blue-50"
          >
            ← Política do Zero
          </a>
        </div>
      </header>

      {/* ABERTURA */}
      <section className="bg-gradient-to-b from-[#EAF4FF] to-[#F5F9FF]">
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-16">
          <span className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-extrabold tracking-wide text-[#0879E8] shadow-sm">
            PASSO 01 · POLÍTICA DO ZERO
          </span>

          <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            Afinal, o que é{" "}
            <span className="text-[#0879E8]">política?</span>
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600">
            Política não acontece apenas nas eleições. Ela também está nas
            decisões coletivas sobre serviços, recursos, regras e prioridades
            que afetam a vida das pessoas.
          </p>
        </div>
      </section>

      {/* RESPOSTA CURTA */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-[30px] border border-blue-100 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
            RESPOSTA CURTA
          </p>

          <h2 className="mt-4 text-3xl font-black">
            Política é a forma como uma sociedade toma decisões coletivas.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Essas decisões podem definir quais problemas receberão atenção,
            como recursos públicos serão utilizados, quais regras serão
            criadas e quais serviços serão oferecidos à população.
          </p>
        </div>
      </section>

      {/* EXEMPLO */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-[28px] bg-[#EAF4FF] p-8">
            <div className="text-4xl">🏙️</div>

            <h2 className="mt-5 text-2xl font-black">
              Pense na sua cidade
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Imagine que existem recursos disponíveis, mas várias necessidades:
              melhorar uma escola, reformar um posto de saúde, pavimentar uma
              rua ou ampliar o transporte público.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#FFF7DF] p-8">
            <div className="text-4xl">💡</div>

            <h2 className="mt-5 text-2xl font-black">
              Alguém precisa decidir
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Quais problemas serão priorizados? Quanto será destinado a cada
              área? Quem pode tomar essa decisão? Quais regras precisam ser
              respeitadas? Essas questões fazem parte da política.
            </p>
          </div>

        </div>
      </section>

      {/* POLÍTICA NÃO É SÓ ELEIÇÃO */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
          UM PONTO IMPORTANTE
        </p>

        <h2 className="mt-3 text-4xl font-black">
          Política não é só eleição.
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Eleições são uma parte importante da política, mas não são a única.
          Depois que os representantes são escolhidos, decisões públicas
          continuam sendo tomadas todos os dias.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["🏥", "Saúde pública", "Organização e financiamento de serviços de saúde."],
            ["🚌", "Transporte", "Planejamento de linhas, infraestrutura e mobilidade."],
            ["🏫", "Educação", "Escolas, vagas, investimentos e políticas educacionais."],
            ["💰", "Dinheiro público", "Definição de prioridades e execução do orçamento."],
            ["🏗️", "Obras públicas", "Escolha, contratação e acompanhamento de obras."],
            ["📜", "Leis e regras", "Criação de normas que organizam a vida em sociedade."],
          ].map(([icone, titulo, descricao]) => (
            <div
              key={titulo}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="text-2xl">{icone}</div>

              <div>
                <h3 className="font-extrabold">{titulo}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUE IMPORTA */}
      <section className="bg-[#071D49]">
        <div className="mx-auto max-w-5xl px-6 py-14 text-white">
          <p className="text-sm font-extrabold tracking-[0.16em] text-cyan-300">
            POR QUE ISSO IMPORTA?
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black">
            Entender política ajuda você a entender quem decide o quê.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Quando você entende como as decisões públicas são tomadas, fica
            mais fácil identificar responsabilidades, acompanhar gastos,
            compreender leis e fiscalizar a atuação do poder público.
          </p>
        </div>
      </section>

      {/* CONCEITOS */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
          GUARDE ESTES CONCEITOS
        </p>

        <h2 className="mt-3 text-3xl font-black">
          Antes de continuar
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <div className="text-3xl">👥</div>
            <h3 className="mt-4 text-xl font-black">Sociedade</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Pessoas e grupos que convivem e possuem necessidades,
              interesses e responsabilidades.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <div className="text-3xl">🏛️</div>
            <h3 className="mt-4 text-xl font-black">Estado</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Estrutura formada por instituições públicas, território,
              população e organização jurídica.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <div className="text-3xl">🗳️</div>
            <h3 className="mt-4 text-xl font-black">Governo</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Conjunto de autoridades que exerce funções de direção política
              e administrativa por determinado período.
            </p>
          </div>
        </div>
      </section>

      {/* FONTES */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔗</div>

            <div>
              <p className="text-sm font-extrabold tracking-[0.14em] text-[#0879E8]">
                FONTES E REFERÊNCIAS
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Confira a informação
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                O conteúdo educativo do Observa Salvador deve permitir que o
                cidadão consulte as referências utilizadas e aprofunde a
                leitura em fontes institucionais e documentos públicos.
              </p>

              <div className="mt-5 space-y-2 text-sm font-semibold text-[#0879E8]">
                <p>• Constituição da República Federativa do Brasil de 1988</p>
                <p>• Câmara dos Deputados — educação para a cidadania</p>
                <p>• Senado Federal — conteúdos institucionais e legislativos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRÓXIMO PASSO */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-[30px] bg-gradient-to-r from-[#0967D2] to-[#1298ED] p-8 text-white md:p-10">
          <p className="text-sm font-extrabold tracking-[0.16em] text-blue-100">
            CONTINUE A TRILHA
          </p>

          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-blue-100">PASSO 02</p>
              <h2 className="mt-1 text-3xl font-black">
                O que é o Estado?
              </h2>
            </div>

            <a
              href="/politica-do-zero"
              className="rounded-2xl bg-white px-7 py-4 text-center font-extrabold text-[#0879E8] transition hover:bg-blue-50"
            >
              Próximo assunto →
            </a>
          </div>
        </div>
      </section>

      {/* COMPROMISSO EDITORIAL */}
      <section className="border-t border-blue-100 bg-[#EAF4FF]">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center">
          <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
            NOSSO COMPROMISSO
          </p>

          <h2 className="mt-4 text-2xl font-black">
            Informação para você formar sua própria opinião.
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            O Observa Salvador apresenta informações verificáveis, contexto e
            fontes. A plataforma não escolhe uma posição política pelo cidadão
            nem recomenda em quem votar.
          </p>
        </div>
      </section>

    </main>
  );
}