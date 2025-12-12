import React from 'react';
// Importamos las funciones CRUD de la API
import { getPersonas, deletePersona, postPersona, putPersona } from '../services/apirest'; 

class Personas extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            personas: [],
            isLoading: true,
            error: null,
            showInsertForm: false, 
            isEditing: false,         // NUEVO: Estado para saber si estamos editando
            personaToEdit: null,      // NUEVO: Objeto a editar
            newPersona: { 
                id_persona: 0,
                nombre: '',
                apellidos: '',
                edad: 0,
            }
        };
        
        // Enlace de los métodos (¡AQUÍ ESTÁ LA CLAVE!)
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggleForm = this.handleToggleForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.fetchData = this.fetchData.bind(this); // Método de utilidad para recargar
        
        // 🔑 Enlaces de las nuevas funciones de EDICIÓN
        this.handleStartEdit = this.handleStartEdit.bind(this);      
        this.handleEditInputChange = this.handleEditInputChange.bind(this); 
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    // Método de utilidad para cargar datos desde la API
    fetchData() {
        this.setState({ isLoading: true, error: null });
        getPersonas()
            .then(data => this.setState({ personas: data, isLoading: false }))
            .catch(error => this.setState({ error: error.message, isLoading: false }));
    }

    componentDidMount() {
        this.fetchData();
    }

    // Lógica para Borrar (DELETE)
    handleDelete(id) {
        if (window.confirm(`¿Estás seguro de que quieres borrar la persona con ID ${id}?`)) {
            deletePersona(id)
                .then(() => {
                    console.log(`Persona con ID ${id} eliminada.`);
                    this.fetchData(); // Recargamos la lista para actualizar la tabla
                })
                .catch(error => {
                    alert(`Fallo al borrar la persona: ${error.message}`);
                });
        }
    }

    //Lógica del Formulario: Alternar visibilidad
    handleToggleForm() {
        this.setState(prevState => ({
            showInsertForm: !prevState.showInsertForm,
            // Limpiamos los datos del formulario al abrir/cerrar
            newPersona: { id_persona: 0, nombre: '', apellidos: '', edad: 0 } 
        }));
    }

    //Lógica del Formulario: Capturar entrada de datos (para INSERCIÓN)
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newPersona: {
                ...prevState.newPersona,
                // Si es 'edad', convertimos a entero. Si el valor es vacío o NaN, lo fijamos a 0.
                [name]: name === 'edad' ? (parseInt(value) || 0) : value 
            }
        }));
    }

    //Lógica para Insertar (POST)
    handleInsert(event) {
        event.preventDefault(); // Evita que la página se recargue
        
        // Validación básica (opcional, pero buena práctica)
        const { nombre, apellidos, edad } = this.state.newPersona;
        if (!nombre || !apellidos || edad <= 0) {
            alert('Por favor, completa todos los campos (Edad debe ser mayor a 0).');
            return;
        }

        postPersona(this.state.newPersona)
            .then(() => {
                alert('Persona insertada con éxito!');
                this.handleToggleForm(); // Cierra el formulario y limpia
                this.fetchData(); // Recarga la tabla para ver el nuevo registro
            })
            .catch(error => {
                // Muestra un error más detallado si es posible
                alert(`Error al insertar: ${error.message}. Por favor, revisa el log del backend.`);
                console.error("Error en handleInsert:", error);
            });
    }

    // 🔑 NUEVO: Inicia la edición y abre el formulario
    handleStartEdit(persona) {
        this.setState({
            isEditing: true,
            personaToEdit: { ...persona }, // Copia la persona al estado de edición
            showInsertForm: false // Cierra el formulario de inserción si estaba abierto
        });
    }

    // 🔑 NUEVO: Maneja los cambios en el formulario de edición
    handleEditInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            personaToEdit: {
                ...prevState.personaToEdit,
                [name]: name === 'edad' ? (parseInt(value) || 0) : value
            }
        }));
    }

    // 🔑 NUEVO: Envía la actualización (PUT)
    handleUpdate(event) {
        event.preventDefault();
        
        // Validación básica
        const { nombre, apellidos, edad } = this.state.personaToEdit;
        if (!nombre || !apellidos || edad <= 0) {
            alert('Por favor, completa todos los campos (Edad debe ser mayor a 0).');
            return;
        }

        putPersona(this.state.personaToEdit) // Llama a la función PUT
            .then(() => {
                alert(`Persona con ID ${this.state.personaToEdit.id_persona} actualizada con éxito!`);
                this.setState({ isEditing: false, personaToEdit: null }); // Cierra el formulario
                this.fetchData(); // Recarga la tabla
            })
            .catch(error => {
                alert(`Error al actualizar: ${error.message}. Por favor, revisa el log del backend.`);
                console.error("Error en handleUpdate:", error);
            });
    }

    render() {
        const { personas, isLoading, error, showInsertForm, newPersona, isEditing, personaToEdit } = this.state;
        
        // 1. Mostrar Error si existe
        if (error) {
             return <div>Error al cargar los datos: **{error}**. Por favor, revisa la consola y el estado de tu backend.</div>;
        }
        // 2. Mostrar estado de Carga
        if (isLoading) {
             return <div>Cargando listado de personas...</div>;
        }

        // 3. Renderizar el contenido final
        return (
            <div> 
                <h2>Lista de Personas</h2>
                
                {/* Botón de Insertar/Cancelar */}
                <button 
                    onClick={this.handleToggleForm}
                    style={{ padding: '10px', margin: '10px', backgroundColor: showInsertForm ? '#ffc107' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    disabled={isEditing} // Deshabilita si estás editando
                >
                    {showInsertForm ? 'Cancelar' : 'Insertar Nueva Persona'}
                </button>

                {/* Formulario de Inserción (Ya existente) */}
                {showInsertForm && (
                   <form onSubmit={this.handleInsert} style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <h3>Insertar Persona</h3>
                        
                         <input type="text" name="nombre" placeholder="Nombre" value={newPersona.nombre} onChange={this.handleInputChange} required style={{ margin: '5px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }} />
                         <input type="text" name="apellidos" placeholder="Apellidos" value={newPersona.apellidos} onChange={this.handleInputChange} required style={{ margin: '5px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }} />
                         <input type="number" name="edad" placeholder="Edad" value={newPersona.edad === 0 ? "" : newPersona.edad} onChange={this.handleInputChange} required min="1" style={{ margin: '5px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }} />
                        
                         <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>
                             Guardar Persona
                         </button>
                    </form>
                )}

                {/* Formulario de Edición (NUEVO) */}
                {isEditing && personaToEdit && (
                    <form onSubmit={this.handleUpdate} style={{ border: '2px solid #ff9800', padding: '20px', margin: '20px auto', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>Editando ID: {personaToEdit.id_persona}</h3>
                        
                        {/* El ID no se edita, pero se necesita para enviar el PUT */}
                        <input name="nombre" placeholder="Nombre" value={personaToEdit.nombre} onChange={this.handleEditInputChange} required style={{ margin: '5px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }} />
                        <input name="apellidos" placeholder="Apellidos" value={personaToEdit.apellidos} onChange={this.handleEditInputChange} required style={{ margin: '5px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }} />
                        <input type="number" name="edad" placeholder="Edad" value={personaToEdit.edad} onChange={this.handleEditInputChange} required min="1" style={{ margin: '5px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }} />
                        
                        <button type="submit" style={{ padding: '10px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>
                            Actualizar Persona
                        </button>
                        <button type="button" onClick={() => this.setState({ isEditing: false, personaToEdit: null })} style={{ padding: '10px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '5px', marginTop: '5px', cursor: 'pointer' }}>
                            Cancelar Edición
                        </button>
                    </form>
                )}
                
                {/* Renderizado de la Tabla */}
                {personas.length === 0 ? (
                    <p>No se encontraron personas en la base de datos.</p>
                ) : (
                    <table border="1" style={{ width: '80%', borderCollapse: 'collapse', margin: '20px auto' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2', color: 'black' }}>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Edad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map(persona => (
                                <tr key={persona.id_persona}> 
                                    <td>{persona.id_persona}</td>
                                    <td>{persona.nombre}</td> 
                                    <td>{persona.apellidos}</td> 
                                    <td>{persona.edad}</td> 
                                    {/* Botones de Acción */}
                                    <td>
                                        {/* Botón de Borrar */}
                                        <button 
                                            onClick={() => this.handleDelete(persona.id_persona)}
                                            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        >
                                            Borrar
                                        </button>
                                        
                                        {/* Botón de Editar */}
                                        <button 
                                            onClick={() => this.handleStartEdit(persona)}
                                            style={{ 
                                                padding: '5px 10px', 
                                                backgroundColor: '#ff9800', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer',
                                                marginLeft: '5px' 
                                            }}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Personas;