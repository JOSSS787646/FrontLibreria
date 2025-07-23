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
    baseURL: 'https://microserviciolibrotoken.somee.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Para libros:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenLibro');  // <== token específico para libros
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token enviado para Libros:", token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API PERTENECIENTE A AUTORES
const apiLibros = axios.create({
  baseURL: 'https://microservicioautortoken.somee.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para autores (CORREGIDO)
apiLibros.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenAutor'); // ✅ Token correcto
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token Autor enviado:", token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// Exportación nombrada
export { api, apiLibros, apiAutentificacion };
