import { useState, useEffect, useMemo } from "react";
import TablaProductos from "../components/productos/TablaProductos";
import { Container, Col, Row, Button } from "react-bootstrap";
import CuadroBusquedas from "../components/Busquedas/CuadroBusquedas";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';



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

  const generatePDFProductos = () => {
    const doc = new jsPDF();

    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Lista de Productos", doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });

    const columnas = [
      "ID",
      "Nombre",
      "Descripción",
      "Categoría",
      "Precio Unitario",
      "Stock",
    ];
    const filas = productos.map((producto) => [
      producto.id_producto,
      producto.nombre_producto,
      producto.descripcion_producto,
      producto.id_categoria,
      `C$ ${parseFloat(producto.precio_unitario).toFixed(2)}`,
      producto.stock,
    ]);

    const totalPaginas = "{total_pages_count_string}";

    autoTable(doc, {
      head: [columnas], // CORREGIDO: antes estaba 'heard'
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
      tableWidth: "auto",
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
      },
      pageBreak: "auto",
      rowPageBreak: "auto",
      didDrawPage: function (data) {
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();

        const numeroPagina = doc.internal.getNumberOfPages(); // CORREGIDO

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
        doc.text(piePagina, anchoPagina / 2, alturaPagina - 10, {
          align: "center",
        });
      },
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPaginas);
    }

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const nombreArchivo = `productos_${dia}${mes}${anio}.pdf`;

    doc.save(nombreArchivo);
  };

const generatePDFDetalleProducto = (producto) => {
  if (!producto) return;

  const doc = new jsPDF();
  const anchoPagina = doc.internal.pageSize.getWidth();

  // Encabezado
  doc.setFillColor(28, 41, 51);
  doc.rect(0, 0, anchoPagina, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);

  const titulo = String(producto.nombre_producto || "");
  const anchoTexto = doc.getTextWidth(titulo);
  const posicionX = (anchoPagina - anchoTexto) / 2;
  doc.text(titulo, posicionX, 18);

  doc.text(producto.nombre_producto, anchoPagina / 2, 18, { align: "center" });

  let posicionY = 58;

  // Imagen (solo si existe)
  if (producto.imagen) {
    try {
      const propiedadesImagen = doc.getImageProperties(producto.imagen);
      const anchoImagen = 100;
      const altoImagen = (propiedadesImagen.height * anchoImagen) / propiedadesImagen.width;
      const posicionXImagen = (anchoPagina - anchoImagen) / 2;

      doc.addImage(producto.imagen, "JPEG", posicionXImagen, 35, anchoImagen, altoImagen);
      posicionY += altoImagen + 10;
    } catch (error) {
      console.warn("No se pudo cargar la imagen en el PDF");
    }
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);

  doc.text(`Descripción: ${producto.descripcion_producto}`, anchoPagina / 2, posicionY, { align: "center" });
  doc.text(`Categoría: ${producto.id_categoria}`, anchoPagina / 2, posicionY + 10, { align: "center" });
  doc.text(`Precio: C$ ${Number(producto.precio_unitario).toFixed(2)}`, anchoPagina / 2, posicionY + 20, { align: "center" });
  doc.text(`Stock: ${producto.stock}`, anchoPagina / 2, posicionY + 30, { align: "center" });

  // Guardar PDF
  doc.save(`detalle_${producto.nombre_producto}.pdf`);
};



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
        <Col lg={3} md={4} sm={4} xs={5} >
        <Button
        className="mb-3"
        onClick={generatePDFProductos}
        variant="secondary"
      >
        Generar reporte PDF
      </Button>
      </Col>

      <Button
      variant="outline-secondary"
      size="sm"
      className="me-2"
      onClick={() => generatePDFDetalleProducto(productos)}
    >
      <i className="bi bi-file-earmark-pdf"></i>
      Reporte PDF Detalle
    </Button>

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
