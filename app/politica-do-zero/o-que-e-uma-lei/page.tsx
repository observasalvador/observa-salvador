"use client";

import { useState } from "react";
import Link from "next/link";

type Etapa =
  | "proposta"
  | "analise"
  | "votacao"
  | "senado"
  | "presidente"
  | "publicacao";

type EtapaReal =
  | "inicio"
  | "camara"
  | "relator"
  | "senado"
  | "presidencia"
  | "veto"
  | "lei";

const etapas = {
  proposta: {
    numero: "01",
    titulo: "Nasce uma proposta",
    curto: "Alguém apresenta um projeto.",
    explicacao:
      "Antes de existir uma nova lei, pode existir um projeto de lei. É uma proposta de texto que ainda precisa passar pelas etapas previstas para aquele tipo de matéria.",
    quem: "Dependendo do caso, projetos podem ser apresentados por deputados, senadores, pelo Presidente da República e por outros legitimados previstos na Constituição. Também existe iniciativa popular, quando são cumpridas as exigências legais.",
    exemplo:
      "Um deputado federal pode apresentar uma proposta para criar uma nova regra federal. Nesse momento, porém, ela ainda é apenas um projeto.",
    alerta:
      "Projeto apresentado não significa lei aprovada.",
  },

  analise: {
    numero: "02",
    titulo: "O projeto é analisado",
    curto: "Deputados estudam e discutem a proposta.",
    explicacao:
      "Na Câmara dos Deputados, um projeto pode ser encaminhado para comissões formadas por deputados federais. Essas comissões analisam assuntos relacionados ao projeto.",
    quem: "Um deputado pode ser escolhido como relator. O relator estuda o projeto, analisa alterações e apresenta um parecer. Os demais deputados envolvidos podem discutir a matéria e participar das decisões conforme as regras de tramitação.",
    exemplo:
      "Se a proposta trata de educação, por exemplo, ela pode passar pela Comissão de Educação. Questões financeiras, constitucionais ou jurídicas podem exigir outras análises.",
    alerta:
      "Relator não é o dono do projeto. Ele analisa a matéria e apresenta um parecer para subsidiar a decisão.",
  },

  votacao: {
    numero: "03",
    titulo: "Os deputados decidem",
    curto: "A Câmara delibera sobre o texto.",
    explicacao:
      "Dependendo do projeto e de sua tramitação, a decisão pode ocorrer em comissões ou envolver votação no Plenário da Câmara dos Deputados.",
    quem: "Quando a matéria vai ao Plenário da Câmara, os deputados federais participam da discussão e da deliberação. Eles podem aprovar ou rejeitar o texto e, conforme as regras, analisar alterações.",
    exemplo:
      "Se a Câmara aprovar um projeto de lei federal que também precisa passar pelo Senado, o texto segue para a outra Casa do Congresso.",
    alerta:
      "Nem todo projeto segue exatamente o mesmo caminho. O procedimento depende do tipo de proposta e das regras aplicáveis.",
  },

  senado: {
    numero: "04",
    titulo: "Os senadores analisam",
    curto: "A outra Casa do Congresso entra no processo.",
    explicacao:
      "Em um projeto iniciado na Câmara e sujeito à revisão do Senado, o texto aprovado pelos deputados segue para os senadores.",
    quem: "No Senado, um senador pode atuar como relator. Ele analisa a matéria e apresenta um parecer. Os demais senadores participam da discussão e da deliberação conforme o rito aplicável.",
    exemplo:
      "Se o Senado aprovar o texto sem alterações que exijam retorno à Câmara, o projeto pode seguir para a etapa seguinte. Se fizer determinadas mudanças, o texto pode precisar voltar à Câmara.",
    alerta:
      "Senado não é superior à Câmara. São duas Casas que formam o Congresso Nacional e possuem funções próprias no processo legislativo.",
  },

  presidente: {
    numero: "05",
    titulo: "Sanção ou veto",
    curto: "O Presidente participa de outra etapa.",
    explicacao:
      "Depois que o Congresso conclui a votação de um projeto de lei sujeito à sanção, o texto é encaminhado ao Presidente da República.",
    quem: "O Presidente não participa dessa etapa como deputado ou senador. Ele pode sancionar o projeto ou vetá-lo, total ou parcialmente, nas hipóteses previstas pela Constituição.",
    exemplo:
      "Sanção representa concordância com o projeto. No veto, o Presidente rejeita todo o projeto ou determinados dispositivos e precisa apresentar as razões.",
    alerta:
      "Um veto presidencial ainda pode ser analisado pelo Congresso Nacional.",
  },

  publicacao: {
    numero: "06",
    titulo: "A lei se torna oficial",
    curto: "Agora existe um texto oficial para consultar.",
    explicacao:
      "Depois de concluídas as etapas necessárias, ocorre a promulgação e a publicação oficial da lei. É nesse texto que o cidadão deve conferir o que realmente passou a valer.",
    quem: "Dependendo da situação, a promulgação pode envolver autoridades diferentes previstas na Constituição. O ponto principal para o cidadão é procurar a norma oficialmente publicada.",
    exemplo:
      "Uma notícia pode resumir uma lei em poucas linhas. O texto oficial mostra exatamente o que foi aprovado, vetado, promulgado e publicado.",
    alerta:
      "Postagem em rede social, discurso ou manchete não substituem o texto oficial da lei.",
  },
};

const casoReal = {
  inicio: {
    numero: "01",
    titulo: "A proposta foi apresentada",
    data: "3 de fevereiro de 2021",
    quem: "Deputada Tabata Amaral e outros deputados",
    papel:
      "Apresentaram o PL 54/2021 na Câmara dos Deputados.",
    aconteceu:
      "A proposta buscava criar um incentivo financeiro relacionado à permanência de estudantes no ensino médio.",
    aprende:
      "Aqui aparece o AUTOR: quem apresenta formalmente a proposta. Apresentar não significa aprovar.",
  },

  camara: {
    numero: "02",
    titulo: "A Câmara analisou",
    data: "Tramitação na Câmara",
    quem: "Deputados federais",
    papel:
      "A matéria ficou sujeita à análise da Câmara dos Deputados e recebeu parecer relacionado às Comissões de Educação, Finanças e Tributação e Constituição e Justiça e de Cidadania.",
    aconteceu:
      "O projeto passou por discussão, pareceres, propostas relacionadas e alterações durante sua tramitação.",
    aprende:
      "Aqui você percebe que os deputados não apenas apresentam projetos: eles também analisam, discutem e deliberam sobre propostas.",
  },

  relator: {
    numero: "03",
    titulo: "Um deputado foi relator",
    data: "12 de dezembro de 2023",
    quem: "Deputado federal Pedro Uczai",
    papel:
      "Atuou como relator em Plenário pelas comissões envolvidas e apresentou parecer sobre o projeto e matérias relacionadas.",
    aconteceu:
      "O relator analisou a matéria e apresentou seu parecer antes da deliberação.",
    aprende:
      "RELATOR é o parlamentar encarregado de estudar a matéria e apresentar uma análise e uma posição formal. Ele não decide sozinho o resultado.",
  },

  senado: {
    numero: "04",
    titulo: "O projeto chegou ao Senado",
    data: "Dezembro de 2023",
    quem: "Senadora Teresa Leitão e demais senadores",
    papel:
      "Teresa Leitão foi designada relatora no Plenário do Senado. Os senadores analisaram e deliberaram sobre o projeto.",
    aconteceu:
      "Em 20 de dezembro de 2023, o Senado aprovou o projeto e uma emenda de redação. A matéria seguiu para sanção.",
    aprende:
      "Na Câmara, participam deputados federais. No Senado, participam senadores. As duas Casas formam o Congresso Nacional.",
  },

  presidencia: {
    numero: "05",
    titulo: "O projeto chegou ao Presidente",
    data: "Janeiro de 2024",
    quem: "Presidente da República",
    papel:
      "Recebeu o projeto aprovado pelo Legislativo para a etapa de sanção ou veto.",
    aconteceu:
      "O projeto foi sancionado com vetos parciais e deu origem à Lei nº 14.818, de 16 de janeiro de 2024.",
    aprende:
      "O Presidente não entra aqui como legislador votando na Câmara ou no Senado. Sua participação ocorre na etapa constitucional de sanção ou veto.",
  },

  veto: {
    numero: "06",
    titulo: "O veto voltou ao Congresso",
    data: "9 de maio de 2024",
    quem: "Deputados federais e senadores",
    papel:
      "O Congresso analisou os dispositivos que haviam sido vetados pelo Presidente.",
    aconteceu:
      "Os dispositivos vetados tiveram resultados diferentes. Houve vetos mantidos e também dispositivo cujo veto foi rejeitado pelo Congresso.",
    aprende:
      "VETO não significa automaticamente fim da discussão. Deputados e senadores possuem papel constitucional na apreciação dos vetos presidenciais.",
  },

  lei: {
    numero: "07",
    titulo: "Resultado: Lei nº 14.818/2024",
    data: "Lei publicada em janeiro de 2024",
    quem: "Resultado do processo legislativo",
    papel:
      "A lei instituiu incentivo financeiro-educacional para estudantes matriculados no ensino médio público.",
    aconteceu:
      "Depois, o Decreto nº 11.901/2024 regulamentou a lei e criou o Programa Pé-de-Meia.",
    aprende:
      "Agora não estamos mais falando apenas de um projeto. Existe uma lei oficial que pode ser consultada pelo cidadão.",
  },
};

export default function OQueEUmaLei() {
  const [etapaSelecionada, setEtapaSelecionada] =
    useState<Etapa>("proposta");

  const [etapaRealSelecionada, setEtapaRealSelecionada] =
    useState<EtapaReal>("inicio");

  const [resposta, setResposta] = useState<string | null>(null);

  const etapa = etapas[etapaSelecionada];
  const etapaReal = casoReal[etapaRealSelecionada];

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
            PASSO 07
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-blue-950 md:text-5xl">
            O que é uma lei?
          </h1>

          <p className="mt-5 text-xl font-semibold text-blue-700">
            E quando uma proposta realmente vira lei?
          </p>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Você provavelmente já ouviu frases como{" "}
            <strong>“foi apresentado um projeto de lei”</strong>,{" "}
            <strong>“a Câmara aprovou”</strong> ou{" "}
            <strong>“o Presidente vetou”</strong>.
          </p>

          <p className="mt-2 max-w-3xl text-lg leading-8 text-slate-600">
            São momentos diferentes. Vamos entender{" "}
            <strong>quem participa de cada etapa e o que cada pessoa faz.</strong>
          </p>
        </div>

        {/* PROJETO X LEI */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2 md:divide-x md:divide-slate-200">
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                PROJETO DE LEI
              </p>

              <p className="mt-2 text-lg font-bold text-blue-950">
                É uma proposta.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Ainda pode ser discutida, alterada, aprovada ou rejeitada.
              </p>
            </div>

            <div className="border-t border-slate-200 p-5 md:border-t-0">
              <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                LEI
              </p>

              <p className="mt-2 text-lg font-bold text-blue-950">
                É uma norma que concluiu o processo necessário.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                O cidadão pode consultar o texto oficialmente promulgado e
                publicado.
              </p>
            </div>
          </div>
        </div>

        {/* ALERTA */}
        <div className="mt-6 border-l-4 border-amber-400 bg-amber-50 px-5 py-4">
          <p className="font-bold text-amber-900">
            Atenção quando você vê uma notícia.
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-700">
            “Apresentou um projeto”, “comissão aprovou”, “Câmara aprovou”,
            “Senado aprovou”, “foi sancionado” e “virou lei” não significam a
            mesma coisa.
          </p>
        </div>

        {/* CAMINHO DIDÁTICO */}
        <div className="mt-11">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            PRIMEIRO: ENTENDA O CAMINHO
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-950">
            Quem participa de um projeto de lei federal?
          </h2>

          <p className="mt-2 max-w-3xl leading-7 text-slate-600">
            Vamos usar um caminho simplificado para entender a lógica.
            Dependendo do tipo de proposta, o rito pode ser diferente.
          </p>

          {/* ETAPAS */}
          <div className="mt-6 overflow-x-auto pb-2">
            <div className="flex min-w-[760px] items-center">
              {(
                Object.entries(etapas) as [
                  Etapa,
                  (typeof etapas)[Etapa]
                ][]
              ).map(([chave, item], index, array) => (
                <div key={chave} className="flex flex-1 items-center">
                  <button
                    onClick={() => setEtapaSelecionada(chave)}
                    className="group flex min-w-[100px] flex-col items-center text-center"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                        etapaSelecionada === chave
                          ? "border-blue-700 bg-blue-700 text-white"
                          : "border-blue-200 bg-white text-blue-700 group-hover:border-blue-500"
                      }`}
                    >
                      {item.numero}
                    </div>

                    <p
                      className={`mt-2 text-xs font-bold ${
                        etapaSelecionada === chave
                          ? "text-blue-800"
                          : "text-slate-600"
                      }`}
                    >
                      {item.titulo}
                    </p>
                  </button>

                  {index < array.length - 1 && (
                    <div className="mx-1 h-px flex-1 bg-blue-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DETALHE */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
            <div className="border-b border-blue-100 bg-blue-50 px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                ETAPA {etapa.numero}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-blue-950">
                {etapa.titulo}
              </h3>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-lg font-bold leading-7 text-blue-950">
                  {etapa.curto}
                </p>

                <p className="mt-2 leading-7 text-slate-700">
                  {etapa.explicacao}
                </p>

                <div className="mt-5 border-l-4 border-blue-500 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    QUEM FAZ ISSO?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {etapa.quem}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  EXEMPLO
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {etapa.exemplo}
                </p>
              </div>
            </div>

            <div className="border-t border-amber-100 bg-amber-50 px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                ATENÇÃO
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                {etapa.alerta}
              </p>
            </div>
          </div>
        </div>

        {/* QUEM É PARLAMENTAR */}
        <div className="mt-9 border-y border-slate-200 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            AGORA UMA PALAVRA QUE VOCÊ VAI OUVIR MUITO
          </p>

          <div className="mt-2 grid gap-5 md:grid-cols-[0.7fr_1.3fr]">
            <h2 className="text-2xl font-bold text-blue-950">
              Quem são os “parlamentares”?
            </h2>

            <div>
              <p className="leading-7 text-slate-700">
                Parlamentar é um nome usado para integrantes do Poder
                Legislativo.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <p className="font-semibold text-blue-950">
                  Câmara Municipal → vereadores
                </p>

                <p className="font-semibold text-blue-950">
                  Assembleia → deputados estaduais
                </p>

                <p className="font-semibold text-blue-950">
                  Câmara dos Deputados → deputados federais
                </p>

                <p className="font-semibold text-blue-950">
                  Senado → senadores
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Nesta aula, como estamos usando um projeto de lei federal como
                exemplo, você verá principalmente{" "}
                <strong>deputados federais e senadores.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* CASO REAL */}
        <div className="mt-11">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-green-700">
              AGORA VEJA ISSO ACONTECENDO DE VERDADE
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-950">
              O caminho do projeto que deu origem ao Pé-de-Meia
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              O PL 54/2021 é um bom exemplo porque passou pela Câmara, pelo
              Senado, chegou à Presidência, recebeu vetos e depois teve esses
              vetos analisados pelo Congresso.
            </p>
          </div>

          {/* IDENTIFICAÇÃO */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-slate-200 py-4 text-sm">
            <div>
              <span className="text-slate-500">Projeto:</span>{" "}
              <strong className="text-blue-950">PL 54/2021</strong>
            </div>

            <div>
              <span className="text-slate-500">Resultado:</span>{" "}
              <strong className="text-blue-950">
                Lei nº 14.818/2024
              </strong>
            </div>

            <div>
              <span className="text-slate-500">Tema:</span>{" "}
              <strong className="text-blue-950">
                incentivo a estudantes do ensino médio público
              </strong>
            </div>
          </div>

          {/* TIMELINE REAL */}
          <div className="mt-6 overflow-x-auto pb-2">
            <div className="flex min-w-[900px] items-center">
              {(
                Object.entries(casoReal) as [
                  EtapaReal,
                  (typeof casoReal)[EtapaReal]
                ][]
              ).map(([chave, item], index, array) => (
                <div key={chave} className="flex flex-1 items-center">
                  <button
                    onClick={() => setEtapaRealSelecionada(chave)}
                    className="group flex min-w-[110px] flex-col items-center text-center"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                        etapaRealSelecionada === chave
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-green-200 bg-white text-green-700 group-hover:border-green-500"
                      }`}
                    >
                      {item.numero}
                    </div>

                    <p
                      className={`mt-2 text-xs font-bold ${
                        etapaRealSelecionada === chave
                          ? "text-green-800"
                          : "text-slate-600"
                      }`}
                    >
                      {item.titulo}
                    </p>
                  </button>

                  {index < array.length - 1 && (
                    <div className="mx-1 h-px flex-1 bg-green-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DETALHE CASO REAL */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-green-100 bg-green-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                  CASO REAL • ETAPA {etapaReal.numero}
                </p>

                <h3 className="mt-1 text-2xl font-bold text-blue-950">
                  {etapaReal.titulo}
                </h3>
              </div>

              <p className="text-sm font-semibold text-green-800">
                {etapaReal.data}
              </p>
            </div>

            <div className="grid md:grid-cols-[0.75fr_1.25fr]">
              <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  QUEM PARTICIPOU?
                </p>

                <p className="mt-2 text-lg font-bold leading-7 text-blue-950">
                  {etapaReal.quem}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {etapaReal.papel}
                </p>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  O QUE ACONTECEU?
                </p>

                <p className="mt-2 leading-7 text-slate-700">
                  {etapaReal.aconteceu}
                </p>

                <div className="mt-5 border-l-4 border-green-500 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                    O QUE ISSO ENSINA?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {etapaReal.aprende}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAPA DOS ATORES */}
        <div className="mt-10 rounded-2xl bg-blue-950 px-6 py-6 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
            AGORA LIGUE A PESSOA À FUNÇÃO
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Quem fez o quê no caso real?
          </h2>

          <div className="mt-5 divide-y divide-blue-800 border-y border-blue-800">
            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Autores do projeto
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Apresentaram formalmente a proposta.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Relator na Câmara
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Estudou a matéria e apresentou parecer para orientar a
                deliberação.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Deputados federais
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Participaram da discussão e da decisão da Câmara.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Relatora no Senado
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Analisou o projeto recebido da Câmara e apresentou parecer no
                Senado.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Senadores
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Discutiram e deliberaram sobre a matéria no Senado.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Presidente
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Recebeu o projeto aprovado e exerceu a função constitucional
                de sancionar e vetar partes do texto.
              </p>
            </div>

            <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
              <p className="font-bold">
                Congresso Nacional
              </p>
              <p className="text-sm leading-6 text-blue-100">
                Deputados e senadores analisaram posteriormente os vetos
                presidenciais.
              </p>
            </div>
          </div>
        </div>

        {/* POR QUE É PRÓXIMO DA VIDA REAL */}
        <div className="mt-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-green-700">
              POR QUE ESSE EXEMPLO IMPORTA?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-blue-950">
              A lei pode chegar diretamente à vida de uma família.
            </h2>
          </div>

          <div>
            <p className="leading-7 text-slate-700">
              A Lei nº 14.818/2024 instituiu um incentivo financeiro-educacional
              voltado à permanência e à conclusão escolar de estudantes do
              ensino médio público.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              Depois, o Decreto nº 11.901/2024 regulamentou a lei e criou o
              Programa Pé-de-Meia.
            </p>

            <p className="mt-3 text-sm font-semibold leading-6 text-blue-700">
              Aquela sequência de “projeto”, “relator”, “Câmara”, “Senado”,
              “sanção” e “veto” termina produzindo regras que podem alcançar a
              vida concreta das pessoas.
            </p>
          </div>
        </div>

        {/* TESTE */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            TESTE RÁPIDO
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            Um deputado apresenta hoje um projeto de lei.
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Podemos publicar: “Nova lei entra em vigor”?
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => setResposta("sim")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "sim"
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "sim" ? "✕ " : ""}
              Sim. Projeto apresentado já é lei.
            </button>

            <button
              onClick={() => setResposta("nao")}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                resposta === "nao"
                  ? "border-green-300 bg-green-50 text-green-900"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {resposta === "nao" ? "✓ " : ""}
              Não. Ainda é uma proposta.
            </button>
          </div>

          {resposta === "nao" && (
            <div className="mt-4 border-l-4 border-green-500 pl-4">
              <p className="font-bold text-green-800">
                Isso.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                O projeto ainda precisa seguir o processo aplicável. Antes de
                dizer que algo virou lei, confira a tramitação e o texto
                oficial.
              </p>
            </div>
          )}

          {resposta === "sim" && (
            <div className="mt-4 border-l-4 border-amber-400 pl-4">
              <p className="font-bold text-amber-800">
                Ainda não.
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                Apresentar um projeto é apenas o começo. Projeto e lei são
                coisas diferentes.
              </p>
            </div>
          )}
        </div>

        {/* COMO FISCALIZAR */}
        <div className="mt-10 border-y border-slate-200 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            COMO O CIDADÃO ACOMPANHA?
          </p>

          <h2 className="mt-2 text-xl font-bold text-blue-950">
            Quando ouvir falar de uma nova “lei”, faça estas perguntas:
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <span className="text-sm font-bold text-blue-600">
                01
              </span>

              <p className="mt-1 font-bold text-blue-950">
                É projeto ou lei?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Descubra se existe apenas uma proposta ou uma norma já
                publicada.
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-blue-600">
                02
              </span>

              <p className="mt-1 font-bold text-blue-950">
                Em qual etapa está?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Câmara? Senado? Sanção? Veto? Cada palavra mostra uma fase
                diferente.
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-blue-600">
                03
              </span>

              <p className="mt-1 font-bold text-blue-950">
                Onde está a fonte oficial?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Procure a tramitação nos sites oficiais e, se já houver lei,
                consulte o texto publicado.
              </p>
            </div>
          </div>
        </div>

        {/* GUARDE */}
        <div className="mt-9 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            GUARDE ESTA IDEIA
          </p>

          <p className="mt-2 text-xl font-bold text-blue-950">
            Uma pessoa pode apresentar. Outra pode relatar. Muitos podem
            discutir e votar. O Presidente pode sancionar ou vetar.
          </p>

          <p className="mt-2 max-w-3xl leading-7 text-slate-700">
            Por isso, quando alguém diz simplesmente “fulano fez essa lei”,
            vale verificar todo o processo. Uma lei pode envolver diferentes
            pessoas e instituições em etapas distintas.
          </p>
        </div>

        {/* PRÓXIMO */}
        <div className="mt-9 rounded-2xl border border-slate-200 bg-white px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            PRÓXIMO PASSO
          </p>

          <div className="mt-2 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-blue-950">
                De onde vem o dinheiro público?
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                Agora vamos seguir o dinheiro: entender de onde ele vem antes
                de descobrir quem decide como ele será gasto.
              </p>
            </div>

            <Link
              href="/politica-do-zero/de-onde-vem-o-dinheiro"
              className="mt-5 inline-flex shrink-0 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 md:mt-0"
            >
              Próximo: dinheiro público →
            </Link>
          </div>
        </div>

        {/* FONTES */}
        <div className="mt-9 border-t border-slate-200 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            FONTES PARA CONFERIR
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Constituição Federal; Câmara dos Deputados; Senado Federal;
            Congresso Nacional; Lei nº 14.818/2024 e Decreto nº 11.901/2024.
            O fluxo inicial é uma explicação didática. O processo concreto
            depende do tipo de proposição e das regras aplicáveis.
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