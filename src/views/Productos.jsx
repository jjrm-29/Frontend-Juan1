import { useState, useEffect } from "react";
import TablaProductos from "../components/productos/TablaProductos";
import { Container, Col, Row, Button } from "react-bootstrap";
import CuadroBusquedas from "../components/CuadroBusquedas/busquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    id_categoria: "",
    precio_unitario: "",
    stock: "",
    imagen: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const agregarProducto = async () => {
    if (
      !nuevoProducto.nombre_producto.trim() ||
      !nuevoProducto.descripcion_producto.trim() ||
      !nuevoProducto.id_categoria.trim() ||
      !nuevoProducto.precio_unitario.trim() ||
      !nuevoProducto.stock.trim() ||
      !nuevoProducto.imagen.trim()
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarproductos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoProducto),
        }
      );

      if (!respuesta.ok) throw new Error("Error al guardar el producto");

      // Limpiar y cerrar
      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        imagen: "",
      });
      setMostrarModal(false);
      await obtenerProductos(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar el Produco:", error);
      alert("No se pudo guardar la venta. Revisa la consola.");
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");

      if (!respuesta.ok) throw new Error("Error al obtener los Productos");

      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto) ||
        String(producto.precio_unitario).toLowerCase().includes(texto) ||
        String(producto.stock).toLowerCase().includes(texto)
    );

    setProductosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

    return (
      <Container className="mt-4">
        <h4>Productos</h4>
        <Row>
          <Col lg={5} md={6} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setMostrarModal(true)}>
              + Nuevo Producto
            </Button>
          </Col>
        </Row>

        <TablaProductos productos={productosFiltrados} cargando={cargando} />

        <ModalRegistroProducto
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoProducto={nuevoProducto}
          manejarCambioInput={manejarCambioInput}
          agregarProducto={agregarProducto}
        />
      </Container>
    );
  };

export default Productos;
