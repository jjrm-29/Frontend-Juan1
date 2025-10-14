import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  // Alternar visibilidad del menú
  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  // Navegar y cerrar menú
const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  return (
    <Navbar expand="md" fixed="top" className="bg-primary">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/")}
          className="text-white fw-bold"
          style={{ cursor: "pointer" }}
        >
          Ferretería
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="menu-offcanvas"
          onClick={manejarToggle}
          className="bg-Primary"
        />

        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú principal</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">

              <Nav.Link 
              className={mostrarMenu ? "texto-marca" : "text-white"}
              onClick={() => manejarNavegacion("/")}
              >
               {mostrarMenu ? <i className="bi bi-house-fill"></i> : null} Inicio
              </Nav.Link>
              

              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/categorias")}
               >
               {mostrarMenu ? <i class="bi bi-bookmark-fill"></i> : null} Categorías
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/productos")}
               >
              {mostrarMenu ? <i class="bi bi-box-seam-fill"></i> : null} Productos
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/catalogo")}
              >
              {mostrarMenu ? <i class="bi bi-journal-bookmark-fill"></i> : null}Catálogo
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/clientes")}
               >
              {mostrarMenu ? <i class="bi bi-person-badge"></i> : null} Clientes
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/empleados")}
               >
               {mostrarMenu ? <i class="bi bi-people-fill"></i> : null} Empleados
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/usuarios")}
               >
              {mostrarMenu ? <i class="bi bi-person-fill-add"></i> : null} Usuarios
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/ventas")}
               >
              {mostrarMenu ? <i class="bi bi-bag-plus"></i> : null} Ventas
              </Nav.Link>


              <Nav.Link
              className={mostrarMenu ? "texto-marca" : "text-white"}
               onClick={() => manejarNavegacion("/compras")}
               >
              {mostrarMenu ? <i class="bi bi-basket-fill"></i> : null} Compras
              </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;

