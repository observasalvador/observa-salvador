"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Nivel = "salvador" | "bahia" | "brasil";

type Cargo = {
  id: string;
  nome: string;
};

type Representante = {
  nome: string;
  partido: string;
  periodo?: string;
  explicacao?: string;
  aprenda?: {
    termo: string;
    significado: string;
  };
};

const niveis = [
  { id: "salvador" as Nivel, nome: "Salvador", descricao: "Cidade" },
  { id: "bahia" as Nivel, nome: "Bahia", descricao: "Estado" },
  { id: "brasil" as Nivel, nome: "Brasil", descricao: "País" },
];

const cargos: Record<Nivel, Cargo[]> = {
  salvador: [
    { id: "prefeito", nome: "Prefeito" },
    { id: "vereadores", nome: "Vereadores" },
  ],
  bahia: [
    { id: "governador", nome: "Governador" },
    { id: "deputados-estaduais", nome: "Deputados estaduais" },
  ],
  brasil: [
    { id: "presidente", nome: "Presidente" },
    { id: "deputados-federais", nome: "Deputados federais" },
    { id: "senadores", nome: "Senadores" },
  ],
};

const executivos = {
  prefeito: {
    cargo: "Prefeito de Salvador",
    nome: "Bruno Reis",
    territorio: "Salvador",
    esfera: "Prefeitura",
    descricao:
      "É a pessoa que está à frente da Prefeitura de Salvador. O prefeito administra serviços e ações que são responsabilidade da cidade.",
  },

  governador: {
    cargo: "Governador da Bahia",
    nome: "Jerônimo Rodrigues",
    territorio: "Bahia",
    esfera: "Governo do Estado",
    descricao:
      "É a pessoa que está à frente do Governo da Bahia. O governador administra serviços e ações que são responsabilidade do Estado.",
  },

  presidente: {
    cargo: "Presidente da República",
    nome: "Luiz Inácio Lula da Silva",
    territorio: "Brasil",
    esfera: "Governo Federal",
    descricao:
      "É a pessoa que está à frente do Governo Federal. O presidente administra serviços e ações que são responsabilidade do governo do país.",
  },
};

const vereadoresSalvador: Representante[] = [
  { nome: "Aladilce Souza", partido: "PCdoB" },
  { nome: "Alex Alemão", partido: "DC" },
  { nome: "Alexandre Aleluia", partido: "Novo" },
  { nome: "Anderson Ninho", partido: "PSDB" },
  { nome: "André Fraga", partido: "PV" },
  { nome: "Beca", partido: "Republicanos" },
  { nome: "Carlos Kleber", partido: "PSD" },
  { nome: "Carlos Muniz", partido: "PSDB" },
  { nome: "Cezar Leite", partido: "PL" },
  { nome: "Claudio Tinoco", partido: "União" },
  { nome: "Cris Correia", partido: "PSDB" },
  { nome: "Daniel Alves", partido: "PSDB" },
  { nome: "David Rios", partido: "MDB" },
  { nome: "Débora Santana", partido: "PSDB" },
  { nome: "Dr. José Antonio", partido: "PRD" },
  { nome: "Duda Sanches", partido: "PSDB" },
  { nome: "Eliete Paraguassu", partido: "PSOL" },
  { nome: "Fábio Souza", partido: "PRD" },
  { nome: "Hamilton Assis", partido: "PSOL" },
  { nome: "Helio Ferreira", partido: "PCdoB" },
  { nome: "Ireuda Silva", partido: "Republicanos" },
  { nome: "Isabela Sousa", partido: "Cidadania" },
  { nome: "João Cláudio Bacelar", partido: "Podemos" },
  { nome: "Kel Torres", partido: "Republicanos" },
  { nome: "Kiki Bispo", partido: "União" },
  { nome: "Luiz Carlos", partido: "Republicanos" },
  { nome: "Marcelle Moraes", partido: "União" },
  { nome: "Marcelo Guimarães Neto", partido: "União" },
  { nome: "Marta Rodrigues", partido: "PT" },
  { nome: "Maurício Trindade", partido: "PP" },
  { nome: "Omarzinho Gordilho", partido: "PDT" },
  { nome: "Orlando Palhinha", partido: "União" },
  { nome: "Paulo Magalhães Júnior", partido: "União" },
  { nome: "Randerson Leal", partido: "Podemos" },
  { nome: "Ricardo Almeida", partido: "DC" },
  { nome: "Roberta Caires", partido: "Republicanos" },
  { nome: "Rodrigo Amaral", partido: "PSDB" },
  { nome: "Sandro Bahiense", partido: "PP" },
  { nome: "Sandro Filho", partido: "PP" },
  { nome: "Sidninho", partido: "PP" },
  { nome: "Sílvio Humberto", partido: "PSB" },
  { nome: "Téo Senna", partido: "PSDB" },
  { nome: "Tiago Queiroz", partido: "PP" },
];

const deputadosBahia: Representante[] = [
  { nome: "Adolfo Menezes", partido: "PSD" },
  { nome: "Alex da Piatã", partido: "PSD" },
  { nome: "Angelo Almeida", partido: "PT" },
  { nome: "Angelo Coronel Filho", partido: "Republicanos" },
  { nome: "Antonio Henrique Júnior", partido: "PV" },
  { nome: "Binho Galinha", partido: "Avante" },
  { nome: "Bobô", partido: "PCdoB" },
  { nome: "Cafu Barreto", partido: "União" },
  { nome: "Cláudia Oliveira", partido: "PSD" },
  { nome: "Dr. Diego Castro", partido: "PL" },
  { nome: "Eduardo Alencar", partido: "PSD" },
  { nome: "Eduardo Salles", partido: "PV" },
  { nome: "Euclides Fernandes", partido: "PT" },
  { nome: "Fabrício Falcão", partido: "PCdoB" },
  { nome: "Fátima Nunes", partido: "PT" },
  { nome: "Felipe Duarte", partido: "Avante" },
  { nome: "Hassan", partido: "PP" },
  { nome: "Hilton Coelho", partido: "PSOL" },
  { nome: "Ivana Bastos", partido: "PSD" },
  { nome: "Jordávio Ramos", partido: "PSDB" },
  { nome: "Jose de Arimateia", partido: "Republicanos" },
  { nome: "Júnior Muniz", partido: "PT" },
  { nome: "Júnior Nascimento", partido: "União" },
  { nome: "Jurailton Santos", partido: "Republicanos" },

  {
    nome: "Jusmari Oliveira",
    partido: "PSD",
    explicacao:
      "A ALBA informa que Jusmari Oliveira passou a ocupar uma vaga de deputada estadual em 15 de janeiro de 2025, no lugar de Eures Ribeiro.",
    aprenda: {
      termo: "Suplente",
      significado:
        "É uma pessoa que pode ser chamada para ocupar uma vaga quando quem estava no cargo deixa de ocupá-la, de forma temporária ou definitiva, conforme as regras daquela situação.",
    },
  },

  { nome: "Kátia Oliveira", partido: "União" },
  { nome: "Laerte do Vando", partido: "Avante" },
  { nome: "Leandro de Jesus", partido: "PL" },
  { nome: "Luciano Araújo", partido: "Avante" },

  {
    nome: "Luciano Ribeiro",
    partido: "União",
    explicacao:
      "Alan Sanches ocupava uma das vagas de deputado estadual e faleceu. Luciano Ribeiro passou a ocupar essa vaga em 22 de janeiro de 2026.",
    aprenda: {
      termo: "Quando uma vaga fica disponível",
      significado:
        "Se uma pessoa deixa definitivamente o cargo antes do fim do período previsto, outra pessoa pode assumir a vaga seguindo as regras eleitorais.",
    },
  },

  { nome: "Luciano Simões Filho", partido: "União" },
  { nome: "Ludmilla Fiscina", partido: "PSD" },
  { nome: "Manuel Rocha", partido: "União" },
  { nome: "Marcelinho Veiga", partido: "PP" },
  { nome: "Marcinho Oliveira", partido: "PDT" },
  { nome: "Maria del Carmen", partido: "PT" },
  { nome: "Marquinho Viana", partido: "PV" },
  { nome: "Matheus Ferreira", partido: "MDB" },
  { nome: "Nelson Leal", partido: "PP" },

  {
    nome: "Neusa Cadore",
    partido: "PT",
    explicacao:
      "A ALBA informa que Neusa Cadore assumiu uma vaga em 2023. Em março de 2024, passou a ocupar a vaga de forma definitiva depois que Paulo Rangel deixou o cargo. Em 25 de julho de 2024, ela se afastou do trabalho como deputada para assumir a Secretaria de Políticas para as Mulheres do Governo da Bahia.",
    aprenda: {
      termo: "Afastamento",
      significado:
        "Significa que a pessoa fica um período fora do trabalho naquele cargo. Dependendo do motivo e das regras, outra pessoa pode ocupar a vaga durante esse tempo.",
    },
  },

  { nome: "Niltinho", partido: "PSD" },
  { nome: "Olivia Santana", partido: "PCdoB" },
  { nome: "Osni Cardoso", partido: "PT" },
  { nome: "Pancadinha", partido: "PDT" },
  { nome: "Patrick Lopes", partido: "Avante" },

  {
    nome: "Paulo Câmara",
    partido: "PL",
    explicacao:
      "Pablo Roberto ocupava essa vaga. Depois de ser eleito vice-prefeito de Feira de Santana, ele deixou o cargo de deputado estadual. Paulo Câmara assumiu a vaga em 27 de dezembro de 2024.",
    aprenda: {
      termo: "Renúncia",
      significado:
        "Renunciar significa deixar oficialmente um cargo antes do fim do período previsto.",
    },
  },

  { nome: "Pedro Tavares", partido: "União" },
  { nome: "Penalva", partido: "PP" },
  { nome: "Raimundinho da JR", partido: "PL" },
  { nome: "Ricardo Rodrigues", partido: "PSD" },
  { nome: "Roberto Carlos", partido: "PV" },
  { nome: "Robinho", partido: "União" },
  { nome: "Robinson Almeida", partido: "PT" },
  { nome: "Rogério Andrade", partido: "MDB" },
  { nome: "Rosemberg Pinto", partido: "PT" },
  { nome: "Samuel Junior", partido: "PL" },
  { nome: "Sandro Régis", partido: "União" },
  { nome: "Soane Galvão", partido: "Avante" },
  { nome: "Tiago Correia", partido: "PSDB" },
  { nome: "Vitor Azevedo", partido: "Avante" },
  { nome: "Vitor Bonfim", partido: "PSB" },
  { nome: "Zé Raimundo Fontes", partido: "PT" },
  { nome: "Zó", partido: "PCdoB" },
];

const deputadosFederaisBahia: Representante[] = [
  { nome: "Adolfo Viana", partido: "PSDB" },
  { nome: "Alice Portugal", partido: "PCdoB" },
  { nome: "Antonio Brito", partido: "PSD" },
  { nome: "Arthur Oliveira Maia", partido: "União" },
  { nome: "Bacelar", partido: "PV" },
  { nome: "Capitão Alden", partido: "PL" },
  { nome: "Charles Fernandes", partido: "PSD" },
  { nome: "Claudio Cajado", partido: "PP" },
  { nome: "Dal Barreto", partido: "União" },
  { nome: "Daniel Almeida", partido: "PCdoB" },
  { nome: "Diego Coronel", partido: "PSD" },
  { nome: "Elmar Nascimento", partido: "União" },
  { nome: "Félix Mendonça Júnior", partido: "PDT" },
  { nome: "Gabriel Nunes", partido: "PSD" },
  { nome: "Ivoneide Caetano", partido: "PT" },
  { nome: "João Carlos Bacelar", partido: "PL" },

  {
    nome: "Jorge Araújo",
    partido: "PP",
    explicacao:
      "João Leão ficou temporariamente fora do cargo em 8 de abril de 2026. No mesmo dia, Jorge Araújo passou a ocupar essa vaga. Por isso, é Jorge Araújo quem está trabalhando atualmente nessa vaga da representação da Bahia.",
    aprenda: {
      termo: "Suplente",
      significado:
        "É uma pessoa que pode ser chamada para ocupar uma vaga quando quem normalmente ocupa aquele lugar fica temporariamente fora ou quando acontece outra situação prevista pelas regras.",
    },
  },

  { nome: "Jorge Solla", partido: "PT" },
  { nome: "José Rocha", partido: "União" },

  {
    nome: "José Carlos Araujo",
    partido: "PDT",
    explicacao:
      "Leo Prates ficou temporariamente fora do cargo em 26 de junho de 2026. José Carlos Araujo passou a ocupar essa vaga em 30 de junho de 2026. Por isso, é José Carlos Araujo quem está trabalhando atualmente nessa vaga.",
    aprenda: {
      termo: "Suplente",
      significado:
        "É uma pessoa que pode ser chamada para ocupar uma vaga enquanto quem normalmente ocupa aquele lugar está temporariamente fora.",
    },
  },

  { nome: "Joseildo Ramos", partido: "PT" },
  { nome: "Josias Gomes", partido: "PT" },
  { nome: "Leur Lomanto Júnior", partido: "União" },
  { nome: "Lídice da Mata", partido: "PSB" },

  {
    nome: "Marcelo Nilo",
    partido: "Republicanos",
    explicacao:
      "Alex Santana ficou temporariamente fora do cargo em 8 de abril de 2026. No mesmo dia, Marcelo Nilo passou a ocupar essa vaga. Por isso, é Marcelo Nilo quem está trabalhando atualmente nessa vaga da representação da Bahia.",
    aprenda: {
      termo: "Suplente",
      significado:
        "É uma pessoa que pode ser chamada para ocupar uma vaga enquanto quem normalmente ocupa aquele lugar está temporariamente fora.",
    },
  },

  { nome: "Márcio Marinho", partido: "Republicanos" },
  { nome: "Mário Negromonte Júnior", partido: "PP" },
  { nome: "Neto Carletto", partido: "Avante" },
  { nome: "Otto Alencar Filho", partido: "PSD" },
  { nome: "Pastor Sargento Isidório", partido: "Avante" },
  { nome: "Paulo Azi", partido: "União" },
  { nome: "Paulo Magalhães", partido: "PSD" },
  { nome: "Raimundo Costa", partido: "PSD" },
  { nome: "Ricardo Maia", partido: "MDB" },
  { nome: "Roberta Roma", partido: "PL" },
  { nome: "Rogéria Santos", partido: "Republicanos" },
  { nome: "Sérgio Brito", partido: "PSD" },
  { nome: "Valmir Assunção", partido: "PT" },
  { nome: "Waldenor Pereira", partido: "PT" },
  { nome: "Zé Neto", partido: "PT" },
];

const senadoresBahia: Representante[] = [
  {
    nome: "Angelo Coronel",
    partido: "Republicanos",
    periodo: "2019 a 2027",
  },
  {
    nome: "Jaques Wagner",
    partido: "PT",
    periodo: "2019 a 2027",
  },
  {
    nome: "Otto Alencar",
    partido: "PSD",
    periodo: "2023 a 2031",
  },
];

function iniciais(nome: string) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

export default function QuemMeRepresenta() {
  const [nivel, setNivel] = useState<Nivel>("salvador");
  const [cargoSelecionado, setCargoSelecionado] =
    useState<string>("prefeito");
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);
  const [explicacaoFederalAberta, setExplicacaoFederalAberta] =
    useState(false);
  const [bancadaAberta, setBancadaAberta] = useState(false);
  const [explicacaoSenadoAberta, setExplicacaoSenadoAberta] =
    useState(false);

  const executivo =
    cargoSelecionado === "prefeito" ||
    cargoSelecionado === "governador" ||
    cargoSelecionado === "presidente"
      ? executivos[cargoSelecionado]
      : null;

  const mostrandoVereadores =
    nivel === "salvador" && cargoSelecionado === "vereadores";

  const mostrandoDeputadosBahia =
    nivel === "bahia" && cargoSelecionado === "deputados-estaduais";

  const mostrandoDeputadosFederais =
    nivel === "brasil" && cargoSelecionado === "deputados-federais";

  const mostrandoSenadores =
    nivel === "brasil" && cargoSelecionado === "senadores";

  const listaAtual = mostrandoVereadores
    ? vereadoresSalvador
    : mostrandoDeputadosBahia
    ? deputadosBahia
    : mostrandoDeputadosFederais
    ? deputadosFederaisBahia
    : mostrandoSenadores
    ? senadoresBahia
    : [];

  const representantesFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    if (!termo) return listaAtual;

    return listaAtual.filter(
      (pessoa) =>
        pessoa.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
        pessoa.partido.toLocaleLowerCase("pt-BR").includes(termo)
    );
  }, [busca, listaAtual]);

  function mudarNivel(novoNivel: Nivel) {
    setNivel(novoNivel);
    setCargoSelecionado(cargos[novoNivel][0].id);
    setBusca("");
    setAberto(null);
    setExplicacaoFederalAberta(false);
    setBancadaAberta(false);
    setExplicacaoSenadoAberta(false);
  }

  function mudarCargo(cargo: string) {
    setCargoSelecionado(cargo);
    setBusca("");
    setAberto(null);
    setExplicacaoFederalAberta(false);
    setBancadaAberta(false);
    setExplicacaoSenadoAberta(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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

      <section className="mx-auto max-w-[1000px] px-5 pb-7 pt-9 md:px-8 md:pt-12">
        <span className="inline-flex rounded-md bg-rose-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-rose-700">
          QUEM ME REPRESENTA?
        </span>

        <h1 className="mt-4 max-w-[760px] text-[34px] font-extrabold leading-[1.08] tracking-tight text-blue-950 md:text-[44px]">
          Veja quem ocupa cargos públicos em Salvador, na Bahia e no Brasil.
        </h1>

        <p className="mt-4 max-w-[730px] text-[15px] leading-6 text-slate-600">
          Escolha o lugar e depois o cargo. Aqui você também poderá entender
          mudanças importantes e conferir de onde veio cada informação.
        </p>

        <div className="mt-5 max-w-[760px] rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-[12px] leading-5 text-slate-600">
            <strong className="text-blue-950">
              Não sabe o que cada cargo faz?
            </strong>{" "}
            Na área{" "}
            <Link
              href="/quem-faz-o-que"
              className="font-extrabold text-blue-700 hover:underline"
            >
              Quem faz o quê?
            </Link>{" "}
            explicamos isso desde o começo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-5 md:px-8">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          1. Onde você quer consultar?
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
                  ativo ? "bg-blue-950 text-white" : "hover:bg-slate-50"
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

      <section className="mx-auto max-w-[1000px] px-5 pt-7 md:px-8">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
          2. Quem você quer encontrar?
        </p>

        <div className="flex flex-wrap gap-2">
          {cargos[nivel].map((cargo) => {
            const ativo = cargoSelecionado === cargo.id;

            return (
              <button
                key={cargo.id}
                onClick={() => mudarCargo(cargo.id)}
                className={`rounded-lg border px-4 py-2.5 text-[12px] font-extrabold transition ${
                  ativo
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                {cargo.nome}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-5 pb-12 pt-5 md:px-8">
        {executivo && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-5 px-5 py-6 sm:grid-cols-[58px_1fr] sm:items-center md:px-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl font-extrabold text-blue-700">
                {iniciais(executivo.nome)}
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                  {executivo.cargo}
                </p>

                <h2 className="mt-1 text-[25px] font-extrabold tracking-tight text-blue-950">
                  {executivo.nome}
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                    {executivo.territorio}
                  </span>

                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                    {executivo.esfera}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 md:px-6">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                Entenda o cargo
              </p>

              <p className="mt-1.5 max-w-[760px] text-[13px] leading-5 text-slate-700">
                {executivo.descricao}
              </p>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 md:px-6">
              <Link
                href="/quem-faz-o-que"
                className="text-[11px] font-extrabold text-blue-700 hover:underline"
              >
                Aprender mais sobre o que esse cargo pode e não pode fazer →
              </Link>
            </div>
          </div>
        )}

        {mostrandoDeputadosFederais && (
          <div className="mb-5 space-y-3">
            <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
              <div className="px-5 py-5 md:px-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                  PRIMEIRO, ENTENDA O QUE VOCÊ ESTÁ VENDO
                </p>

                <h2 className="mt-1 text-[23px] font-extrabold tracking-tight text-blue-950">
                  Estamos mostrando os representantes federais ligados à Bahia
                </h2>

                <p className="mt-3 max-w-[760px] text-[13px] leading-5 text-slate-700">
                  O Brasil tem deputados federais de todos os estados e do
                  Distrito Federal. Existem 513 vagas na Câmara dos Deputados.
                  A Bahia possui 39 dessas vagas.
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-extrabold uppercase text-slate-500">
                      Brasil inteiro
                    </p>
                    <p className="mt-1 text-[20px] font-extrabold text-blue-950">
                      513 vagas
                    </p>
                    <p className="text-[11px] text-slate-500">
                      na Câmara dos Deputados
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 px-4 py-3">
                    <p className="text-[10px] font-extrabold uppercase text-blue-600">
                      Representação da Bahia
                    </p>
                    <p className="mt-1 text-[20px] font-extrabold text-blue-950">
                      39 vagas
                    </p>
                    <p className="text-[11px] text-slate-600">
                      destinadas à Bahia
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-slate-500">
                  O Observa Salvador tem foco inicial em Salvador e na Bahia.
                  Por isso, nesta área mostramos os representantes federais
                  ligados à Bahia, e não os representantes de todos os estados.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
              <div className="px-5 py-4 md:px-6">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
                  NÃO CONFUNDA
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[12px] font-extrabold text-blue-950">
                      Deputado estadual da Bahia
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Trabalha na Assembleia Legislativa da Bahia, a ALBA.
                    </p>
                  </div>

                  <div className="border-t border-amber-200 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                    <p className="text-[12px] font-extrabold text-blue-950">
                      Deputado federal eleito pela Bahia
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Trabalha na Câmara dos Deputados, em Brasília, e participa
                      de decisões nacionais.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() =>
                  setExplicacaoFederalAberta(!explicacaoFederalAberta)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              >
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                    ENTENDA ANTES DE VER OS NOMES
                  </p>

                  <p className="mt-1 text-[14px] font-extrabold text-blue-950">
                    Por que esses representantes importam para quem vive na
                    Bahia?
                  </p>
                </div>

                <span className="text-lg font-bold text-blue-600">
                  {explicacaoFederalAberta ? "−" : "+"}
                </span>
              </button>

              {explicacaoFederalAberta && (
                <div className="border-t border-slate-200 px-5 py-5 md:px-6">
                  <div className="space-y-4 text-[12px] leading-5 text-slate-700">
                    <p>
                      Quando uma pessoa vota para deputado federal na Bahia,
                      participa da escolha de quem ocupará as vagas destinadas
                      à representação baiana na Câmara dos Deputados.
                    </p>

                    <p>
                      Depois de eleitos, esses deputados não trabalham apenas
                      com assuntos da Bahia. Eles participam de decisões que
                      podem valer para o Brasil inteiro.
                    </p>

                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="font-extrabold text-blue-950">Leis</p>
                        <p className="mt-1 text-[11px] text-slate-600">
                          Participam da discussão e votação de propostas que
                          podem virar leis federais.
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="font-extrabold text-blue-950">
                          Dinheiro público
                        </p>
                        <p className="mt-1 text-[11px] text-slate-600">
                          Participam das decisões sobre o orçamento federal e
                          podem apresentar emendas ao orçamento.
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="font-extrabold text-blue-950">
                          Fiscalização
                        </p>
                        <p className="mt-1 text-[11px] text-slate-600">
                          Também têm funções de fiscalização sobre atos e uso de
                          recursos do Governo Federal.
                        </p>
                      </div>
                    </div>

                    <div className="border-l-2 border-blue-400 pl-3">
                      <p className="font-extrabold text-blue-950">
                        Um exemplo próximo
                      </p>
                      <p className="mt-1 text-[11px] text-slate-600">
                        Um deputado federal não administra diretamente um
                        hospital ou uma obra na Bahia. Mas decisões tomadas em
                        Brasília sobre leis e dinheiro público podem produzir
                        efeitos concretos no estado e nos municípios.
                      </p>
                    </div>

                    <p className="font-bold text-blue-950">
                      Conhecer quem ocupa essas vagas e acompanhar o que essas
                      pessoas fazem ajuda o cidadão a entender como está sendo
                      representado.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setBancadaAberta(!bancadaAberta)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              >
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-emerald-700">
                    UMA EXPRESSÃO QUE VOCÊ PODE OUVIR
                  </p>

                  <p className="mt-1 text-[14px] font-extrabold text-blue-950">
                    O que significa “bancada da Bahia”?
                  </p>
                </div>

                <span className="text-lg font-bold text-blue-600">
                  {bancadaAberta ? "−" : "+"}
                </span>
              </button>

              {bancadaAberta && (
                <div className="border-t border-slate-200 px-5 py-5 md:px-6">
                  <p className="max-w-[760px] text-[12px] leading-5 text-slate-700">
                    Você poderá encontrar em notícias e documentos oficiais a
                    expressão <strong>“bancada da Bahia”</strong>. Ela pode ser
                    usada para falar da representação baiana no Congresso
                    Nacional.
                  </p>

                  <div className="mt-4 rounded-lg bg-blue-50 px-4 py-4">
                    <p className="text-center text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                      BAHIA → BRASÍLIA
                    </p>

                    <div className="mt-3 grid gap-2 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                      <div className="rounded-lg bg-white px-3 py-3">
                        <p className="text-[18px] font-extrabold text-blue-950">
                          39
                        </p>
                        <p className="text-[10px] font-bold text-slate-600">
                          vagas da Bahia na Câmara
                        </p>
                      </div>

                      <span className="hidden text-slate-400 sm:block">+</span>

                      <div className="rounded-lg bg-white px-3 py-3">
                        <p className="text-[18px] font-extrabold text-blue-950">
                          3
                        </p>
                        <p className="text-[10px] font-bold text-slate-600">
                          senadores que representam a Bahia
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-l-2 border-amber-400 pl-3">
                    <p className="text-[11px] font-extrabold text-blue-950">
                      Bancada não é partido político.
                    </p>

                    <p className="mt-1 max-w-[720px] text-[11px] leading-5 text-slate-600">
                      Esses representantes podem pertencer a partidos
                      diferentes e não precisam concordar entre si. Em algumas
                      situações, podem atuar em conjunto em assuntos
                      relacionados à Bahia.
                    </p>
                  </div>

                  <p className="mt-4 text-[11px] leading-5 text-slate-500">
                    Os deputados estaduais da Bahia, que trabalham na ALBA, são
                    outro grupo. Eles não são os deputados federais que
                    trabalham na Câmara dos Deputados, em Brasília.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {mostrandoSenadores && (
          <div className="mb-5 space-y-3">
            <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
              <div className="px-5 py-5 md:px-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                  PRIMEIRO, ENTENDA O QUE VOCÊ ESTÁ VENDO
                </p>

                <h2 className="mt-1 text-[23px] font-extrabold tracking-tight text-blue-950">
                  Estamos mostrando os senadores que representam a Bahia
                </h2>

                <p className="mt-3 max-w-[760px] text-[13px] leading-5 text-slate-700">
                  Existem senadores de todos os estados e do Distrito Federal.
                  O Brasil possui 81 vagas no Senado. Cada estado possui
                  exatamente 3 vagas. Por isso, a Bahia também tem 3.
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-extrabold uppercase text-slate-500">
                      Brasil inteiro
                    </p>

                    <p className="mt-1 text-[20px] font-extrabold text-blue-950">
                      81 vagas
                    </p>

                    <p className="text-[11px] text-slate-500">
                      no Senado Federal
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 px-4 py-3">
                    <p className="text-[10px] font-extrabold uppercase text-blue-600">
                      Bahia
                    </p>

                    <p className="mt-1 text-[20px] font-extrabold text-blue-950">
                      3 vagas
                    </p>

                    <p className="text-[11px] text-slate-600">
                      para representar o estado
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-slate-500">
                  Como o foco inicial do Observa Salvador é Salvador e a Bahia,
                  mostramos aqui somente os três representantes da Bahia, e não
                  os 81 senadores do país.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
              <div className="px-5 py-4 md:px-6">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
                  NÃO CONFUNDA
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[12px] font-extrabold text-blue-950">
                      Deputado federal eleito pela Bahia
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Trabalha na Câmara dos Deputados. A Bahia possui 39 vagas
                      nessa parte do Congresso.
                    </p>
                  </div>

                  <div className="border-t border-amber-200 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                    <p className="text-[12px] font-extrabold text-blue-950">
                      Senador que representa a Bahia
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      Trabalha no Senado Federal. A Bahia possui 3 vagas no
                      Senado.
                    </p>
                  </div>
                </div>

                <p className="mt-3 border-t border-amber-200 pt-3 text-[11px] leading-5 text-slate-600">
                  <strong className="text-blue-950">
                    Câmara dos Deputados + Senado Federal
                  </strong>{" "}
                  formam, juntos, o Congresso Nacional.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() =>
                  setExplicacaoSenadoAberta(!explicacaoSenadoAberta)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              >
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                    ENTENDA ANTES DE VER OS NOMES
                  </p>

                  <p className="mt-1 text-[14px] font-extrabold text-blue-950">
                    Por que as três vagas não começam e terminam juntas?
                  </p>
                </div>

                <span className="text-lg font-bold text-blue-600">
                  {explicacaoSenadoAberta ? "−" : "+"}
                </span>
              </button>

              {explicacaoSenadoAberta && (
                <div className="border-t border-slate-200 px-5 py-5 md:px-6">
                  <div className="space-y-4 text-[12px] leading-5 text-slate-700">
                    <p>
                      Uma pessoa escolhida para o Senado fica oito anos naquele
                      cargo, se não ocorrer alguma mudança prevista pelas regras.
                    </p>

                    <p>
                      Mas as três vagas de cada estado não são escolhidas todas
                      de uma vez.
                    </p>

                    <div className="rounded-lg bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-extrabold text-blue-950">
                        Funciona assim:
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex gap-3">
                          <span className="font-extrabold text-blue-600">1.</span>
                          <p className="text-[11px] text-slate-600">
                            Em uma eleição, é escolhida uma pessoa para uma das
                            três vagas de cada estado.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <span className="font-extrabold text-blue-600">2.</span>
                          <p className="text-[11px] text-slate-600">
                            Quatro anos depois, são escolhidas duas pessoas para
                            as outras duas vagas.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <span className="font-extrabold text-blue-600">3.</span>
                          <p className="text-[11px] text-slate-600">
                            Quatro anos depois, volta a ser escolhida uma pessoa.
                            Esse ciclo continua se repetindo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-2 border-blue-400 pl-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                        Aprenda uma palavra
                      </p>

                      <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                        Mandato
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-600">
                        É o período para o qual uma pessoa foi escolhida para
                        ocupar um cargo. No caso de senador, esse período é de
                        oito anos.
                      </p>
                    </div>

                    <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
                      <p className="text-[11px] font-extrabold text-emerald-900">
                        E o que acontece em 2026?
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-600">
                        Neste ano, duas das três vagas de cada estado entram na
                        eleição. A terceira não entra porque a pessoa que ocupa
                        essa vaga foi escolhida em 2022 para um período que vai
                        até 2031.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 md:px-6">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-emerald-700">
                LEMBRA DA BANCADA DA BAHIA?
              </p>

              <p className="mt-2 max-w-[760px] text-[11px] leading-5 text-slate-700">
                Os três senadores também fazem parte da representação da Bahia
                no Congresso Nacional. Em determinados documentos e decisões
                conjuntas, você poderá encontrar deputados federais eleitos pela
                Bahia e senadores que representam a Bahia participando como
                integrantes da bancada baiana.
              </p>
            </div>
          </div>
        )}

        {(mostrandoVereadores ||
          mostrandoDeputadosBahia ||
          mostrandoDeputadosFederais ||
          mostrandoSenadores) && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 md:px-6">
              {mostrandoVereadores && (
                <>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                    SALVADOR
                  </p>

                  <h2 className="mt-1 text-[24px] font-extrabold tracking-tight text-blue-950">
                    Vereadores de Salvador
                  </h2>

                  <p className="mt-2 max-w-[720px] text-[12px] leading-5 text-slate-600">
                    43 pessoas ocupam hoje as vagas de vereador em Salvador.
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Período atual da Câmara: 2025 a 2028.
                  </p>

                  <div className="mt-3 rounded-lg bg-slate-50 px-3.5 py-3">
                    <p className="text-[11px] leading-5 text-slate-600">
                      Esse período de quatro anos da Câmara tem um nome:
                      <strong className="text-blue-950"> legislatura</strong>.
                    </p>
                  </div>
                </>
              )}

              {mostrandoDeputadosBahia && (
                <>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                    BAHIA
                  </p>

                  <h2 className="mt-1 text-[24px] font-extrabold tracking-tight text-blue-950">
                    Deputados estaduais da Bahia
                  </h2>

                  <p className="mt-2 max-w-[720px] text-[12px] leading-5 text-slate-600">
                    A Bahia tem 63 vagas para deputado estadual. Essas pessoas
                    trabalham na Assembleia Legislativa da Bahia.
                  </p>

                  <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3.5 py-3">
                    <p className="text-[11px] leading-5 text-slate-700">
                      <strong className="text-blue-950">
                        O que é a Assembleia Legislativa?
                      </strong>{" "}
                      É o lugar onde trabalham os deputados estaduais da Bahia.
                      O nome oficial é{" "}
                      <strong>Assembleia Legislativa da Bahia</strong>. Você
                      também verá esse nome escrito como <strong>ALBA</strong>.
                    </p>
                  </div>
                </>
              )}

              {mostrandoDeputadosFederais && (
                <>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                    BRASIL · FOCO NA BAHIA
                  </p>

                  <h2 className="mt-1 text-[24px] font-extrabold tracking-tight text-blue-950">
                    Quem ocupa as vagas de deputado federal ligadas à Bahia?
                  </h2>

                  <p className="mt-2 max-w-[740px] text-[12px] leading-5 text-slate-600">
                    Abaixo mostramos quem está ocupando atualmente essas vagas.
                    Quando uma pessoa entrou temporariamente no lugar de outra,
                    explicamos o que aconteceu.
                  </p>
                </>
              )}

              {mostrandoSenadores && (
                <>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                    BRASIL · FOCO NA BAHIA
                  </p>

                  <h2 className="mt-1 text-[24px] font-extrabold tracking-tight text-blue-950">
                    Senadores que representam a Bahia
                  </h2>

                  <p className="mt-2 max-w-[740px] text-[12px] leading-5 text-slate-600">
                    Estas são as três pessoas que ocupam atualmente as vagas da
                    Bahia no Senado Federal.
                  </p>
                </>
              )}

              <div className="mt-4">
                <label
                  htmlFor="busca-representante"
                  className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-slate-500"
                >
                  Procurar uma pessoa
                </label>

                <input
                  id="busca-representante"
                  type="text"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Digite um nome ou partido..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="px-5 py-3 md:px-6">
              <div className="flex items-center justify-between py-2">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                  Pessoas encontradas
                </p>

                <p className="text-[10px] font-bold text-slate-400">
                  {representantesFiltrados.length}
                </p>
              </div>

              {representantesFiltrados.length > 0 ? (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  {representantesFiltrados.map((pessoa, index) => {
                    const estaAberto = aberto === pessoa.nome;

                    return (
                      <div
                        key={pessoa.nome}
                        className={index !== 0 ? "border-t border-slate-200" : ""}
                      >
                        <div className="grid gap-2 px-3.5 py-3 sm:grid-cols-[1fr_130px_190px] sm:items-center">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-extrabold text-blue-700">
                              {iniciais(pessoa.nome)}
                            </div>

                            <div>
                              <p className="text-[12px] font-extrabold text-blue-950">
                                {pessoa.nome}
                              </p>

                              {pessoa.periodo && (
                                <p className="mt-0.5 text-[10px] font-bold text-slate-500">
                                  Período: {pessoa.periodo}
                                </p>
                              )}

                              {pessoa.explicacao && (
                                <p className="mt-0.5 text-[10px] font-bold text-amber-700">
                                  Há uma informação importante sobre esta vaga
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                              {pessoa.partido}
                            </span>
                          </div>

                          {pessoa.explicacao ? (
                            <button
                              type="button"
                              onClick={() =>
                                setAberto(estaAberto ? null : pessoa.nome)
                              }
                              className="text-left text-[10px] font-extrabold text-blue-700 hover:underline sm:text-right"
                            >
                              {estaAberto
                                ? "Fechar explicação ↑"
                                : "Entenda o que aconteceu ↓"}
                            </button>
                          ) : (
                            <span className="text-left text-[10px] font-bold text-slate-400 sm:text-right">
                              Ocupando a vaga atualmente
                            </span>
                          )}
                        </div>

                        {estaAberto && pessoa.explicacao && (
                          <div className="border-t border-slate-100 bg-amber-50/60 px-4 py-4 sm:px-5">
                            <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
                              O que aconteceu?
                            </p>

                            <p className="mt-2 max-w-[760px] text-[12px] leading-5 text-slate-700">
                              {pessoa.explicacao}
                            </p>

                            {pessoa.aprenda && (
                              <div className="mt-3 border-l-2 border-blue-400 pl-3">
                                <p className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                                  Aprenda uma palavra
                                </p>

                                <p className="mt-1 text-[12px] font-extrabold text-blue-950">
                                  {pessoa.aprenda.termo}
                                </p>

                                <p className="mt-1 max-w-[720px] text-[11px] leading-5 text-slate-600">
                                  {pessoa.aprenda.significado}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center">
                  <p className="text-[12px] font-extrabold text-blue-950">
                    Não encontramos esse nome ou partido.
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Confira o que foi digitado e tente novamente.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold text-blue-950">
                    De onde vieram essas informações?
                  </p>

                  <p className="mt-0.5 max-w-[610px] text-[10px] leading-4 text-slate-500">
                    {mostrandoVereadores
                      ? "Da relação publicada pela Câmara Municipal de Salvador."
                      : mostrandoDeputadosBahia
                      ? "Da relação publicada pela Assembleia Legislativa da Bahia (ALBA)."
                      : mostrandoDeputadosFederais
                      ? "Do Portal da Câmara dos Deputados. As substituições temporárias foram conferidas também na relação oficial de suplentes que estão ocupando vagas."
                      : "Da relação oficial de senadores por estado publicada pelo Senado Federal."}
                  </p>

                  {(mostrandoDeputadosFederais || mostrandoSenadores) && (
                    <p className="mt-1 text-[10px] font-bold text-slate-400">
                      Situação conferida em 18/09/2026.
                    </p>
                  )}
                </div>

                <a
                  href={
                    mostrandoVereadores
                      ? "https://www.cms.ba.gov.br/vereadores"
                      : mostrandoDeputadosBahia
                      ? "https://www.al.ba.gov.br/deputados"
                      : mostrandoDeputadosFederais
                      ? "https://www.camara.leg.br/deputados/quem-sao"
                      : "https://www25.senado.leg.br/web/senadores/por-uf/-/uf/BA"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[10px] font-extrabold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Conferir na fonte oficial ↗
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-7 rounded-xl bg-blue-950 px-5 py-5 text-white md:px-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
            VOCÊ CONFERE. VOCÊ FORMA SUA OPINIÃO.
          </p>

          <p className="mt-2 max-w-[780px] text-[12px] leading-5 text-blue-50">
            O Observa Salvador mostra informações públicas, explica o contexto
            e indica onde você pode conferir. A plataforma não diz em quem você
            deve votar.
          </p>
        </div>
      </section>

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