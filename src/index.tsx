import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer } from 'miragejs'
// definir rotas dentro do createServer
createServer({
  routes() {
    // indicar que todas chamadas api vão estar a partir do endereço especificado no fetch do useEffect
    this.namespace ='api';
    // especificar o caminho
    this.get('/transactions', () => {
      //pensar em alguns campos que seriam retornados da api
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount:400,
          type:'deposit',
          category: 'Food',
          createdAt: new Date(),
        }
      ]
    })

  }
}) 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

