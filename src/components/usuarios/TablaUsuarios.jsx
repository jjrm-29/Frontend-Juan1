import React, { useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaUsuarios = ({ usuarios, cargando }) => {
  const [orden, setOrden] = useState({ campo: "id", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const usuariosOrdenadas = [...usuarios].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <Spinner animation="border">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <BotonOrden campo="id" orden={orden} manejarOrden={manejarOrden}>
            ID
          </BotonOrden>

          <BotonOrden campo="usuario" orden={orden} manejarOrden={manejarOrden}>
            Usuario
          </BotonOrden>

          <BotonOrden campo="contrasena" orden={orden} manejarOrden={manejarOrden}>
            Contraseña
          </BotonOrden>

          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuariosOrdenadas.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.usuario}</td>
            <td>{usuario.contrasena}</td>
            <td>Acción</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaUsuarios;
