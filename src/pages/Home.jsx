import React, { useEffect, useState } from 'react';
import { obtenerLibros, obtenerLibroPorId, eliminarLibro } from '../api/libroService';
import LibroCard from '../components/LibroCard';
import Navbar from '../components/Navbar';
import AgregarLibroModal from '../components/AgregarLibroModal';
import EditarLibroModal from '../components/EditarLibroModal';
import ConfirmarEliminarModal from '../components/ConfirmarEliminarModal';
import 'animate.css';

export default function Home() {
  const [libros, setLibros] = useState([]);
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null); // Para editar

  const [mostrarConfirmarEliminar, setMostrarConfirmarEliminar] = useState(false);
  const [libroParaEliminar, setLibroParaEliminar] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  // Carga todos los libros desde la API
  const cargarLibros = () => {
    obtenerLibros()
      .then((res) => setLibros(res.data))
      .catch((err) => console.error('Error al obtener libros:', err));
  };

  // Función para manejar búsqueda por texto o por ID
  const manejarBusqueda = (texto, esId = false) => {
    if (!texto) {
      // Si el campo está vacío, recarga todos los libros
      cargarLibros();
      setSearchQuery('');
      return;
    }

    if (esId) {
      // Buscar por ID en API
      obtenerLibroPorId(texto)
        .then(res => {
          setLibros([res.data]); // Mostrar solo ese libro
        })
        .catch(err => {
          console.error('Error al buscar libro por ID:', err);
          setLibros([]); // Vaciar lista si no se encuentra
        });
    } else {
      // Búsqueda por nombre, filtrado local
      setSearchQuery(texto);
    }
  };

  // Abrir modal editar con libro seleccionado
  const handleEditarLibro = (id) => {
    const libroEncontrado = libros.find((libro) => libro.libreriaMaterialId === id);
    if (libroEncontrado) {
      setLibroSeleccionado({
        ...libroEncontrado,
        id: libroEncontrado.libreriaMaterialId,  // Asignar id para modal
      });
      setMostrarEditarModal(true);
    } else {
      console.warn('Libro no encontrado para editar con id:', id);
    }
  };

  // Mostrar modal confirmación para eliminar libro
  const handleSolicitarEliminarLibro = (id) => {
    const libro = libros.find((libro) => libro.libreriaMaterialId === id);
    if (libro) {
      setLibroParaEliminar(libro);
      setMostrarConfirmarEliminar(true);
    }
  };

  // Confirmar eliminación
  const handleConfirmarEliminar = () => {
    if (libroParaEliminar) {
      eliminarLibro(libroParaEliminar.libreriaMaterialId)
        .then(() => {
          cargarLibros();
          setMostrarConfirmarEliminar(false);
          setLibroParaEliminar(null);
        })
        .catch((err) => {
          console.error('Error al eliminar libro:', err);
          setMostrarConfirmarEliminar(false);
          setLibroParaEliminar(null);
        });
    }
  };

  // Al actualizar un libro en modal editar
  const onLibroActualizado = () => {
    cargarLibros();
    setMostrarEditarModal(false);
    setLibroSeleccionado(null);
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  // Filtrar libros por búsqueda por nombre solo si no es búsqueda por ID
  const librosFiltrados = searchQuery
    ? libros.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : libros;

  return (
    <div style={{ backgroundColor: '#f5f1ea', minHeight: '100vh' }}>
      <Navbar 
        onAgregar={() => setMostrarAgregarModal(true)} 
        onBuscar={manejarBusqueda} 
      />

      <div className="container py-5">
        <div className="row g-4">
          {librosFiltrados.map((libro) => (
            <div
              key={libro.libreriaMaterialId}
              className="col-lg-4 col-md-6 animate__animated animate__fadeInUp"
            >
              <LibroCard 
                libro={libro} 
                onEditar={handleEditarLibro}   
                onEliminar={handleSolicitarEliminarLibro}  
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar libro */}
      <AgregarLibroModal
        show={mostrarAgregarModal}
        handleClose={() => setMostrarAgregarModal(false)}
        onLibroAgregado={() => {
          cargarLibros();
          setMostrarAgregarModal(false);
        }}
      />

      {/* Modal para editar libro */}
      {libroSeleccionado && (
        <EditarLibroModal
          show={mostrarEditarModal}
          handleClose={() => setMostrarEditarModal(false)}
          libro={libroSeleccionado}
          onLibroActualizado={onLibroActualizado}
        />
      )}

      {/* Modal para confirmar eliminación */}
      <ConfirmarEliminarModal
        show={mostrarConfirmarEliminar}
        handleClose={() => setMostrarConfirmarEliminar(false)}
        onConfirm={handleConfirmarEliminar}
        libroTitulo={libroParaEliminar?.titulo || ''}
      />
    </div>
  );
}
