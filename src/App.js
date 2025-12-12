
// Importamos la librería principal de React.
import React from 'react';
// Importamos la hoja de estilos CSS específica de la aplicación.
import './assets/css/App.css';

// Importamos los módulos necesarios de 'react-router-dom'.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos los componentes que serán mostrados en las rutas.
import Home from './components/Home.jsx';
import Personas from './components/Personas.jsx';
import Asignaturas from './components/Asignaturas.jsx';
import Matriculas from './components/Matriculas.jsx';
//LÍNEA CORREGIDA: Importamos el componente Menu para que esté definido.
import Menu from './components/Menu.jsx'; 

// Definimos el componente principal (función) de la aplicación.
function App() {
  return (
    <Router>
      {/* Colocamos el Menú aquí para que se muestre en todas las páginas. */}
      <Menu /> 
      
      <Routes>
        {/* RUTA DE INICIO CORREGIDA para mostrar Home */}
        <Route 
          path="/" 
          element={<Home />} // <-- ¡Ahora muestra el nuevo componente Home!
        />

        {/* Definición de la primera ruta: */}
        <Route 
          path="/Personas"// Cuando la URL es la raíz (http://localhost:3001/)
          element={<Personas />} // Se muestra el componente Personas.jsx
        />
        
        {/* Definición de la segunda ruta: */}
        <Route 
          path="/Asignaturas"// Cuando la URL es http://localhost:3001/Asignaturas
          element={<Asignaturas />} // Se muestra el componente Asignaturas.jsx
        />
        
        {/* Definición de la segunda ruta: */}
        <Route 
          path="/Matriculas"// Cuando la URL es http://localhost:3001/Asignaturas
          element={<Matriculas />} // Se muestra el componente Asignaturas.jsx
        />
        
      </Routes>
    </Router>
  );
}

// Exportamos el componente principal.
export default App;