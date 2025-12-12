// Importamos la URL base que definimos en el archivo de constantes.
// Asumimos que el archivo 'constans' está en '../utils/constans'.
import { API_BASE_URL } from '../utils/constans'; 

// Definimos la parte específica de la ruta para la lista de personas,asignaturas y matriculas.
const RUTA_PERSONAS = 'api/v1/personas'; 
const RUTA_ASIGNATURAS = 'api/v2/asignaturas';
const RUTA_MATRICULAS = 'api/v3/matriculas';

// Definimos la parte específica de la ruta para borrado de personas,asignaturas y matriculas.

const RUTA_PERSONA_ID = 'api/v1/personas/';
const RUTA_ASIGNATURA_ID = 'api/v2/asignaturas/';
const RUTA_MATRICULA_ID = 'api/v3/matriculas/';

// Exportamos la función que otros componentes usarán para obtener datos.
export const getPersonas = () => {
    // 1. Construimos la URL completa combinando la base y la ruta específica.
    const url = `${API_BASE_URL}${RUTA_PERSONAS}`;
    
    // Paso de Depuración 1: Muestra la URL en la consola del navegador.
    console.log(`[API Service] Llamando a la URL: ${url}`); 
    
    // 'return fetch(url)' inicia la petición HTTP y devuelve una Promesa.
    return fetch(url)
        .then(response => {
            // **PROCESAMIENTO DE RESPUESTA**
            
            // Paso de Depuración 2: Clonamos la respuesta para poder ver el texto crudo.
            // Esto es útil para diagnosticar errores de JSON.
            response.clone().text().then(text => console.log('[API Service] Respuesta cruda recibida:', text)); 
            
            // Verificamos si la respuesta HTTP es exitosa (código 200-299).
            if (!response.ok) {
                // Si el código es un error (404, 500, etc.), lanzamos un error que va al 'catch'.
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            
            // Si la respuesta fue exitosa, convertimos el cuerpo a formato JSON.
            return response.json();
        })
        .then(data => {
            // **PROCESAMIENTO DE DATOS**
            
            // Paso de Depuración 3: Muestra los datos ya convertidos a objetos JavaScript.
            console.log('[API Service] Datos parseados (JSON):', data); 
            
            // Devolvemos el array de personas al componente Personas.jsx.
            return data; 
        })
        .catch(error => {
            // **MANEJO DE ERRORES**
            
            // Capturamos cualquier error (de red, de HTTP o de parseo de JSON).
            console.error('[API Service] Error durante la operación de fetch:', error);
            
            // Relanzamos el error para que el componente que llamó a 'getPersonas' lo pueda capturar.
            throw error; 
        });
};


//------------------------------------Get Asignaturas------------------------------------//
// Exportamos la función que otros componentes usarán para obtener datos.
export const getAsignaturas = () => {
    // 1. Construimos la URL completa combinando la base y la ruta específica.
    const url = `${API_BASE_URL}${RUTA_ASIGNATURAS}`;
    // Paso de Depuración 1: Muestra la URL en la consola del navegador.
    console.log(`[API Service] Llamando a la URL: ${url}`);
    // 'return fetch(url)' inicia la petición HTTP y devuelve una Promesa.
    return fetch(url)
        .then(response => {
            // **PROCESAMIENTO DE RESPUESTA**
            
            // Paso de Depuración 2: Clonamos la respuesta para poder ver el texto crudo.
            // Esto es útil para diagnosticar errores de JSON.
            response.clone().text().then(text => console.log('[API Service] Respuesta cruda recibida:', text)); 
            
            // Verificamos si la respuesta HTTP es exitosa (código 200-299).
            if (!response.ok) {
                // Si el código es un error (404, 500, etc.), lanzamos un error que va al 'catch'.
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            
            // Si la respuesta fue exitosa, convertimos el cuerpo a formato JSON.
            return response.json();
        })
        .then(data => {
            // **PROCESAMIENTO DE DATOS**
            
            // Paso de Depuración 3: Muestra los datos ya convertidos a objetos JavaScript.
            console.log('[API Service] Datos parseados (JSON):', data); 
            
            // Devolvemos el array de personas al componente Personas.jsx.
            return data; 
        })
        .catch(error => {
            // **MANEJO DE ERRORES**
            
            // Capturamos cualquier error (de red, de HTTP o de parseo de JSON).
            console.error('[API Service] Error durante la operación de fetch:', error);
            
            // Relanzamos el error para que el componente que llamó a 'getPersonas' lo pueda capturar.
            throw error; 
        });
};


//------------------------------------Get Matriculas------------------------------------//
// Exportamos la función que otros componentes usarán para obtener datos.
export const getMatriculas = () => {
    // 1. Construimos la URL completa combinando la base y la ruta específica.
    const url = `${API_BASE_URL}${RUTA_MATRICULAS}`;
    // Paso de Depuración 1: Muestra la URL en la consola del navegador.
    console.log(`[API Service] Llamando a la URL: ${url}`);
    // 'return fetch(url)' inicia la petición HTTP y devuelve una Promesa.
    return fetch(url)
        .then(response => {
            // **PROCESAMIENTO DE RESPUESTA**
            
            // Paso de Depuración 2: Clonamos la respuesta para poder ver el texto crudo.
            // Esto es útil para diagnosticar errores de JSON.
            response.clone().text().then(text => console.log('[API Service] Respuesta cruda recibida:', text)); 
            
            // Verificamos si la respuesta HTTP es exitosa (código 200-299).
            if (!response.ok) {
                // Si el código es un error (404, 500, etc.), lanzamos un error que va al 'catch'.
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            
            // Si la respuesta fue exitosa, convertimos el cuerpo a formato JSON.
            return response.json();
        })
        .then(data => {
            // **PROCESAMIENTO DE DATOS**
            
            // Paso de Depuración 3: Muestra los datos ya convertidos a objetos JavaScript.
            console.log('[API Service] Datos parseados (JSON):', data); 
            
            // Devolvemos el array de personas al componente Personas.jsx.
            return data; 
        })
        .catch(error => {
            // **MANEJO DE ERRORES**
            
            // Capturamos cualquier error (de red, de HTTP o de parseo de JSON).
            console.error('[API Service] Error durante la operación de fetch:', error);
            
            // Relanzamos el error para que el componente que llamó a 'getPersonas' lo pueda capturar.
            throw error; 
        });
};

//------------------------------------Delete Personas------------------------------------//
// Exportamos la función que otros componentes usarán para borrar datos.
export const deletePersona = (id) => {
    const url = `${API_BASE_URL}${RUTA_PERSONA_ID}${id}`;
    
    console.log(`[API Service] Solicitud DELETE a la URL: ${url}`);
    
    return fetch(url, {
        method: 'DELETE', //Método DELETE
        headers: {
            'Content-Type': 'application/json', 
        },
    })
    .then(response => {
        // El backend devuelve 200 (OK), que es correcto.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        // Devuelve null, ya que no esperamos un cuerpo JSON después de un borrado exitoso.
        return null; 
    })
    .catch(error => {
        console.error('[API Service] Error al intentar borrar la persona:', error);
        throw error;
    });
};

// ------------------------------------Post Persona (Insertar)------------------------------------//
export const postPersona = (nuevaPersona) => {
    const url = `${API_BASE_URL}${RUTA_PERSONAS}`; // POST usa la URL base
    
    console.log(`[API Service] Solicitud POST a la URL: ${url}`);
    
    return fetch(url, {
        method: 'POST', //Método POST
        headers: {
            'Content-Type': 'application/json', //CRÍTICO: Indica que el cuerpo es JSON
        },
        body: JSON.stringify(nuevaPersona), //CRÍTICO: Envía el objeto convertido a JSON
    })
    .then(response => {
        // El backend devuelve 201 (CREATED), pero devuelve el header de location.
        if (!response.ok) {
            // Manejo de errores de validación del backend
            return response.json().then(err => {
                throw new Error(`HTTP error! status: ${response.status}. Detalle: ${err.message || response.statusText}`);
            });
        }
        // No esperamos el objeto creado, solo confirmación.
        return response; 
    })
    .catch(error => {
        console.error('[API Service] Error al intentar insertar la persona:', error);
        throw error;
    });
};

//------------------------------------Put Persona (Update)------------------------------------//
export const putPersona = async (persona) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/v1/personas`, {
            method: 'PUT', // Método PUT para la actualización
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona),
        });

        if (response.status !== 200) { // Esperamos un 200 OK del backend
            throw new Error(`Error al actualizar, código: ${response.status}`);
        }
        
        return true; 
    } catch (error) {
        console.error('[API Service] Error al intentar actualizar la persona:', error);
        throw error;
    }
};