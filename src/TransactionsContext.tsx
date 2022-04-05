import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string
}

// para declarar que o componente TransactionsProvider recebe conteúdos dentro dele declaramos uma interface
interface TransactionsProviderProps {
  children: ReactNode // aceita qualquer tipo de conteúdo válido para o react
}


export const TransactionsContext = createContext<Transaction[]>([])

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(()=>{
  
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions))

  }, [])

  //retornar o que estava utilizando antes no App. Substituir pelo TransactionProvider que eu criei.
  // esses dados são específicos desse contexto que eu criei. Se mantivesse como estava antes, recuperaria informações da const
  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  )

}