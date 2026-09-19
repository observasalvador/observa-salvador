import { NextRequest, NextResponse } from "next/server";

const CAMARA_API =
  "https://dadosabertos.camara.leg.br/api/v2/votacoes";

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

    if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
      return NextResponse.json(
        {
          erro: "Identificador da votação inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const resposta = await fetch(
      `${CAMARA_API}/${encodeURIComponent(id)}/votos`,
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
          erro: "Não foram encontrados votos individuais para esta votação.",
        },
        {
          status: 404,
        }
      );
    }

    if (!resposta.ok) {
      return NextResponse.json(
        {
          erro: "Não foi possível consultar os votos individuais.",
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
      votacaoId: id,
      dados: dados.dados ?? [],
      links: dados.links ?? [],
    });
  } catch (erro) {
    console.error(
      "Erro ao consultar votos individuais:",
      erro
    );

    return NextResponse.json(
      {
        erro: "Ocorreu um erro ao buscar os votos individuais.",
      },
      {
        status: 500,
      }
    );
  }
}