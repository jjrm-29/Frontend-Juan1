import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";  // Asegúrate de tener este componente

const TablaProductos = ({ productos, cargando }) => {
  const [orden, setOrden] = useState({
    campo: "id_producto", // Se inicia con el campo "id_producto"
    direccion: "asc", // Se inicia con el orden ascendente
  });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc", // Alterna entre ascendente y descendente
    }));
  };

  // Ordenar los productos en función del estado de `orden`
  const productosOrdenados = [...productos].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    // Comparación numérica
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    // Si es una cadena de texto, se usa localeCompare
    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando)
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
      </>
    );

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <BotonOrden
              campo="id_producto"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              ID
            </BotonOrden>

            <BotonOrden
              campo="nombre_producto"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Nombre
            </BotonOrden>

            <BotonOrden
              campo="descripcion_producto"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Descripción
            </BotonOrden>

            <BotonOrden
              campo="id_categoria"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Categoría
            </BotonOrden>

            <BotonOrden
              campo="precio_unitario"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Precio
            </BotonOrden>

            <BotonOrden
              campo="stock"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Stock
            </BotonOrden>

            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosOrdenados.map((producto) => {
            return (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.descripcion_producto}</td>
                <td>{producto.id_categoria}</td>
                <td>{producto.precio_unitario}</td>
                <td>{producto.stock}</td>
                <td>{producto.imagen}</td>
                <td>Acción</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TablaProductos;
