import React from "react";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { BsPersonFill, BsLockFill } from "react-icons/bs";

const FormularioLogin = ({
  usuario,
  contrasena,
  error,
  setUsuario,
  setContrasena,
  iniciarSesion,
  cargando = false,
}) => {
  return (
    <>
      <div className="card-login">
        <div className="text-center mb-5">
          <div className="logo-circle">
            <BsLockFill size={45} />
          </div>
          <h2 className="text-white fw-bold mt-3">Bienvenido</h2>
          <p className="text-white-50">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={iniciarSesion}>
          <InputGroup className="mb-3">
            <InputGroup.Text className="icon">
              <BsPersonFill size={22} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="input"
            />
          </InputGroup>

          <InputGroup className="mb-4">
            <InputGroup.Text className="icon">
              <BsLockFill size={22} />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="input"
            />
          </InputGroup>

          <Button
            type="submit"
            size="lg"
            className="btn-login w-100"
            disabled={cargando}
          >
            {cargando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Cargando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <small className="text-white-50">
            © {new Date().getFullYear()} Tu Empresa
          </small>
        </div>
      </div>

      <style>{`
        .card-login {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 45px 40px;
          max-width: 440px;
          width: 100%;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .logo-circle {
          width: 90px;
          height: 90px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .input {
          background: rgba(255, 255, 255, 0.2) !important;
          border: none !important;
          color: white !important;
          padding: 14px 16px !important;
          font-size: 1.05rem;
        }

        .input::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
        }

        .input:focus {
          background: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }

        .icon {
          background: rgba(255, 255, 255, 0.2) !important;
          border: none !important;
          color: white !important;
        }

        .btn-login {
          background: white;
          color: #5a67d8;
          border: none;
          border-radius: 16px;
          font-weight: 600;
          height: 56px;
          transition: all 0.3s ease;
        }

        .btn-login:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </>
  );
};

export default FormularioLogin;
