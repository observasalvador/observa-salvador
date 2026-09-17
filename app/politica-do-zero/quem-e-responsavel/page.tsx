"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
export default function QuemEResponsavel() {
  const [telaAtual, setTelaAtual] = useState(1);
  const [respostaEscola, setRespostaEscola] = useState<string | null>(null);
  const [respostaINSS, setRespostaINSS] = useState<string | null>(null);
  const [respostaSaude, setRespostaSaude] = useState<string | null>(null);
  const totalTelas = 7;
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [telaAtual]);

  return (
    <main className="min-h-screen bg-[#F5F9FF] text-[#071D49]">

      {/* CABEÇALHO */}
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <Link href="/">
            <div className="text-2xl font-extrabold tracking-tight">
              Observa <span className="text-[#0879E8]">Salvador</span>
            </div>

            <p className="text-xs font-semibold text-slate-500">
              Entenda, acompanhe e fiscalize.
            </p>
          </Link>

          <Link
            href="/politica-do-zero"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold transition hover:border-blue-300 hover:bg-blue-50"
          >
            ← Política do Zero
          </Link>

        </div>
      </header>

      {/* ÁREA DA AULA */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        {/* PROGRESSO */}
        <div className="mb-8">

          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold tracking-wide text-[#0879E8]">
              PASSO 02 · POLÍTICA DO ZERO
            </p>

            <p className="text-sm font-bold text-slate-500">
              {telaAtual} de {totalTelas}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            {Array.from({ length: totalTelas }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index + 1 <= telaAtual
                    ? "bg-[#0879E8]"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>

        </div>

        {/* TELA 1 */}
        {telaAtual === 1 && (
          <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

            <div className="text-5xl">
              🧭
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
              Quem é responsável{" "}
              <span className="text-[#0879E8]">
                pelo quê?
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-600">
              Quando aparece um problema no seu dia a dia, você sabe quem
              deve resolver?
            </p>

            {/* EXEMPLOS */}
            <div className="mt-8 grid gap-3 md:grid-cols-2">

              <div className="rounded-2xl bg-[#F5F9FF] p-5 font-semibold">
                🕳️ Tem um buraco na rua.
              </div>

              <div className="rounded-2xl bg-[#F5F9FF] p-5 font-semibold">
                🏥 O posto de saúde está com problema.
              </div>

              <div className="rounded-2xl bg-[#F5F9FF] p-5 font-semibold">
                🏫 Está faltando professor na escola.
              </div>

              <div className="rounded-2xl bg-[#F5F9FF] p-5 font-semibold">
                💳 Seu benefício do INSS não caiu.
              </div>

            </div>

            {/* PERGUNTA */}
            <div className="mt-8 rounded-[24px] bg-[#FFF6D8] p-6">

              <p className="text-xl font-black">
                Quem você deve procurar?
              </p>

              <p className="mt-2 text-lg text-slate-700">
                O prefeito? O governador? O presidente?
              </p>

              <p className="mt-3 font-bold text-[#0879E8]">
                Você vai aprender isso agora, sem complicação.
              </p>

            </div>

            {/* BOTÃO */}
            <div className="mt-8 flex justify-end">

              <button
                onClick={() => setTelaAtual(2)}
                className="rounded-2xl bg-[#0879E8] px-8 py-4 text-lg font-extrabold text-white shadow-sm transition hover:bg-[#0668C7]"
              >
                Começar →
              </button>

            </div>

          </div>
        )}

        {/* TELA 2 */}
{telaAtual === 2 && (
  <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

    <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
      PRIMEIRO, ENTENDA ISTO
    </p>

    <h2 className="mt-4 max-w-3xl text-4xl font-black">
      Você mora em Salvador. Mas Salvador faz parte de algo maior.
    </h2>

    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      Para descobrir quem é responsável por cada coisa, primeiro precisamos
      entender onde Salvador está.
    </p>

    {/* MAPA SIMPLES */}
    <div className="mt-9 grid gap-4 md:grid-cols-3">

      {/* SALVADOR */}
      <div className="rounded-[24px] bg-[#EAF4FF] p-6">

        <div className="text-4xl">
          🏘️
        </div>

        <p className="mt-4 text-sm font-extrabold text-[#0879E8]">
          SALVADOR
        </p>

        <h3 className="mt-1 text-2xl font-black">
          Município
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          Quem administra:
        </p>

        <p className="font-black">
          Prefeito
        </p>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          Administração municipal: Prefeitura
        </p>

      </div>

      {/* BAHIA */}
      <div className="rounded-[24px] bg-[#FFF6D8] p-6">

        <div className="text-4xl">
          🌴
        </div>

        <p className="mt-4 text-sm font-extrabold text-amber-700">
          BAHIA
        </p>

        <h3 className="mt-1 text-2xl font-black">
          Estado
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          Quem administra:
        </p>

        <p className="font-black">
          Governador
        </p>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          Administração estadual: Governo da Bahia
        </p>

      </div>

      {/* BRASIL */}
      <div className="rounded-[24px] bg-[#071D49] p-6 text-white">

        <img
          src="/bandeira-brasil.svg"
          alt="Bandeira do Brasil"
          className="h-7 w-11 rounded-sm object-cover shadow-sm"
        />

        <p className="mt-4 text-sm font-extrabold text-cyan-300">
          BRASIL
        </p>

        <h3 className="mt-1 text-2xl font-black">
          União
        </h3>

        <p className="mt-4 leading-7 text-blue-100">
          Quem chefia o governo:
        </p>

        <p className="font-black">
          Presidente da República
        </p>

        <p className="mt-3 text-sm font-semibold text-blue-200">
          Administração federal: Governo Federal
        </p>

      </div>

    </div>

    {/* EXPLICAÇÃO SIMPLES */}
    <div className="mt-7 rounded-[24px] bg-[#F5F9FF] p-6">

      <p className="text-sm font-extrabold tracking-wide text-[#0879E8]">
        NÃO PRECISA DECORAR
      </p>

      <div className="mt-4 space-y-2 text-lg leading-7 text-slate-700">

        <p>
          🏘️ <strong>Salvador</strong> é um Município.
        </p>

        <p>
          🌴 Salvador fica no Estado da <strong>Bahia</strong>.
        </p>

        <div className="flex items-center gap-3">
          <img
            src="/bandeira-brasil.svg"
            alt="Bandeira do Brasil"
            className="h-5 w-8 rounded-sm object-cover shadow-sm"
          />

          <p>
            A Bahia faz parte do <strong>Brasil</strong>.
          </p>
        </div>

      </div>

      <p className="mt-5 font-bold leading-7 text-[#071D49]">
        É por isso que existem coisas que são responsabilidade da Prefeitura,
        outras do Governo da Bahia e outras do Governo Federal.
      </p>

    </div>

    {/* NAVEGAÇÃO */}
    <div className="mt-8 flex items-center justify-between gap-4">

      <button
        onClick={() => setTelaAtual(1)}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-50"
      >
        ← Voltar
      </button>

      <button
        onClick={() => setTelaAtual(3)}
        className="rounded-2xl bg-[#0879E8] px-7 py-4 font-extrabold text-white transition hover:bg-[#0668C7]"
      >
        Entendi →
      </button>

    </div>

  </div>
)}
{/* TELA 3 */}
{telaAtual === 3 && (
  <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

    <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
      AGORA VAMOS PARA A VIDA REAL
    </p>

    <h2 className="mt-4 text-4xl font-black">
      Quem cuida disso?
    </h2>

    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      Veja a situação abaixo e tente descobrir quem administra esse serviço.
    </p>

    {/* SITUAÇÃO */}
    <div className="mt-9 rounded-[28px] bg-[#F5F9FF] p-7">

      <div className="flex items-start gap-5">

        <div className="text-5xl">
          🏫
        </div>

        <div>
          <p className="text-sm font-extrabold text-[#0879E8]">
            SITUAÇÃO
          </p>

          <h3 className="mt-2 text-2xl font-black leading-9">
            Uma escola estadual localizada em Salvador está com problemas.
          </h3>
        </div>

      </div>

      <div className="mt-6 rounded-2xl bg-white p-5">
        <p className="text-sm font-extrabold text-slate-500">
          QUEM ADMINISTRA ESSA ESCOLA?
        </p>
      </div>

    </div>

    {/* RESPOSTAS */}
    <div className="mt-6 grid gap-4 md:grid-cols-3">

      <button
  onClick={() => setRespostaEscola("prefeitura")}
  className={`rounded-[22px] border-2 p-6 text-left font-bold transition ${
    respostaEscola === "prefeitura"
      ? "border-amber-400 bg-[#FFF6D8] text-amber-800"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaEscola === "prefeitura" ? "✕ " : "🏘️ "}
  Prefeitura de Salvador
</button>

      <button
  onClick={() => setRespostaEscola("estado")}
  className={`rounded-[22px] border-2 p-6 text-left font-bold transition ${
    respostaEscola === "estado"
      ? "border-green-500 bg-[#EAF8EF] text-[#176B3A]"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaEscola === "estado" ? "✓ " : "🌴 "}
  Governo do Estado da Bahia
</button>

      <button
  onClick={() => setRespostaEscola("federal")}
  className={`rounded-[22px] border-2 p-6 text-left font-bold transition ${
    respostaEscola === "federal"
      ? "border-amber-400 bg-[#FFF6D8] text-amber-800"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaEscola === "federal" ? "✕ " : "🇧🇷 "}
  Governo Federal
</button>

    </div>
    {/* RESULTADO DA RESPOSTA */}
{respostaEscola && (
  <div
    className={`mt-6 rounded-[24px] p-6 ${
      respostaEscola === "estado"
        ? "bg-[#EAF8EF]"
        : "bg-[#FFF6D8]"
    }`}
  >

    {respostaEscola === "estado" ? (
      <>
        <p className="text-xl font-black text-[#176B3A]">
          ✓ Isso!
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          A escola está em Salvador, mas ela é uma escola
          <strong> estadual</strong>.
        </p>

        <p className="mt-2 leading-7 text-slate-700">
          Por isso, ela pertence à rede administrada pelo
          <strong> Governo do Estado da Bahia</strong>.
        </p>

        <p className="mt-4 font-bold text-[#071D49]">
          A palavra “estadual” é a pista.
        </p>

        <button
          onClick={() => setTelaAtual(4)}
          className="mt-6 rounded-2xl bg-[#0879E8] px-7 py-4 font-extrabold text-white transition hover:bg-[#0668C7]"
        >
          Próxima situação →
        </button>
      </>
    ) : (
      <>
        <p className="text-xl font-black text-amber-800">
          Ainda não.
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          Repare em uma palavra importante da pergunta:
          <strong> estadual</strong>.
        </p>

        <p className="mt-2 font-bold leading-7 text-[#071D49]">
          Tente novamente pensando no que essa palavra significa.
        </p>
      </>
    )}

  </div>
)}

    {/* VOLTAR */}
    <div className="mt-8">

      <button
        onClick={() => setTelaAtual(2)}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-50"
      >
        ← Voltar
      </button>

    </div>

  </div>
)}{/* TELA 4 */}
{telaAtual === 4 && (
  <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

    <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
      MAIS UMA SITUAÇÃO
    </p>

    <h2 className="mt-4 text-4xl font-black">
      Agora pense no INSS.
    </h2>

    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      O problema mudou. Será que o responsável também muda?
    </p>

    {/* SITUAÇÃO */}
    <div className="mt-9 rounded-[28px] bg-[#F5F9FF] p-7">

      <div className="flex items-start gap-5">

        <div className="text-5xl">
          💳
        </div>

        <div>
          <p className="text-sm font-extrabold text-[#0879E8]">
            SITUAÇÃO
          </p>

          <h3 className="mt-2 text-2xl font-black leading-9">
            Você mora em Salvador e seu benefício do INSS não caiu.
          </h3>
        </div>

      </div>

      <div className="mt-6 rounded-2xl bg-white p-5">

        <p className="text-sm font-extrabold text-slate-500">
          QUEM ADMINISTRA ESSE SERVIÇO?
        </p>

      </div>

    </div>

    {/* RESPOSTAS */}
    <div className="mt-6 grid gap-4 md:grid-cols-3">

      <button
  onClick={() => setRespostaINSS("prefeitura")}
  className={`rounded-[22px] border-2 p-6 text-left font-bold transition ${
    respostaINSS === "prefeitura"
      ? "border-amber-400 bg-[#FFF6D8] text-amber-800"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaINSS === "prefeitura" ? "✕ " : "🏘️ "}
  Prefeitura de Salvador
</button>

      <button
  onClick={() => setRespostaINSS("estado")}
  className={`rounded-[22px] border-2 p-6 text-left font-bold transition ${
    respostaINSS === "estado"
      ? "border-amber-400 bg-[#FFF6D8] text-amber-800"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaINSS === "estado" ? "✕ " : "🌴 "}
  Governo do Estado da Bahia
</button>

      <button
  onClick={() => setRespostaINSS("federal")}
  className={`rounded-[22px] border-2 p-6 text-left font-bold transition ${
    respostaINSS === "federal"
      ? "border-green-500 bg-[#EAF8EF] text-[#176B3A]"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  <div className="flex items-center gap-3">

    {respostaINSS === "federal" ? (
      <span className="text-lg font-black">✓</span>
    ) : (
      <img
        src="/bandeira-brasil.svg"
        alt="Bandeira do Brasil"
        className="h-5 w-8 rounded-sm object-cover shadow-sm"
      />
    )}

    <span>Governo Federal</span>

  </div>
</button>

    </div>
{/* RESULTADO DA RESPOSTA */}
{respostaINSS && (
  <div
    className={`mt-6 rounded-[24px] p-6 ${
      respostaINSS === "federal"
        ? "bg-[#EAF8EF]"
        : "bg-[#FFF6D8]"
    }`}
  >

    {respostaINSS === "federal" ? (
      <>
        <p className="text-xl font-black text-[#176B3A]">
          ✓ Isso!
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          O INSS faz parte da administração pública
          <strong> federal</strong>.
        </p>

        <p className="mt-2 leading-7 text-slate-700">
          Por isso, morar em Salvador não faz desse serviço uma
          responsabilidade da Prefeitura ou do Governo da Bahia.
        </p>

        <p className="mt-4 font-bold text-[#071D49]">
          O importante é descobrir quem administra o serviço.
        </p>

        <button
          onClick={() => setTelaAtual(5)}
          className="mt-6 rounded-2xl bg-[#0879E8] px-7 py-4 font-extrabold text-white transition hover:bg-[#0668C7]"
        >
          Próxima situação →
        </button>
      </>
    ) : (
      <>
        <p className="text-xl font-black text-amber-800">
          Ainda não.
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          O INSS não é administrado pela Prefeitura de Salvador
          nem pelo Governo do Estado da Bahia.
        </p>

        <p className="mt-2 font-bold leading-7 text-[#071D49]">
          Tente novamente pensando em qual nível de governo o INSS pertence.
        </p>
      </>
    )}

  </div>
)}
    {/* VOLTAR */}
    <div className="mt-8">

      <button
        onClick={() => {
  setRespostaEscola(null);
  setTelaAtual(3);
}}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-50"
      >
        ← Voltar
      </button>

    </div>

  </div>
)}{/* TELA 5 */}
{telaAtual === 5 && (
  <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

    <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
      AGORA FICA UM POUCO DIFERENTE
    </p>

    <h2 className="mt-4 text-4xl font-black">
      E quando mais de um governo participa?
    </h2>

    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      Nem todo serviço público cabe em uma única caixinha.
      A saúde é um bom exemplo.
    </p>

    {/* SITUAÇÃO */}
    <div className="mt-9 rounded-[28px] bg-[#F5F9FF] p-7">

      <div className="flex items-start gap-5">

        <div className="text-5xl">
          🏥
        </div>

        <div>
          <p className="text-sm font-extrabold text-[#0879E8]">
            SITUAÇÃO
          </p>

          <h3 className="mt-2 text-2xl font-black leading-9">
            Você procura um posto de saúde municipal em Salvador.
          </h3>
        </div>

      </div>

      <div className="mt-6 rounded-2xl bg-white p-5">

        <p className="text-sm font-extrabold text-slate-500">
          QUEM PARTICIPA DA SAÚDE PÚBLICA?
        </p>

        <p className="mt-2 text-lg font-bold text-[#071D49]">
          Escolha a resposta que parece mais completa.
        </p>

      </div>

    </div>

    {/* RESPOSTAS */}
    <div className="mt-6 space-y-3">

      <button
  onClick={() => setRespostaSaude("prefeitura")}
  className={`w-full rounded-[22px] border-2 p-5 text-left font-bold transition ${
    respostaSaude === "prefeitura"
      ? "border-amber-400 bg-[#FFF6D8] text-amber-800"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaSaude === "prefeitura" ? "✕ " : ""}
  A) Somente a Prefeitura, porque o posto fica em Salvador.
</button>

      <button
  onClick={() => setRespostaSaude("federal")}
  className={`w-full rounded-[22px] border-2 p-5 text-left font-bold transition ${
    respostaSaude === "federal"
      ? "border-amber-400 bg-[#FFF6D8] text-amber-800"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaSaude === "federal" ? "✕ " : ""}
  B) Somente o Governo Federal, porque existe o SUS.
</button>

      <button
  onClick={() => setRespostaSaude("todos")}
  className={`w-full rounded-[22px] border-2 p-5 text-left font-bold transition ${
    respostaSaude === "todos"
      ? "border-green-500 bg-[#EAF8EF] text-[#176B3A]"
      : "border-slate-200 bg-white hover:border-[#0879E8] hover:bg-blue-50"
  }`}
>
  {respostaSaude === "todos" ? "✓ " : ""}
  C) Município, Estado e União possuem responsabilidades na saúde.
</button>

    </div>
{/* RESULTADO DA RESPOSTA */}
{respostaSaude && (
  <div
    className={`mt-6 rounded-[24px] p-6 ${
      respostaSaude === "todos"
        ? "bg-[#EAF8EF]"
        : "bg-[#FFF6D8]"
    }`}
  >

    {respostaSaude === "todos" ? (
      <>
        <p className="text-xl font-black text-[#176B3A]">
          ✓ Isso!
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          <strong>Município, Estado e União</strong> possuem
          responsabilidades na saúde pública.
        </p>

        <div className="mt-5 rounded-2xl bg-white p-5">

          <p className="font-black text-[#071D49]">
            Mas atenção:
          </p>

          <p className="mt-2 leading-7 text-slate-700">
            Se estamos falando de uma unidade municipal de saúde,
            a <strong>Prefeitura</strong> pode ser responsável pela
            administração daquela unidade.
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            Isso não significa que a saúde pública seja responsabilidade
            somente do Município. O SUS envolve os três níveis.
          </p>

        </div>

        <p className="mt-5 font-bold leading-7 text-[#071D49]">
          Portanto, uma pergunta importante é:
          “quem administra este serviço específico?”
        </p>

        <button
          onClick={() => setTelaAtual(6)}
          className="mt-6 rounded-2xl bg-[#0879E8] px-7 py-4 font-extrabold text-white transition hover:bg-[#0668C7]"
        >
          Entendi →
        </button>
      </>
    ) : (
      <>
        <p className="text-xl font-black text-amber-800">
          Não é só esse governo.
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          O fato de um posto ser administrado pelo Município não significa
          que somente a Prefeitura tenha responsabilidades na saúde pública.
        </p>

        <p className="mt-3 font-bold leading-7 text-[#071D49]">
          Pense novamente: será que Município, Estado e União podem
          participar do mesmo sistema?
        </p>
      </>
    )}

  </div>
)}
    {/* VOLTAR */}
    <div className="mt-8">

      <button
        onClick={() => {
  setRespostaINSS(null);
  setTelaAtual(4);
}}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-50"
      >
        ← Voltar
      </button>

    </div>

  </div>
)}{/* TELA 6 */}
{telaAtual === 6 && (
  <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

    <p className="text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
      AGORA JUNTE TUDO
    </p>

    <h2 className="mt-4 max-w-3xl text-4xl font-black">
      Como descobrir quem procurar?
    </h2>

    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      Quando aparecer um problema, você não precisa decorar uma lista enorme.
      Comece fazendo três perguntas.
    </p>

    {/* 3 PERGUNTAS */}
    <div className="mt-9 grid gap-4 md:grid-cols-3">

      <div className="rounded-[24px] bg-[#EAF4FF] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0879E8] text-lg font-black text-white">
          1
        </div>

        <h3 className="mt-5 text-xl font-black">
          Qual é o problema?
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          É na rua? Na escola? Na saúde? No INSS? Na segurança?
        </p>
      </div>

      <div className="rounded-[24px] bg-[#FFF6D8] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-lg font-black text-white">
          2
        </div>

        <h3 className="mt-5 text-xl font-black">
          Quem administra?
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          Descubra qual órgão ou nível de governo administra aquele
          serviço específico.
        </p>
      </div>

      <div className="rounded-[24px] bg-[#EAF8EF] p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-lg font-black text-white">
          3
        </div>

        <h3 className="mt-5 text-xl font-black">
          Onde eu cobro?
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          Depois de identificar o responsável, procure o órgão e o
          canal adequado para pedir informação, reclamar ou fiscalizar.
        </p>
      </div>

    </div>

    {/* REGRA PRINCIPAL */}
    <div className="mt-7 rounded-[28px] bg-[#071D49] p-7 text-white">

      <p className="text-sm font-extrabold tracking-[0.16em] text-cyan-300">
        GUARDE ESTA REGRA
      </p>

      <h3 className="mt-3 text-2xl font-black">
        Não olhe apenas para onde o problema aconteceu.
      </h3>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">
        Um serviço pode estar em Salvador e ser municipal, estadual
        ou federal. Em algumas áreas, mais de um nível de governo
        também pode ter responsabilidades.
      </p>

      <p className="mt-4 font-bold text-white">
        Primeiro descubra quem administra o serviço que você quer cobrar.
      </p>

    </div>

    {/* NAVEGAÇÃO */}
    <div className="mt-8 flex items-center justify-between gap-4">

      <button
        onClick={() => {
  setRespostaSaude(null);
  setTelaAtual(5);
}}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-50"
      >
        ← Voltar
      </button>

      <button
        onClick={() => setTelaAtual(7)}
        className="rounded-2xl bg-[#0879E8] px-7 py-4 font-extrabold text-white transition hover:bg-[#0668C7]"
      >
        Finalizar →
      </button>

    </div>

  </div>
)}{/* TELA 7 */}
{telaAtual === 7 && (
  <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-sm md:p-12">

    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF8EF] text-3xl">
      ✓
    </div>

    <p className="mt-7 text-sm font-extrabold tracking-[0.16em] text-[#0879E8]">
      PASSO 02 CONCLUÍDO
    </p>

    <h2 className="mt-3 max-w-3xl text-4xl font-black">
      Agora você já sabe por onde começar.
    </h2>

    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
      Quando encontrar um problema público, não precisa começar tentando
      decorar nomes de órgãos ou autoridades.
    </p>

    {/* O QUE APRENDEU */}
    <div className="mt-8 rounded-[28px] bg-[#F5F9FF] p-7">

      <p className="text-sm font-extrabold tracking-wide text-[#0879E8]">
        O QUE VOCÊ APRENDEU
      </p>

      <div className="mt-5 space-y-4">

        <div className="flex gap-3">
          <span>✓</span>
          <p className="font-bold">
            Salvador é um Município, localizado no Estado da Bahia, que faz parte do Brasil.
          </p>
        </div>

        <div className="flex gap-3">
          <span>✓</span>
          <p className="font-bold">
            Existem serviços administrados no nível municipal, estadual e federal.
          </p>
        </div>

        <div className="flex gap-3">
          <span>✓</span>
          <p className="font-bold">
            Um serviço estar em Salvador não significa que ele seja administrado pela Prefeitura.
          </p>
        </div>

        <div className="flex gap-3">
          <span>✓</span>
          <p className="font-bold">
            Em algumas áreas, como a saúde, diferentes níveis de governo possuem responsabilidades.
          </p>
        </div>

      </div>

    </div>

    {/* REGRA FINAL */}
    <div className="mt-6 rounded-[28px] bg-[#071D49] p-7 text-white">

      <p className="text-sm font-extrabold tracking-[0.16em] text-cyan-300">
        DA PRÓXIMA VEZ, PERGUNTE
      </p>

      <p className="mt-4 text-2xl font-black">
        1. Qual é o problema?
      </p>

      <p className="mt-2 text-2xl font-black">
        2. Quem administra esse serviço?
      </p>

      <p className="mt-2 text-2xl font-black">
        3. Onde posso cobrar ou fiscalizar?
      </p>

    </div>

    {/* FONTES */}
    <div className="mt-6 rounded-[24px] border border-slate-200 p-6">

      <p className="font-black">
        🔎 Quer conferir?
      </p>

      <p className="mt-2 leading-7 text-slate-600">
        O Observa Salvador utiliza fontes oficiais para explicar
        como o poder público funciona.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">

        <a
          href="https://www4.planalto.gov.br/legislacao/legis-federal/constituicao"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#EAF4FF] px-4 py-2 text-sm font-bold text-[#0879E8]"
        >
          Constituição Federal ↗
        </a>

        <a
          href="https://www.gov.br/saude/pt-br/sus/gestao-dos-entes-do-sus"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#EAF4FF] px-4 py-2 text-sm font-bold text-[#0879E8]"
        >
          Gestão do SUS ↗
        </a>

      </div>

    </div>

    {/* NAVEGAÇÃO */}
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <button
        onClick={() => setTelaAtual(6)}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold transition hover:bg-slate-50"
      >
        ← Voltar
      </button>

      <Link
        href="/politica-do-zero"
        className="rounded-2xl bg-[#0879E8] px-7 py-4 text-center font-extrabold text-white transition hover:bg-[#0668C7]"
      >
        Continuar aprendendo →
      </Link>

    </div>

  </div>
)}
      </section>

    </main>
  );
}