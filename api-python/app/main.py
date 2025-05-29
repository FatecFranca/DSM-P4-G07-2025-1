from fastapi import FastAPI, Query
from app.clients import java_api
from app.services import stats

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
    dados = await java_api.buscar_batimentos()
    resultado = stats.calcular_estatisticas(dados)
    return resultado

@app.get("/batimentos/media-por-data", tags=["Batimentos"])
async def media_batimentos_por_data(
    data_inicio: str = Query(..., alias="inicio"),
    data_fim: str = Query(..., alias="fim")
):
    dados = await java_api.buscar_batimentos()
    media = stats.media_por_data(dados, data_inicio, data_fim)
    return {"media": media}

@app.get("/batimentos/probabilidade", tags=["Batimentos"])
async def probabilidade_batimento(valor: float = Query(..., description="Valor do batimento para calcular a probabilidade")):
    dados = await java_api.buscar_batimentos()
    prob = stats.calcular_probabilidade(dados, valor)
    return {"probabilidade": prob}

@app.get("/health", tags=["Status"])
async def health_check():
    return {"status": "Ok"}
