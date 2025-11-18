import { useState } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const ModalRegistroVenta = ({
  mostrar,
  setMostrar,
  clientes = [],
  empleados = [],
  productos = [],
  onGuardar
}) => {
  const [clienteSel, setClienteSel] = useState(null);
  const [empleadoSel, setEmpleadoSel] = useState(null);
  const [productoSel, setProductoSel] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [detalles, setDetalles] = useState([]);

  const total = detalles.reduce((sum, d) => sum + d.cantidad * d.precio_unitario, 0);

  const cargarOpciones = (lista, campo) => (input, callback) => {
    const filtrados = lista
      .filter(item => {
        const valor = campo === 'nombre_producto'
          ? item[campo]
          : `${item.primer_nombre} ${item.segundo_nombre || ''} ${item.primer_apellido}`.trim();
        return valor.toLowerCase().includes(input.toLowerCase());
      })
      .slice(0, 50);

    callback(filtrados.map(item => ({
      value: item.id_cliente || item.id_empleado || item.id_producto,
      label: campo === 'nombre_producto'
        ? `${item.nombre_producto} (Stock: ${item.stock})`
        : `${item.primer_nombre} ${item.primer_apellido}`,
      precio: item.precio_unitario,
      stock: item.stock
    })));
  };

  const agregarDetalle = () => {
    if (!productoSel || !cantidad || cantidad <= 0) {
      alert("Selecciona un producto y una cantidad válida.");
      return;
    }

    const cant = parseInt(cantidad);
    if (cant > productoSel.stock) {
      alert(`Stock insuficiente. Disponible: ${productoSel.stock}`);
      return;
    }

    setDetalles(prev => [...prev, {
      id_producto: productoSel.value,
      nombre_producto: productoSel.label.split(' (Stock')[0],
      cantidad: cant,
      precio_unitario: parseFloat(productoSel.precio)
    }]);

    setProductoSel(null);
    setCantidad("");
  };

  const guardarVenta = () => {
    if (!clienteSel || !empleadoSel) {
      alert("Debes seleccionar cliente y empleado.");
      return;
    }
    if (detalles.length === 0) {
      alert("Agrega al menos un producto.");
      return;
    }

    const venta = {
      id_cliente: clienteSel.value,
      id_empleado: empleadoSel.value,
      total_venta: total
    };

    const detallesVenta = detalles.map(d => ({
      id_producto: d.id_producto,
      cantidad: d.cantidad,
      precio_unitario: d.precio_unitario
    }));

    onGuardar({ venta, detalles: detallesVenta });
    setMostrar(false);
  };

  const limpiar = () => {
    setClienteSel(null);
    setEmpleadoSel(null);
    setDetalles([]);
    setProductoSel(null);
    setCantidad("");
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => { limpiar(); setMostrar(false); }} size="xl" fullscreen="lg-down">
      <Modal.Header closeButton>
        <Modal.Title>Nueva Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Cliente</Form.Label>
              <AsyncSelect
                cacheOptions defaultOptions
                loadOptions={cargarOpciones(clientes, 'primer_nombre')}
                onChange={setClienteSel}
                value={clienteSel}
                placeholder="Buscar cliente..."
                isClearable
              />
            </Col>
            <Col md={4}>
              <Form.Label>Empleado</Form.Label>
              <AsyncSelect
                cacheOptions defaultOptions
                loadOptions={cargarOpciones(empleados, 'primer_nombre')}
                onChange={setEmpleadoSel}
                value={empleadoSel}
                placeholder="Buscar empleado..."
                isClearable
              />
            </Col>
            <Col md={4}>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="text" value={new Date().toLocaleString()} disabled />
            </Col>
          </Row>

          <hr />
          <h5>Agregar Productos</h5>
          <Row className="align-items-end mb-3">
            <Col md={6}>
              <AsyncSelect
                cacheOptions defaultOptions
                loadOptions={cargarOpciones(productos, 'nombre_producto')}
                onChange={setProductoSel}
                value={productoSel}
                placeholder="Buscar producto..."
                isClearable
              />
            </Col>
            <Col md={3}>
              <FormControl
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                min="1"
                onKeyDown={e => e.key === 'Enter' && agregarDetalle()}
              />
            </Col>
            <Col md={3}>
              <Button variant="success" onClick={agregarDetalle} style={{ width: '100%' }}>
                Agregar
              </Button>
            </Col>
          </Row>

          {detalles.length > 0 && (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.nombre_producto}</td>
                    <td>{d.cantidad}</td>
                    <td>C$ {d.precio_unitario.toFixed(2)}</td>
                    <td>C$ {(d.cantidad * d.precio_unitario).toFixed(2)}</td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => setDetalles(prev => prev.filter((_, idx) => idx !== i))}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end fw-bold">Total:</td>
                  <td colSpan={2} className="fw-bold">C$ {total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { limpiar(); setMostrar(false); }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={guardarVenta}>
          Guardar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;