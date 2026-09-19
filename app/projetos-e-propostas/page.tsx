"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";

type ProjetoDemonstracao = {
  id: number;
  titulo: string;
  resumo: string;
  identificacao: string;
  autor: string;
  situacao: "Em análise" | "Aprovado" | "Encerrado";
  tema: string;
};

const niveis = [
  {
    id: "salvador" as Nivel,
    titulo: "Salvador",
    subtitulo: "Câmara Municipal",
  },
  {
    id: "bahia" as Nivel,
    titulo: "Bahia",
    subtitulo: "Assembleia Legislativa",
  },
  {
    id: "brasil" as Nivel,
    titulo: "Brasil",
    subtitulo: "Congresso Nacional",
  },
];

/*
  Estes registros são apenas demonstrativos.
  Depois esta lista será substituída pelos dados vindos das fontes oficiais.
*/
const projetosDemonstracao: ProjetoDemonstracao[] = [
  {
    id: 1,
    titulo: "Proposta relacionada ao transporte público",
    resumo:
      "Exemplo de como uma proposta aparecerá depois que os dados oficiais forem conectados.",
    identificacao: "EXEMPLO 001",
    autor: "Autor demonstrativo",
    situacao: "Em análise",
    tema: "Transporte",
  },
  {
    id: 2,
    titulo: "Proposta relacionada à iluminação pública",
    resumo:
      "Este registro existe apenas para testar a pesquisa e os filtros da página.",
    identificacao: "EXEMPLO 002",
    autor: "Autor demonstrativo",
    situacao: "Aprovado",
    tema: "Cidade",
  },
  {
    id: 3,
    titulo: "Proposta relacionada à drenagem urbana",
    resumo:
      "Depois, esta área receberá projetos verdadeiros obtidos das fontes públicas.",
    identificacao: "EXEMPLO 003",
    autor: "Autor demonstrativo",
    situacao: "Encerrado",
    tema: "Infraestrutura",
  },
];

export default function ProjetosEPropostas() {
  const [nivel, setNivel] = useState<Nivel>("brasil");
  const [busca, setBusca] = useState("");
  const [situacao, setSituacao] = useState("Todos");
  const [explicacaoAberta, setExplicacaoAberta] = useState(true);

  const projetosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    return projetosDemonstracao.filter((projeto) => {
      const combinaBusca =
        !termo ||
        projeto.titulo.toLocaleLowerCase("pt-BR").includes(termo) ||
        projeto.resumo.toLocaleLowerCase("pt-BR").includes(termo) ||
        projeto.autor.toLocaleLowerCase("pt-BR").includes(termo) ||
        projeto.tema.toLocaleLowerCase("pt-BR").includes(termo);

      const combinaSituacao =
        situacao === "Todos" || projeto.situacao === situacao;

      return combinaBusca && combinaSituacao;
    });
  }, [busca, situacao]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* CABEÇALHO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1050px] items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="text-[15px] font-extrabold text-blue-950">
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

      {/* HERO */}
      <section className="mx-auto max-w-[1050px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <span className="inline-flex rounded-md bg-cyan-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-cyan-700">
          PROJETOS E PROPOSTAS
        </span>

        <h1 className="mt-4 max-w-[820px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Descubra o que está sendo proposto antes de virar regra.
        </h1>

        <p className="mt-4 max-w-[760px] text-[15px] leading-6 text-slate-600">
          Pesquise propostas, entenda o que elas querem mudar, descubra quem
          apresentou e acompanhe o caminho de cada uma.
        </p>
      </section>

      {/* ALERTA PRINCIPAL */}
      <section className="mx-auto max-w-[1050px] px-5 md:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 md:px-6">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
            NÃO CONFUNDA
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="rounded-md bg-white px-3 py-2 text-[12px] font-extrabold text-blue-950">
              Alguém apresentou uma proposta
            </span>

            <span className="hidden font-bold text-amber-600 sm:block">≠</span>

            <span className="rounded-md bg-white px-3 py-2 text-[12px] font-extrabold text-blue-950">
              A proposta virou lei
            </span>
          </div>

          <p className="mt-3 max-w-[780px] text-[11px] leading-5 text-slate-700">
            Uma proposta pode passar por várias etapas, ser modificada, ser
            aprovada ou não continuar. Por isso, sempre mostramos em que ponto
            ela está.
          </p>
        </div>
      </section>

      {/* EXPLICAÇÃO */}
      <section className="mx-auto max-w-[1050px] px-5 pt-3 md:px-8">
        <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
          <button
            type="button"
            onClick={() => setExplicacaoAberta(!explicacaoAberta)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                COMECE POR AQUI
              </p>

              <p className="mt-1 text-[14px] font-extrabold text-blue-950">
                Como uma ideia pode virar uma regra?
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              {explicacaoAberta ? "−" : "+"}
            </span>
          </button>

          {explicacaoAberta && (
            <div className="border-t border-slate-200 px-5 py-5 md:px-6">
              <p className="max-w-[780px] text-[12px] leading-5 text-slate-700">
                Imagine que alguém apresenta uma proposta para mudar uma regra
                que existe hoje. A apresentação é apenas o começo. Antes de uma
                mudança realmente passar a valer, podem existir várias etapas.
              </p>

              <div className="mt-5 grid gap-2 md:grid-cols-5">
                {[
                  ["1", "A ideia é apresentada"],
                  ["2", "Ela começa a ser analisada"],
                  ["3", "O texto pode mudar"],
                  ["4", "Pode haver votações"],
                  ["5", "Há um resultado"],
                ].map(([numero, texto]) => (
                  <div
                    key={numero}
                    className="rounded-lg bg-slate-50 px-3 py-3"
                  >
                    <span className="text-[10px] font-extrabold text-blue-600">
                      {numero}
                    </span>

                    <p className="mt-1 text-[11px] font-extrabold leading-4 text-blue-950">
                      {texto}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-l-2 border-blue-400 pl-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                  Agora aprenda o nome
                </p>

                <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                  Tramitação
                </p>

                <p className="mt-1 max-w-[720px] text-[11px] leading-5 text-slate-600">
                  É o caminho que uma proposta percorre enquanto está sendo
                  analisada.
                </p>

                <p className="mt-1 text-[11px] font-bold text-blue-700">
                  Pense assim: tramitação → caminho da proposta.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* NÍVEL */}
      <section className="mx-auto max-w-[1050px] px-5 pt-8 md:px-8">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          Onde você quer pesquisar?
        </p>

        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-3">
          {niveis.map((item, index) => {
            const ativo = nivel === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setNivel(item.id)}
                className={`px-5 py-4 text-left transition ${
                  index !== 0
                    ? "border-t border-slate-200 sm:border-l sm:border-t-0"
                    : ""
                } ${
                  ativo ? "bg-blue-950 text-white" : "hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-[14px] font-extrabold ${
                    ativo ? "text-white" : "text-blue-950"
                  }`}
                >
                  {item.titulo}
                </p>

                <p
                  className={`mt-0.5 text-[11px] ${
                    ativo ? "text-blue-200" : "text-slate-500"
                  }`}
                >
                  {item.subtitulo}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* BUSCA */}
      <section className="mx-auto max-w-[1050px] px-5 pt-5 md:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
            PESQUISAR
          </p>

          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_190px]">
            <div>
              <label
                htmlFor="busca"
                className="text-[11px] font-extrabold text-blue-950"
              >
                O que você quer encontrar?
              </label>

              <input
                id="busca"
                type="text"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Ex.: ônibus, iluminação, escola, imposto..."
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[12px] outline-none transition placeholder:text-slate-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="situacao"
                className="text-[11px] font-extrabold text-blue-950"
              >
                O que aconteceu?
              </label>

              <select
                id="situacao"
                value={situacao}
                onChange={(event) => setSituacao(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-[12px] font-bold text-slate-700 outline-none focus:border-blue-400"
              >
                <option>Todos</option>
                <option>Em análise</option>
                <option>Aprovado</option>
                <option>Encerrado</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Saúde", "Transporte", "Segurança", "Educação", "Impostos", "Obras"].map(
              (tema) => (
                <button
                  key={tema}
                  type="button"
                  onClick={() => setBusca(tema)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {tema}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* EXPLICAÇÃO DO NÍVEL */}
      <section className="mx-auto max-w-[1050px] px-5 pt-4 md:px-8">
        <div className="flex items-start gap-3 rounded-lg bg-blue-50 px-4 py-3">
          <span className="mt-0.5 text-[12px]">ℹ️</span>

          <p className="text-[11px] leading-5 text-slate-700">
            {nivel === "salvador" && (
              <>
                Você está pesquisando propostas relacionadas à{" "}
                <strong>Câmara Municipal de Salvador</strong>.
              </>
            )}

            {nivel === "bahia" && (
              <>
                Você está pesquisando propostas relacionadas à{" "}
                <strong>Assembleia Legislativa da Bahia</strong>.
              </>
            )}

            {nivel === "brasil" && (
              <>
                Você está pesquisando propostas do{" "}
                <strong>Congresso Nacional</strong>. Quando for útil para
                Salvador e para a Bahia, destacaremos também os representantes
                eleitos pelo estado envolvidos na proposta.
              </>
            )}
          </p>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mx-auto max-w-[1050px] px-5 pb-12 pt-5 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
              RESULTADOS
            </p>

            <h2 className="mt-1 text-[18px] font-extrabold text-blue-950">
              Projetos encontrados
            </h2>
          </div>

          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
            {projetosFiltrados.length} nesta demonstração
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {projetosFiltrados.length > 0 ? (
            projetosFiltrados.map((projeto) => (
              <article
                key={projeto.id}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4 transition hover:border-blue-200"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-[720px]">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-extrabold text-blue-700">
                        {projeto.tema}
                      </span>

                      <span
                        className={`rounded-md px-2 py-1 text-[9px] font-extrabold ${
                          projeto.situacao === "Em análise"
                            ? "bg-amber-50 text-amber-800"
                            : projeto.situacao === "Aprovado"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {projeto.situacao}
                      </span>
                    </div>

                    <h3 className="mt-3 text-[15px] font-extrabold text-blue-950">
                      {projeto.titulo}
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      {projeto.resumo}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-slate-500">
                      <span>
                        <strong className="text-slate-700">Autor:</strong>{" "}
                        {projeto.autor}
                      </span>

                      <span>
                        <strong className="text-slate-700">
                          Identificação:
                        </strong>{" "}
                        {projeto.identificacao}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-extrabold text-blue-700 hover:bg-blue-50"
                  >
                    Entender proposta →
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
              <p className="text-[12px] font-extrabold text-blue-950">
                Nenhum resultado encontrado.
              </p>

              <p className="mt-1 text-[11px] text-slate-500">
                Tente pesquisar outra palavra ou mudar o filtro.
              </p>
            </div>
          )}
        </div>

        {/* AVISO SOBRE DADOS */}
        <div className="mt-5 rounded-xl border border-cyan-100 bg-cyan-50 px-5 py-4">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-cyan-800">
            COMO ESTA ÁREA VAI FUNCIONAR
          </p>

          <p className="mt-2 max-w-[800px] text-[11px] leading-5 text-slate-700">
            Os três registros mostrados acima existem apenas para testar a
            interface. Na versão conectada, esta área será preenchida com
            informações obtidas de fontes públicas oficiais.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-extrabold">
            <span className="rounded-md bg-white px-2.5 py-2 text-slate-700">
              Fonte oficial
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded-md bg-white px-2.5 py-2 text-slate-700">
              Base do Observa Salvador
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded-md bg-white px-2.5 py-2 text-slate-700">
              Explicação simples
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded-md bg-white px-2.5 py-2 text-slate-700">
              Link para conferir
            </span>
          </div>
        </div>

        {/* PRINCÍPIO EDITORIAL */}
        <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-5 py-4">
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-rose-700">
            O OBSERVA SALVADOR NÃO ESCOLHE UMA POSIÇÃO POR VOCÊ
          </p>

          <p className="mt-2 max-w-[800px] text-[11px] leading-5 text-slate-700">
            A plataforma mostra o que está sendo proposto, quem apresentou, em
            que etapa está e quais fontes sustentam essas informações. A
            avaliação da proposta pertence a cada cidadão.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1050px] flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
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