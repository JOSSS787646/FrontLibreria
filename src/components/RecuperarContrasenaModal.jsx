import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import {
  getUserRecoveryQuestion,
  verifyRecoveryAnswer,
  resetPassword,
} from "../api/AutentificacionService";

export default function RecuperarContrasenaModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [recoveryQuestion, setRecoveryQuestion] = useState("");
  const [recoveryAnswer, setRecoveryAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const estiloBoton = {
    backgroundColor: "#5d4037",
    borderColor: "#5d4037",
    color: "#efebe9",
    borderRadius: "50px",
  };

  const buscarPregunta = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getUserRecoveryQuestion(username);
      setRecoveryQuestion(response.data.recoveryQuestion);
      setStep(2);
      setAlert("");
    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
      setAlert("Usuario no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  const verificarRespuesta = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyRecoveryAnswer({
        username,
        recoveryAnswer,
      });
      setStep(3);
      setAlert("");
    } catch (error) {
      console.error("Respuesta incorrecta:", error);
      setAlert("Respuesta incorrecta.");
    } finally {
      setLoading(false);
    }
  };

  const cambiarPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword({
        username,
        newPassword,
      });
      setShowSuccessModal(true);
      setTimeout(() => {
        cerrarTodo();
      }, 2000);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setAlert("Error al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  const cerrarTodo = () => {
    setUsername("");
    setRecoveryQuestion("");
    setRecoveryAnswer("");
    setNewPassword("");
    setStep(1);
    setAlert("");
    setShowSuccessModal(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#5d4037", color: "#efebe9" }}>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#efebe9" }}>
          {alert && <Alert variant="danger">{alert}</Alert>}

          {step === 1 && (
            <Form onSubmit={buscarPregunta}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" style={estiloBoton} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Buscar pregunta"}
              </Button>
            </Form>
          )}

          {step === 2 && (
            <Form onSubmit={verificarRespuesta}>
              <Form.Group className="mb-3">
                <Form.Label>Pregunta de recuperación</Form.Label>
                <Form.Control type="text" value={recoveryQuestion} disabled />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRespuesta">
                <Form.Label>Tu respuesta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu respuesta"
                  value={recoveryAnswer}
                  onChange={(e) => setRecoveryAnswer(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" style={estiloBoton} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Verificar"}
              </Button>
            </Form>
          )}

          {step === 3 && (
            <Form onSubmit={cambiarPassword}>
              <Form.Group className="mb-3" controlId="formNuevaContrasena">
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" style={estiloBoton} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Restablecer contraseña"}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* ✅ Modal de éxito */}
      <Modal show={showSuccessModal} centered backdrop="static" keyboard={false}>
        <Modal.Header style={{ backgroundColor: "#4e342e", color: "#efebe9" }}>
          <Modal.Title>¡Éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#efebe9", textAlign: "center" }}>
          <p>¡Tu contraseña se cambió exitosamente!</p>
          <Spinner animation="grow" variant="success" />
        </Modal.Body>
      </Modal>
    </>
  );
}
