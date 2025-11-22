import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioLogin from "../components/Login/FormularioLogin";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navegar = useNavigate();

  const iniciarSesion = async (e) => {
    e?.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/verificarUsuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, contrasena }),
        }
      );

      const datos = await respuesta.json();

      if (datos) {
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("contrasena", contrasena);
        navegar("/inicio");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("usuario") && localStorage.getItem("contrasena")) {
      navegar("/inicio");
    }
  }, [navegar]);

  return (
    <>
      <div className="login-page">
        <FormularioLogin
          usuario={usuario}
          contrasena={contrasena}
          error={error}
          setUsuario={setUsuario}
          setContrasena={setContrasena}
          iniciarSesion={iniciarSesion}
          cargando={cargando}
        />
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #2a2a2a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Estilizando el formulario para que resalte */
        .login-page form {
          background-color: rgba(40, 40, 40, 0.95);
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 400px;
        }

        .login-page input {
          background-color: #1c1c1c;
          border: 1px solid #444;
          color: #fff;
        }

        .login-page input::placeholder {
          color: #aaa;
        }

        .login-page button {
          background-color: #667eea;
          border: none;
        }

        .login-page button:hover {
          background-color: #764ba2;
        }

        .login-page .error {
          color: #ff6b6b;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default Login;
