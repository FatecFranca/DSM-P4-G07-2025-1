from statistics import mean, median, mode, stdev
from typing import List
from datetime import datetime

def calcular_estatisticas(dados: List[dict]) -> dict:
    valores = [item["frequenciaMedia"] for item in dados]

    return {
        "media": mean(valores),
        "mediana": median(valores),
        "moda": mode(valores),
        "desvio_padrao": stdev(valores)
    }

def media_por_data(dados: List[dict], inicio: str, fim: str) -> float:
    inicio = datetime.fromisoformat(inicio)
    fim = datetime.fromisoformat(fim)

    filtrados = [
        item for item in dados
        if inicio <= datetime.fromisoformat(item["data"][:10]) <= fim
    ]

    if not filtrados:
        return 0.0

    return mean(item["frequenciaMedia"] for item in filtrados)
