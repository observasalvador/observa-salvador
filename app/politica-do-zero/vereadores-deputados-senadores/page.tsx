"use client";

import { useState } from "react";
import Link from "next/link";

type Cargo =
  | "vereador"
  | "deputado-estadual"
  | "deputado-federal"
  | "senador";

const cargos = {
  vereador: {
    nome: "Vereador",
    nivel: "Município",
    local: "Câmara Municipal",
    exemploLocal: "Em Salvador: Câmara Municipal de Salvador",
    representa: "Atua politicamente no Município.",
    funcao:
      "Participa da criação das leis municipais e fiscaliza a Prefeitura e a administração municipal dentro das atribuições da Câmara.",
    exemplo:
      "Imagine uma discussão sobre uma regra municipal para o funcionamento de feiras e atividades em espaços públicos da cidade. Esse tipo de assunto pode envolver a Câmara Municipal e os vereadores.",
    naoFaz:
      "O vereador não é responsável por administrar diretamente os serviços da Prefeitura. Ele não substitui o prefeito, as secretarias nem os órgãos municipais.",
    resumo: "Município → Câmara Municipal → Vereador",
  },

  "deputado-estadual": {
    nome: "Deputado estadual",
    nivel: "Estado",
    local: "Assembleia Legislativa",
    exemploLocal: "Na Bahia: Assembleia Legislativa da Bahia — ALBA",
    representa: "Atua no Poder Legislativo do Estado.",
    funcao:
      "Participa da criação das leis estaduais, das decisões legislativas sobre o orçamento estadual e da fiscalização do Poder Executivo estadual.",
    exemplo:
      "Imagine que exista uma discussão sobre uma regra que será aplicada no âmbito do Estado da Bahia. Os deputados estaduais podem participar da elaboração e votação dessa legislação na Assembleia.",
    naoFaz:
      "Deputado estadual não é deputado federal em um cargo inferior. São cargos diferentes, que atuam em esferas diferentes.",
    resumo: "Estado → Assembleia Legislativa → Deputado estadual",
  },

  "deputado-federal": {
    nome: "Deputado federal",
    nivel: "União",
    local: "Câmara dos Deputados",
    exemploLocal: "Em Brasília: Câmara dos Deputados",
    representa: "Representa o povo na Câmara dos Deputados.",
    funcao:
      "Participa da elaboração das leis federais, fiscaliza o Governo Federal e participa das decisões sobre o Orçamento da União.",
    exemplo:
      "Imagine uma proposta para mudar uma lei federal válida em todo o país. Os deputados federais podem discutir e votar essa proposta na Câmara dos Deputados.",
    naoFaz:
      "O deputado federal não administra diretamente uma Prefeitura nem executa pessoalmente obras e serviços públicos. Seu papel é legislativo, fiscalizador e orçamentário.",
    resumo: "União → Câmara dos Deputados → Deputado federal",
  },

  senador: {
    nome: "Senador",
    nivel: "União",
    local: "Senado Federal",
    exemploLocal: "Em Brasília: Senado Federal",
    representa: "Representa o Estado ou o Distrito Federal no Senado.",
    funcao:
      "Participa da elaboração das leis federais junto com a Câmara dos Deputados e exerce funções que a Constituição atribui especificamente ao Senado.",
    exemplo:
      "Uma proposta aprovada pela Câmara dos Deputados pode precisar ser analisada também pelo Senado. Os senadores participam dessa etapa do processo legislativo.",
    naoFaz:
      "Senador e deputado federal trabalham no Congresso Nacional, mas não ocupam o mesmo cargo. Eles pertencem a Casas diferentes e existem competências próprias de cada uma.",
    resumo: "União → Senado Federal → Senador",
  },
};

export default function VereadoresDeputadosSenadores() {
  const [cargoSelecionado, setCargoSelecionado] =
    useState<Cargo>("vereador");

  const [resposta, setResposta] = useState<string | null>(null);

  const cargo = cargos[cargoSelecionado];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold text-blue-950">
            Observa Salvador
          </Link>

          <Link
            href="/politica-do-zero"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Política do Zero
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        {/* ABERTURA */}
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            PASSO 06
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            Vereador, deputado estadual, deputado federal e senador
          </h1>

          <p className="mt-5 text-xl font-semibold text-blue-700">
            Todos fazem parte do Legislativo, mas não trabalham no mesmo lugar.
          </p>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            A diferença fica muito mais fácil quando você descobre{" "}
            <strong>onde cada cargo atua</strong>. Município, Estado e União
            possuem estruturas legislativas diferentes.
          </p>
        </div>

        {/* MAPA PRINCIPAL */}
        <div className="mt-9">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            GUARDE ESTE MAPA
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* MUNICÍPIO */}
            <div className="grid gap-2 border-b border-slate-200 px-5 py-4 md:grid-cols-[120px_1fr_1fr] md:items-center">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Município
              </p>

              <p className="font-semibold text-slate-600">
                Câmara Municipal
              </p>

              <p className="text-lg font-bold text-blue-950">
                Vereador
              </p>
            </div>

            {/* ESTADO */}
            <div className="grid gap-2 border-b border-slate-200 px-5 py-4 md:grid-cols-[120px_1fr_1fr] md:items-center">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Estado
              </p>

              <p className="font-semibold text-slate-600">
                Assembleia Legislativa
              </p>

              <p className="text-lg font-bold text-blue-950">
                Deputado estadual
              </p>
            </div>

            {/* UNIÃO - CÂMARA */}
            <div className="grid gap-2 border-b border-slate-200 px-5 py-4 md:grid-cols-[120px_1fr_1fr] md:items-center">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                União
              </p>

              <p className="font-semibold text-slate-600">
                Câmara dos Deputados
              </p>

              <p className="text-lg font-bold text-blue-950">
                Deputado federal
              </p>
            </div>

            {/* UNIÃO - SENADO */}
            <div className="grid gap-2 px-5 py-4 md:grid-cols-[120px_1fr_1fr] md:items-center">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                União
              </p>

              <p className="font-semibold text-slate-600">
                Senado Federal
              </p>

              <p className="text-lg font-bold text-blue-950">
                Senador
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Câmara dos Deputados + Senado Federal formam o Congresso Nacional.
          </p>
        </div>

        {/* SELETOR */}
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            ESCOLHA UM CARGO
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            <button
              onClick={() => setCargoSelecionado("vereador")}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                cargoSelecionado === "vereador"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <p className="text-xs font-bold uppercase text-blue-600">
                Município
              </p>
              <p className="mt-1 font-bold text-blue-950">
                Vereador
              </p>
            </button>

            <button
              onClick={() => setCargoSelecionado("deputado-estadual")}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                cargoSelecionado === "deputado-estadual"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <p className="text-xs font-bold uppercase text-blue-600">
                Estado
              </p>
              <p className="mt-1 font-bold text-blue-950">
                Deputado estadual
              </p>
            </button>

            <button
              onClick={() => setCargoSelecionado("deputado-federal")}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                cargoSelecionado === "deputado-federal"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <p className="text-xs font-bold uppercase text-blue-600">
                União
              </p>
              <p className="mt-1 font-bold text-blue-950">
                Deputado federal
              </p>
            </button>

            <button
              onClick={() => setCargoSelecionado("senador")}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                cargoSelecionado === "senador"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <p className="text-xs font-bold uppercase text-blue-600">
                União
              </p>
              <p className="mt-1 font-bold text-blue-950">
                Senador
              </p>
            </button>
          </div>
        </div>

        {/* DETALHE DO CARGO */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-blue-100 bg-blue-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {cargo.nivel}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-blue-950">
                {cargo.nome}
              </h2>
            </div>

            <div className="sm:text-right">
              <p className="font-bold text-blue-950">
                {cargo.local}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {cargo.exemploLocal}
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                O QUE FAZ?
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                {cargo.funcao}
              </p>

              <div className="mt-5 border-l-4 border-blue-500 pl-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  ONDE ATUA?
                </p>

                <p className="mt-1 font-semibold leading-6 text-blue-950">
                  {cargo.representa}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                EXEMPLO
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                {cargo.exemplo}
              </p>
            </div>
          </div>

          <div className="grid border-t border-slate-200 md:grid-cols-[1fr_auto] md:items-center">
            <div className="px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                NÃO CONFUNDA
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                {cargo.naoFaz}
              </p>
            </div>

            <div className="border-t border-slate-200 bg-blue-50 px-6 py-4 md:border-l md:border-t-0">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                RESUMO
              </p>

              <p className="mt-1 whitespace-nowrap text-sm font-bold text-blue-950">
                {cargo.resumo}
              </p>
            </div>
          </div>
        </div>

        {/* DIFERENÇA QUE MAIS CONFUNDE */}
        <div className="mt-10 rounded-2xl bg-blue-950 px-6 py-6 text-white md:px-7">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                A DIFERENÇA QUE MAIS CONFUNDE
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Deputado estadual e deputado federal não são a mesma coisa.
              </h2>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-blue-700">
              <div className="p-4">
                <p className="text-xs font-bold uppercase text-blue-300">
                  Estado
                </p>

                <p className="mt-1 font-bold">
                  Deputado estadual
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Atua na Assembleia Legislativa e trata de matérias do âmbito
                  estadual.
                </p>
              </div>

              <div className="border-l border-blue-700 p-4">
                <p className="text-xs font-bold uppercase text-blue-300">
                  União
                </p>

                <p className="mt-1 font-bold">
                  Deputado federal
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Atua na Câmara dos Deputados e trata de matérias do âmbito
                  federal.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 border-t border-blue-800 pt-4 text-sm leading-6 text-blue-200">
            Não pense em “estadual” como um deputado menor e “federal” como um
            deputado maior. Eles ocupam cargos diferentes em estruturas
            legislativas diferentes.
          </p>
        </div>

        {/* CÂMARA + SENADO */}
        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            E NO NÍVEL FEDERAL?
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-950">
            Por que existem deputado federal e senador?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            No nível federal, o Poder Legislativo é formado por duas Casas.
            Juntas, elas formam o{" "}
            <strong className="text-blue-950">Congresso Nacional.</strong>
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid md:grid-cols-2 md:divide-x md:divide-slate-200">
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  CÂMARA DOS DEPUTADOS
                </p>

                <p className="mt-2 text-lg font-bold text-blue-950">
                  Deputados federais
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A Constituição define a Câmara dos Deputados como formada
                  por representantes do povo.
                </p>
              </div>

              <div className="border-t border-slate-200 p-5 md:border-t-0">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  SENADO FEDERAL
                </p>

                <p className="mt-2 text-lg font-bold text-blue-950">
                  Senadores
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A Constituição define os senadores como representantes dos
                  Estados e do Distrito Federal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TESTE */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            TESTE RÁPIDO
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            Uma proposta trata de uma lei estadual da Bahia.
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Em qual dessas Casas o assunto pode ser discutido no Legislativo
            estadual?
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              onClick={() => setResposta("camara-municipal")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "camara-municipal"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "camara-municipal" ? "✕ " : ""}
              Câmara Municipal
            </button>

            <button
              onClick={() => setResposta("alba")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "alba"
                  ? "border-green-300 bg-green-50 text-green-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "alba" ? "✓ " : ""}
              Assembleia Legislativa
            </button>

            <button
              onClick={() => setResposta("camara-deputados")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "camara-deputados"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "camara-deputados" ? "✕ " : ""}
              Câmara dos Deputados
            </button>
          </div>

          {resposta === "alba" && (
            <div className="mt-4 border-l-4 border-green-500 pl-4">
              <p className="font-bold text-green-800">
                Isso.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                Na Bahia, os deputados estaduais atuam na Assembleia
                Legislativa da Bahia, a ALBA.
              </p>
            </div>
          )}

          {resposta && resposta !== "alba" && (
            <div className="mt-4 border-l-4 border-amber-400 pl-4">
              <p className="font-bold text-amber-800">
                Ainda não.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                A pergunta fala de uma matéria do Estado da Bahia. Procure a
                Casa Legislativa que atua no nível estadual.
              </p>
            </div>
          )}
        </div>

        {/* NÃO CONFUNDA O PAPEL DO PARLAMENTAR */}
        <div className="mt-10 border-y border-slate-200 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            MAIS UMA COISA IMPORTANTE
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            Parlamentar não é prefeito, governador ou presidente.
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-bold text-blue-950">
                Pode legislar
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Participa da criação, discussão e votação de normas dentro de
                sua esfera de atuação.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-950">
                Pode fiscalizar
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                O Legislativo possui instrumentos para fiscalizar a atuação e
                os gastos do Executivo.
              </p>
            </div>

            <div>
              <p className="font-bold text-blue-950">
                Não executa o serviço
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Um parlamentar não vira responsável pela execução cotidiana de
                uma obra ou serviço público só porque destinou recursos ou
                participou de uma decisão legislativa.
              </p>
            </div>
          </div>
        </div>

        {/* GUARDE */}
        <div className="mt-9 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            SE ESQUECER, VOLTE PARA ESTA REGRA
          </p>

          <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
            <p className="font-semibold text-blue-950">
              Salvador → vereador
            </p>

            <p className="font-semibold text-blue-950">
              Bahia → deputado estadual
            </p>

            <p className="font-semibold text-blue-950">
              Câmara dos Deputados → deputado federal
            </p>

            <p className="font-semibold text-blue-950">
              Senado Federal → senador
            </p>
          </div>
        </div>

        {/* PRÓXIMO */}
        <div className="mt-9 rounded-2xl border border-slate-200 bg-white px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            PRÓXIMO PASSO
          </p>

          <div className="mt-2 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-blue-950">
                Mas como uma ideia vira uma lei?
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                Agora que você já sabe quem participa do Legislativo, o próximo
                passo é entender o que é uma lei e como ela nasce.
              </p>
            </div>

            <Link
              href="/politica-do-zero/o-que-e-uma-lei"
              className="mt-5 inline-flex shrink-0 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 md:mt-0"
            >
              Próximo: como nasce uma lei? →
            </Link>
          </div>
        </div>

        {/* FONTES */}
        <div className="mt-9 border-t border-slate-200 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            FONTES PARA CONFERIR
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Constituição Federal, Câmara dos Deputados, Senado Federal e
            Assembleia Legislativa da Bahia. O conteúdo foi reorganizado em
            linguagem simples para explicar as diferenças entre os cargos.
          </p>
        </div>

        {/* VOLTAR */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <Link
            href="/politica-do-zero"
            className="font-semibold text-slate-600 hover:text-blue-800"
          >
            ← Voltar para Política do Zero
          </Link>
        </div>
      </section>
    </main>
  );
}