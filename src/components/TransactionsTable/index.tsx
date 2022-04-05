import { useEffect } from "react";
import { Container } from "./styles";

export function TransactionsTable() {

  // pensar em uma possível rota que poderá ser trocada um dia quando o backend ficar pronto
  useEffect(()=>{
    fetch('http://localhost:3000/api/transactions')
    .then(response => response.json())
    .then(data => console.log(data))
  }, [])

  return (
    <Container>
      {/* pensar na table como um dos itens que tem dentro do dashboard */}
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposity">R$12.000,00</td>
            <td>Desenvolvimentos</td>
            <td>01/04/2022</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$2.220,00</td>
            <td>Casa</td>
            <td>04/04/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}