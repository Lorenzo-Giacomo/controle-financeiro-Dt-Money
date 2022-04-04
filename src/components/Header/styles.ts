import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem; // rem é o valor dos pixels por padrão 16px
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    //aplica uma transição leve toda vez q a propriedade for alterada
    transition: filter 0.2s;

    &:hover {
      // aplica um filtro de luminosidade de todos os elementos dentro de button
      filter: brightness(0.9);
    }
  }
`;
