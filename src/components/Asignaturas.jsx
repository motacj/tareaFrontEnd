// Importamos la librería principal de React.
import React from 'react';
// Importamos la función que creamos en nuestro servicio para obtener datos.
import { getAsignaturas } from '../services/apirest';
// 'class Personas extends React.Component' define el componente principal.
class Asignaturas extends React.Component {

    // El constructor se ejecuta al crear una instancia del componente.
    constructor(props) {
        super(props);
        // 'this.state' almacena los datos que el componente necesita para renderizarse.
        this.state = {
            asignaturas: [], // Array vacío para almacenar la lista de asignaturas.
            isLoading: true, // Indica que estamos esperando la respuesta de la API.
            error: null, // Almacena un mensaje de error si la petición falla.
        };
    }

    // 'componentDidMount' es un "hook" de React: se ejecuta JUSTO después de que el componente aparece en pantalla.
    componentDidMount() {
        // Llamamos a nuestra función de servicio.
        getAsignaturas()
            .then(data => {
                // Si la promesa se resuelve (petición exitosa), actualizamos el estado.
                this.setState({ 
                    asignaturas: data, // Guardamos el array de asignaturas.
                    isLoading: false // La carga ha terminado.
                });
            })
            .catch(error => {
                // Si la promesa es rechazada (hubo un error), actualizamos el estado con el error.
                console.error("Fallo al obtener la lista de asignaturas:", error);
                this.setState({ 
                    error: error.message, // Guardamos el mensaje de error para mostrar.
                    isLoading: false // La carga ha terminado (con error).
                });
            });
    }

    // El método 'render' se llama cada vez que el estado o las props cambian, devolviendo el HTML a mostrar.
    render() {
        // Desestructuramos el estado para usar las variables fácilmente.
        const { asignaturas, isLoading, error } = this.state;
        
        // 1. Mostrar Error si existe
        if (error) {
            return <div>Error al cargar los datos: **{error}**. Por favor, revisa la consola para más detalles.</div>;
        }

        // 2. Mostrar estado de Carga
        if (isLoading) {
            return <div>Cargando listado de asignaturas...</div>;
        }

        // 3. Renderizar el contenido final (Tabla)
        return (
            <div> 
                <h2>Lista de Asignaturas</h2>
                {/* Comprobamos si el array está vacío */}
                {asignaturas.length === 0 ? (
                    <p>No se encontraron asignaturas en la base de datos.</p>
                ) : (
                    // Si hay datos, dibujamos la tabla.
                    <table border="1" style={{ width: '80%', borderCollapse: 'collapse', margin: '20px auto' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th>ID Profesor</th>
                                <th>ID Asignatura</th>
                                <th>Asignatura</th>
                                <th>Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Asumiendo que el array se llama 'asignaturas' y el elemento es 'asignatura' */}
                            {asignaturas.map(asignatura => (
                                // Usamos la clave compuesta
                                <tr key={asignatura.id_asignatura}> 
                                    <td>{asignatura.id_profesor}</td> 
                                    <td>{asignatura.id_asignatura}</td> 
                                    <td>{asignatura.nombre_asignatura}</td> {/* Coincide con el encabezado 'Nombre Asignatura' */}
                                    <td>{asignatura.horario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

// 'export default' hace que este componente esté disponible para ser usado en 'App.js'.
export default Asignaturas;
