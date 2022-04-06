import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';


interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void  
}

//pega as propriedades passadas no App por desestruturação
export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
  const {createTransaction} = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  // podemos definir inicialmente o estado com um valor e trocar depois com uma () => {} no onClick do elemento
  const [type, setType] = useState('deposit')

  // função para que toda vez q o formulário for enviado através de um clique de um botão, executar a função:
  // function handleCreateNewTransaction(event: FormEvent) {
  //   //por padrão o onSubmit passa tudo da função por um event. e definimos a tipagem pelo FormEvent vindo do react

  //   // tiramos essa função de criar transação de dentro do modal e enviamos para um contexto pois precisaremos recuperar os dados e listá-los na tabela.
  //   event.preventDefault()
  //   const data = ({
  //     title,
  //     value,
  //     category,
  //     type
  //   })

  //   api.post('transactions', data) // preciso criar no miragejs uma rota de post
  // }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    // chama função que cria a transação dentro do contexto
    await createTransaction({
      title,
      amount,
      category,
      type
      // falta o createdAt, por isso criamos no contexto ou no mirage
    })
    
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')

    // precisamos fechar o modal somente se a criação der certo. Pra isso precisamos esperar que a createTransaction aconteça. E pra isso precisamos transaformar as funções em async
    onRequestClose()
  }

  return (
    <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        // classe para alterar o conteúdo por trás do modal
        overlayClassName="react-modal-overlay"
        // classe para alterar o conteúdo do modal em si
        className="react-modal-content"
      >
        <button 
          type="button" 
          onClick={onRequestClose} className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          {/* container como form no styled-components */}

          <h2>Cadastrar transação</h2>
          <input 
            placeholder='Título'
            value={title}
            //
            onChange={event => setTitle(event.target.value)}
          />
          <input 
            type='number'
            placeholder='Valor'
            value={amount}
            onChange={event => setAmount(Number(event.target.value))} 
            // por padrão o event.target transforma strings apenas
          />

          <TransactionTypeContainer>
            {/* // precisamos ter alguma forma de ver se o botão foi clicado ou não. Uma das formas:
            className={ type == 'deposit' ?? 'active' : ''}
            Mas um jeito melhor é transformar o button em um componente do styled components. Que receberá as propriedades definidas, permitindo implementar funcionalidades especificas para cada caso.
            */}
            
            <RadioBox 
              type='button'
              onClick={() => {setType('deposit')}}
              isActive={type === 'deposit'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type='button'
              onClick={() => {setType('withdraw')}}
              isActive={type === 'withdraw'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input 
            placeholder='Categoria'
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
          <button type="submit">
            Cadastrar
          </button>
        </Container>
    </Modal>
  )
}