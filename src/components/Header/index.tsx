import { Container, Content } from './styles'
import logoImg from '../../assets/logo.svg'

interface HeaderProps {
  // quando um componente recebe uma função, é bom começar com on
  onOpenNewTransactionModal: () => void
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

  return (
    <Container >
      <Content>
      <img src={logoImg} alt="dt money" />
      <button 
        type="button" 
        // pegaremos essa função de abrir o modal que vêm de outro componente pegando pela propriedade de parâmetro,
        onClick={onOpenNewTransactionModal}
      >
        Nova transação
      </button>
      </Content>
    </Container>
  )
}