import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/Personas" style={{ margin: '0 15px', textDecoration: 'none' }}>
        Personas
      </Link>
      <Link to="/Asignaturas" style={{ margin: '0 15px', textDecoration: 'none' }}>
        Asignaturas
      </Link>
      <Link to="/Matriculas" style={{ margin: '0 15px', textDecoration: 'none' }}>
        Matriculas
      </Link>
    </nav>
  );
}

export default Menu;