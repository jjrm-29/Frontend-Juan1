import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
}) => {
  return (
    <Modal  backdrop = "static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      
      
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="primer_nombre">
            <Form.Label>Nombre 1 del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Enrique"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="segundo_nombre">
            <Form.Label>Nombre 2 del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoEmpleado.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Manuel"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="primer_apellido">
            <Form.Label>Apellido 1 del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoEmpleado.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Hernández"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="segundo_apellido">
            <Form.Label>Apellido 2 del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoEmpleado.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Martínez"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Telefono del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: 8538****"
              maxLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cargo">
            <Form.Label>Cargo del Empleado</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="cargo"
              value={nuevoEmpleado.direccion}
              onChange={manejarCambioInput}
              placeholder="Descripción opcional (máx. 100 caracteres)"
              maxLength={150}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha_contratacion">
            <Form.Label>fecha contratacion del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              placeholder="Ej: 121******1005V"
              maxLength={14}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={!nuevoEmpleado.primer_nombre.trim()}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;