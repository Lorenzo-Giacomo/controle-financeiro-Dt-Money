import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
  // entre chaves pq temos um objeto vindo do contexto
  const {transactions} = useTransactions()
  // toda vez q um contexto muda, o código recebe os novos valores sendo atualizados

  // forma de calcular o total de entradas e saídas e totais finais:
  // const totalDeposits = transactions.reduce((acc, transaction) => {
  //   // definir condição que realizará o cálculo
  //   if (transaction.type === 'deposit') {
  //     return acc + transaction.amount
  //   }
  //   return acc
  // }, 0)

  // forma que serve para entradas, saídas e total:
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount
    }
    return acc
  }, {
  // indicamos quais os valores iniciais que serão somados
    deposits: 0,
    withdraws: 0,
    total: 0
  } )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- 
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.withdraws)}
        
        </strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}