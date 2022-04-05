import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void  
}

//pega as propriedades por desestruturação
export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){

  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')

  // podemos definir inicialmente o estado com um valor e trocar depois com uma () => {} no onClick do elemento
  const [type, setType] = useState('deposit')

  // função para que toda vez q o formulário for enviado através de um clique de um botão, executar a função:
  function handleCreateNewTransaction(event: FormEvent) {
    //por padrão o onSubmit passa tudo da função por um event. e definimos a tipagem pelo FormEvent vindo do react
    event.preventDefault()
    const data = ({
      title,
      value,
      category,
      type
    })

    api.post('transactions', data) // preciso criar no miragejs uma rota de post
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
            value={value}
            onChange={event => setValue(Number(event.target.value))} // por padrão o event.target transforma strings apenas
          />

          <TransactionTypeContainer>
            {/* // precisamos ter alguma forma de ver se o botão foi clicado ou não. Uma das formas:
            className={ type == 'deposit' ?? 'active' : ''}
            Mas um jeito melhor é transformar o button em um componente do styled components
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