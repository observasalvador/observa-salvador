"use client";

import { useState } from "react";
import Link from "next/link";

type Etapa =
  | "responsavel"
  | "dinheiro"
  | "contrato"
  | "pagamento"
  | "resultado";

type EtapaInfo = {
  numero: string;
  titulo: string;
  pergunta: string;
  texto: string;
  procurar: string;
};

const ordem: Etapa[] = [
  "responsavel",
  "dinheiro",
  "contrato",
  "pagamento",
  "resultado",
];

const etapas: Record<Etapa, EtapaInfo> = {
  responsavel: {
    numero: "01",
    titulo: "Quem é responsável?",
    pergunta: "Qual órgão está cuidando da obra?",
    texto:
      "Primeiro descubra quem está fazendo a obra. É a Prefeitura? O Governo da Bahia? O Governo Federal? Saber isso mostra onde você deve procurar as informações.",
    procurar:
      "Procure o nome do órgão responsável na placa da obra, em notícias oficiais ou nos portais públicos.",
  },

  dinheiro: {
    numero: "02",
    titulo: "Quanto vai custar?",
    pergunta: "Existe dinheiro previsto para essa obra?",
    texto:
      "Depois, procure o valor informado para a obra e de onde vem o dinheiro. O recurso pode ser do próprio governo responsável ou pode ter vindo de outro governo.",
    procurar:
      "Procure informações sobre orçamento, valor da obra e origem do recurso.",
  },

  contrato: {
    numero: "03",
    titulo: "Quem foi contratado?",
    pergunta: "Qual empresa vai fazer o serviço?",
    texto:
      "Muitas obras e serviços públicos são feitos por empresas contratadas pelo poder público. É possível procurar quem foi contratado e quanto foi combinado.",
    procurar:
      "Procure a licitação e o contrato. Neles podem aparecer a empresa, o valor, o serviço e os prazos.",
  },

  pagamento: {
    numero: "04",
    titulo: "O dinheiro já foi pago?",
    pergunta: "Quanto já saiu dos cofres públicos?",
    texto:
      "O valor anunciado para uma obra e o valor que já foi pago não são necessariamente a mesma coisa. Por isso, também é importante acompanhar as despesas.",
    procurar:
      "Procure os registros de despesas e pagamentos relacionados à obra ou ao contrato.",
  },

  resultado: {
    numero: "05",
    titulo: "O que aconteceu de verdade?",
    pergunta: "A obra está sendo feita como foi anunciado?",
    texto:
      "Depois de olhar documentos e valores, compare essas informações com o que está acontecendo no bairro.",
    procurar:
      "Observe se a obra começou, se está parada, se foi concluída e se o que foi entregue combina com o que foi contratado.",
  },
};

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <circle cx="14" cy="14" r="8" />
      <path d="m20 20 7 7" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-9 w-9"
    >
      <path d="M5 31h30" />
      <path d="M9 31 14 12h12l5 19" />
      <path d="M12 22h16" />
      <path d="M14 15h12" />
      <path d="M18 7h4v5h-4z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <path d="M8 3h11l6 6v20H8z" />
      <path d="M19 3v7h6" />
      <path d="M12 16h9M12 21h9" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-7 w-7"
    >
      <circle cx="16" cy="16" r="12" />
      <path d="M12.5 12a3.8 3.8 0 0 1 7.2 1.7c0 3-3.7 3.2-3.7 6" />
      <path d="M16 24h.01" />
    </svg>
  );
}

function ChevronIcon({ aberto }: { aberto: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className={`h-5 w-5 transition-transform duration-200 ${
        aberto ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function ComoAcompanharEFiscalizar() {
  const [aberta, setAberta] = useState<Etapa>("responsavel");
  const [resposta, setResposta] = useState<"sim" | "nao" | null>(null);

  function abrirEtapa(etapa: Etapa) {
    setAberta(etapa);
  }

  function proximaEtapa(etapaAtual: Etapa) {
    const indiceAtual = ordem.indexOf(etapaAtual);
    const proxima = ordem[indiceAtual + 1];

    if (proxima) {
      setAberta(proxima);

      setTimeout(() => {
        document
          .getElementById(`etapa-${proxima}`)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 80);
    }
  }

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
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            ← Política do Zero
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[920px] px-5 py-8 md:px-8 md:py-10">
        {/* PASSO */}
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
            PASSO 10
          </span>
        </div>

        {/* ABERTURA */}
        <div className="mt-4 max-w-[740px]">
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#082b6f] md:text-[42px]">
            Como eu acompanho e fiscalizo?
          </h1>

          <p className="mt-3 text-[17px] font-bold text-blue-600 md:text-[18px]">
            Você não precisa ser especialista para começar.
          </p>

          <p className="mt-4 text-[15px] leading-6 text-slate-600 md:text-[16px]">
            Vamos aprender usando uma situação que poderia acontecer no seu
            bairro.
          </p>
        </div>

        {/* SITUAÇÃO */}
        <div className="mt-7 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] shadow-sm">
          <div className="grid md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="flex items-center gap-4 px-5 py-5 md:px-6">
              <div className="shrink-0 text-blue-100">
                <WorkIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
                  IMAGINE ESTA SITUAÇÃO
                </p>

                <h2 className="mt-1 text-[19px] font-extrabold leading-6 text-white">
                  Disseram que vai ter uma obra no seu bairro.
                </h2>
              </div>
            </div>

            <div className="border-t border-blue-700/60 px-5 py-5 md:border-l md:border-t-0 md:px-6">
              <p className="text-[13px] leading-5 text-blue-50">
                Você ouviu que uma praça será reformada. Algumas pessoas dizem
                que o dinheiro já chegou. Outras dizem que a obra nem foi
                contratada.
              </p>

              <p className="mt-2 text-[13px] font-bold leading-5 text-white">
                Como descobrir o que é verdade?
              </p>
            </div>
          </div>
        </div>

        {/* PRIMEIRA LIÇÃO */}
        <div className="mt-6 border-l-[3px] border-blue-500 py-1 pl-4">
          <p className="text-[14px] font-extrabold text-[#082b6f]">
            Não comece pelo boato. Comece pela informação oficial.
          </p>

          <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-slate-600">
            O objetivo não é provar que alguém está certo ou errado. Primeiro,
            vamos descobrir o que os documentos públicos mostram.
          </p>
        </div>

        {/* PASSO A PASSO EM ACORDEÃO */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            SIGA O PASSO A PASSO
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            Cinco perguntas ajudam você a investigar.
          </h2>

          <p className="mt-2 max-w-[700px] text-[13px] leading-5 text-slate-500">
            Abra uma pergunta por vez. A explicação aparece logo abaixo dela.
          </p>

          <div className="mt-4 space-y-2">
            {ordem.map((chave) => {
              const item = etapas[chave];
              const estaAberta = aberta === chave;
              const indice = ordem.indexOf(chave);
              const proxima = ordem[indice + 1];

              return (
                <div
                  key={chave}
                  id={`etapa-${chave}`}
                  className={`overflow-hidden rounded-xl border bg-white shadow-sm transition ${
                    estaAberta
                      ? "border-blue-300 ring-1 ring-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  {/* CABEÇALHO CLICÁVEL */}
                  <button
                    type="button"
                    onClick={() => abrirEtapa(chave)}
                    className={`grid w-full grid-cols-[40px_1fr_24px] items-center gap-3 px-4 py-3.5 text-left transition md:px-5 ${
                      estaAberta
                        ? "bg-blue-50"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold ${
                        estaAberta
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.numero}
                    </div>

                    <div>
                      <p className="text-[13px] font-extrabold text-[#082b6f]">
                        {item.titulo}
                      </p>

                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {item.pergunta}
                      </p>
                    </div>

                    <div
                      className={
                        estaAberta ? "text-blue-600" : "text-slate-400"
                      }
                    >
                      <ChevronIcon aberto={estaAberta} />
                    </div>
                  </button>

                  {/* CONTEÚDO DA PERGUNTA */}
                  {estaAberta && (
                    <div className="border-t border-blue-100">
                      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                        <div className="px-5 py-4">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            POR QUE ISSO IMPORTA?
                          </p>

                          <p className="mt-2 text-[13px] leading-6 text-slate-700">
                            {item.texto}
                          </p>
                        </div>

                        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 md:border-l md:border-t-0">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-green-600">
                            O QUE PROCURAR?
                          </p>

                          <p className="mt-2 text-[13px] font-bold leading-6 text-[#082b6f]">
                            {item.procurar}
                          </p>
                        </div>
                      </div>

                      {/* PRÓXIMA PERGUNTA */}
                      {proxima ? (
                        <div className="flex justify-end border-t border-slate-200 bg-white px-5 py-3">
                          <button
                            type="button"
                            onClick={() => proximaEtapa(chave)}
                            className="text-[12px] font-extrabold text-blue-600 transition hover:text-blue-800"
                          >
                            Próxima pergunta: {etapas[proxima].titulo} →
                          </button>
                        </div>
                      ) : (
                        <div className="border-t border-green-100 bg-green-50 px-5 py-3">
                          <p className="text-[12px] font-bold text-green-800">
                            Pronto. Agora você já sabe quais informações
                            procurar sobre a obra.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ONDE PROCURAR */}
        <div className="mt-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 text-blue-600">
              <SearchIcon />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-600">
                AGORA VAMOS À FONTE
              </p>

              <h2 className="mt-1 text-[20px] font-extrabold text-[#082b6f]">
                Onde procurar essas informações?
              </h2>

              <p className="mt-1 text-[13px] leading-5 text-slate-600">
                Se a obra for da Prefeitura de Salvador, um dos primeiros
                lugares para procurar é o Portal da Transparência.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-3 px-5 py-4 md:grid-cols-[160px_1fr] md:items-center">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Despesas
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Ajuda a verificar onde o dinheiro público está sendo gasto.
              </p>
            </div>

            <div className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[160px_1fr] md:items-center">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Licitação
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                É o processo usado pelo poder público para escolher quem poderá
                fornecer um produto, serviço ou realizar uma obra, conforme as
                regras aplicáveis.
              </p>
            </div>

            <div className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[160px_1fr] md:items-center">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Contrato
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Mostra o que foi combinado com a empresa contratada, como
                objeto, valor e outras condições.
              </p>
            </div>

            <div className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[160px_1fr] md:items-center">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Obra ou projeto
              </p>

              <p className="text-[12px] leading-5 text-slate-600">
                Ajuda a descobrir o que foi anunciado, quem é responsável e
                como aquela ação está andando.
              </p>
            </div>
          </div>
        </div>

        {/* EXEMPLO COMPLETO */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            VOLTANDO PARA A PRAÇA
          </p>

          <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight text-[#082b6f]">
            O morador agora sabe o que perguntar.
          </h2>

          <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
            <div className="grid gap-1 py-3 sm:grid-cols-[230px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Quem é responsável?
              </p>
              <p className="text-[12px] text-slate-500">
                Descubra o órgão público responsável.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[230px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Quanto a obra vai custar?
              </p>
              <p className="text-[12px] text-slate-500">
                Procure o valor previsto ou contratado.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[230px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Quem foi contratado?
              </p>
              <p className="text-[12px] text-slate-500">
                Procure a empresa e o contrato.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[230px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                Quanto já foi pago?
              </p>
              <p className="text-[12px] text-slate-500">
                Consulte os registros de despesas.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[230px_1fr]">
              <p className="text-[13px] font-extrabold text-[#082b6f]">
                O que existe no bairro?
              </p>
              <p className="text-[12px] text-slate-500">
                Compare os documentos com o que realmente foi feito.
              </p>
            </div>
          </div>
        </div>

        {/* NÃO ACHOU */}
        <div className="mt-8 overflow-hidden rounded-xl border border-amber-200 bg-[#fff9e9]">
          <div className="grid md:grid-cols-[210px_1fr] md:items-center">
            <div className="flex items-center gap-3 px-4 py-4 md:px-5">
              <div className="shrink-0 text-amber-700">
                <QuestionIcon />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-700">
                  NÃO ENCONTROU?
                </p>

                <p className="mt-1 text-[14px] font-extrabold leading-5 text-[#082b6f]">
                  Você pode pedir a informação.
                </p>
              </div>
            </div>

            <div className="border-t border-amber-200 px-4 py-4 md:border-l md:border-t-0 md:px-5">
              <p className="text-[13px] leading-5 text-slate-700">
                A Lei de Acesso à Informação permite que qualquer interessado
                peça informações aos órgãos públicos. Você não precisa explicar
                por que quer aquela informação.
              </p>
            </div>
          </div>
        </div>

        {/* LAI */}
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-200 bg-white">
          <div className="grid gap-3 px-5 py-4 md:grid-cols-[55px_1fr]">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <DocumentIcon />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                AGORA VOCÊ APRENDE O NOME
              </p>

              <h3 className="mt-1 text-[17px] font-extrabold text-[#082b6f]">
                LAI — Lei de Acesso à Informação
              </h3>

              <p className="mt-2 text-[13px] leading-5 text-slate-600">
                É uma das ferramentas que o cidadão pode usar para pedir
                informações públicas quando elas não estão disponíveis de
                forma clara.
              </p>

              <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3">
                <p className="text-[12px] font-bold leading-5 text-blue-800">
                  Exemplo: “Quero saber qual empresa foi contratada para a
                  reforma da praça, qual o valor do contrato e quanto já foi
                  pago.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CUIDADO */}
        <div className="mt-6 border-l-[3px] border-amber-400 py-1 pl-4">
          <p className="text-[14px] font-extrabold text-[#082b6f]">
            Encontrar algo estranho não significa provar uma irregularidade.
          </p>

          <p className="mt-1 max-w-[720px] text-[13px] leading-5 text-slate-600">
            Um valor diferente, uma obra parada ou uma informação que parece
            errada pode ter uma explicação. Primeiro reúna os documentos,
            confira as informações e procure a fonte oficial.
          </p>
        </div>

        {/* TESTE */}
        <div className="mt-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
            TESTE RÁPIDO
          </p>

          <h2 className="mt-1.5 text-[18px] font-extrabold text-[#082b6f]">
            Alguém disse no WhatsApp que uma obra custou R$ 5 milhões.
          </h2>

          <p className="mt-1 text-[13px] leading-5 text-slate-600">
            Isso é suficiente para afirmar que esse foi o valor contratado?
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setResposta("sim")}
              className={`rounded-lg border px-4 py-3 text-left text-[13px] font-bold transition ${
                resposta === "sim"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              Sim. Se muita gente compartilhou, deve ser verdade.
            </button>

            <button
              type="button"
              onClick={() => setResposta("nao")}
              className={`rounded-lg border px-4 py-3 text-left text-[13px] font-bold transition ${
                resposta === "nao"
                  ? "border-green-300 bg-green-50 text-green-900"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              Não. Preciso procurar a informação oficial.
            </button>
          </div>

          {resposta === "sim" && (
            <div className="mt-3 border-l-[3px] border-amber-400 pl-3">
              <p className="text-[13px] font-extrabold text-amber-800">
                Ainda não.
              </p>

              <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                Uma mensagem compartilhada não substitui o documento oficial.
                Procure o contrato, a licitação e os registros públicos.
              </p>
            </div>
          )}

          {resposta === "nao" && (
            <div className="mt-3 border-l-[3px] border-green-500 pl-3">
              <p className="text-[13px] font-extrabold text-green-800">
                Isso.
              </p>

              <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                Primeiro verifique a fonte. Depois compare as informações.
              </p>
            </div>
          )}
        </div>

        {/* FECHAMENTO */}
        <div className="mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-[#073b89] to-[#082d68] shadow-sm">
          <div className="px-5 py-5 md:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-200">
              VOCÊ NÃO PRECISA DECORAR TUDO
            </p>

            <h2 className="mt-1 text-[19px] font-extrabold text-white">
              Comece com cinco perguntas.
            </h2>

            <div className="mt-3 grid gap-2 text-[13px] font-bold text-blue-50 sm:grid-cols-2">
              <p>1. Quem é responsável?</p>
              <p>2. Quanto vai custar?</p>
              <p>3. Quem foi contratado?</p>
              <p>4. Quanto já foi pago?</p>
              <p>5. O que foi realmente entregue?</p>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <Link
            href="/politica-do-zero/quem-decide-o-gasto"
            className="text-[13px] font-bold text-slate-500 transition hover:text-blue-700"
          >
            ← Voltar
          </Link>

          <Link
            href="/politica-do-zero"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Concluir Política do Zero →
          </Link>
        </div>
      </section>
    </main>
  );
}