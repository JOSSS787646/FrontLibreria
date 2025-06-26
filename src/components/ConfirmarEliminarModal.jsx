import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ConfirmarEliminarModal({ show, handleClose, onConfirm, mensaje }) {
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
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#efebe9', color: '#5d4037', fontWeight: '500' }}>
        {mensaje || '¿Estás seguro que deseas eliminar este libro? Esta acción no se puede deshacer.'}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: '#efebe9', borderTop: 'none' }}>
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          style={{
            color: '#5d4037',
            borderColor: '#5d4037',
            fontWeight: '500',
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          style={{
            backgroundColor: '#8d6e63',
            border: 'none',
            fontWeight: '500',
          }}
        >
          <i className="bi bi-trash-fill me-2"></i>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
