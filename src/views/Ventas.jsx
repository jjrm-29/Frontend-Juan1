import {useState,useEffect} from 'react';
import TablaVentas from '../components/ventas/TablaVentas';
import { Container, Col, Row, Button } from 'react-bootstrap';
import CuadroBusquedas from "../components/CuadroBusquedas/busquedas";
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente';


const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [ventasFiltradas, setVentasFiltrados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoVentas, setNuevoVentas] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    direccion: "",
    cedula: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prev) => ({ ...prev, [name]: value }));
  };

  const agregarCliente = async () => {
    if (!nuevoCliente.primer_nombre.trim()) return;

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarcliente",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoCliente),
        }
      );

      if (!respuesta.ok) throw new Error("Error al guardar");

      // Limpiar y cerrar
      setNuevoCliente({ primer_nombre: "", segundo_nombre: "", primer_apellido: "",
    segundo_apellido: "",celular: "", direccion: "",cedula: "" });
      setMostrarModal(false);
      await obtenerClientes(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
      alert("No se pudo guardar el cliente. Revisa la consola.");
    }
  };


    const obtenerClientes = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/clientes");

            if (!respuesta.ok) {
              throw new Error("Error al obtener los clientes");
            }
            const datos = await respuesta.json();

            setClientes(datos);
            setClientesFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }


    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = clientes.filter(
            (clientes) =>
                clientes.primer_nombre.toLowerCase().includes(texto) ||
                clientes.id_cliente.toString().includes(texto)

        );
        setClientesFiltrados(filtrados);
    };


    useEffect(() => {
        obtenerClientes();
    }, []);

    return (
      <>
        <Container className="mt-4">
          <h4>Clientes</h4>
          <Row>
            <Col lg={5} md={6} sm={8} xs={7}>
              <CuadroBusquedas
                textoBusqueda={textoBusqueda}
                manejarCambioBusqueda={manejarCambioBusqueda}
              />
            </Col>
            <Col className="text-end">
              <Button variant="primary" onClick={() => setMostrarModal(true)}>
                + Nuevo Cliente
              </Button>
            </Col>
          </Row>
          <TablaClientes clientes={clientesFiltrados} cargando={cargando} />
            <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
      />
        </Container>
      </>
    );
}


export default Ventas;

const Ventas = () => {

  return (
    <>
      <h2>Pagina de Ventas</h2>
    </>
  );

}

export default Ventas;