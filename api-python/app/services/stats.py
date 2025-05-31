import pandas as pd
from statistics import mean, stdev
from scipy.stats import skew, norm
from typing import List
from datetime import datetime

def calcular_estatisticas(dados: List[dict]) -> dict:
    df = pd.DataFrame(dados)
    
    # Converte a coluna para numérico, se necessário
    df["frequenciaMedia"] = pd.to_numeric(df["frequenciaMedia"], errors="coerce")

    # Remove nulos
    valores = df["frequenciaMedia"].dropna()

    # Filtragem básica: limites fisiológicos plausíveis
    valores = valores[(valores >= 30) & (valores <= 250)]

    # Filtragem adicional: remoção de outliers com base no desvio padrão
    media = valores.mean()
    desvio = valores.std()

    if desvio > 0:
        limite_inferior = media - 3 * desvio
        limite_superior = media + 3 * desvio
        valores = valores[(valores >= limite_inferior) & (valores <= limite_superior)]

    # Verifica se ainda há dados suficientes após filtragem
    if valores.empty:
        return {
            "media": None,
            "mediana": None,
            "moda": None,
            "desvio_padrao": None,
            "assimetria": None
        }

    # Cálculos com conversão para tipos nativos
    return {
        "media": float(valores.mean()),
        "mediana": float(valores.median()),
        "moda": float(valores.mode().iloc[0]) if not valores.mode().empty else None,
        "desvio_padrao": float(valores.std()),
        "assimetria": float(skew(valores, bias=False))
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

def calcular_probabilidade(dados: List[dict], valor: float) -> float:
    valores = [item["frequenciaMedia"] for item in dados if "frequenciaMedia" in item]

    if len(valores) < 2:
        return 0.0  # Não é possível calcular desvio com menos de 2 valores

    media = mean(valores)
    desvio = stdev(valores)

    if desvio == 0:
        return 1.0 if valor == media else 0.0

    probabilidade = norm.pdf(valor, loc=media, scale=desvio)

    # Retorna 0.0 se a probabilidade for NaN (por precaução)
    return float(probabilidade) if not (probabilidade is None or probabilidade != probabilidade) else 0.0