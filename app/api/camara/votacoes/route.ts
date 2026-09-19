import { NextRequest, NextResponse } from "next/server";

const CAMARA_API =
  "https://dadosabertos.camara.leg.br/api/v2/votacoes";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pagina = searchParams.get("pagina") || "1";
    const itens = searchParams.get("itens") || "20";
    const dataInicio = searchParams.get("dataInicio");
    const dataFim = searchParams.get("dataFim");

    const parametros = new URLSearchParams();

    parametros.set("pagina", pagina);
    parametros.set("itens", itens);
    parametros.set("ordem", "DESC");
    parametros.set("ordenarPor", "dataHoraRegistro");

    if (dataInicio) {
      parametros.set("dataInicio", dataInicio);
    }

    if (dataFim) {
      parametros.set("dataFim", dataFim);
    }

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
          erro:
            "Não foi possível consultar as votações da Câmara dos Deputados.",
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
      dados: Array.isArray(dados.dados)
        ? dados.dados
        : [],
      links: Array.isArray(dados.links)
        ? dados.links
        : [],
    });
  } catch (erro) {
    console.error(
      "Erro ao consultar votações da Câmara:",
      erro
    );

    return NextResponse.json(
      {
        erro:
          "Ocorreu um erro ao buscar as votações da Câmara dos Deputados.",
      },
      {
        status: 500,
      }
    );
  }
}