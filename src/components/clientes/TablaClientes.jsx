import {Table, Spinner} from 'react-bootstrap';

const TablaClientes = ({clientes, cargando}) => {
    if(cargando) {
        return( 
        <>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando clientes...</span>
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
          <th>primer_nombre</th>
          <th>segundo_nombre</th>
          <th>primer_apellido</th>
          <th>segundo_apellido</th>
          <th>telefono</th>
          <th>direccion</th>
          <th>cedula</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((clientes) => {
            return (
                <tr key={clientes.cliente.id}>
                    <td>{clientes.cliete.id} </td>
                    <td> {clientes.primer_nombre} </td>
                    <td> {clientes.segundo_nombre} </td>
                    <td> {clientes.primer_apellido} </td>
                    <td> {clientes.segundo_apellido} </td>
                    <td> {clientes.telefono} </td>
                    <td> {clientes.direccion} </td>
                    <td> {clientes.cedula} </td>
                    <td>Acción</td>
                </tr>
            );
        })}

      </tbody>
    </Table>
    
    </>
    );  
}
export default TablaClientes;