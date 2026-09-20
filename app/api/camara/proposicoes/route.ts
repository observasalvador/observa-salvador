import { NextRequest, NextResponse } from "next/server";

const CAMARA_API =
  "https://dadosabertos.camara.leg.br/api/v2/proposicoes";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pagina = searchParams.get("pagina") || "1";
    const itens = searchParams.get("itens") || "20";
    const busca = searchParams.get("busca")?.trim();

    // Opcional:
    // permite que uma página peça apenas determinados tipos
    // de proposição sem alterar as páginas que não usam o filtro.
    const tipos = searchParams
      .getAll("tipo")
      .map((tipo) => tipo.trim().toUpperCase())
      .filter(Boolean);

    const parametros = new URLSearchParams({
      pagina,
      itens,
      ordem: "DESC",
      ordenarPor: "id",
    });

    if (busca) {
      parametros.set("keywords", busca);
    }

    tipos.forEach((tipo) => {
      parametros.append("siglaTipo", tipo);
    });

    const resposta = await fetch(
      `${CAMARA_API}?${parametros.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!resposta.ok) {
      return NextResponse.json(
        {
          erro: "Não foi possível consultar a Câmara dos Deputados.",
          status: resposta.status,
        },
        {
          status: resposta.status,
        }
      );
    }

    const dados = await resposta.json();

    return NextResponse.json({
      fonte: "Câmara dos Deputados",
      atualizadoEm: new Date().toISOString(),
      dados: dados.dados ?? [],
      links: dados.links ?? [],
    });
  } catch (erro) {
    console.error("Erro ao consultar proposições da Câmara:", erro);

    return NextResponse.json(
      {
        erro: "Ocorreu um erro ao buscar as proposições.",
      },
      {
        status: 500,
      }
    );
  }
}