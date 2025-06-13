<p align="center">
  <img src="docs/img/capa-dex.svg" alt="Capa do Projeto" width="100%" />
</p>

# PetDex

Repositório do **Grupo 07** do Projeto Interdisciplinar do **4º semestre** do curso de **Desenvolvimento de Software Multiplataforma - DSM** (Turma 2025/1).

## 👨‍💻 Integrantes

-   **Felipe Avelino Pedaes**
-   **Gabriel Resende Spirlandelli**
-   **Henrique Almeida Florentino**
-   **Luiz Felipe Vieira Soares**

## 🔗 Acesso ao Projeto

* **💻 Aplicação Web:** [https://petdex-puce.vercel.app](https://petdex-puce.vercel.app/welcome)
* **🐍 Documentação da API de Análise (Python):** [https://api-petdex-estatistica.onrender.com/docs](https://api-petdex-estatistica.onrender.com/docs)
* **☕ Documentação da API Principal (Java):** [https://dsm-p4-g07-2025-7.onrender.com/swagger](https://dsm-p4-g07-2025-7.onrender.com/swagger)


## 📖 Sobre o Projeto

O **PetDex** é uma solução completa para o monitoramento da saúde e segurança de pets. Desenvolvemos uma **coleira inteligente** equipada com sensores que coletam dados vitais, como **batimentos cardíacos**, e permitem a **localização do animal via GPS**.

As informações são enviadas para um sistema integrado, acessível através de uma **plataforma web** e um **aplicativo móvel**, onde o dono pode acompanhar a saúde e a localização do seu pet em tempo real. O projeto também inclui uma API de análise de dados que fornece estatísticas, correlações e até previsões sobre a frequência cardíaca do animal com base em seus movimentos.

Para a validação do projeto, foi criado um protótipo 3D e realizamos testes de coleta de dados reais com um cachorro chamado Uno.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com uma arquitetura de microsserviços e tecnologias modernas, divididas nas seguintes frentes:

### **Hardware (IoT)**
* **Microcontrolador:** ESP32 S3 Zero
* **Sensores:** GPS (NEO6MV2), Monitor Cardíaco (MAX30102), Acelerômetro e Giroscópio (MPU6050)
* **Prototipagem:** Modelo 3D para o case da coleira

### **Backend**
* **API Principal (Java/Spring Boot):** Responsável pela comunicação com o banco de dados e o hardware. Utiliza **Swagger** para documentação.
* **API de Análise (Python/Flask):** Realiza análises estatísticas (média, moda, mediana), regressão/correlação de dados e previsão de frequência cardíaca.
* **Banco de Dados:** MongoDB

### **Frontend**
* **Aplicação Web:** Next.JS
* **Aplicativo Móvel:** React Native
---

> Projeto desenvolvido como parte das atividades acadêmicas da **FATEC** – Faculdade de Tecnologia.
