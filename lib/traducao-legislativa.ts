export type TipoDecisao =
  | "principal"
  | "especifica"
  | "procedimento"
  | "tecnica"
  | "nao-classificada";

export type VotacaoParaTraducao = {
  proposicaoObjeto?: string | null;
  descricao?: string | null;
};

export type TraducaoDecisao = {
  tipo: TipoDecisao;
  titulo: string;
  explicacao: string;
  nomeOficial: string | null;
  votoSim: string | null;
  votoNao: string | null;
  alerta: string | null;
};

function textoSeguro(valor?: string | null) {
  if (!valor) return null;

  const texto = valor.trim();

  return texto.length > 0 ? texto : null;
}

function normalizarTexto(valor?: string | null) {
  return (valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/*
  ---------------------------------------------------------
  TIPOS DE PROPOSIÇÃO
  ---------------------------------------------------------

  Aqui traduzimos a sigla institucional para uma expressão
  compreensível. A sigla continua disponível na interface,
  mas o cidadão não precisa conhecê-la previamente.
*/

export function traduzirTipoProposicao(
  sigla?: string | null
) {
  switch ((sigla || "").toUpperCase()) {
    case "PL":
      return "Projeto de Lei";

    case "PLP":
      return "Projeto de Lei Complementar";

    case "PEC":
      return "Proposta de Emenda à Constituição";

    case "MPV":
      return "Medida Provisória";

    case "PDL":
      return "Projeto de Decreto Legislativo";

    case "PRC":
      return "Projeto de Resolução";

    default:
      return null;
  }
}

/*
  ---------------------------------------------------------
  TRADUÇÃO DAS DECISÕES
  ---------------------------------------------------------

  REGRA EDITORIAL:

  Não transformar automaticamente:

  SIM = apoio ao projeto inteiro
  NÃO = rejeição ao projeto inteiro

  Uma votação pode tratar apenas de:
  - urgência;
  - adiamento;
  - retirada;
  - emenda;
  - destaque;
  - substitutivo;
  - parecer;
  - redação final;
  - ou outra decisão específica.

  Por isso, votoSim e votoNao só recebem explicação quando
  conseguimos descrever com segurança o sentido daquela
  decisão específica.
*/

export function traduzirDecisao(
  votacao: VotacaoParaTraducao
): TraducaoDecisao {
  const descricao =
    textoSeguro(votacao.descricao) || "";

  const objeto =
    textoSeguro(votacao.proposicaoObjeto) || "";

  const base = normalizarTexto(
    `${objeto} ${descricao}`
  );

  /*
    =========================================================
    REDAÇÃO FINAL
    =========================================================
  */

  if (base.includes("redacao final")) {
    return {
      tipo: "principal",

      titulo:
        "Decisão sobre o texto final",

      explicacao:
        "Esta etapa trata da versão final do texto preparada depois das decisões anteriores.",

      nomeOficial:
        objeto || "Redação final",

      votoSim: null,

      votoNao: null,

      alerta:
        "O significado de SIM e NÃO não é mostrado automaticamente nesta etapa sem informação suficiente para explicar com segurança o sentido do voto.",
    };
  }

  /*
    =========================================================
    MÉRITO
    =========================================================

    “Mérito” é uma palavra institucional difícil para quem
    nunca acompanhou o Legislativo.

    Primeiro explicamos a situação.
    Depois apresentamos o termo oficial.
  */

  if (base.includes("merito")) {
    return {
      tipo: "principal",

      titulo:
        "Decisão sobre o conteúdo da matéria",

      explicacao:
        "Nesta etapa, a decisão está relacionada ao conteúdo da matéria ou a uma parte central do que está sendo discutido.",

      nomeOficial:
        objeto || "Votação de mérito",

      votoSim: null,

      votoNao: null,

      alerta:
        "Não mostramos automaticamente que SIM significa apoiar toda a matéria e NÃO significa rejeitá-la. Para fazer essa tradução com segurança, é preciso saber exatamente qual texto ou pergunta foi colocado em votação.",
    };
  }

  /*
    =========================================================
    URGÊNCIA
    =========================================================
  */

  if (base.includes("urgencia")) {
    return {
      tipo: "procedimento",

      titulo:
        "Decisão sobre acelerar a análise",

      explicacao:
        "Os deputados decidiram sobre um pedido para que a matéria siga por um caminho mais rápido de análise.",

      nomeOficial:
        objeto || "Requerimento de urgência",

      votoSim:
        "Apoiar o pedido para acelerar a análise da matéria.",

      votoNao:
        "Rejeitar o pedido para acelerar a análise da matéria.",

      alerta:
        "Esta votação trata da forma ou da velocidade de análise. Ela não significa, por si só, aprovar ou rejeitar o conteúdo completo da matéria.",
    };
  }

  /*
    =========================================================
    RETIRADA
    =========================================================
  */

  if (
    base.includes("retirada de pauta") ||
    base.includes("retirada")
  ) {
    return {
      tipo: "procedimento",

      titulo:
        "Decisão sobre retirar a matéria da análise naquele momento",

      explicacao:
        "Os deputados decidiram sobre um pedido para retirar a matéria da análise naquele momento.",

      nomeOficial:
        objeto || null,

      votoSim:
        "Apoiar o pedido de retirada que estava sendo votado.",

      votoNao:
        "Rejeitar o pedido de retirada que estava sendo votado.",

      alerta:
        "Essa decisão não significa, por si só, apoiar ou rejeitar o conteúdo completo da matéria.",
    };
  }

  /*
    =========================================================
    ADIAMENTO
    =========================================================
  */

  if (
    base.includes("adiamento") ||
    base.includes("adiar")
  ) {
    return {
      tipo: "procedimento",

      titulo:
        "Decisão sobre adiar a análise",

      explicacao:
        "Os deputados decidiram sobre um pedido para deixar a análise ou a votação para outro momento.",

      nomeOficial:
        objeto || null,

      votoSim:
        "Apoiar o pedido de adiamento que estava sendo votado.",

      votoNao:
        "Rejeitar o pedido de adiamento que estava sendo votado.",

      alerta:
        "O resultado desta votação não deve ser interpretado automaticamente como apoio ou rejeição ao conteúdo da matéria.",
    };
  }

  /*
    =========================================================
    DESTAQUE
    =========================================================

    Um destaque pode ter sentidos diferentes dependendo
    daquilo que foi separado para votação.

    Por isso, não inferimos automaticamente SIM/NÃO.
  */

  if (base.includes("destaque")) {
    return {
      tipo: "especifica",

      titulo:
        "Decisão sobre uma parte específica",

      explicacao:
        "Uma parte específica da matéria foi separada para receber uma decisão própria.",

      nomeOficial:
        objeto || "Destaque",

      votoSim: null,

      votoNao: null,

      alerta:
        "Para explicar o significado de SIM e NÃO em um destaque, é necessário saber exatamente qual pedido ou texto estava sendo votado. Por isso, o Observa Salvador não interpreta automaticamente esse voto sem informação suficiente.",
    };
  }

  /*
    =========================================================
    SUBEMENDA SUBSTITUTIVA
    =========================================================

    Esta regra precisa vir antes das regras genéricas de
    “substitutivo” e “emenda”.
  */

  if (base.includes("subemenda substitutiva")) {
    return {
      tipo: "especifica",

      titulo:
        "Decisão sobre uma nova versão de uma alteração no texto",

      explicacao:
        "Já havia uma proposta para mudar o texto. Depois, foi apresentada outra mudança sobre essa alteração. É essa nova versão que aparece no registro oficial como subemenda substitutiva.",

      nomeOficial:
        objeto || "Subemenda substitutiva",

      votoSim:
        "Apoiar a alteração específica que estava sendo colocada em votação.",

      votoNao:
        "Rejeitar a alteração específica que estava sendo colocada em votação.",

      alerta:
        "O voto se refere a essa alteração específica. Ele não deve ser apresentado automaticamente como apoio ou rejeição à matéria inteira.",
    };
  }

  /*
    =========================================================
    SUBSTITUTIVO
    =========================================================
  */

  if (base.includes("substitutivo")) {
    return {
      tipo: "especifica",

      titulo:
        "Decisão sobre um texto apresentado para substituir a versão anterior",

      explicacao:
        "Foi apresentada uma nova versão do texto para ocupar o lugar da versão que estava sendo analisada.",

      nomeOficial:
        objeto || "Substitutivo",

      votoSim:
        "Apoiar o texto substitutivo que estava sendo colocado em votação.",

      votoNao:
        "Rejeitar o texto substitutivo que estava sendo colocado em votação.",

      alerta:
        "O sentido prático dessa escolha depende das diferenças entre o texto anterior e o texto substitutivo.",
    };
  }

  /*
    =========================================================
    SUBEMENDA
    =========================================================
  */

  if (base.includes("subemenda")) {
    return {
      tipo: "especifica",

      titulo:
        "Decisão sobre uma alteração feita em outra proposta de mudança",

      explicacao:
        "Já existia uma proposta para alterar o texto. A subemenda propõe uma mudança sobre essa alteração.",

      nomeOficial:
        objeto || "Subemenda",

      votoSim:
        "Apoiar a alteração específica que estava sendo colocada em votação.",

      votoNao:
        "Rejeitar a alteração específica que estava sendo colocada em votação.",

      alerta:
        "Esse voto trata da alteração específica e não deve ser apresentado automaticamente como apoio ou rejeição à matéria inteira.",
    };
  }

  /*
    =========================================================
    EMENDA
    =========================================================
  */

  if (base.includes("emenda")) {
    return {
      tipo: "especifica",

      titulo:
        "Decisão sobre uma mudança proposta no texto",

      explicacao:
        "Uma emenda é uma proposta para modificar uma parte do texto que está sendo analisado.",

      nomeOficial:
        objeto || "Emenda",

      votoSim:
        "Apoiar a mudança específica que estava sendo colocada em votação.",

      votoNao:
        "Rejeitar a mudança específica que estava sendo colocada em votação.",

      alerta:
        "Esse voto se refere à alteração específica e não deve ser interpretado automaticamente como apoio ou rejeição à matéria inteira.",
    };
  }

  /*
    =========================================================
    PARECER
    =========================================================
  */

  if (base.includes("parecer")) {
    return {
      tipo: "tecnica",

      titulo:
        "Decisão relacionada a uma análise da matéria",

      explicacao:
        "Um parecer é um documento que apresenta uma análise e uma posição sobre a matéria. Esta votação está relacionada a esse documento.",

      nomeOficial:
        objeto || "Parecer",

      votoSim: null,

      votoNao: null,

      alerta:
        "O significado do voto depende do conteúdo exato do parecer e do que foi colocado em votação. Por isso, o Observa Salvador não transforma automaticamente SIM ou NÃO em apoio ou rejeição à matéria inteira.",
    };
  }

  /*
    =========================================================
    AINDA NÃO CLASSIFICADA
    =========================================================

    Este é um mecanismo de segurança.

    É melhor mostrar o texto oficial sem tradução do que
    produzir uma interpretação que possa estar errada.
  */

  return {
    tipo: "nao-classificada",

    titulo:
      "Outra decisão relacionada à matéria",

    explicacao:
      "A fonte oficial registra uma votação relacionada a esta matéria.",

    nomeOficial:
      objeto || null,

    votoSim: null,

    votoNao: null,

    alerta:
      "Esta etapa ainda não possui uma tradução automática validada pelo Observa Salvador. Por isso, mostramos o registro oficial sem tentar adivinhar o significado do voto.",
  };
}

/*
  ---------------------------------------------------------
  ORDEM DE EXIBIÇÃO
  ---------------------------------------------------------

  A ordem não diz que uma decisão é politicamente mais
  importante que outra.

  Ela serve apenas para organizar a explicação ao cidadão:
  primeiro decisões sobre conteúdo/texto; depois questões
  procedimentais e técnicas.
*/

export function prioridadeDecisao(
  votacao: VotacaoParaTraducao
) {
  const tipo =
    traduzirDecisao(votacao).tipo;

  if (tipo === "principal") {
    return 1;
  }

  if (tipo === "especifica") {
    return 2;
  }

  if (tipo === "procedimento") {
    return 3;
  }

  if (tipo === "tecnica") {
    return 4;
  }

  return 5;
}