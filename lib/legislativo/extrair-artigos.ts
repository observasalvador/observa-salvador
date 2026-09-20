export type ArtigoIdentificado = {
  numero: string;
  texto: string;
};

export function extrairArtigos(
  textoProposto: string
): ArtigoIdentificado[] {
  const texto = textoProposto
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  const inicioNormativo = texto.search(
    /\bO\s+CONGRESSO\s+NACIONAL\s+decreta\s*:/i
  );

  if (inicioNormativo < 0) {
    return [];
  }

  const parteNormativa = texto.slice(inicioNormativo);

  const regexArtigo =
    /(?:^|\n)\s*Art\.\s*(\d+)[ºo°]?\s*/gim;

  const ocorrencias = [
    ...parteNormativa.matchAll(regexArtigo),
  ];

  const artigos: ArtigoIdentificado[] = [];

  for (let i = 0; i < ocorrencias.length; i++) {
    const atual = ocorrencias[i];
    const proximo = ocorrencias[i + 1];

    if (
      typeof atual.index !== "number"
    ) {
      continue;
    }

    const inicio = atual.index;
    const fim =
      proximo && typeof proximo.index === "number"
        ? proximo.index
        : parteNormativa.length;

    const textoArtigo = parteNormativa
      .slice(inicio, fim)
      .trim();

    artigos.push({
      numero: atual[1],
      texto: textoArtigo,
    });
  }

  return artigos;
}
