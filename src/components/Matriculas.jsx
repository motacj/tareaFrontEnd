// Archivo: Matriculas.jsx (CORREGIDO)

import React from 'react';
// Importamos la función de Matriculas, no la de Asignaturas.
import { getMatriculas } from '../services/apirest'; 

class Matriculas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matriculas: [], 
            isLoading: true, 
            error: null, 
        };
    }

    componentDidMount() {
        getMatriculas()
            .then(data => {
                this.setState({ 
                    matriculas: data, 
                    isLoading: false
                });
            })
            .catch(error => {
                // Texto de error corregido
                console.error("Fallo al obtener la lista de matriculas:", error); 
                this.setState({ 
                    error: error.message, 
                    isLoading: false
                });
            });
    }

    render() {
        // Desestructuramos 'matriculas' del estado (CORREGIDO)
        const { matriculas, isLoading, error } = this.state;
        
        // 1. Mostrar Error
        if (error) {
            return <div>Error al cargar los datos: **{error}**. Por favor, revisa la consola para más detalles.</div>;
        }

        // 2. Mostrar estado de Carga
        // Mensaje de carga corregido
        if (isLoading) {
            return <div>Cargando listado de matriculas...</div>; 
        }

        // 3. Renderizar el contenido final (Tabla)
        return (
            <div> 
                <h2>Lista de Matriculas</h2>
                
                {/* Usamos 'matriculas.length' para la comprobación */}
                {matriculas.length === 0 ? (
                    <p>No se encontraron matriculas en la base de datos.</p>
                ) : (
                    <table border="1" style={{ width: '80%', borderCollapse: 'collapse', margin: '20px auto' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th>ID Asignatura</th>
                                <th>ID Alumno</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matriculas.map((matricula, index) => (
                                // La clave debe ser única, usando los IDs anidados
                                <tr key={matricula.id.id_alumno + '-' + matricula.id.id_asignatura}> 
                                    <td>{matricula.id.id_alumno}</td>      
                                    <td>{matricula.id.id_asignatura}</td>   
                                    <td>{matricula.nota}</td>             
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

// Exportamos el componente con el nombre correcto
export default Matriculas;