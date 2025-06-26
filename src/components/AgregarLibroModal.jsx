// src/components/AgregarLibroModal.jsx
import React, { useState } from 'react';
import { crearLibro } from '../api/libroService';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AgregarLibroModal({ show, handleClose, onLibroAgregado }) {
  const [titulo, setTitulo] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nuevoLibro = await crearLibro({ 
        titulo, 
        fechaPublicacion 
      });

      setTitulo('');
      setFechaPublicacion('');
      handleClose();
      if (onLibroAgregado) onLibroAgregado(nuevoLibro);

    } catch (error) {
      console.error('Error al agregar libro:', error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header 
        closeButton 
        style={{ 
          backgroundColor: '#5d4037', 
          color: '#efebe9',
          borderBottom: 'none'
        }}
      >
        <Modal.Title>
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Libro
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ backgroundColor: '#efebe9' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label style={{ color: '#5d4037', fontWeight: '500' }}>
              Título del Libro
            </Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              style={{
                backgroundColor: '#f5f1ea',
                borderColor: '#8d6e63',
                color: '#4e342e'
              }}
              placeholder="Ej: Cien años de soledad"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: '#5d4037', fontWeight: '500' }}>
              Fecha de Publicación
            </Form.Label>
            <Form.Control
              type="date"
              value={fechaPublicacion}
              onChange={(e) => setFechaPublicacion(e.target.value)}
              required
              style={{
                backgroundColor: '#f5f1ea',
                borderColor: '#8d6e63',
                color: '#4e342e'
              }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-3">
            <Button 
              variant="outline-secondary" 
              onClick={handleClose}
              style={{ 
                color: '#5d4037', 
                borderColor: '#5d4037',
                fontWeight: '500'
              }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                backgroundColor: '#8d6e63', 
                border: 'none',
                fontWeight: '500'
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  Guardar
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
