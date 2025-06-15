<p align="center">
  <img src="../docs/img/capa-web.svg" alt="Capa do Projeto" width="100%" />
</p>

# PETDEX WEB

Bem-vindo ao repositório oficial do **PetDex Web**, a versão para navegadores da plataforma PetDex. Este projeto foi desenvolvido para oferecer uma experiência de usuário fluida e acessível, permitindo que os donos de animais de estimação monitorem a saúde e a localização de seus pets de forma conveniente e intuitiva, diretamente do seu navegador preferido.

## ✨ Destaques do Projeto

O PetDex Web foi construído utilizando as mais modernas tecnologias de desenvolvimento web para garantir uma aplicação robusta, rápida e escalável.

### 🚀 Desenvolvido com Next.js

O coração do nosso projeto é o **Next.js**, um framework React que nos permite criar aplicações web de alto desempenho. Com o Next.js, garantimos:
-   **Renderização Otimizada:** Páginas que carregam mais rápido, tanto no servidor (SSR) quanto no cliente (CSR).
-   **SEO-Friendly:** Estrutura otimizada para os motores de busca, garantindo que as informações do seu pet sejam facilmente encontradas.
-   **Roteamento Simplificado:** Navegação intuitiva e performática entre as diferentes seções da plataforma.

### 📱 Design Responsivo para Mobile e Web

Com o uso do **Tailwind CSS**, o PetDex Web oferece uma interface totalmente responsiva que se adapta perfeitamente a qualquer tamanho de tela. Seja no seu computador, tablet ou smartphone, a experiência do usuário é sempre a melhor possível, com todos os elementos ajustados para o seu dispositivo.

### 📊 Funcionalidades Principais

Através da nossa plataforma web, o usuário tem acesso a um painel completo com informações vitais sobre seu animal de estimação:

-   ❤️ **Monitoramento Cardíaco:** Visualize em tempo real os dados de batimento cardíaco do seu pet, apresentados de forma clara e compreensível.
-   📈 **Análises de Saúde:** Tenha acesso a gráficos e estatísticas detalhadas sobre a saúde do seu animal, permitindo um acompanhamento preciso e a identificação de tendências.
-   🗺️ **Localização em Tempo Real:** Saiba sempre onde seu pet está com o nosso mapa interativo, que mostra a localização exata do animal.

## 🛠️ Tecnologias e Bibliotecas

Para entregar uma experiência rica e interativa, utilizamos um conjunto de bibliotecas modernas e eficientes:

-   **Framework Principal:** [Next.js](https://nextjs.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Visualização de Dados:** [Chart.js](https://www.chartjs.org/) e [Recharts](https://recharts.org/) para a criação de gráficos dinâmicos e informativos.
-   **Mapas:** [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) para a integração de mapas e geolocalização.
-   **Ícones:** [Font Awesome](https://fontawesome.com/) para uma iconografia rica e consistente.
-   **Requisições HTTP:** [Axios](https://axios-http.com/) para uma comunicação eficiente com a nossa API.

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo:

### **1. Pré-requisitos**

Antes de começar, você precisará de uma chave de API do Google Maps para que a funcionalidade de localização funcione corretamente no emulador.

1.  **Obtenha uma Chave de API:** Acesse o [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview) e crie ou selecione um projeto. Ative a **Maps SDK for Android** e/ou **Maps SDK for iOS** e gere uma chave de API.

2.  **Configure a Variável de Ambiente:**
    -   Na raiz do projeto, crie um arquivo chamado `.env`.
    -   Dentro deste arquivo, adicione a seguinte linha, substituindo `SUA_CHAVE_AQUI` pela chave que você gerou:
        ```
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
        ```
### **2. Instalação e Execução**


1.  **Clone o repositório:**
2.  **Acesse o diretório do projeto:**
    ```bash
    cd petdex-web
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
-   `npm run build`: Compila a aplicação para produção.
-   `npm run start`: Inicia um servidor de produção.
-   `npm run lint`: Executa o linter para verificar a qualidade do código.

---

Agradecemos por seu interesse no PetDex Web! Estamos comprometidos em fornecer a melhor ferramenta para o cuidado e monitoramento dos seus animais de estimação.