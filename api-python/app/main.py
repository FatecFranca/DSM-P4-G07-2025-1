from fastapi import FastAPI, Query
from app.clients import java_api
from app.services import stats
from datetime import datetime, timedelta
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
    dados = await java_api.buscar_batimentos()
    print(dados[:10])  # Mostra os 10 primeiros batimentos recebidos
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

@app.get("/batimentos/media-ultimos-5-dias", tags=["Batimentos"])
async def media_batimentos_ultimos_5_dias():
    hoje = datetime.now()
    cinco_dias_atras = hoje - timedelta(days=5)

    todos_batimentos = []
    pagina = 0

    while True:
        batimentos = await java_api.buscar_batimentos(pagina)
        if not batimentos:
            break

        for batimento in batimentos:
            # Validação da chave 'dataHora'
            if 'dataHora' not in batimento:
                print(f"[AVISO] Registro ignorado por falta de 'dataHora': {batimento}")
                continue

            try:
                data_batimento = datetime.fromisoformat(batimento['dataHora'])
            except ValueError:
                print(f"[AVISO] Formato inválido de dataHora: {batimento['dataHora']}")
                continue

            if data_batimento >= cinco_dias_atras:
                todos_batimentos.append(batimento)

        # Se o último batimento for mais antigo que o limite de 5 dias, encerramos
        ultimo = batimentos[-1]
        if 'dataHora' not in ultimo or datetime.fromisoformat(ultimo['dataHora']) < cinco_dias_atras:
            break

        pagina += 1

    if not todos_batimentos:
        return {"medias": {}}

    # Cria o DataFrame com os batimentos válidos
    df = pd.DataFrame(todos_batimentos)

    # Conversões e validações
    df['data'] = pd.to_datetime(df['dataHora'], errors='coerce').dt.date
    df['valor'] = pd.to_numeric(df['valor'], errors='coerce')

    # Remove linhas com valores inválidos
    df = df.dropna(subset=['data', 'valor'])

    # Agrupa por data e calcula a média
    medias_por_dia = df.groupby('data')['valor'].mean().round(2)

    return {"medias": medias_por_dia.to_dict()}
