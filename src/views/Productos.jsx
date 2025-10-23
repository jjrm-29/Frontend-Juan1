import {useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import TablaProductos from '../components/productos/TablaProductos';


const Productos = () => {
const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/categorias");

      if (!respuesta.ok) {
        throw new Error("Error al obtener los productos");
      }
      const datos = await respuesta.json();

      setProductos(datos);
      setCargando(false);
    } catch (error) {
      console.log("Error:", error.message);
      setCargando(false);
    }
  };
  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <>
 <Container className="my-4">
      <h4> Productos </h4>
        <TablaProductos
         roductos={productos}
          cargando={cargando} />
    </Container> 
    </>
  );
};

export default Productos;