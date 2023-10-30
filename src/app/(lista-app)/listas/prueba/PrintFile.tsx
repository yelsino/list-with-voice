'use client'

const PrintFile = () => {

  const handleClick = () => {
    // Crear un elemento de canvas
    const canvas = document.createElement('canvas');
    const context:any = canvas.getContext('2d');

    // Configurar el tamaño del canvas
    canvas.width = 200;
    canvas.height = 100;

    // Dibujar texto en el canvas
    context.font = '30px Arial';
    context.fillText('Hola mundo', 50, 50);

    // Convertir el canvas en una imagen
    const image = new Image();
    image.src = canvas.toDataURL();

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'imagen.png';

    // Simular un clic en el enlace para descargar automáticamente la imagen
    link.click();
  };

  return (
    <div>
       <button onClick={handleClick}>Generar Imagen y Descargar</button>
    </div>
  );
}

export default PrintFile;