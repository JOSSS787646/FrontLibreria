// src/services/libroAutorService.js
import { apiLibros } from './axios';

// Obtener todos los autores
export const obtenerAutores = () => apiLibros.get('/LibroAutor');


// Obtener autor por GUID
export const obtenerAutorPorId = (id) => apiLibros.get(`LibroAutor/${id}`);

// Crear un nuevo autor
export const crearAutor = (nombre, apellido, fechaNacimiento) => 
  apiLibros.post('/LibroAutor', {
    nombre,
    apellido,
    fechaNacimiento, // debe ser una cadena ISO como "2025-06-25T18:28:35.067Z"
  });

// Eliminar un autor por GUID
export const eliminarAutor = (id) => apiLibros.delete(`LibroAutor/${id}`);

// Buscar autor por nombre completo (ya convertido a minúsculas y sin espacios adicionales)
export const buscarAutorPorNombre = (nombreCompleto) => 
  apiLibros.get(`LibroAutor/nombre`, {
    params: { nombreCompleto },
  });