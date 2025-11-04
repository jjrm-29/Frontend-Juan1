import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";  // Asegúrate de tener este componente

const TablaVentas = ({ ventas, cargando }) => {
  const [orden, setOrden] = useState({
    campo: "id_venta",  // Se inicia con el campo "id_venta"
    direccion: "asc",   // Se inicia con el orden ascendente
  });

  // Función para manejar el cambio de orden
  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc", // Alterna entre ascendente y descendente
    }));
  };

  // Ordenar las ventas en función del estado de `orden`
  const ventasOrdenadas = [...ventas].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    // Si los valores son números (como total_venta), ordenamos numéricamente
    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    // Si son fechas (como fecha_venta), los comparamos como fechas
    if (valorA instanceof Date && valorB instanceof Date) {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    // Si son cadenas de texto, usamos localeCompare para la comparación alfabética
    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando)
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando ventas...</span>
        </Spinner>
      </>
    );

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <BotonOrden
              campo="id_venta"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              ID
            </BotonOrden>

            <BotonOrden
              campo="id_cliente"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              ID Cliente
            </BotonOrden>

            <BotonOrden
              campo="id_empleado"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              ID Empleado
            </BotonOrden>

            <BotonOrden
              campo="fecha_venta"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Fecha Venta
            </BotonOrden>

            <BotonOrden
              campo="total_venta"
              orden={orden}
              manejarOrden={manejarOrden}
            >
              Total Venta
            </BotonOrden>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasOrdenadas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_cliente}</td>
              <td>{venta.id_empleado}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.total_venta}</td>
              <td>Acción</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TablaVentas;
