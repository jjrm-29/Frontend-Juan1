import { useState, useEffect, useMemo } from "react";
import TablaProductos from "../components/productos/TablaProductos";
import { Container, Col, Row, Button } from "react-bootstrap";
import CuadroBusquedas from "../components/CuadroBusquedas/Busquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";

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

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  // Manejo de inputs
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar producto
  const agregarProducto = async () => {
    const { nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen } = nuevoProducto;

    if (!nombre_producto || !descripcion_producto || !id_categoria || !precio_unitario || !stock || !imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarproductos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoProducto,
          precio_unitario: Number(precio_unitario),
          stock: Number(stock),
          id_categoria: Number(id_categoria),
        }),
      });

      if (!respuesta.ok) throw new Error("Error al guardar el producto");

      setNuevoProducto({ nombre_producto: "", descripcion_producto: "", id_categoria: "", precio_unitario: "", stock: "", imagen: "" });
      setMostrarModal(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("No se pudo guardar el producto. Revisa la consola.");
    }
  };

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      if (!respuesta.ok) throw new Error("Error al obtener los productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  // Filtrado de búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);

    const filtrados = productos.filter(
      (p) =>
        p.nombre_producto.toLowerCase().includes(texto) ||
        p.descripcion_producto.toLowerCase().includes(texto) ||
        String(p.precio_unitario).includes(texto) ||
        String(p.stock).includes(texto) ||
        String(p.id_producto).includes(texto) ||
        String(p.id_categoria).includes(texto)
    );

    setProductosFiltrados(filtrados);
  };

  // Productos paginados
  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    return productosFiltrados.slice(inicio, inicio + elementosPorPagina);
  }, [productosFiltrados, paginaActual]);

  // Edición
  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!productoEditado || !productoEditado.nombre_producto.trim()) return;

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarProductos/${productoEditado.id_producto}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productoEditado,
            precio_unitario: Number(productoEditado.precio_unitario),
            stock: Number(productoEditado.stock),
            id_categoria: Number(productoEditado.id_categoria),
          }),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar");

      setMostrarModalEdicion(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al editar producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  // Eliminación
  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarProducto/${productoAEliminar.id_producto}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar");

      setMostrarModalEliminar(false);
      setProductoAEliminar(null);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Productos</h4>
      <Row>
        <Col lg={5} md={6} sm={8} xs={7}>
          <CuadroBusquedas textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setMostrarModal(true)}>
            + Nuevo Producto
          </Button>
        </Col>
      </Row>

      <TablaProductos
        productos={productosPaginados}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={productosFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
      />
      <ModalEdicionProducto
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        productoEditado={productoEditado}
        setProductoEditado={setProductoEditado}
        guardarEdicion={guardarEdicion}
      />
      <ModalEliminacionProducto
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        producto={productoAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Productos;
