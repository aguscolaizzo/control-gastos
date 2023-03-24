import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarID } from './helpers';
import { formatearFecha } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState("");
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      console.log('Gasto Editar tiene elementos')
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500 );
    }
  }, [ gastoEditar ])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500 );
  }

  const guardarGasto = gasto => {
  
    if(gasto.id) {
      //actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      gastosActualizados[0].fecha = Date.now() 
      console.log(gastosActualizados)
      setGastos(gastosActualizados);
      setGastoEditar({})

    } else
    {
      //nuevo gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }





    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
      }, 500 );
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' :""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
              <main>
                <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                />
              </main>
              <div className='nuevo-gasto'>
              <img 
                src={IconoNuevoGasto}
                alt="Icono Nuevo Gasto"
                onClick={handleNuevoGasto}
              />
            </div>
        </>
      )}

      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}


    </div>
  )
}

export default App
