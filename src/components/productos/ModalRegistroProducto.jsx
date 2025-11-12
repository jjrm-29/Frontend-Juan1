import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
}) => {
  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombre_producto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: Machete"
              maxLength={100}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcion_producto">
            <Form.Label>Descripcion del Producto</Form.Label>
            <Form.Control
              type="text"
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: para podar"
              maxLength={100}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="id_categoria">
            <Form.Label>ID Categoria</Form.Label>
            <Form.Control
              type="text"
              name="id_categoria"
              value={nuevoProducto.id_categoria}
              onChange={manejarCambioInput}
              placeholder="Ej: 2"
              maxLength={4}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="precio_unitario">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="text"
              name="precio_unitario"
              value={nuevoProducto.precio_unitario}
              onChange={manejarCambioInput}
              placeholder="Ej: 150.75"
              maxLength={8}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock del Producto</Form.Label>
            <Form.Control
              type="text"
              name="stock"
              value={nuevoProducto.stock}
              onChange={manejarCambioInput}
              placeholder="Ej: 100"
              maxLength={8}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formImagenProducto">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    manejarCambioInput({
                      target: {
                        name: "imagen",
                        value: reader.result.split(",")[1],
                      }, // Extrae solo la parte Base64
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
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
          onClick={agregarProducto}
          disabled={!nuevoProducto.nombre_producto.trim()}
        >
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;
