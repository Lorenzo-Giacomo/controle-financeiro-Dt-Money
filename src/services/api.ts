import axios from "axios";

export const api = axios.create({
  // rota padrão q se repete
  baseURL: 'http://localhost:3000/api'
})