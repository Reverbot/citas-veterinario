import React, {Fragment, useState} from 'react'
import uniqid from 'uniqid'
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {

    //crear state cita
    const [cita, actualizarCita] = useState({
        mascota : '',
        dueño : '',
        fecha:'',
        hora: '',
        sintomas: ''

    })

    const  [error, actualizarError] = useState(false)

    const actualizarState=( e ) => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    const {mascota, dueño, fecha, hora, sintomas} = cita

    const submitCita = e => {
        e.preventDefault()
        
        //validar
        if(mascota.trim() === "" || 
        dueño.trim() === "" || 
        fecha.trim() === "" || 
        hora.trim() === "" ||
        sintomas.trim() === ""){   actualizarError(true); return  } 

        //eliminar el mensaje previo
        actualizarError(false)
        //asignar ID
        cita.id = uniqid()
        //Crear Cita
        crearCita(cita)
        //Reiniciar el form
        actualizarCita({
            mascota : '',
            dueño : '',
            fecha:'',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
            <form action="" onSubmit={submitCita}>
                <label htmlFor="">Nombre Mascota</label>
                <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Mascota"
                onChange={actualizarState}
                value={mascota}
                />

                <label htmlFor="">Nombre Dueño</label>
                <input 
                type="text"
                name="dueño"
                className="u-full-width"
                placeholder="Dueño"
                onChange={actualizarState}
                value={dueño}
                />

                <label htmlFor="">Fecha</label>
                <input 
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
                />

                <label htmlFor="">Hora</label>
                <input 
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
                />

                <label htmlFor="">Sintomas</label>
                <textarea 
                name="sintomas"  
                cols="30" 
                rows="10"
                className="u-full-width"
                onChange={actualizarState}
                value={sintomas}>
                
                </textarea>

                <button
                type="submit"
                className="u-full-width button-primary">
                    Agregar Cita
                </button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}
 
export default Formulario;