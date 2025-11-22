import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import CuadroBusquedas from "../components/Busquedas/CuadroBusquedas";
import ModalRegistroUsuario from "../components/usuarios/ModalRegistroUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    contrasena: "", // sin ñ, para unificar con frontend
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const agregarUsuario = async () => {
    if (!nuevoUsuario.usuario.trim()) return;
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarusuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: nuevoUsuario.usuario,
            contraseña: nuevoUsuario.contrasena, // mapear al nombre del backend
          }),
        }
      );
      if (!respuesta.ok) throw new Error("Error al guardar");
      setNuevoUsuario({ usuario: "", contrasena: "" });
      setMostrarModal(false);
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo guardar el usuario. Revisa la consola.");
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios");
      if (!respuesta.ok) throw new Error("Error al obtener los usuarios");
      const datos = await respuesta.json();

      // Mapear campos para frontend
      const usuariosSanitizados = datos.map((u) => ({
        id: u.id_usuario,
        usuario: u.usuario ?? "Sin nombre",
        contrasena: u.contraseña ?? "No disponible",
      }));

      setUsuarios(usuariosSanitizados);
      setUsuariosFiltrados(usuariosSanitizados);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = usuarios.filter(
      (usuario) =>
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.contrasena.toLowerCase().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Usuarios</h4>
      <Row className="align-items-center mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button
            className="color-boton-registro"
            onClick={() => setMostrarModal(true)}
          >
            + Nuevo Usuario
          </Button>
        </Col>
      </Row>
      <TablaUsuarios usuarios={usuariosFiltrados} cargando={cargando} />
      <ModalRegistroUsuario
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoUsuario={nuevoUsuario}
        manejarCambioInput={manejarCambioInput}
        agregarUsuario={agregarUsuario}
      />
    </Container>
  );
};

export default Usuarios;
