import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  PencilSquare,
  Trash3,
  PlusCircle,
  Search,
} from "react-bootstrap-icons";
import {
  obtenerAutores,
  crearAutor,
  eliminarAutor,
  buscarAutorPorNombre,
  obtenerAutorPorId, // 🔽 nuevo import
} from "../api/AutorService";

export default function CrudAutoresModal({ show, handleClose }) {
  const [autores, setAutores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [autorAEliminar, setAutorAEliminar] = useState(null);
  const [isCargando, setIsCargando] = useState(false);
  const [isBuscando, setIsBuscando] = useState(false);
  const [isEliminando, setIsEliminando] = useState(false);

  useEffect(() => {
    if (show) {
      cargarAutores();
    }
  }, [show]);

  const cargarAutores = async () => {
    setIsCargando(true);
    try {
      const response = await obtenerAutores();
      setAutores(response.data.libros);
    } catch (error) {
      console.error("Error al obtener autores:", error);
    }
    setIsCargando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (modoEdicion) {
      console.warn("Actualización aún no implementada");
    } else {
      try {
        await crearAutor(nombre, apellido, fechaNacimiento);
        await cargarAutores();
      } catch (error) {
        console.error("Error al crear autor:", error);
      }
    }

    setIsSubmitting(false);
    setNombre("");
    setApellido("");
    setFechaNacimiento("");
    setMostrarFormulario(false);
    setModoEdicion(false);
  };

  const handleEditar = (autor) => {
    setNombre(autor.nombre);
    setApellido(autor.apellido);
    setFechaNacimiento(""); // No implementado edición completa aún
    setModoEdicion(true);
    setMostrarFormulario(true);
  };

  const handleEliminarConfirmado = async () => {
    setIsEliminando(true);
    try {
      await eliminarAutor(autorAEliminar);
      await cargarAutores();
    } catch (error) {
      console.error("Error al eliminar autor:", error);
    }
    setIsEliminando(false);
    setAutorAEliminar(null);
  };

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      await cargarAutores();
      return;
    }

    setIsBuscando(true);
    try {
      const valorBusqueda = busqueda.trim();
      const esGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(valorBusqueda);
      let response;

      if (esGuid) {
        response = await obtenerAutorPorId(valorBusqueda);
      } else {
        response = await buscarAutorPorNombre(valorBusqueda);
      }

      if (response.status === 204 || !response.data) {
        setAutores([]);
      } else {
        setAutores(Array.isArray(response.data) ? response.data : [response.data]);
      }
    } catch (error) {
      console.error("Error al buscar autor:", error);
      setAutores([]);
    }

    setIsBuscando(false);
  };

  // Estilos
  const btnAgregar = {
    backgroundColor: "#5d4037",
    borderColor: "#5d4037",
    color: "#efebe9",
    borderRadius: "50px",
  };

  const btnAgregarDisabled = {
    backgroundColor: "#8d6e63",
    borderColor: "#8d6e63",
    color: "#efebe9",
    borderRadius: "50px",
  };

  const btnOutlineSec = {
    color: "#5d4037",
    borderColor: "#5d4037",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "50px",
  };

  const btnOutlineSecDisabled = {
    backgroundColor: "#5d4037",
    color: "#efebe9",
    borderColor: "#5d4037",
    borderRadius: "50px",
  };

  const btnGuardar = {
    backgroundColor: "#8d6e63",
    borderColor: "#8d6e63",
    color: "#efebe9",
  };

  const btnGuardarDisabled = {
    backgroundColor: "#5d4037",
    borderColor: "#5d4037",
    color: "#efebe9",
  };

  const btnOutlinePrim = {
    color: "#5d4037",
    borderColor: "#5d4037",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "50px",
  };

  const btnOutlineDanger = {
    color: "#5d4037",
    borderColor: "#5d4037",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "50px",
  };

  const btnDanger = {
    backgroundColor: "#5d4037",
    borderColor: "#5d4037",
    color: "#efebe9",
    borderRadius: "50px",
  };

  const btnDangerDisabled = {
    backgroundColor: "#8d6e63",
    borderColor: "#8d6e63",
    color: "#efebe9",
    borderRadius: "50px",
  };

  const btnCerrar = {
    backgroundColor: "#efebe9",
    borderColor: "#d7ccc8",
    color: "#5d4037",
    borderRadius: "50px",
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#5d4037", color: "#efebe9" }}
        >
          <Modal.Title>Administrar Autores</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#efebe9" }}>
          <div className="d-flex justify-content-between mb-3">
            <Button
              onClick={() => {
                setMostrarFormulario(true);
                setModoEdicion(false);
                setNombre("");
                setApellido("");
                setFechaNacimiento("");
              }}
              style={isSubmitting ? btnAgregarDisabled : btnAgregar}
              disabled={isSubmitting}
            >
              <PlusCircle className="me-2" />
              {isSubmitting ? <Spinner animation="border" size="sm" /> : "Agregar Autor"}
            </Button>

            <InputGroup style={{ width: "300px" }}>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o ID"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                disabled={isBuscando}
                style={{
                  borderColor: "#5d4037",
                  color: "#5d4037",
                  backgroundColor: "#fff8f6",
                  borderRadius: "0.25rem 0 0 0.25rem",
                }}
              />
              <Button
                onClick={handleBuscar}
                style={isBuscando ? btnOutlineSecDisabled : btnOutlineSec}
                disabled={isBuscando}
              >
                {isBuscando ? <Spinner animation="border" size="sm" /> : <Search />}
              </Button>
            </InputGroup>
          </div>

          {mostrarFormulario && (
            <Form
              onSubmit={handleSubmit}
              className="mb-4 p-3 rounded"
              style={{ backgroundColor: "#fff8f6", border: "1px solid #d7ccc8" }}
            >
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    setMostrarFormulario(false);
                    setModoEdicion(false);
                    setNombre("");
                    setApellido("");
                    setFechaNacimiento("");
                  }}
                  style={btnOutlineSec}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  style={isSubmitting ? btnGuardarDisabled : btnGuardar}
                  disabled={isSubmitting}
                  className="ms-2"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Guardando...
                    </>
                  ) : modoEdicion ? (
                    "Actualizar"
                  ) : (
                    "Guardar"
                  )}
                </Button>
              </div>
            </Form>
          )}

          {isCargando ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
          <Table striped bordered hover responsive>
  <thead style={{ backgroundColor: "#d7ccc8", color: "#4e342e" }}>
    <tr>
      <th>ID</th> {/* Nueva columna para ID */}
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Fecha de Nacimiento</th>
      <th style={{ width: "150px" }}>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {autores.length === 0 ? (
      <tr>
        <td colSpan="5" className="text-center text-danger">
          No se encontraron autores con ese nombre.
        </td>
      </tr>
    ) : (
      autores.map((autor) => (
        <tr key={autor.autorLibroGuid}>
          <td>{autor.autorLibroGuid}</td> {/* Mostrar el ID */}
          <td>{autor.nombre}</td>
          <td>{autor.apellido}</td>
          <td>
            {autor.fechaNacimiento
              ? new Date(autor.fechaNacimiento).toLocaleDateString()
              : "-"}
          </td>
          <td className="text-center">
            <Button
              onClick={() => handleEditar(autor)}
              style={btnOutlinePrim}
              size="sm"
              disabled={isSubmitting}
            >
              <PencilSquare />
            </Button>
            <Button
              onClick={() => setAutorAEliminar(autor.autorLibroGuid)}
              style={{ ...btnOutlineDanger, marginLeft: "0.5rem" }}
              size="sm"
              disabled={isSubmitting || isEliminando}
            >
              {isEliminando && autorAEliminar === autor.autorLibroGuid ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <Trash3 />
              )}
            </Button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</Table>

          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#efebe9" }}>
          <Button
            onClick={handleClose}
            style={btnCerrar}
            disabled={isSubmitting || isCargando || isEliminando || isBuscando}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={!!autorAEliminar} onHide={() => setAutorAEliminar(null)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#5d4037", color: "#efebe9" }}>
          <Modal.Title>¿Eliminar autor?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#efebe9", color: "#5d4037" }}>
          ¿Estás seguro de que deseas eliminar este autor? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#efebe9" }}>
          <Button
            onClick={() => setAutorAEliminar(null)}
            style={btnOutlineSec}
            disabled={isEliminando}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEliminarConfirmado}
            style={isEliminando ? btnDangerDisabled : btnDanger}
            disabled={isEliminando}
          >
            {isEliminando ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
