import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

const ModalLoginUsuario = ({ mostrarModal, setMostrarModal, onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const manejarLogin = () => {
    if (contrasena === "123456789") {
      onLogin(usuario);
      setMostrarModal(false);
      setUsuario("");
      setContrasena("");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
<Form.Control
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="123456789"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={manejarLogin}>
          Iniciar Sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLoginUsuario;