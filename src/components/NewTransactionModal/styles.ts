import styled from "styled-components";
import  { darken, transparentize } from "polished"
// transforma o container em formulário atraves do styled.form
export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    // todo input q antes tiver acima dele um input
    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }

  }

`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

`;

interface RadioBoxProps {
  isActive: boolean
  // quero mudar a cor de fundo quando estiver true
  activeColor: 'green' | 'red' // definir quais valores pode receber, não qualquer string
}

// precisamos fazer um map nas cores para identificar quais cores estão ativas no momento.
const colors = {
  green: '#33cc95',
  red: '#e52e40'
}

export const RadioBox = styled.button<RadioBoxProps>` // passamos as propriedades pro styled dessa maneira
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    // toda vez q passamos uma função para uma interpolação, é passada todas as propriedades do componente
    background: ${(props) => 
      props.isActive ? transparentize(0.9, colors[props.activeColor]) : 'transparent'
    };
    // se isActive retornar true, então define a cor do index daquela indicada pela propriedade. Faz uma verificação na const q salvamos as cores e procura a que corresponder com a passada pela prop.

    display: flex;
    align-items: center;
    justify-content: center;

    transition: border-color 0.2s;
    &:hover {
      border-color: ${darken(0.1, '#d7d7d7')}; // função vinda do polished para escurecer elementos específicos. Pois com o filter altera o elemento inteiro
    }

    img {
     width : 20px;
     height: 20px;
    }

    span {
      display: inline-block; // fica mais fácil de dar margem
      margin-left: 1rem;
      font-size: 1rem;
      color: var(--text-title);
    }
`