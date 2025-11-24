// src/views/Inicio.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUserTie, FaUsers, FaUser, FaBox, FaTags, FaShoppingCart, FaCashRegister, FaBook
} from "react-icons/fa";

const Inicio = () => {
  const location = useLocation();

  const secciones = [
    { nombre: "Empleados", ruta: "/empleados", color: "#0ea5e9", icon: FaUserTie },
    { nombre: "Clientes", ruta: "/clientes", color: "#38bdf8", icon: FaUsers },
    { nombre: "Usuarios", ruta: "/usuarios", color: "#2563eb", icon: FaUser },
    { nombre: "Productos", ruta: "/productos", color: "#22c55e", icon: FaBox },
    { nombre: "Categorías", ruta: "/categorias", color: "#f97316", icon: FaTags },
    { nombre: "Ventas", ruta: "/ventas", color: "#ef4444", icon: FaShoppingCart },
    { nombre: "Compras", ruta: "/compras", color: "#1e3a8a", icon: FaCashRegister },
    { nombre: "Catálogo", ruta: "/catalogo", color: "#8b5cf6", icon: FaBook },
  ];

  return (
    <div 
      style={{
        height: "100vh",
        width: "100%",
        background: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Mensaje de bienvenida */}
      <div style={{
        textAlign: "center",
        padding: "30px 10px",
        background: "#1e3a8a",
        color: "white",
      }}>
        <h3 style={{ margin: 0, fontWeight: "bold" }}>¡Bienvenido al sistema!</h3>
      </div>

      {/* Contenedor central */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}>
        <Container style={{
          background: "#f3f4f6",
          borderRadius: "20px",
          padding: "50px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          maxWidth: "1600px",
          width: "100%",
        }}>
          <Row style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center" }}>
            {secciones.map((sec, i) => {
              const Icono = sec.icon;
              const isActive = location.pathname.startsWith(sec.ruta);

              return (
                <Col key={i} style={{ width: "250px", display: "flex", justifyContent: "center" }}>
                  <Link to={sec.ruta} style={{ textDecoration: "none", width: "100%" }}>
                    <div
                      style={{
                        height: "180px",
                        borderRadius: "20px",
                        background: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isActive
                          ? `0 0 25px 8px ${sec.color}66`
                          : "0 8px 25px rgba(0,0,0,0.15)",
                        borderTop: `6px solid ${sec.color}`,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: "20px",
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      <Icono size={50} color={sec.color} style={{ marginBottom: "15px" }} />
                      <div style={{ fontSize: "18px", fontWeight: "600", color: "#333", textAlign: "center" }}>
                        {sec.nombre}
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Inicio;
