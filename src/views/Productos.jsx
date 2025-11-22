import { useState, useEffect, useMemo } from "react";
import TablaProductos from "../components/productos/TablaProductos";
import { Container, Col, Row, Button } from "react-bootstrap";
import CuadroBusquedas from "../components/Busquedas/CuadroBusquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

  // Imagen de fondo para la vista web
  const fondoVista = "/fondo_productos.jpg"; // coloca tu imagen en /public

  // Manejo inputs
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
      const respuesta = await fetch("http://localhost:3000/api/Productos", {
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
      alert("No se pudo guardar el producto.");
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

  // PDF Lista
  const generatePDFProductos = () => {
    const doc = new jsPDF();
    const columnas = ["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"];
    const filas = productos.map((p) => [
      p.id_producto,
      p.nombre_producto,
      p.descripcion_producto,
      p.id_categoria,
      `C$ ${Number(p.precio_unitario).toFixed(2)}`,
      p.stock,
    ]);
    autoTable(doc, { head: [columnas], body: filas });
    doc.save("productos.pdf");
  };

  // PDF Detalle
  const generatePDFDetalleProducto = (producto) => {
    if (!producto) return;

    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.getWidth();
    const altoPagina = doc.internal.pageSize.getHeight();

    // Imagen de fondo en PDF
    const fondoPDF = "/fondo_productos.jpg"; // ruta pública
    try {
      doc.addImage(fondoPDF, "JPEG", 0, 0, anchoPagina, altoPagina);
    } catch (error) {
      console.warn("No se pudo cargar la imagen de fondo en el PDF");
    }

    let posicionY = 50;

    // Imagen del producto
    if (producto.imagen) {
      try {
        const anchoImagen = 100;
        const altoImagen = 100;
        const posicionXImagen = (anchoPagina - anchoImagen) / 2;
        doc.addImage(producto.imagen, "JPEG", posicionXImagen, posicionY, anchoImagen, altoImagen);
        posicionY += altoImagen + 10;
      } catch (error) {
        console.warn("No se pudo cargar la imagen del producto en el PDF");
      }
    }

    doc.setFontSize(14);
    doc.text(`Nombre: ${producto.nombre_producto}`, anchoPagina / 2, posicionY, { align: "center" });
    doc.text(`Descripción: ${producto.descripcion_producto}`, anchoPagina / 2, posicionY + 10, { align: "center" });
    doc.text(`Categoría: ${producto.id_categoria}`, anchoPagina / 2, posicionY + 20, { align: "center" });
    doc.text(`Precio: C$ ${Number(producto.precio_unitario).toFixed(2)}`, anchoPagina / 2, posicionY + 30, { align: "center" });
    doc.text(`Stock: ${producto.stock}`, anchoPagina / 2, posicionY + 40, { align: "center" });

    // Texto “Volver al inicio”
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.text("Volver al inicio", anchoPagina / 2, altoPagina - 20, { align: "center", link: "#" });

    doc.save(`detalle_${producto.nombre_producto}.pdf`);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${fondoVista})`, backgroundSize: "cover", minHeight: "100vh", padding: "20px" }}>
      <Container>
        <h4 className="text-white">Productos</h4>
        <Row className="mb-3">
          <Col lg={5} md={6} sm={8} xs={7}>
            <CuadroBusquedas textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setMostrarModal(true)}>+ Nuevo Producto</Button>
            <Button variant="secondary" className="ms-2" onClick={() => window.location.href = "/"}>
              Volver al inicio
            </Button>
          </Col>
        </Row>

        <TablaProductos
          productos={productosPaginados}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          generatePDFDetalleProducto={generatePDFDetalleProducto} // <-- pasa esta función a la tabla
          totalElementos={productosFiltrados.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />

        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={generatePDFProductos}>
              Generar PDF Lista
            </Button>
          </Col>
        </Row>

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
    </div>
  );
};

export default Productos;
