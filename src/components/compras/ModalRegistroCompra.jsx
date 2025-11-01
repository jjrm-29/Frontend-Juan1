import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCompra = ({
  mostrarModal,
  setMostrarModal,
  nuevaCompra,
  manejarCambioInput,
  agregarCompra,
}) => {
  return (
    <Modal  backdrop = "static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      
      
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id_compra">
            <Form.Label>ID del empleado</Form.Label>
            <Form.Control
              type="text"
              name="id_compra"
              value={nuevaCompra.id_compra}
              onChange={manejarCambioInput}
              placeholder="Ej: 12"
              maxLength={4}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha_compra">
            <Form.Label>fecha de la Compra</Form.Label>
            <Form.Control
              type="date"
              name="fecha_compra"
              value={nuevaCompra.fecha_compra}
              onChange={manejarCambioInput}
              placeholder="Ej: 25-12-2023"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="total_compra">
            <Form.Label>total de la Compra</Form.Label>
            <Form.Control
              type="date"
              name="total_compra"
              value={nuevaCompra.total_compra}
              onChange={manejarCambioInput}
              placeholder="Ej: 5000"
              maxLength={10}
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
          onClick={agregarCompra}
          disabled={!nuevaCompra.id_empleado.trim()}

          
        >
          Guardar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;