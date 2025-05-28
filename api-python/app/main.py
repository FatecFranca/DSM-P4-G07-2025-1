from fastapi import FastAPI, Query
from app.clients import java_api
from app.services import stats

app = FastAPI()

@app.get("/batimentos")
async def get_batimentos():
    dados = await java_api.buscar_batimentos()
    return {"dados": dados}

@app.get("/estatisticas")
async def get_estatisticas():
    dados = await java_api.buscar_batimentos()
    resultado = stats.calcular_estatisticas(dados)
    return resultado

@app.get("/health")
async def health_check():
    return {"status": "Ok"}


@app.get("/media-data")
async def media_batimentos_por_data(
    data_inicio: str = Query(..., alias="inicio"),
    data_fim: str = Query(..., alias="fim")
):
    dados = await java_api.buscar_batimentos()
    media = stats.media_por_data(dados, data_inicio, data_fim)
    return {"media": media}