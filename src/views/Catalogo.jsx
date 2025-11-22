import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Tarjeta from '../components/catalogo/Tarjeta';

const CatalogoProductos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setCargando(false);
    } catch (error) {
      console.log("Error al cargar los productos.")
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  if (cargando) return <div>Cargando...</div>;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('https://images.unsplash.com/photo-1612831455548-48c354f40b84?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '80px', // para separarlo del navbar si existe
      }}
    >
      <Container className="mt-5" style={{ backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '15px', padding: '20px' }}>
        <h4>Catálogo de Productos</h4>

        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate('/inicio')}
        >
          Volver al Inicio
        </Button>

        <Row>
          {listaProductos.map((producto, indice) => (
            <Tarjeta
              key={producto.id_producto}
              indice={indice}
              nombre_producto={producto.nombre_producto}
              descripcion_producto={producto.descripcion_producto}
              precio_unitario={producto.precio_unitario}
              stock={producto.stock}
              id_categoria={producto.id_categoria}
              imagen={producto.imagen}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CatalogoProductos;
