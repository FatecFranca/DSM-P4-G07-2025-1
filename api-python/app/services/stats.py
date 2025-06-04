import pandas as pd
from statistics import mean, stdev
from scipy.stats import skew, norm
from typing import List
from datetime import datetime, timedelta, timezone

def calcular_estatisticas(dados: List[dict]) -> dict:
    df = pd.DataFrame(dados)
    df["frequenciaMedia"] = pd.to_numeric(df["frequenciaMedia"], errors="coerce")
    valores = df["frequenciaMedia"].dropna()
    valores = valores[(valores >= 30) & (valores <= 250)]

    media = valores.mean()
    desvio = valores.std()

    if desvio > 0:
        limite_inferior = media - 3 * desvio
        limite_superior = media + 3 * desvio
        valores = valores[(valores >= limite_inferior) & (valores <= limite_superior)]

    if valores.empty:
        return {
            "media": None,
            "mediana": None,
            "moda": None,
            "desvio_padrao": None,
            "assimetria": None
        }

    return {
        "media": float(valores.mean()),
        "mediana": float(valores.median()),
        "moda": float(valores.mode().iloc[0]) if not valores.mode().empty else None,
        "desvio_padrao": float(valores.std()),
        "assimetria": float(skew(valores, bias=False))
    }

def media_por_data(dados: List[dict], inicio: str, fim: str) -> float:
    df = pd.DataFrame(dados)
    df["data"] = pd.to_datetime(df["data"])

    # Define o timezone UTC-3
    tz = timezone(timedelta(hours=-3))
    inicio_dt = datetime.fromisoformat(inicio).replace(tzinfo=tz)
    fim_dt = datetime.fromisoformat(fim).replace(tzinfo=tz) + timedelta(days=1) - timedelta(seconds=1)

    filtrados = df[(df["data"] >= inicio_dt) & (df["data"] <= fim_dt)]

    if filtrados.empty:
        return 0.0

    return filtrados["frequenciaMedia"].mean()


def calcular_probabilidade(dados: List[dict], valor: float) -> float:
    valores = [item["frequenciaMedia"] for item in dados if "frequenciaMedia" in item]

    if len(valores) < 2:
        return 0.0

    media = mean(valores)
    desvio = stdev(valores)

    if desvio == 0:
        return 1.0 if valor == media else 0.0

    probabilidade = norm.pdf(valor, loc=media, scale=desvio)
    return float(probabilidade) if not (probabilidade is None or probabilidade != probabilidade) else 0.0

def media_ultimos_5_dias_validos(dados: List[dict]) -> dict:
    df = pd.DataFrame(dados)

    if 'data' not in df.columns or 'frequenciaMedia' not in df.columns:
        print("Colunas esperadas não encontradas. Colunas disponíveis:", df.columns.tolist())
        return {}

    df['data'] = pd.to_datetime(df['data'], errors='coerce').dt.date
    df['frequenciaMedia'] = pd.to_numeric(df['frequenciaMedia'], errors='coerce')

    df = df.dropna(subset=['data', 'frequenciaMedia'])

    medias_por_dia = df.groupby('data')['frequenciaMedia'].mean().round(2)

    ultimos_5_dias = medias_por_dia.sort_index(ascending=False).head(5)

    return ultimos_5_dias.sort_index().to_dict()