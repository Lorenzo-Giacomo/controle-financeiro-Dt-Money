import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header/index";
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider  } from './hooks/useTransactions';

Modal.setAppElement('#root') // acessibilidade

export function App() {
  // todas essas funcionalidedes e estados não vão dentro de um componente específico pq pode ser aproveitado para outros componentes
  const [isNewTransacitionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  } 
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      {/* é possível passar funções entre componentes. OnOpenNewTransacitionModal foi definido no tipo do header*/}
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      {/* o botão de nova transação se encontra dentro do header. É necessário passar a função de abrir para q ele funcione. */}
      <Dashboard />
      <NewTransactionModal 
        // no modal temos que passar as funções que serão utlizadas dentro do componente. 
        isOpen={isNewTransacitionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle/>
    </TransactionsProvider>
  );
}

