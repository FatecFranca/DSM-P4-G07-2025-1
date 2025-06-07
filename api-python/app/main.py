from fastapi import FastAPI, Query
from app.clients import java_api
from app.services import stats
from datetime import datetime, date
import pandas as pd

app = FastAPI(
    title="API PetDex - Estatísticas",
    description="API para exibir dados e estatísticas dos batimentos cardíacos dos animais monitorados pela coleira inteligente",
    version="1.0.0"
)

@app.get("/batimentos", tags=["Batimentos"])
async def get_batimentos():
    dados = await java_api.buscar_batimentos()
    return {"dados": dados}

@app.get("/batimentos/estatisticas", tags=["Batimentos"])
async def get_estatisticas():
    dados = await java_api.buscar_todos_batimentos()
    print(f"Total de batimentos carregados: {len(dados)}")
    resultado = stats.calcular_estatisticas(dados)
    return resultado


@app.get("/batimentos/media-por-data", tags=["Batimentos"])
async def media_batimentos_por_data(
    inicio: date = Query(..., description="Data de início no formato YYYY-MM-DD"),
    fim: date = Query(..., description="Data de fim no formato YYYY-MM-DD")
):
    dados = await java_api.buscar_todos_batimentos()
    resultado = stats.media_por_intervalo(dados, inicio, fim)
    return resultado

@app.get("/batimentos/probabilidade", tags=["Batimentos"])
async def probabilidade_batimento(valor: float = Query(..., description="Valor do batimento para calcular a probabilidade")):
    dados = await java_api.buscar_batimentos()
    prob = stats.calcular_probabilidade(dados, valor)
    return {"probabilidade": prob}

@app.get("/health", tags=["Status"])
async def health_check():
    return {"status": "Ok"}

@app.get("/batimentos/media-ultimos-5-dias", tags=["Batimentos"])
async def media_batimentos_ultimos_5_dias():
    batimentos = await java_api.buscar_todos_batimentos()

    print(batimentos[:5])

    if not batimentos:
        return {"medias": {}}

    medias = stats.media_ultimos_5_dias_validos(batimentos)
    return {"medias": medias}


@app.get("/batimentos/media-ultimas-5-horas-registradas", tags=["Batimentos"])
async def media_batimentos_ultimas_5_horas():
    dados = await java_api.buscar_todos_batimentos()
    resultado = stats.media_ultimas_5_horas_registradas(dados)
    return resultado

