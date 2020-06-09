import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './Components/Formulario'
import Cita from './Components/Cita'

function App() {

  //citas em localStorage

  let citasIniciales = JSON.parse( localStorage.getItem('citas'))

  if(!citasIniciales){
    citasIniciales = [];
  }

  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use el USeEffect para relalizar ciertas acciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales){
      
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas,citasIniciales])


  //funcion que tome la cita actual y agrege la nueva
  const crearCita = cita => {
      guardarCitas([
        ...citas,
        cita
      ])
  } 

  //funcion que elimina una cita
    const eliminarCita= id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id)
      guardarCitas(nuevasCitas)
    }

    //mensaje condicional
    const titulo = citas.length === 0 ? <h2>No hay Citas</h2> : <h2>Administra tus Citas</h2>

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column"><Formulario crearCita={crearCita}/></div>
          <div className="one-half column">
            {titulo}
             { citas.map(cita =>(
              
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                 />
                ))}
            </div>
        </div>
      </div>
    </Fragment>
     
  );
}

export default App;
