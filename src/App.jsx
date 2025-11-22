import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// Importar componente Encabezado
import Encabezado from "./components/navegacion/Encabezado";

// Importar las vistas
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Usuarios from "./views/Usuarios";
import Clientes from "./views/Clientes";
import Ventas from "./views/Ventas";
import Empleados from "./views/Empleados";
import Compras from "./views/Compras";
import Categorias from "./views/Categorias";
import Productos from "./views/Productos";
import Catalogo from "./views/Catalogo";
import RutaProtegida from "./components/rutas/RutaProtegida";

// Importar archivo de estilos
import "./App.css";

// Layout que controla si mostrar Encabezado
const Layout = ({ children }) => {
  const location = useLocation();
  const mostrarEncabezado = location.pathname === "/inicio"; // solo mostrar en Inicio

  return (
    <>
      {mostrarEncabezado && <Encabezado />}
      <main className="margen-superior-main">{children}</main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
