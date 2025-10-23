import {Table, Spinner} from 'react-bootstrap';

const TablaProductos = ({productos, cargando}) => {
    if(cargando) {
        return( 
        <>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        </>
        );
    }
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>categoria</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((productos) => {
            return (
                <tr key={productos.producto.id}>
                    <td>{productos.producto.id} </td>
                    <td> {productos.nombre_producto} </td>
                    <td> {productos.descripcion_producto} </td>
                    <td> {productos.id_categoria} </td>
                    <td> {productos.precio_unitario} </td>
                    <td> {productos.stock} </td>
                    <td> {productos.imagen} </td>
                    <td>Acción</td>
                </tr>
            );
        })}

      </tbody>
    </Table>
    
    </>
    );  
}
export default TablaProductos;