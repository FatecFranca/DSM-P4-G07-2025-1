import pandas as pd
from scipy.stats import skew
from typing import List
from datetime import datetime

def calcular_estatisticas(dados: List[dict]) -> dict:
    df = pd.DataFrame(dados)
    
    valores = df["frequenciaMedia"]

    return {
        "media": valores.mean(),
        "mediana": valores.median(),
        "moda": valores.mode().iloc[0] if not valores.mode().empty else None,
        "desvio_padrao": valores.std(),
        "assimetria": skew(valores, bias=False)  
    }

def media_por_data(dados: List[dict], inicio: str, fim: str) -> float:
    df = pd.DataFrame(dados)
    
    # Converte data para datetime
    df["data"] = pd.to_datetime(df["data"])
    inicio_dt = datetime.fromisoformat(inicio)
    fim_dt = datetime.fromisoformat(fim)

    filtrados = df[(df["data"] >= inicio_dt) & (df["data"] <= fim_dt)]

    if filtrados.empty:
        return 0.0

    return filtrados["frequenciaMedia"].mean()