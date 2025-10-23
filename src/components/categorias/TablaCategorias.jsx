import {Table, Spinner} from 'react-bootstrap';

const TablaCategorias = ({ categorias, cargado }) => {

    if (cargado)
        return (
            <>

                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>

        );
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
                    {categorias.map((categoria) => (
                        <tr key={categoria.id_categoria}>
                            <td>{categoria.id_categoria}</td>
                            <td>{categoria.nombre_categoria}</td>
                            <td>{categoria.descripcion_categoria}</td>
                            <td>Acción</td>
                        </tr>
                    ))}


                </tbody>
            </Table >
        </>
    );
}
export default TablaCategorias;