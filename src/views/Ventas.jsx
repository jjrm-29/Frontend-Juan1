import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaVentas from '../components/ventas/TablaVentas';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas';
import ModalRegistroVenta from '../components/ventas/ModalRegistroVenta';
import ModalEdicionVenta from '../components/ventas/ModalEdicionVenta';
import ModalEliminacionVenta from '../components/ventas/ModalEliminacionVenta';
import ModalDetallesVenta from '../components/detalles_ventas/ModalDetalleVenta';

const Ventas = () => {
  const navegar = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);

  const [ventaAEditar, setVentaAEditar] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);
  const [detallesVenta, setDetallesVenta] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const hoy = new Date().toISOString().split('T')[0];

  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: '',
    id_empleado: '',
    fecha_venta: hoy,
    total_venta: 0
  });

  const [ventaEnEdicion, setVentaEnEdicion] = useState(null);
  const [detallesNuevos, setDetallesNuevos] = useState([]);

  const ventasPaginadas = ventasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // (Aquí van todos los métodos que ya tenías: obtenerNombreCliente, obtenerNombreEmpleado, etc.)
  // ... (mantener todo igual)

  useEffect(() => {
    obtenerVentas();
    obtenerClientes();
    obtenerEmpleados();
    obtenerProductos();
  }, []);

  return (
    <div className="ventas-page">
      <Container className="mt-4 position-relative">
        {/* BOTÓN VOLVER AL INICIO */}
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navegar("/inicio")}
        >
          ← Volver al Inicio
        </Button>

        <h4 className="text-white">Ventas</h4>
        <Row className="mb-3">
          <Col lg={5} md={6} sm={8} xs={12}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={(e) => {
                const texto = e.target.value.toLowerCase();
                setTextoBusqueda(texto);
                const filtrados = ventas.filter(v =>
                  v.id_venta.toString().includes(texto) ||
                  (v.nombre_cliente && v.nombre_cliente.toLowerCase().includes(texto)) ||
                  (v.nombre_empleado && v.nombre_empleado.toLowerCase().includes(texto))
                );
                setVentasFiltradas(filtrados);
                setPaginaActual(1);
              }}
            />
          </Col>
          <Col className="text-end">
            <Button
              className="color-boton-registro"
              onClick={() => setMostrarModalRegistro(true)}
            >
              + Nueva Venta
            </Button>
          </Col>
        </Row>

        <TablaVentas
          ventas={ventasPaginadas}
          cargando={cargando}
          obtenerDetalles={(id) => {/* tu función obtenerDetalles_Venta */}}
          abrirModalEdicion={(v) => {/* tu función abrirModalEdicion */}}
          abrirModalEliminacion={(v) => {/* tu función abrirModalEliminacion */}}
          totalElementos={ventasFiltradas.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={setPaginaActual}
        />

        <ModalRegistroVenta
          mostrar={mostrarModalRegistro}
          setMostrar={() => setMostrarModalRegistro(false)}
          nuevaVenta={nuevaVenta}
          setNuevaVenta={setNuevaVenta}
          detalles={detallesNuevos}
          setDetalles={setDetallesNuevos}
          clientes={clientes}
          empleados={empleados}
          productos={productos}
          agregarVenta={() => {/* tu función agregarVenta */}}
          hoy={hoy}
        />

        <ModalEdicionVenta
          mostrar={mostrarModalEdicion}
          setMostrar={() => setMostrarModalEdicion(false)}
          venta={ventaAEditar}
          ventaEnEdicion={ventaEnEdicion}
          setVentaEnEdicion={setVentaEnEdicion}
          detalles={detallesNuevos}
          setDetalles={setDetallesNuevos}
          clientes={clientes}
          empleados={empleados}
          productos={productos}
          actualizarVenta={() => {/* tu función actualizarVenta */}}
        />

        <ModalEliminacionVenta
          mostrar={mostrarModalEliminar}
          setMostrar={() => setMostrarModalEliminar(false)}
          venta={ventaAEliminar}
          confirmarEliminacion={() => {/* tu función eliminarVenta */}}
        />

        <ModalDetallesVenta
          mostrarModal={mostrarModalDetalles}
          setMostrarModal={() => setMostrarModalDetalles(false)}
          detalles={detallesVenta}
        />
      </Container>

      {/* ESTILO PARA IMAGEN DE FONDO */}
      <style>{`
        .ventas-page {
          min-height: 100vh;
          background: url('https://images.unsplash.com/photo-1581092334469-8c9b0bfa7b07?auto=format&fit=crop&w=1650&q=80') no-repeat center center;
          background-size: cover;
          position: relative;
          padding-bottom: 50px;
        }

        .ventas-page::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.6); /* oscurece la imagen para resaltar contenido */
          z-index: 0;
        }

        .ventas-page > .container {
          position: relative;
          z-index: 1;
        }

        .ventas-page h4,
        .ventas-page .text-white {
          color: #fff;
        }

        .ventas-page .color-boton-registro {
          background-color: #667eea;
          border: none;
          color: #fff;
        }

        .ventas-page .color-boton-registro:hover {
          background-color: #764ba2;
        }
      `}</style>
    </div>
  );
};

export default Ventas;
