import React, { useState, useEffect } from 'react';
import { actualizarLibro } from '../api/libroService';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditarLibroModal({ show, handleClose, libro, onLibroActualizado }) {
  const [titulo, setTitulo] = useState('');
  const [autorLibro, setAutorLibro] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [id, setId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (libro) {
      setId(libro.id || '');
      setTitulo(libro.titulo || '');
      setAutorLibro(libro.autorLibro || '');
      setFechaPublicacion(libro.fechaPublicacion ? new Date(libro.fechaPublicacion).toISOString().substring(0, 10) : '');
    }
  }, [libro]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const datosActualizados = {
      titulo,
      autorLibro,
      fechaPublicacion,
    };

    try {
      await actualizarLibro(id, datosActualizados);
      if (onLibroActualizado) onLibroActualizado();
      handleClose();
    } catch (error) {
      console.error('Error al actualizar libro:', error.response?.data || error);
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
          borderBottom: 'none',
        }}
      >
        <Modal.Title>
          <i className="bi bi-pencil-square me-2"></i>
          Editar Libro
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#efebe9' }}>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formId">
            <Form.Label style={{ color: '#5d4037', fontWeight: '500' }}>
              ID (No editable)
            </Form.Label>
            <Form.Control
              type="text"
              value={id}
              readOnly
              plaintext
              style={{
                backgroundColor: '#f5f1ea',
                color: '#4e342e',
                fontWeight: '600',
                border: 'none',
                paddingLeft: '0',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label style={{ color: '#5d4037', fontWeight: '500' }}>
              Título
            </Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Ej: Cien años de soledad"
              style={{
                backgroundColor: '#f5f1ea',
                borderColor: '#8d6e63',
                color: '#4e342e',
                borderRadius: '4px',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAutor">
            <Form.Label style={{ color: '#5d4037', fontWeight: '500' }}>
              Autor
            </Form.Label>
            <Form.Control
              type="text"
              value={autorLibro}
              onChange={(e) => setAutorLibro(e.target.value)}
              required
              placeholder="Nombre del autor"
              style={{
                backgroundColor: '#f5f1ea',
                borderColor: '#8d6e63',
                color: '#4e342e',
                borderRadius: '4px',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formFecha">
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
                color: '#4e342e',
                borderRadius: '4px',
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
                fontWeight: '500',
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#8d6e63',
                border: 'none',
                fontWeight: '500',
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
