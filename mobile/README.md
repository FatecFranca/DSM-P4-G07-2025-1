<p align="center">
  <img src="../docs/img/capa-mobile.svg" alt="Capa do Projeto Mobile" width="100%" />
</p>

# PETDEX Mobile

Bem-vindo ao repositório do **PetDex Mobile**, o aplicativo para iOS e Android da plataforma PetDex. Desenvolvido para oferecer aos donos de pets uma maneira prática e eficiente de cuidar de seus companheiros, este aplicativo coloca o monitoramento de saúde e a segurança do seu animal de estimação na palma da sua mão.

## ✨ Destaques do Projeto

O PetDex Mobile foi construído com foco em performance e usabilidade, utilizando tecnologias de ponta para o desenvolvimento de aplicativos móveis.

### ⚛️ Desenvolvido com React Native

O núcleo do nosso aplicativo é o **React Native**, o que nos permite entregar uma experiência nativa de alta qualidade tanto para usuários de **iOS** quanto de **Android** a partir de um único código-base. Isso garante:
-   **Performance Nativa:** A interface do usuário é renderizada usando componentes nativos, proporcionando uma experiência fluida e responsiva.
-   **Desenvolvimento Ágil:** Manutenção e evolução mais rápidas do aplicativo para ambas as plataformas.
-   **Acesso a Recursos Nativos:** Integração total com as funcionalidades do dispositivo, como GPS e notificações.

### 📊 Funcionalidades na Palma da Sua Mão

O aplicativo mobile oferece acesso rápido e direto às informações mais importantes sobre o seu pet, onde quer que você esteja:

-   ❤️ **Monitoramento Cardíaco:** Acompanhe os batimentos cardíacos do seu pet em tempo real através de uma interface simples e intuitiva.
-   📈 **Análises de Saúde:** Visualize gráficos e dados estatísticos sobre a saúde do seu animal, ajudando no acompanhamento de longo prazo e na detecção de qualquer anormalidade.
-   🗺️ **Localização em Tempo Real:** Tenha a tranquilidade de saber onde seu pet está a qualquer momento, com um mapa preciso que exibe sua localização ao vivo.

<p align="center">
  <img src="../docs/img/mobile/mobile-home.gif" alt="Tela Inicial do App" width="250px" />
</p>
<p align="center">
  <em><b>Tela Inicial:</b> Tenha acesso rápido à última localização registrada e ao batimento cardíaco mais recente do seu pet. Um gráfico inferior exibe a média dos batimentos das últimas cinco horas.</em>
</p>

---

<p align="center">
  <img src="../docs/img/mobile/mobile-localizacao.gif" alt="Tela de Localização" width="250px" />
</p>
<p align="center">
  <em><b>Localização em Detalhes:</b> Visualize o endereço exato onde seu animal de estimação está localizado no mapa.</em>
</p>

---

<p align="center">
  <img src="../docs/img/mobile/mobile-saude.gif" alt="Tela de Saúde" width="250px" />
</p>
<p align="center">
  <em><b>Monitoramento de Saúde:</b> Acesse um dashboard completo com a média de batimentos dos últimos cinco dias e análises estatísticas detalhadas, incluindo média, moda, mediana, desvio padrão, assimetria e curtose da frequência cardíaca.</em>
</p>

---

### **Análises Avançadas no App**

O aplicativo também conta com ferramentas de análise de dados para previsões e insights sobre a saúde do seu pet.

<p align="center">
  <img src="../docs/img/mobile/mobile-saude-media-por-data.gif" alt="Consulta de Média por Data" width="250px" />
  <img src="../docs/img/mobile/mobile-saude-probabilidade.gif" alt="Cálculo de Probabilidade" width="250px" />
</p>
<p align="center">
  <em><b>Consultas Específicas:</b> Verifique a média de batimentos em uma data específica e calcule a probabilidade de uma determinada frequência cardíaca ocorrer.</em>
</p>

---

<p align="center">
  <img src="../docs/img/mobile/mobile-previsao-batimento.gif" alt="Previsão de Batimento Cardíaco" width="250px" />
</p>
<p align="center">
  <em><b>Previsão de Frequência Cardíaca:</b> Utilize a análise de regressão e correlação, que cruza os dados de frequência cardíaca com os de movimento (acelerômetro), para prever os batimentos futuros do animal.</em>
</p>

## 🛠️ Tecnologias e Bibliotecas

Para construir uma experiência mobile rica e confiável, utilizamos um conjunto de bibliotecas essenciais no ecossistema React Native:

-   **Framework Principal:** [React Native](https://reactnative.dev/)
-   **Navegação:** [React Navigation](https://reactnavigation.org/) para uma navegação fluida e intuitiva entre as telas do app.
-   **Visualização de Dados:** Bibliotecas como [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit) para a criação de gráficos informativos e interativos.
-   **Mapas:** [React Native Maps](https://github.com/react-native-maps/react-native-maps) para a integração de mapas nativos e geolocalização.
-   **Ícones:** [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) para uma vasta gama de ícones customizáveis.
-   **Requisições HTTP:** [Axios](https://axios-http.com/) para uma comunicação robusta e segura com a API do PetDex.

## 🚀 Começando

Para executar este projeto localmente, certifique-se de ter o [ambiente de desenvolvimento React Native configurado](https://reactnative.dev/docs/environment-setup) e siga os passos abaixo.

### **1. Pré-requisitos**

Antes de começar, você precisará de uma chave de API do Google Maps para que a funcionalidade de localização funcione corretamente no emulador.

1.  **Obtenha uma Chave de API:** Acesse o [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview) e crie ou selecione um projeto. Ative a **Maps SDK for Android** e/ou **Maps SDK for iOS** e gere uma chave de API.

2.  **Configure a Variável de Ambiente:**
    -   Na raiz do projeto, crie um arquivo chamado `.env`.
    -   Dentro deste arquivo, adicione a seguinte linha, substituindo `SUA_CHAVE_AQUI` pela chave que você gerou:
        ```
        GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
        ```
    - Além da chave de API do Google Maps é necessário adicionar duas variáveis de ambiente para a utilização das APIs do projeto. Copie e cole o arquivo abaixo no seu arquivo .env mantendo a chave do Maps.
        ```
        API_URL=https://petdex-api-d75e.onrender.com
        API_ESTATISTICA_URL=https://petdex-api-estatistica.onrender.com
        ```

### **2. Instalação e Execução**

Com o ambiente configurado, siga estes passos para rodar o aplicativo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/FatecFranca/DSM-P4-G07-2025-1.git
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd mobile
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o Metro Bundler:**
    ```bash
    npx react-native start
    ```

6.  **Execute o aplicativo (em outro terminal):**
    -   **Para Android:**
        ```bash
        npx react-native run-android
        ```

---

Agradecemos por seu interesse no PetDex Mobile! Nosso objetivo é oferecer a melhor ferramenta para que você possa cuidar do seu pet com segurança e tranquilidade.