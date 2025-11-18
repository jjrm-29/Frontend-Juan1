import React, { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";
import { jsPDF } from "jspdf"; // ← IMPORTANTE

const TablaProductos = ({
  productos,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
}) => {
  const [orden, setOrden] = useState({
    campo: "id_producto",
    direccion: "asc",
  });

  const generatePDFDetalleProducto = (producto) => {
    if (!producto) return;

    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.getWidth();

    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, anchoPagina, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(producto.nombre_producto, anchoPagina / 2, 18, {
      align: "center",
    });

    let posicionY = 58;

    // Imagen si existe
    if (producto.imagen) {
      try {
        const base64Image = `data:image/jpeg;base64,${producto.imagen}`;
        const props = doc.getImageProperties(base64Image);

        const anchoImg = 100;
        const altoImg = (props.height * anchoImg) / props.width;
        const posX = (anchoPagina - anchoImg) / 2;

        doc.addImage(base64Image, "JPEG", posX, 35, anchoImg, altoImg);
        posicionY += altoImg + 10;
      } catch (error) {
        console.warn("Error cargando imagen en el PDF");
      }
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);

    doc.text(`Descripción: ${producto.descripcion_producto}`, anchoPagina / 2, posicionY, { align: "center" });
    doc.text(`Categoría: ${producto.id_categoria}`, anchoPagina / 2, posicionY + 10, { align: "center" });
    doc.text(`Precio: C$ ${Number(producto.precio_unitario).toFixed(2)}`, anchoPagina / 2, posicionY + 20, { align: "center" });
    doc.text(`Stock: ${producto.stock}`, anchoPagina / 2, posicionY + 30, { align: "center" });

    doc.save(`detalle_${producto.nombre_producto}.pdf`);
  };

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const productosOrdenados = [...productos].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando productos...</span>
      </Spinner>
    );

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <BotonOrden campo="id_producto" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>
            <BotonOrden campo="nombre_producto" orden={orden} manejarOrden={manejarOrden}>
              Nombre
            </BotonOrden>
            <BotonOrden campo="descripcion_producto" orden={orden} manejarOrden={manejarOrden}>
              Descripción
            </BotonOrden>
            <BotonOrden campo="id_categoria" orden={orden} manejarOrden={manejarOrden}>
              Categoría
            </BotonOrden>
            <BotonOrden campo="precio_unitario" orden={orden} manejarOrden={manejarOrden}>
              Precio
            </BotonOrden>
            <BotonOrden campo="stock" orden={orden} manejarOrden={manejarOrden}>
              Stock
            </BotonOrden>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosOrdenados.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.descripcion_producto}</td>
              <td>{producto.id_categoria}</td>
              <td>{producto.precio_unitario}</td>
              <td>{producto.stock}</td>

              <td>
                {producto.imagen ? (
                  <img
                    src={`data:image/png;base64,${producto.imagen}`}
                    alt={producto.nombre_producto}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  "Sin imagen"
                )}
              </td>

              <td>
                {/* BOTÓN PDF */}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => generatePDFDetalleProducto(producto)}
                >
                  <i className="bi bi-file-earmark-pdf"></i>
                </Button>

                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(producto)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(producto)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaProductos;
