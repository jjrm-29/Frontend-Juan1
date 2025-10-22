import {Table, Spinner} from 'react-bootstrap';

const TablaCategorias = ({categorias, cargando}) => {
    if(cargando) {
        return( 
        <>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando categorias...</span>
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
          <th>Nombre categoria </th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => {
            return (
                <tr key={categoria.categoria.id}>
                    <td> {categoria.id_categoria} </td>
                    <td> {categoria.Nombre_categoria} </td>
                    <td> {categoria.descripcion_categoria} </td>
                    <td>Acción</td>
                </tr>
            );
        })}

      </tbody>
    </Table>
    
    </>
    );  
}
export default TablaCategorias;