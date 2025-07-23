import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgregarLibroModal from './AgregarLibroModal';
import AutorModal from './AdministraAutoresModal'; // <-- Importa tu modal de autores aquí

export default function Navbar({ onLibroAgregado, onBuscar }) {
  const [showModalLibro, setShowModalLibro] = useState(false);
  const [showModalAutor, setShowModalAutor] = useState(false);  // Estado para modal autores
  const [searchQuery, setSearchQuery] = useState('');
  const [searchId, setSearchId] = useState(''); // Nuevo estado para buscar por ID

  const handleSearchChange = (e) => {
    const valor = e.target.value;
    setSearchQuery(valor);
    if (onBuscar) {
      onBuscar(valor);  // Búsqueda por nombre o texto libre
    }
  };

  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleBuscarPorId = () => {
    if (onBuscar) {
      onBuscar(searchId, true);  // Paso segundo parámetro para indicar búsqueda por ID
    }
  };

  // Función para guardar autor (aquí solo demo, tú pones lógica real)
  const handleSaveAutor = (autorData) => {
    console.log('Autor guardado:', autorData);
    setShowModalAutor(false);
    // Aquí puedes llamar a tu API o actualizar lista de autores
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{
          backgroundColor: '#5d4037',
          padding: '1rem 2rem',
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            style={{
              color: '#efebe9',
              fontWeight: '700',
              fontSize: '1.8rem',
            }}
          >
            <span
              className="animate__animated animate__fadeInLeft me-2"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                animation: 'pulse 2s infinite alternate',
              }}
            >
              Biblioteca Literaria
            </span>
            <i className="bi bi-book-half ms-2" style={{ fontSize: '1.5rem' }}></i>
          </Link>

          <div className="d-flex align-items-center ms-auto">

            {/* Búsqueda por nombre (ya existente) */}
            <div className="input-group me-3" style={{ width: '300px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre..."
                style={{
                  backgroundColor: '#efebe9',
                  borderColor: '#8d6e63',
                }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className="btn"
                type="button"
                style={{
                  backgroundColor: '#8d6e63',
                  color: 'white',
                }}
                onClick={() => onBuscar && onBuscar(searchQuery, false)}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>

          {/* NUEVO: Búsqueda por ID */}
            {/*<div className="input-group me-3" style={{ width: '180px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por ID..."
                style={{
                  backgroundColor: '#efebe9',
                  borderColor: '#8d6e63',
                }}
                value={searchId}
                onChange={handleSearchIdChange}
              />
              <button
                className="btn"
                type="button"
                style={{
                  backgroundColor: '#8d6e63',
                  color: 'white',
                }}
                onClick={handleBuscarPorId}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>*/}

            <button
              className="btn ms-3 d-flex align-items-center"
              style={{
                backgroundColor: '#a1887f',
                color: 'white',
                borderRadius: '50px',
                padding: '0.5rem 1.5rem',
              }}
              onClick={() => setShowModalLibro(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Agregar Libro
            </button>

            <button
              className="btn ms-3 d-flex align-items-center"
              style={{
                backgroundColor: '#a1887f',
                color: 'white',
                borderRadius: '50px',
                padding: '0.5rem 1.5rem',
              }}
              onClick={() => setShowModalAutor(true)}  // Aquí abres modal autores
            >
              <i className="bi bi-plus-circle me-2"></i>
              Autores
            </button>
          </div>
        </div>
      </nav>

      <AgregarLibroModal
        show={showModalLibro}
        handleClose={() => setShowModalLibro(false)}
        onLibroAgregado={() => {
          onLibroAgregado(); // Esto recarga la lista en Home
          setShowModalLibro(false); // Cierra el modal
          window.location.reload();
        }}
      />

      <AutorModal
        show={showModalAutor}
        handleClose={() => setShowModalAutor(false)}
        onSave={handleSaveAutor}
        autor={null}
      />
    </>
  );
}
