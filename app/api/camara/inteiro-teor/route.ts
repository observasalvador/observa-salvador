import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

const HOST_PERMITIDO = "www.camara.leg.br";

export async function GET(request: NextRequest) {
  let parser: PDFParse | null = null;

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        {
          erro: "Informe a URL oficial do inteiro teor.",
        },
        { status: 400 }
      );
    }

    let urlDocumento: URL;

    try {
      urlDocumento = new URL(url);
    } catch {
      return NextResponse.json(
        {
          erro: "A URL informada nÃ£o Ã© vÃ¡lida.",
        },
        { status: 400 }
      );
    }

    /*
     * SeguranÃ§a:
     * esta rota nÃ£o pode funcionar como um baixador genÃ©rico.
     * Por enquanto, aceitamos somente documentos oficiais
     * hospedados no domÃ­nio da CÃ¢mara dos Deputados.
     */
    if (
      urlDocumento.protocol !== "https:" ||
      urlDocumento.hostname !== HOST_PERMITIDO
    ) {
      return NextResponse.json(
        {
          erro: "Somente documentos oficiais da CÃ¢mara dos Deputados sÃ£o permitidos.",
        },
        { status: 400 }
      );
    }

    const resposta = await fetch(urlDocumento.toString(), {
      headers: {
        Accept: "application/pdf",
      },
      cache: "no-store",
    });

    if (!resposta.ok) {
      return NextResponse.json(
        {
          erro: "NÃ£o foi possÃ­vel baixar o documento oficial.",
          status: resposta.status,
        },
        { status: resposta.status }
      );
    }

    const contentType = resposta.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().includes("application/pdf")) {
      return NextResponse.json(
        {
          erro: "O endereÃ§o informado nÃ£o retornou um arquivo PDF.",
          contentType,
        },
        { status: 415 }
      );
    }

    const arrayBuffer = await resposta.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    parser = new PDFParse({
      data: buffer,
    });

    const resultado = await parser.getText();
    const texto = resultado.text?.trim() ?? "";

    if (!texto) {
      return NextResponse.json(
        {
          erro: "O PDF foi obtido, mas nÃ£o foi possÃ­vel extrair texto dele.",
          urlDocumento: urlDocumento.toString(),
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      fonte: "CÃ¢mara dos Deputados",
      atualizadoEm: new Date().toISOString(),

      documento: {
        url: urlDocumento.toString(),
        contentType,
        tamanhoBytes: buffer.length,
      },

      extracao: {
        caracteres: texto.length,
        texto,
      },
    });
  } catch (erro) {
    console.error("Erro ao processar inteiro teor da CÃ¢mara:", erro);
return NextResponse.json(
      {
        erro: "Ocorreu um erro ao processar o inteiro teor.",
      },
      { status: 500 }
    );
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch {
        // NÃ£o impede a resposta caso a liberaÃ§Ã£o do parser falhe.
      }
    }
  }
}
