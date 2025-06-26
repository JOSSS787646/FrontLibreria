// src/services/libroService.js
import { api } from '../api/axios'; // ✅ Usa importación nombrada

// Obtener todos los libros
export const obtenerLibros = () => api.get('/LibroMaterial');

// Obtener un libro por ID
export const obtenerLibroPorId = (id) => api.get(`/LibroMaterial/${id}`);


//crear libro
export const crearLibro = ({ titulo, fechaPublicacion }) =>
  api.post('/LibroMaterial', {
    Titulo: titulo,
    FechaPublicacion: fechaPublicacion,
    AutorLibro: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  });

// Actualizar un libro existente por ID
export const actualizarLibro = (id, data) => api.put(`/LibroMaterial/${id}`, data);

// Eliminar un libro por ID
export const eliminarLibro = (id) => api.delete(`/LibroMaterial/${id}`);

