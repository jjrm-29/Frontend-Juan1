import {Table, Spinner} from 'react-bootstrap';

const TablaCompras = ({ compras, cargando }) => {

    if (cargando)
        return (
            <>

                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando compras...</span>
                </Spinner>
            </>

        );
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>id_empleado</th>
                        <th>fecha_compra</th>
                        <th>total_compra</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras?.map((compra) => (
                        <tr key={compra.id_compra}>
                            <td>{compra.id_compra}</td>
                            <td>{compra.id_empleado}</td>
                            <td>{compra.fecha_compra}</td>
                            <td>{compra.total_compra}</td>
                            <td>Acción</td>
                        </tr>
                    ))}


                </tbody>
            </Table>
        </>
    );
}
export default TablaCompras;