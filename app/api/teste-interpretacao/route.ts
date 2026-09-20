import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { interpretarDocumentoLegislativo } from "@/lib/legislativo/interpretar-documento";`r`nimport { extrairArtigos } from "@/lib/legislativo/extrair-artigos";

export async function GET() {
  const arquivo = path.join(process.cwd(), "texto-subemenda.txt");

  if (!fs.existsSync(arquivo)) {
    return NextResponse.json(
      { erro: "Arquivo de teste não encontrado." },
      { status: 404 }
    );
  }

  const texto = fs.readFileSync(arquivo, "utf8");
  const resultado = interpretarDocumentoLegislativo(texto);`r`n  const artigos = resultado.textoProposto ? extrairArtigos(resultado.textoProposto) : [];

  return NextResponse.json({
    partesEncontradas: resultado.partes.map((parte) => ({
      tipo: parte.tipo,
      tituloCidadao: parte.tituloCidadao,
    })),

    inicioTextoProposto:
      resultado.textoProposto?.slice(0, 700) ?? null,

    inicioExplicacaoRelator:
      resultado.explicacaoRelator?.slice(0, 700) ?? null,

    artigosEncontrados: artigos.map((artigo) => ({ numero: artigo.numero, inicio: artigo.texto.slice(0, 250) })),`r`n    alertas: resultado.alertas,
  });
}

