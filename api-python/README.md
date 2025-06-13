<p align="center">
  <img src="../docs/img/capa-python.svg" alt="Capa do Projeto" width="100%" />
</p>


# 🧮 API em Python — Análises Estatísticas da PetDex

Esta é a API desenvolvida com **Python** e **FastAPI**, responsável por **processar, analisar e interpretar os dados coletados pela coleira inteligente**, fornecendo insights sobre batimentos cardíacos, movimentos e padrões de comportamento dos pets.

---

## ⚙️ Tecnologias Utilizadas

* **Python 3.11**
* **FastAPI** (Framework web moderno e assíncrono)
* **Pandas** (Análise de dados)
* **NumPy** (Cálculos estatísticos)
* **SciPy** (Distribuição normal, correlação)
* **Scikit-learn** (Regressão linear)
* **httpx** (Cliente HTTP assíncrono)
* **Uvicorn** (Servidor ASGI)
* **Render** (Hospedagem da API)

---

## 🧠 Objetivo da API

Esta API **não coleta dados diretamente da coleira**. Seu papel é **consumir os dados já armazenados na API Java** e executar cálculos estatísticos, regressões, análises de probabilidade e projeções futuras para apoiar o monitoramento da saúde animal.

---

## 📊 Arquitetura

A API Python segue uma estrutura simples, porém bem organizada:

* `app/main.py` — Define os endpoints da API.
* `app/services/stats.py` — Responsável por toda a lógica de análise estatística, projeções e regressões.
* `app/clients/java_api.py` — Cliente que faz requisições assíncronas para a API Java.
* `Dockerfile`e `docker-compose.yml` — Para empacotamento e execução em containers.
* `requirements.txt` — Lista de dependências do projeto.

---

## 📡 Endpoints

A API está hospedada na plataforma Render:

🔗 [https://https://api-petdex-estatistica.onrender.com](https://api-petdex-estatistica.onrender.com/docs)

Alguns dos principais endpoints disponíveis:

| Rota                                                          | Descrição                                                            |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| `/batimentos`                                                 | Retorna todos os batimentos cardíacos coletados                      |
| `/batimentos/estatisticas`                                    | Estatísticas gerais: média, mediana, moda, desvio padrão, assimetria |
| `/batimentos/media-por-data?inicio=YYYY-MM-DD&fim=YYYY-MM-DD` | Média de batimentos em um intervalo específico                       |
| `/batimentos/media-ultimos-5-dias`                            | Média diária dos últimos 5 dias com dados                            |
| `/batimentos/media-ultimas-5-horas-registradas`               | Média horária das 5 últimas horas com registros                      |
| `/batimentos/probabilidade?valor=XX`                          | Probabilidade estatística de ocorrer determinado batimento           |
| `/batimentos/regressao`                                       | Executa regressão linear entre batimentos e movimentos               |
| `/health`                                                     | Verifica se a API está online                                        |

---

## 📊 Recursos Estatísticos

A API calcula:

* **Média, moda e mediana**
* **Desvio padrão**
* **Assimetria dos dados**
* **Probabilidade acumulada (Distribuição Normal)**
* **Classificação do batimento: normal, fora do padrão, alerta**
* **Correlação entre variáveis do acelerômetro/giroscópio e batimentos**
* **Regressão Linear para prever futuros batimentos**
* **Projeção dos batimentos para as próximas 5 horas**

---

## 🔗 Comunicação entre APIs

A **API Python se conecta diretamente à API Java** usando o módulo `httpx`. Ela faz requisições paginadas para obter todos os dados de:

* **Batimentos cardíacos**: `GET /batimentos/animal/{id}`
* **Movimentos**: `GET /movimentos/animal/{id}`

Esses dados são transformados em `DataFrame`, processados, agrupados por data e cruzados para análises mais profundas.

---

## 📉 Exemplo de Análise de Regressão

```json
{
  "coeficientes": {
    "acelerometroX": 11.356,
    "acelerometroY": -16.507,
    "acelerometroZ": 5.498,
    "giroscopioX": 0.001,
    "giroscopioY": 0.001,
    "giroscopioZ": 0
  },
  "correlacoes": {
    "acelerometroX": 0.287,
    "acelerometroY": -0.445,
    "acelerometroZ": 0.252,
    "giroscopioX": 0.141,
    "giroscopioY": 0.008,
    "giroscopioZ": 0.034
  },
  "r2": 0.314,
  "media_erro_quadratico": 356.84,
  "projecao_5_horas": {
    "2025-06-09T22:35:00-03:00": 66.9,
    "2025-06-09T23:35:00-03:00": 66.9
  }
}
```

---

## 📁 Como Executar Localmente

```bash
git clone https://github.com/seuusuario/api-python-petdex.git
cd api-python-petdex
python -m venv .venv
source .venv/bin/activate  # ou .venv\Scripts\activate no Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## ✅ Status

🟢 Em produção — a API está em funcionamento e integrada com a PetDex.

---

Se você quiser contribuir com melhorias ou usar parte da lógica estatística, fique à vontade para clonar o repositório ✨.
