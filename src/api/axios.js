// src/services/axios.js
import axios from 'axios';

//API PERTENECIENTE A LIBROS
const api = axios.create({
  baseURL: 'https://microserviciolibro-hws3.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

//API PERTENECIENTE A  AUTORES
const apiLibros = axios.create({
  baseURL: 'https://microservicio-autor.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Exportación nombrada
export { api, apiLibros };
