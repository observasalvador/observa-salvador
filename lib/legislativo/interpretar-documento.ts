export type ParteDocumentoLegislativo = {
  tipo:
    | "texto-proposto"
    | "explicacao-relator"
    | "documento-completo";
  tituloCidadao: string;
  explicacaoCidadao: string;
  nomeOficial?: string;
  texto: string;
};

export type DocumentoInterpretado = {
  textoCompleto: string;
  textoProposto: string | null;
  explicacaoRelator: string | null;
  partes: ParteDocumentoLegislativo[];
  alertas: string[];
};

/**
 * Esta função NÃO resume nem avalia o conteúdo político.
 *
 * Sua função é apenas separar partes reconhecíveis do documento
 * para que outras camadas possam explicá-las depois.
 */
export function interpretarDocumentoLegislativo(
  textoOriginal: string
): DocumentoInterpretado {
  const texto = textoOriginal
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  const partes: ParteDocumentoLegislativo[] = [];
  const alertas: string[] = [];

  let textoProposto: string | null = null;
  let explicacaoRelator: string | null = null;

  /*
   * 1. Tenta localizar o começo do texto que efetivamente
   * apresenta a nova redação proposta.
   *
   * Exemplos que podem aparecer em documentos legislativos:
   * - SUBEMENDA SUBSTITUTIVA
   * - SUBSTITUTIVO
   * - EMENDA
   *
   * Para reduzir falsos positivos, procuramos também um trecho
   * típico do início do texto normativo: "O CONGRESSO NACIONAL".
   */
  const indiceCongresso = texto.search(
    /\bO\s+CONGRESSO\s+NACIONAL\s+decreta\s*:/i
  );

  if (indiceCongresso >= 0) {
    /*
     * Tentamos preservar também o título imediatamente anterior
     * ao começo dos artigos.
     */
    const antesDoCongresso = texto.slice(0, indiceCongresso);

    const marcadoresTextoProposto = [
      /^SUBEMENDA\s+SUBSTITUTIVA\b.*$/gim,
      /^SUBSTITUTIVO\b.*$/gim,
      /^EMENDA\b.*$/gim,
    ];

    let inicioTextoProposto = indiceCongresso;

    for (const marcador of marcadoresTextoProposto) {
      const correspondencias = [...antesDoCongresso.matchAll(marcador)];

      if (correspondencias.length > 0) {
        const ultimaCorrespondencia =
          correspondencias[correspondencias.length - 1];

        if (typeof ultimaCorrespondencia.index === "number") {
          inicioTextoProposto = ultimaCorrespondencia.index;
          break;
        }
      }
    }

    textoProposto = texto.slice(inicioTextoProposto).trim();

    partes.push({
      tipo: "texto-proposto",
      tituloCidadao: "O que estava sendo proposto?",
      explicacaoCidadao:
        "Esta parte contém o texto da mudança apresentada para análise e votação.",
      nomeOficial: "Texto proposto",
      texto: textoProposto,
    });
  } else {
    alertas.push(
      "Não foi possível identificar automaticamente onde começa o texto da mudança proposta."
    );
  }

  /*
   * 2. Procura uma parte em que a pessoa responsável por analisar
   * a proposta apresenta sua avaliação e seus motivos.
   *
   * Para o cidadão, explicamos primeiro o que isso significa.
   * O termo técnico aparece apenas depois.
   */
  const inicioVotoRelator = texto.search(
    /\b(?:I\s*-\s*)?VOTO\s+DO\s+RELATOR\b/i
  );

  if (inicioVotoRelator >= 0) {
    const fim =
      textoProposto !== null
        ? texto.indexOf(textoProposto)
        : texto.length;

    if (fim > inicioVotoRelator) {
      explicacaoRelator = texto
        .slice(inicioVotoRelator, fim)
        .trim();

      partes.push({
        tipo: "explicacao-relator",
        tituloCidadao:
          "O que a pessoa responsável pela análise recomendou?",
        explicacaoCidadao:
          "Um parlamentar ficou responsável por estudar a proposta e apresentar uma análise aos demais. Essa pessoa é chamada de relator. Aqui aparecem os motivos e a recomendação apresentados por ele. Isso não representa uma conclusão do Observa Salvador.",
        nomeOficial: "Voto do relator",
        texto: explicacaoRelator,
      });
    }
  }

  /*
   * 3. Se nenhuma estrutura conhecida for encontrada,
   * preservamos o documento integral sem tentar adivinhar.
   */
  if (partes.length === 0) {
    partes.push({
      tipo: "documento-completo",
      tituloCidadao: "Documento oficial",
      explicacaoCidadao:
        "Ainda não conseguimos separar automaticamente as partes deste documento com segurança. Por isso, preservamos o texto oficial sem tentar adivinhar seu significado.",
      texto,
    });
  }

  return {
    textoCompleto: texto,
    textoProposto,
    explicacaoRelator,
    partes,
    alertas,
  };
}

