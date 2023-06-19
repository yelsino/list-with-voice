import React from 'react'

function ConfiguracionPage() {
  return (
    <div>
       <p className="text-xl font-black font-catamaran text-text1 leading-tight text-secondary-100 pb-3">
                Configuración
            </p>
       <p className="font-catamaran text-text1 leading-tight text-secondary-200 pb-3">
                Comandos del asistente
            </p>
      <ol className='text-secondary-100 flex flex-col gap-y-3'>
        <li className=''>1.- Nueva Lista</li>
        <li className=''>2.- Guardar lista</li>
        <li className=''>3.- Ver listas</li>
        <li className=''>4.- Renombrar lista</li>
        <li className=''>5.- Ir a configuración</li>
        <li className=''>6.- Ir a inicio</li>
      </ol>
    </div>
  )
}

export default ConfiguracionPage