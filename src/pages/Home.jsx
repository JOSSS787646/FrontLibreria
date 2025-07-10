import React, { useEffect, useState } from 'react';
import { obtenerLibros, obtenerLibroPorId, eliminarLibro } from '../api/libroService';
import LibroCard from '../components/LibroCard';
import Navbar from '../components/Navbar';
import AgregarLibroModal from '../components/AgregarLibroModal';
import EditarLibroModal from '../components/EditarLibroModal';
import ConfirmarEliminarModal from '../components/ConfirmarEliminarModal';
import LoginRegistroModal from '../components/LoginRegistroModal';
import RecuperarContrasenaModal from '../components/RecuperarContrasenaModal'; // Importa tu modal de recuperar contraseña
import 'animate.css';

export default function Home() {
  const [libros, setLibros] = useState([]);
  const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [mostrarConfirmarEliminar, setMostrarConfirmarEliminar] = useState(false);
  const [libroParaEliminar, setLibroParaEliminar] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Estados para modales de login y recuperación
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  const cargarLibros = () => {
    obtenerLibros()
      .then((res) => setLibros(res.data))
      .catch((err) => console.error('Error al obtener libros:', err));
  };

  const manejarBusqueda = (texto, esId = false) => {
    if (!texto) {
      cargarLibros();
      setSearchQuery('');
      return;
    }

    if (esId) {
      obtenerLibroPorId(texto)
        .then(res => setLibros([res.data]))
        .catch(err => {
          console.error('Error al buscar libro por ID:', err);
          setLibros([]);
        });
    } else {
      setSearchQuery(texto);
    }
  };

  const handleEditarLibro = (id) => {
    const libroEncontrado = libros.find((libro) => libro.libreriaMaterialId === id);
    if (libroEncontrado) {
      setLibroSeleccionado({
        ...libroEncontrado,
        id: libroEncontrado.libreriaMaterialId,
      });
      setMostrarEditarModal(true);
    } else {
      console.warn('Libro no encontrado para editar con id:', id);
    }
  };

  const handleSolicitarEliminarLibro = (id) => {
    const libro = libros.find((libro) => libro.libreriaMaterialId === id);
    if (libro) {
      setLibroParaEliminar(libro);
      setMostrarConfirmarEliminar(true);
    }
  };

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

  const onLibroActualizado = () => {
    cargarLibros();
    setMostrarEditarModal(false);
    setLibroSeleccionado(null);
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const librosFiltrados = searchQuery
    ? libros.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : libros;

  // Funciones para abrir/cerrar modales Login y Recuperar Contraseña
  const cerrarLogin = () => {
    setMostrarLogin(false);
  };

  const abrirRecuperar = () => {
    setMostrarLogin(false);
    setMostrarRecuperar(true);
  };

  const cerrarRecuperar = () => {
    setMostrarRecuperar(false);
    setMostrarLogin(true);  // <-- Aquí el cambio para volver a mostrar el login
  };

  return (
    <div style={{ backgroundColor: '#f5f1ea', minHeight: '100vh' }}>
      {/* Modal Login/Registro */}
      <LoginRegistroModal
        show={mostrarLogin}
        handleClose={cerrarLogin}
        abrirRecuperar={abrirRecuperar} // Función para abrir el modal de recuperar contraseña
      />

      {/* Modal Recuperar Contraseña */}
      <RecuperarContrasenaModal
        show={mostrarRecuperar}
        handleClose={cerrarRecuperar} // Función para cerrar recuperar y volver a login
      />

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

      <AgregarLibroModal
        show={mostrarAgregarModal}
        handleClose={() => setMostrarAgregarModal(false)}
        onLibroAgregado={() => {
          cargarLibros();
          setMostrarAgregarModal(false);
        }}
      />

      {libroSeleccionado && (
        <EditarLibroModal
          show={mostrarEditarModal}
          handleClose={() => setMostrarEditarModal(false)}
          libro={libroSeleccionado}
          onLibroActualizado={onLibroActualizado}
        />
      )}

      <ConfirmarEliminarModal
        show={mostrarConfirmarEliminar}
        handleClose={() => setMostrarConfirmarEliminar(false)}
        onConfirm={handleConfirmarEliminar}
        libroTitulo={libroParaEliminar?.titulo || ''}
      />
    </div>
  );
}
