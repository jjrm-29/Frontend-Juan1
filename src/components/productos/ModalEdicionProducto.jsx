import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const camposValidos =
    productoEditado?.nombre_producto?.trim() &&
    productoEditado?.precio_unitario >= 0 &&
    productoEditado?.stock >= 0;

  return (
    <Modal
      backdrop="static"
      show={mostrar}
      onHide={() => setMostrar(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombre_producto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={productoEditado?.nombre_producto || ""}
              onChange={manejarCambio}
              placeholder="Ej: Taladro"
              maxLength={50}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion_producto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={productoEditado?.descripcion_producto || ""}
              onChange={manejarCambio}
              placeholder="Descripción opcional (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="id_categoria">
            <Form.Label>ID Categoría</Form.Label>
            <Form.Control
              type="number"
              name="id_categoria"
              value={productoEditado?.id_categoria || ""}
              onChange={manejarCambio}
              placeholder="Ej: 1"
              min={1}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="precio_unitario">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio_unitario"
              value={productoEditado?.precio_unitario || ""}
              onChange={manejarCambio}
              placeholder="Ej: 99.99"
              min={0}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productoEditado?.stock || ""}
              onChange={manejarCambio}
              placeholder="Ej: 50"
              min={0}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagenProducto">
            <Form.Label>Imagen</Form.Label>
            {productoEditado?.imagen && (
              <div>
                <img
                  src={`data:image/png;base64,${productoEditado.imagen}`}
                  alt="Imagen actual"
                  style={{ maxWidth: "100px", marginBottom: "10px" }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              name="imagen"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    manejarCambio({
                      target: {
                        name: "imagen",
                        value: reader.result.split(",")[1],
                      },
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
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!camposValidos}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
