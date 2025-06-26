// src/components/LibroCard.jsx
import React from 'react';

export default function LibroCard({ libro, onEditar, onEliminar }) {
  return (
    <div 
      className="card h-100 border-0 overflow-hidden transition-all"
      style={{ 
        backgroundColor: '#efebe9',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(93, 64, 55, 0.1)',
        transition: 'all 0.3s ease',
        borderBottom: '3px solid #6d4c41'
      }}
    >
      <div className="card-img-top" style={{ 
        height: '180px',
        backgroundColor: '#d7ccc8',
        backgroundImage: 'url(https://source.unsplash.com/random/300x200/?book)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>

      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 
            className="card-title fw-bold mb-0" 
            style={{ 
              color: '#4e342e',
              fontSize: '1.3rem'
            }}
          >
            {libro.titulo}
          </h5>
          <span 
            className="badge rounded-pill px-3 py-2"
            style={{ 
              backgroundColor: '#8d6e63', 
              color: 'white',
              fontSize: '0.8rem'
            }}
          >
            #{libro.libreriaMaterialId}
          </span>
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-person-fill me-2" style={{ color: '#6d4c41' }}></i>
            <span style={{ color: '#5d4037' }}>{libro.autorLibro}</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-calendar3 me-2" style={{ color: '#6d4c41' }}></i>
            <span style={{ color: '#5d4037' }}>
              {new Date(libro.fechaPublicacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button 
            className="btn btn-sm"
            style={{ 
              backgroundColor: 'transparent',
              color: '#6d4c41',
              border: '1px solid #6d4c41',
              fontWeight: '500'
            }}
            onClick={() => onEditar(libro.libreriaMaterialId)}
          >
            <i className="bi bi-pencil-fill me-1"></i> Editar
          </button>
          <button 
            className="btn btn-sm"
            style={{ 
              backgroundColor: '#6d4c41',
              color: 'white',
              fontWeight: '500'
            }}
            onClick={() => onEliminar(libro.libreriaMaterialId)}
          >
            <i className="bi bi-trash-fill me-1"></i> Eliminar
          </button>
        </div>

      </div>
    </div>
  );
}
