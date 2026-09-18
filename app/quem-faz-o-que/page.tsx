"use client";

import Link from "next/link";
import { useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";

type Item = {
  id: string;
  nome: string;
  subtitulo: string;
  nivel: Nivel;
  faz: string[];
  naoFaz: string[];
  fiscalizacao: string;
  exemplo: string;
};

const itens: Item[] = [
  {
    id: "prefeito",
    nome: "Prefeito",
    subtitulo: "Chefe do Poder Executivo municipal",
    nivel: "salvador",
    faz: [
      "Administra o Município e coordena a atuação da Prefeitura.",
      "Executa políticas e serviços que são responsabilidade municipal.",
      "Propõe o orçamento municipal e administra os recursos dentro das regras legais.",
      "Sanciona ou veta projetos aprovados pela Câmara Municipal, nos casos previstos em lei.",
    ],
    naoFaz: [
      "Não cria leis municipais sozinho.",
      "Não comanda o Governo da Bahia nem o Governo Federal.",
      "Não pode gastar dinheiro público simplesmente como quiser.",
    ],
    fiscalizacao:
      "A atuação da Prefeitura pode ser fiscalizada por diferentes instituições, conforme o assunto. A Câmara Municipal exerce fiscalização política e financeira; órgãos de controle e outras instituições também possuem funções próprias.",
    exemplo:
      "Se o problema envolve um serviço administrado pelo Município, a Prefeitura pode fazer parte do caminho para descobrir quem é responsável.",
  },
  {
    id: "vereador",
    nome: "Vereador",
    subtitulo: "Representante no Legislativo municipal",
    nivel: "salvador",
    faz: [
      "Atua na Câmara Municipal.",
      "Participa da discussão e votação de leis municipais.",
      "Fiscaliza atos e gastos do Poder Executivo municipal dentro das competências da Câmara.",
      "Pode apresentar propostas e discutir assuntos de interesse do Município.",
    ],
    naoFaz: [
      "Não administra a Prefeitura.",
      "Não comanda secretarias municipais.",
      "Não executa diretamente as obras e serviços do Poder Executivo.",
    ],
    fiscalizacao:
      "A atividade parlamentar é pública e pode ser acompanhada pelo cidadão por meio da Câmara Municipal, incluindo projetos, sessões e votações disponibilizados pela instituição.",
    exemplo:
      "Se existe dúvida sobre uma lei municipal ou sobre a fiscalização política da Prefeitura, a Câmara e os vereadores podem ter atuação relacionada ao assunto.",
  },
  {
    id: "governador",
    nome: "Governador",
    subtitulo: "Chefe do Poder Executivo estadual",
    nivel: "bahia",
    faz: [
      "Administra o Governo do Estado da Bahia.",
      "Coordena políticas e serviços estaduais por meio da estrutura do Estado.",
      "Propõe o orçamento estadual e administra os recursos dentro das regras legais.",
      "Sanciona ou veta projetos aprovados pela Assembleia Legislativa, nos casos previstos em lei.",
    ],
    naoFaz: [
      "Não é chefe dos prefeitos.",
      "Não administra o Governo Federal.",
      "Não pode decidir sozinho sobre assuntos reservados a outros Poderes.",
    ],
    fiscalizacao:
      "A Assembleia Legislativa exerce funções de fiscalização sobre o Poder Executivo estadual. Órgãos de controle e outras instituições também exercem competências específicas.",
    exemplo:
      "Se a questão envolve uma estrutura ou serviço estadual, é importante verificar qual órgão do Governo da Bahia possui responsabilidade sobre aquele assunto.",
  },
  {
    id: "deputado-estadual",
    nome: "Deputado estadual",
    subtitulo: "Representante no Legislativo estadual",
    nivel: "bahia",
    faz: [
      "Atua na Assembleia Legislativa da Bahia.",
      "Participa da discussão e votação de leis estaduais.",
      "Participa da análise do orçamento estadual.",
      "Fiscaliza o Poder Executivo estadual dentro das competências do Legislativo.",
    ],
    naoFaz: [
      "Não administra secretarias estaduais.",
      "Não é responsável por executar diretamente serviços do Governo do Estado.",
      "Não exerce a função de prefeito ou governador.",
    ],
    fiscalizacao:
      "Projetos, sessões, votações e outras atividades parlamentares podem ser acompanhados pelos canais oficiais da Assembleia Legislativa da Bahia.",
    exemplo:
      "Quando uma questão depende de legislação estadual ou da fiscalização do Governo da Bahia, os deputados estaduais podem ter atuação relacionada ao tema.",
  },
  {
    id: "presidente",
    nome: "Presidente da República",
    subtitulo: "Chefe do Poder Executivo federal",
    nivel: "brasil",
    faz: [
      "Exerce a chefia do Poder Executivo federal.",
      "Administra o Governo Federal por meio de ministérios e outros órgãos da estrutura federal.",
      "Propõe o orçamento federal e administra recursos dentro das regras legais.",
      "Sanciona ou veta projetos aprovados pelo Congresso Nacional, nos casos previstos em lei.",
    ],
    naoFaz: [
      "Não é chefe dos governadores nem dos prefeitos.",
      "Não cria todas as leis sozinho.",
      "Não controla os outros Poderes.",
    ],
    fiscalizacao:
      "O Congresso Nacional exerce funções de fiscalização sobre o Poder Executivo federal. Existem também órgãos de controle e outras instituições com competências próprias.",
    exemplo:
      "Se o assunto é administrado pela União, é preciso identificar qual órgão federal é responsável antes de concluir que a tarefa pertence diretamente ao Presidente.",
  },
  {
    id: "deputado-federal",
    nome: "Deputado federal",
    subtitulo: "Representante na Câmara dos Deputados",
    nivel: "brasil",
    faz: [
      "Atua na Câmara dos Deputados.",
      "Participa da elaboração e votação de leis federais.",
      "Participa das decisões orçamentárias atribuídas ao Congresso Nacional.",
      "Fiscaliza o Poder Executivo federal dentro das competências do Legislativo.",
    ],
    naoFaz: [
      "Não administra ministérios.",
      "Não governa o Estado ou o Município.",
      "Não executa diretamente as políticas do Poder Executivo.",
    ],
    fiscalizacao:
      "O cidadão pode acompanhar projetos, votações, discursos e outras atividades pelos canais oficiais da Câmara dos Deputados.",
    exemplo:
      "Uma proposta de lei federal pode passar pela Câmara dos Deputados e envolver a participação dos deputados federais.",
  },
  {
    id: "senador",
    nome: "Senador",
    subtitulo: "Representante no Senado Federal",
    nivel: "brasil",
    faz: [
      "Atua no Senado Federal.",
      "Participa da elaboração e votação de leis federais.",
      "Participa de atribuições específicas que a Constituição reserva ao Senado.",
      "Integra, com a Câmara dos Deputados, o Congresso Nacional.",
    ],
    naoFaz: [
      "Não administra o Governo Federal.",
      "Não exerce a função de governador.",
      "Não executa diretamente obras e serviços do Poder Executivo.",
    ],
    fiscalizacao:
      "Projetos, votações e atividades dos senadores podem ser acompanhados pelos canais oficiais do Senado Federal.",
    exemplo:
      "Projetos de lei federais podem precisar passar tanto pela Câmara dos Deputados quanto pelo Senado antes de seguirem adiante.",
  },
];

const niveis = [
  {
    id: "salvador" as Nivel,
    nome: "Salvador",
    descricao: "Município",
  },
  {
    id: "bahia" as Nivel,
    nome: "Bahia",
    descricao: "Estado",
  },
  {
    id: "brasil" as Nivel,
    nome: "Brasil",
    descricao: "União",
  },
];

export default function QuemFazOQue() {
  const [nivel, setNivel] = useState<Nivel>("salvador");
  const [selecionado, setSelecionado] = useState<string>("prefeito");

  const itensDoNivel = itens.filter((item) => item.nivel === nivel);

  const itemAtual =
    itens.find((item) => item.id === selecionado) ?? itensDoNivel[0];

  function mudarNivel(novoNivel: Nivel) {
    setNivel(novoNivel);

    const primeiro = itens.find((item) => item.nivel === novoNivel);

    if (primeiro) {
      setSelecionado(primeiro.id);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-[15px] font-extrabold text-blue-950"
          >
            Observa Salvador
          </Link>

          <Link
            href="/"
            className="text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            ← Voltar ao início
          </Link>
        </div>
      </header>

      {/* ABERTURA */}
      <section className="mx-auto max-w-[1000px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
          QUEM FAZ O QUÊ?
        </span>

        <h1 className="mt-4 max-w-[700px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Quem você quer entender?
        </h1>

        <p className="mt-4 max-w-[720px] text-[15px] leading-6 text-slate-600">
          Escolha um cargo para entender, em linguagem simples, qual é a função,
          o que ele não faz e como sua atuação pode ser acompanhada.
        </p>
      </section>

      {/* SELETOR DE NÍVEL */}
      <section className="mx-auto max-w-[1000px] px-5 md:px-8">
        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
          1. Escolha onde
        </p>

        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
          {niveis.map((item, index) => {
            const ativo = nivel === item.id;

            return (
              <button
                key={item.id}
                onClick={() => mudarNivel(item.id)}
                className={`px-5 py-4 text-left transition ${
                  index !== 0
                    ? "border-t border-slate-200 sm:border-l sm:border-t-0"
                    : ""
                } ${
                  ativo
                    ? "bg-blue-950 text-white"
                    : "hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-[14px] font-extrabold ${
                    ativo ? "text-white" : "text-blue-950"
                  }`}
                >
                  {item.nome}
                </p>

                <p
                  className={`mt-0.5 text-[11px] ${
                    ativo ? "text-blue-200" : "text-slate-500"
                  }`}
                >
                  {item.descricao}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* SELETOR DO CARGO */}
      <section className="mx-auto max-w-[1000px] px-5 pt-7 md:px-8">
        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
          2. Escolha quem você quer entender
        </p>

        <div className="flex flex-wrap gap-2">
          {itensDoNivel.map((item) => {
            const ativo = itemAtual.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelecionado(item.id)}
                className={`rounded-lg border px-4 py-2.5 text-[12px] font-extrabold transition ${
                  ativo
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                {item.nome}
              </button>
            );
          })}
        </div>
      </section>

      {/* RESULTADO */}
      <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-5 md:px-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* IDENTIFICAÇÃO */}
          <div className="border-b border-slate-200 px-5 py-5 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
              {nivel === "salvador"
                ? "MUNICÍPIO"
                : nivel === "bahia"
                ? "ESTADO"
                : "UNIÃO"}
            </p>

            <h2 className="mt-1 text-[24px] font-extrabold tracking-tight text-blue-950">
              {itemAtual.nome}
            </h2>

            <p className="mt-1 text-[13px] text-slate-500">
              {itemAtual.subtitulo}
            </p>
          </div>

          {/* FAZ / NÃO FAZ */}
          <div className="grid md:grid-cols-2">
            <div className="px-5 py-5 md:px-6">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-green-700">
                O que faz
              </p>

              <div className="mt-3 space-y-3">
                {itemAtual.faz.map((texto) => (
                  <div key={texto} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-[9px] font-black text-green-700">
                      ✓
                    </span>

                    <p className="text-[13px] leading-5 text-slate-700">
                      {texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-amber-700">
                Não confunda
              </p>

              <div className="mt-3 space-y-3">
                {itemAtual.naoFaz.map((texto) => (
                  <div key={texto} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-700">
                      !
                    </span>

                    <p className="text-[13px] leading-5 text-slate-700">
                      {texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXEMPLO */}
          <div className="border-t border-slate-200 bg-blue-50/60 px-5 py-4 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
              Exemplo para entender
            </p>

            <p className="mt-1.5 text-[13px] leading-5 text-slate-700">
              {itemAtual.exemplo}
            </p>
          </div>

          {/* FISCALIZAÇÃO */}
          <div className="border-t border-slate-200 px-5 py-4 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
              Como acompanhar
            </p>

            <p className="mt-1.5 max-w-[800px] text-[13px] leading-5 text-slate-600">
              {itemAtual.fiscalizacao}
            </p>
          </div>
        </div>

        {/* PONTE COM POLÍTICA DO ZERO */}
        <div className="mt-6 grid gap-4 rounded-xl bg-blue-950 px-5 py-5 text-white md:grid-cols-[1fr_auto] md:items-center md:px-6">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-blue-200">
              Ainda está confuso?
            </p>

            <p className="mt-1 text-[13px] leading-5 text-blue-50">
              No Política do Zero, você pode aprender desde o começo como
              Município, Estado, União e os três Poderes se organizam.
            </p>
          </div>

          <Link
            href="/politica-do-zero"
            className="inline-flex justify-center rounded-lg bg-white px-4 py-2.5 text-[12px] font-extrabold text-blue-800 transition hover:bg-blue-50"
          >
            Ir para Política do Zero →
          </Link>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-[13px] font-extrabold text-blue-950">
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