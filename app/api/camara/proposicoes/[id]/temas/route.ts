import { NextRequest, NextResponse } from "next/server";

const CAMARA_API =
  "https://dadosabertos.camara.leg.br/api/v2/proposicoes";

type ContextoRota = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  contexto: ContextoRota
) {
  try {
    const { id } = await contexto.params;

    // O ID precisa conter somente números.
    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json(
        {
          erro: "Identificador da proposição inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const resposta = await fetch(
      `${CAMARA_API}/${id}/temas`,
      {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    if (resposta.status === 404) {
      return NextResponse.json(
        {
          erro: "Não foram encontrados temas para esta proposição.",
        },
        {
          status: 404,
        }
      );
    }

    if (!resposta.ok) {
      return NextResponse.json(
        {
          erro: "Não foi possível consultar os temas da proposição.",
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
      proposicaoId: Number(id),
      dados: dados.dados ?? [],
      links: dados.links ?? [],
    });
  } catch (erro) {
    console.error(
      "Erro ao consultar temas da proposição:",
      erro
    );

    return NextResponse.json(
      {
        erro: "Ocorreu um erro ao buscar os temas da proposição.",
      },
      {
        status: 500,
      }
    );
  }
}