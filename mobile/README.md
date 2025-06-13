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

## 🛠️ Tecnologias e Bibliotecas

Para construir uma experiência mobile rica e confiável, utilizamos um conjunto de bibliotecas essenciais no ecossistema React Native:

-   **Framework Principal:** [React Native](https://reactnative.dev/)
-   **Navegação:** [React Navigation](https://reactnavigation.org/) para uma navegação fluida e intuitiva entre as telas do app.
-   **Visualização de Dados:** Bibliotecas como [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit) para a criação de gráficos informativos e interativos.
-   **Mapas:** [React Native Maps](https://github.com/react-native-maps/react-native-maps) para a integração de mapas nativos e geolocalização.
-   **Ícones:** [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) para uma vasta gama de ícones customizáveis.
-   **Requisições HTTP:** [Axios](https://axios-http.com/) para uma comunicação robusta e segura com a API do PetDex.

## 🚀 Começando

Para executar este projeto localmente, certifique-se de ter o [ambiente de desenvolvimento React Native configurado](https://reactnative.dev/docs/environment-setup) e siga os passos abaixo:

1.  **Clone o repositório:**
2.  **Acesse o diretório do projeto:**
    ```bash
    cd petdex-mobile
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Instale os Pods (para iOS):**
    ```bash
    cd ios && pod install && cd ..
    ```
5.  **Inicie o Metro Bundler:**
    ```bash
    npx react-native start
    ```
6.  **Execute o aplicativo (em outro terminal):**
    -   **Para Android:**
        ```bash
        npx react-native run-android
        ```
    -   **Para iOS:**
        ```bash
        npx react-native run-ios
        ```

---

Agradecemos por seu interesse no PetDex Mobile! Nosso objetivo é oferecer a melhor ferramenta para que você possa cuidar do seu pet com segurança e tranquilidade.