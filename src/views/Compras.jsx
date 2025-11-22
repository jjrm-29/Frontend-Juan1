import { useState, useEffect } from 'react';
import TablaCompras from '../components/compras/TablaCompras';
import { Container, Col, Row, Button } from 'react-bootstrap';
import CuadroBusquedas from '../components/Busquedas/CuadroBusquedas';
import ModalRegistroCompra from '../components/compras/ModalRegistroCompra';
import { useNavigate } from 'react-router-dom';

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCompra, setNuevaCompra] = useState({
    id_empleado: "",
    fecha_compra: "",
    total_compra: "",
  });

  const navigate = useNavigate();

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCompra((prev) => ({ ...prev, [name]: value }));
  };

  const agregarCompra = async () => {
    if (!nuevaCompra.id_empleado.trim()) return;

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarcompra",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaCompra),
        }
      );

      if (!respuesta.ok) throw new Error("Error al guardar");

      setNuevaCompra({ id_empleado: "", fecha_compra: "", total_compra: "" });
      setMostrarModal(false);
      await obtenerCompras();
    } catch (error) {
      console.error("Error al agregar la compra:", error);
      alert("No se pudo guardar la compra. Revisa la consola.");
    }
  };

  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/compras");
      if (!respuesta.ok) throw new Error("Error al obtener las compras");
      const datos = await respuesta.json();

      setCompras(datos);
      setComprasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = compras.filter(
      (compra) =>
        compra.id_empleado.toString().includes(texto) ||
        compra.total_compra.toString().includes(texto)
    );
    setComprasFiltradas(filtrados);
  };

  useEffect(() => {
    obtenerCompras();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('https://images.unsplash.com/photo-1608498641830-d876b3913b27?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px',
      }}
    >
      <Container style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '20px' }}>
        <h4>Compras</h4>

        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate('/inicio')}
        >
          Volver al Inicio
        </Button>

        <Row>
          <Col lg={5} md={6} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setMostrarModal(true)}>
              + Nueva Compra
            </Button>
          </Col>
        </Row>

        <TablaCompras compras={comprasFiltradas} cargando={cargando} />

        <ModalRegistroCompra
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCompra={nuevaCompra}
          manejarCambioInput={manejarCambioInput}
          agregarCompra={agregarCompra}
        />
      </Container>
    </div>
  );
};

export default Compras;
