<p align="center">
  <img src="../docs/img/capa-python.svg" alt="Capa do Projeto" width="100%" />
</p>

# PetDex - API de Análise de Dados

Bem-vindo à API de Análise de Dados do PetDex. Esta API é o cérebro analítico por trás da nossa plataforma, responsável por processar dados de saúde dos pets para fornecer insights estatísticos valiosos.

Construída em Python, ela oferece um conjunto de endpoints de alta performance para realizar cálculos complexos, desde estatísticas básicas até modelos preditivos. Uma característica fundamental desta API é sua **integração direta com a API principal (desenvolvida em Java)**, garantindo que todas as análises sejam executadas com os dados mais recentes de movimentação e saúde do animal.

---

## 📊 Funcionalidades Principais

A API oferece uma gama de análises estatísticas essenciais para o monitoramento da saúde do pet:

* **Estatísticas Descritivas:**
    * Calcula a **média**, **mediana** e **moda** dos dados de batimento cardíaco, fornecendo um resumo claro da saúde cardiovascular do pet.

* **Análise de Correlação e Regressão:**
    * Executa análises de **regressão linear** e **correlação** para entender a relação entre os níveis de atividade (movimento) e o batimento cardíaco do animal. Isso ajuda a identificar padrões e a saúde geral do pet.

* **Cálculos de Probabilidade:**
    * Realiza projeções de **probabilidade** para estimar as chances de os batimentos cardíacos do animal estarem dentro ou fora de uma faixa considerada saudável em períodos futuros.

---

## 📡 Endpoints

A API está hospedada na plataforma Render e pode ser acessada através do link:

🔗 [https://api-petdex-estatistica.onrender.com](https://api-petdex-estatistica.onrender.com)

A documentação interativa da API, feita com Swagger (OpenAPI), está disponível em:

📘 [https://api-petdex-estatistica.onrender.com/docs](https://api-petdex-estatistica.onrender.com/docs)

---

## 🛠️ Tecnologias e Bibliotecas

Para garantir performance, precisão e escalabilidade, utilizamos um conjunto de bibliotecas Python de ponta, conforme listado em nosso `requirements.txt`:

* **Framework da API:**
    * **FastAPI:** Para a construção de uma API moderna, rápida e assíncrona.
    * **Uvicorn:** Como o servidor ASGI para executar a aplicação FastAPI.

* **Comunicação e Validação de Dados:**
    * **HTTPX:** Para realizar chamadas assíncronas eficientes à API Java, garantindo que os dados estejam sempre atualizados.
    * **Pydantic:** Para validação robusta de dados e gerenciamento de configurações.
    * **python-multipart:** Para o processamento de formulários.

* **Análise de Dados e Computação Científica:**
    * **Pandas:** Para manipulação e estruturação de dados de forma eficiente.
    * **NumPy:** A base para computação numérica, usada em praticamente todos os cálculos.
    * **SciPy:** Para cálculos estatísticos avançados, como moda e outras funções científicas.
    * **Scikit-learn:** Para a implementação dos modelos de regressão e outras tarefas de machine learning.

* **Banco de Dados:**
    * **SQLAlchemy:** Utilizada para a interação com o banco de dados e modelagem de dados, se necessário.

---

## 🚀 Como Começar

Para executar esta API em seu ambiente local, siga os passos abaixo.

1.  **Clone o repositório:**


2.  **Crie e ative um ambiente virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows, use `venv\Scripts\activate`
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Execute a API:**
    ```bash
    uvicorn main:app --reload
    ```

A API estará disponível em `http://127.0.0.1:8000`. Você pode acessar a documentação interativa (gerada automaticamente pelo FastAPI) em `http://127.0.0.1:8000/docs`.