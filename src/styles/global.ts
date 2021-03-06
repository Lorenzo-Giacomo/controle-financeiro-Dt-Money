import { createGlobalStyle } from "styled-components";

// exporta um estilo como componente reutilizável em várias partes da aplicação. No caso é o estilo global

export const GlobalStyle = createGlobalStyle`
  :root {
    // definir variáveis globais que serão acessados pelo var()
    --background: #f0f2f5;
    --red: #e52e40;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --green: #33cc95;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #ffffff
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    // com @media é possível definir estilos que serão aplicados com a responsividade
    @media (max-width: 1000px) {
      font-size: 93.75%; // 15px
      // diminuir as fontes para melhor visualização em dispositivos móveis
    }

    @media (max-width: 720px) {
      // percentual permite alterar tamanhos de acordo com a pre definição do usuário.
      font-size: 87.5%; // 14px
      // REM = 1rem = font-size= 16px
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  // sobrescreve a fonte de todos os elementos
  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  // com elementos desabilitados deixa mais claro e muda cursor para não permitido
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed; // sempre ficará ocupando a tela toda sem scroll
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    // position relative necessário no container pq precisaremos definir alguns elementos como o icone de fechar como absolutos
    border-radius: 0.25rem;
  }

  .react-modal-close {
    position: absolute;
    // é como tivesse fazendo um padding da borda
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  }


  
`