import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto,setIsValidPresupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)


  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + Number(total), 0);

    const totalDisponible = presupuesto - totalGastado

    //Calcular el porcentaje gastado

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1500);
   
    setDisponible(totalDisponible)
    setGastado(Number(totalGastado));

  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: "currency",
      currency:'EUR'
    })
  }

  const handleButton = () => {
    const resultado = confirm("¿Estas seguro? :D")

    if(resultado) {
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    }

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <h2 className="alertita">{porcentaje > 100 ? "Parece que te has pasado del presupuesto" :""}</h2>
        <div>
        <CircularProgressbar 
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6' 
          })}
          text={`${porcentaje}% Gastado`} 
        />
        </div>
        <div className='contenido-presupuesto'>
            <button
              className="reset-app button"
              onClick={handleButton}
            >
              Resetear APP
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>{`${disponible < 0 ? 'Sobrepasado:' : 'Disponible'}`}   </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto