import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string
}

// interface TransactionInput {
//   title: string,
//   type: string,
//   category: string,
//   amount: number
// }

// o transactionInput vai herdar todos os dados do Transaction omitindo os campos especificados
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
//também temos o pick que conseguimos especificar os campos que queremos
// type TransactionInput = Pick<Transaction, 'amount' | 'category' | 'title' | 'type' >

// para declarar que o componente TransactionsProvider recebe conteúdos dentro dele declaramos uma interface
interface TransactionsProviderProps {
  children: ReactNode // aceita qualquer tipo de conteúdo válido para o react
}

interface TransactionContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
  // precisamos indicar que as funções são async que por padrão retornam uma promise
}

// export const TransactionsContext = createContext<Transaction[]>([])
// antigamente utilizávamos dessa maneira pois só passávamos para o provider no return uma propriedade com um elemento só, com as listas de transaçõos. Agora migramos a criação de uma transação para dentro de um contexto, e precisamos passar essa função no context. Então, como não é só mais uma lista com um elemento, temos dois elementos sendo enviados para o contexto no value.

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData // dizemos que está de acordo com os tipos que definimos
)

// children é tudo oq está entre os componentes
export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(()=>{
  
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))

  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', { ...transactionInput, 
    createdAt: new Date()
    // inserir no input o objeto createdAt, pois não está vindo dos inputs
    })
    const { transaction } = response.data
    // colocar a transação dentro do estado de transações. Fazemos isso para manipularmos e enviarmos extamente os dados que serão cadastrados no bd.

    setTransactions([
      ...transactions,
      transaction
    ])
    // usando o conceito de imutabilidade, sempre que quero adicionar uma nova informação num vetor, você sempre copia as informações que estão lá dentro e adiciona oq quer, no final ou começo.

  }

  //retornar o que estava utilizando antes no App. Substituir pelo TransactionProvider que eu criei.
  // esses dados são específicos desse contexto que eu criei. Se mantivesse como estava antes, recuperaria informações da const
  return (
      // preciso retornar uma variável com múltiplos valores, colocamos entre { }. Ao transformarmos em objeto, precisamos ajustar as interfaces dos tipos que seão recebidos no contexto.

    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )

}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}