import {useState} from 'react'
import Gasto from './Gasto'


const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? "Hay gastos" : "No hay gastos aun"}</h2>
        {gastos.map( gasto => (
             
             <Gasto 
                key={gasto.id+1}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
             />
        ))}
    </div>
  )
}

export default ListadoGastos