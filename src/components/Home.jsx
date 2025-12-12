import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    // Puedes usar estilos en línea o importar un archivo CSS
    const buttonStyle = {
        padding: '10px 20px',
        margin: '10px 0',
        width: '200px',
        textDecoration: 'none',
        textAlign: 'center',
        backgroundColor: '#007bff', // Color de botón
        color: 'white',
        borderRadius: '5px',
        display: 'block' // Para que cada botón ocupe toda la columna (stacking)
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            
            {/* Logo */}
            <h1>Mi Académica</h1>
            <p>Sistema de Gestión de Alumnos y Cursos</p>
            

            {/* Contenedor de Botones en Columna */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
                
                <Link to="/personas" style={buttonStyle}>
                    Gestionar Personas
                </Link>
                
                <Link to="/asignaturas" style={buttonStyle}>
                    Listar Asignaturas
                </Link>
                
                <Link to="/matriculas" style={buttonStyle}>
                    Ver Matrículas
                </Link>
            </div>
        </div>
    );
}

export default Home;