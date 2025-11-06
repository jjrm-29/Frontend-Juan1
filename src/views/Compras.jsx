import {useState,useEffect} from 'react';
import TablaCompras from '../components/compras/TablaCompras';
import { Container, Col, Row, Button } from 'react-bootstrap';
import CuadroBusquedas from '../components/CuadroBusquedas/Busquedas';
import ModalRegistroCompra from '../components/compras/ModalRegistroCompra';


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

      // Limpiar y cerrar
      setNuevaCompra({ id_empleado: "", fecha_compra: "", total_compra: "" });
      setMostrarModal(false);
      await obtenerCompras(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar la compra:", error);
      alert("No se pudo guardar el compra. Revisa la consola.");
    }
  };


    const obtenerCompras = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/compras");

            if (!respuesta.ok) {
              throw new Error("Error al obtener las compras");
            }
            const datos = await respuesta.json();
            
            setCompras(datos);
            setComprasFiltradas(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }


    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = compras.filter(
            (compras) =>
                compras.id_empleado == texto ||
                compras.total_compra == texto

        );
        setComprasFiltradas(filtrados);
    };


    useEffect(() => {
        obtenerCompras();
    }, []);

    return (
      <>
        <Container className="mt-4">
          <h4>Compras</h4>
          <Row>
            <Col lg={5} md={6} sm={8} xs={7}>
              <CuadroBusquedas
                textoBusqueda={textoBusqueda}
                manejarCambioBusqueda={manejarCambioBusqueda}
              />
            </Col>
            <Col className="text-end">
              <Button variant="primary" onClick={() => setMostrarModal(true)}>
                + Nuevo Compras
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
      </>
    );
}


export default Compras;