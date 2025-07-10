import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import { Person, Lock } from "react-bootstrap-icons";
import {
  login,
  register,
  getRecoveryQuestions,
} from "../api/AutentificacionService";

export default function LoginRegistroModal({ show, handleClose, abrirRecuperar }) {
  const [modo, setModo] = useState("login");
  const [form, setForm] = useState({
    username: "",
    password: "",
    recoveryQuestion: "",
    recoveryQuestionCustom: "",
    recoveryAnswer: "",
  });
  const [errorLogin, setErrorLogin] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modo === "registro") {
      getRecoveryQuestions()
        .then((data) => {
          setPreguntas(Array.isArray(data.data) ? data.data : []);
        })
        .catch((err) => {
          console.error("Error cargando preguntas comunes", err);
          setPreguntas([]);
        });
    }
  }, [modo]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modo === "login") {
        const response = await login({
          username: form.username,
          password: form.password,
        });

        localStorage.setItem("token", response.data.token);
        setErrorLogin("");
        setToast({
          show: true,
          message: `Bienvenido, ${form.username}!`,
          isError: false,
        });
        handleClose();
      } else {
        const preguntaFinal =
          form.recoveryQuestion === "Otra"
            ? form.recoveryQuestionCustom
            : form.recoveryQuestion;

        await register({
          username: form.username,
          password: form.password,
          recoveryQuestion: preguntaFinal,
          recoveryAnswer: form.recoveryAnswer,
        });

        setToast({
          show: true,
          message: `Usuario "${form.username}" registrado exitosamente`,
          isError: false,
        });

        setForm({
          username: "",
          password: "",
          recoveryQuestion: "",
          recoveryQuestionCustom: "",
          recoveryAnswer: "",
        });

        setModo("login");
      }
    } catch (error) {
      if (modo === "login") {
        setErrorLogin(
          error?.response?.data?.message || "Error al iniciar sesión."
        );
        setToast({
          show: true,
          message:
            error?.response?.data?.message || "Error al iniciar sesión.",
          isError: true,
        });
      } else {
        setToast({
          show: true,
          message:
            "Error al registrar: " +
            (error?.response?.data?.message || "Intenta más tarde."),
          isError: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const modalStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(93, 64, 55, 0.3)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    boxShadow: "0 0 30px rgba(93, 64, 55, 0.5)",
    padding: "2rem",
    color: "#5d4037",
  };

  const btnLogin = {
    backgroundColor: "#5d4037",
    border: "none",
    color: "#efebe9",
    borderRadius: "50px",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  };

  const btnLoginHover = {
    backgroundColor: "#8d6e63",
    color: "#efebe9",
  };

  const labelStyle = {
    color: "#5d4037",
    fontWeight: "bold",
  };

  const textLink = {
    color: "#8d6e63",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    marginLeft: "5px",
  };

  const iconStyle = {
    color: "#5d4037",
    marginRight: "8px",
    verticalAlign: "middle",
  };

  const inputWithIconStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <Modal show={show} centered backdrop="static" onHide={handleClose}>
        <Modal.Body style={modalStyle}>
          <div className="text-center mb-4">
            <h4 style={{ color: "#5d4037", fontWeight: "bold" }}>
              {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
            </h4>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label style={labelStyle}>
                {modo === "login" ? "Usuario" : "Nombre de Usuario"}
              </Form.Label>
              <div style={inputWithIconStyle}>
                <Person style={iconStyle} size={20} />
                <Form.Control
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder={modo === "login" ? "Usuario" : "Tu nombre"}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label style={labelStyle}>Contraseña</Form.Label>
              <div style={inputWithIconStyle}>
                <Lock style={iconStyle} size={20} />
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </Form.Group>

            {modo === "registro" && (
              <>
                <Form.Group className="mb-3" controlId="recoveryQuestion">
                  <Form.Label style={labelStyle}>Pregunta de recuperación</Form.Label>
                  <Form.Select
                    name="recoveryQuestion"
                    value={form.recoveryQuestion}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una pregunta...</option>
                    {preguntas.map((p, i) => (
                      <option key={i} value={p}>
                        {p}
                      </option>
                    ))}
                    <option value="Otra">Otra...</option>
                  </Form.Select>
                </Form.Group>

                {form.recoveryQuestion === "Otra" && (
                  <Form.Group className="mb-3" controlId="recoveryQuestionCustom">
                    <Form.Label style={labelStyle}>Escribe tu pregunta</Form.Label>
                    <Form.Control
                      type="text"
                      name="recoveryQuestionCustom"
                      value={form.recoveryQuestionCustom}
                      onChange={handleChange}
                      required
                      placeholder="Ej. ¿Cómo se llama tu primer jefe?"
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="recoveryAnswer">
                  <Form.Label style={labelStyle}>Respuesta</Form.Label>
                  <Form.Control
                    type="text"
                    name="recoveryAnswer"
                    value={form.recoveryAnswer}
                    onChange={handleChange}
                    required
                    placeholder="Tu respuesta"
                  />
                </Form.Group>
              </>
            )}

            {modo === "login" && errorLogin && (
              <div
                style={{
                  color: "#8e4c4c",
                  backgroundColor: "#fceaea",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                {errorLogin}
              </div>
            )}

            <div className="d-grid gap-2 mb-3">
              <Button
                type="submit"
                style={btnLogin}
                disabled={loading}
                onMouseOver={(e) => Object.assign(e.target.style, btnLoginHover)}
                onMouseOut={(e) => Object.assign(e.target.style, btnLogin)}
                className="btn-lg"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Procesando...
                  </>
                ) : modo === "login" ? (
                  "Iniciar Sesión"
                ) : (
                  "Registrarse"
                )}
              </Button>
            </div>

            {modo === "login" && (
              <div className="text-center mb-2">
                <span
                  style={{
                    color: "#8d6e63",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={abrirRecuperar}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            )}

            <div className="text-center mt-2">
              <span style={{ color: "#5d4037" }}>
                {modo === "login"
                  ? "¿No tienes cuenta?"
                  : "¿Ya tienes una cuenta?"}
              </span>
              <span
                style={textLink}
                onClick={() =>
                  setModo((prev) => (prev === "login" ? "registro" : "login"))
                }
              >
                {modo === "login" ? " Regístrate aquí" : " Inicia sesión"}
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer className="p-3" position="top-center">
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={4000}
          autohide
          bg={toast.isError ? "danger" : "success"}
          style={{
            minWidth: "300px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.15)",
          }}
        >
          <Toast.Body
            style={{
              color: "#fff",
              backgroundColor: toast.isError ? "#8e4c4c" : "#6d4c41",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
