import {useState} from 'react'
import Gasto from './Gasto'


const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
        
        
        {
          
          filtro ? 
          (
          <>
            <h2>{gastosFiltrados.length ? "Gastos Filtrados" : "No Podemos Filtar los Gastos"}</h2>
            { gastosFiltrados.map( gasto => (
              
              <Gasto 
                key={gasto.id+1}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />)) 
            } 
          </>
       
       )
       
       :
       
       <>
          <h2>{gastos.length ? "Todos los Gastos" : "No hay gastos aun"}</h2>          
          { gastos.map( gasto => (
            
            <Gasto 
              key={gasto.id+1}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />)) 
          } 
      </>

       }
    </div>
  )
}

export default ListadoGastos