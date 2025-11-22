import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  BsPeopleFill,
  BsCartFill,
  BsBoxSeam,
  BsPersonCheckFill,
  BsFillTagsFill,
  BsShop,
  BsBagFill
} from "react-icons/bs";

const ComponenteInicio = () => {
  const usuario = localStorage.getItem("usuario") || "Usuario";

  const tarjetas = [
    { titulo: "Empleados", icono: <BsPersonCheckFill size={40} />, ruta: "/empleados" },
    { titulo: "Clientes", icono: <BsPeopleFill size={40} />, ruta: "/clientes" },
    { titulo: "Usuarios", icono: <BsPeopleFill size={40} />, ruta: "/usuarios" },
    { titulo: "Productos", icono: <BsBoxSeam size={40} />, ruta: "/productos" },
    { titulo: "Categorías", icono: <BsFillTagsFill size={40} />, ruta: "/categorias" },
    { titulo: "Ventas", icono: <BsCartFill size={40} />, ruta: "/ventas" },
    { titulo: "Compras", icono: <BsBagFill size={40} />, ruta: "/compras" },
    { titulo: "Catálogo", icono: <BsShop size={40} />, ruta: "/catalogo" },
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-white mb-4">Bienvenido, {usuario}!</h2>
      <Row className="g-4">
        {tarjetas.map((t, idx) => (
          <Col key={idx} md={3} sm={6}>
            <Card className="card-panel text-center">
              <Card.Body>
                <div className="icono">{t.icono}</div>
                <Card.Title className="mt-3">{t.titulo}</Card.Title>
                <Button
                  variant="light"
                  className="mt-3"
                  onClick={() => (window.location.href = t.ruta)}
                >
                  Ir a {t.titulo}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ESTILOS */}
      <style>{`
        .card-panel {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card-panel:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .icono {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto;
        }
      `}</style>
    </Container>
  );
};

export default ComponenteInicio;
