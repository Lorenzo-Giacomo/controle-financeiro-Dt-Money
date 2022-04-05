import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'
// definir rotas dentro do createServer
createServer({
  models: {
    transaction: Model
  },
  // definir como base alguns dados pré definidos 
  seeds(server) {
    server.db.loadData({
      transactions : [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-04-05 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 2000,
          createdAt: new Date('2022-02-04 11:00:00')
        }
      ]
    })
  },

  routes() {
    // indicar que todas chamadas api vão estar a partir do endereço especificado no fetch do useEffect
    this.namespace ='api';
    // especificar o caminho
    this.get('/transactions', () => {
      return this.schema.all('transaction')
      //retorna todas as transações. De início retorna 0

      //pensar em alguns campos que seriam retornados da api
      // forma antiga com dados ficticios:
      // return [
      //   {
      //     id: 1,
      //     title: 'Transaction 1',
      //     amount:400,
      //     type:'deposit',
      //     category: 'Food',
      //     createdAt: new Date(),
      //   }
      // ]
    })
    // request são os dados que virão, que estão sendo enviados dentro da função que cadastra
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
      // conecta no bd, especifica qual o model que está inserindo e os dados que querem passar vindos da req
    })

  }
}) 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

