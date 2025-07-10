// src/services/axios.js
import axios from 'axios';



//API PERTENECIENTE aA LOGIN
const apiAutentificacion = axios.create({
  //baseURL: 'https://microservicio-autor.onrender.com/api',
   baseURL: 'https://microservicioautentificacionatlaslibreri.onrender.com/api',
  //baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



//API PERTENECIENTE A LIBROS
const api = axios.create({
  //baseURL: 'https://microserviciolibro-hws3.onrender.com/api',
    baseURL: 'https://localhost/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

//API PERTENECIENTE A  AUTORES
const apiLibros = axios.create({
  //baseURL: 'https://microservicio-autor.onrender.com/api',
   baseURL: 'http://autorapi.somee.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Exportación nombrada
export { api, apiLibros, apiAutentificacion };
