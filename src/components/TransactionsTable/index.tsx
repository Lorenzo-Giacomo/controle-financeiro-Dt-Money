import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

// migrou para o contexto
// interface Transaction {
//   id: number,
//   title: string,
//   type: string,
//   category: string,
//   amount: number,
//   createdAt: string
// }

export function TransactionsTable() {
  const {transactions} = useTransactions() // pegar as informações de dentro do contexto

  // tiramos esses códigos e o levamos para um contexto
  // const [transactions, setTransactions] = useState<Transaction[]>([])

  // useEffect(()=>{
  //   // fetch('http://localhost:3000/api/transactions')
  //   // .then(response => response.json())
  //   // ao invés do fetch usamos o api.method somente com a rota e não é necessário mais enviar resposta pois já traz automaticamente como json
    
  //   api.get('transactions')
  //   .then(response => setTransactions(response.data.transactions))

  // }, [])


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
        {transactions.map(transaction => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {/* formatar números e datas */}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR', {
                }).format(
                  new Date(transaction.createdAt)
                )}
                
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </Container>
  )
}