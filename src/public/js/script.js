// const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
//   $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

// // Escuchar cuando cambie
// $seleccionArchivos.addEventListener("change", () => {
//   // Los archivos seleccionados, pueden ser muchos o uno
//   const archivos = $seleccionArchivos.files;
//   // Si no hay archivos salimos de la función y quitamos la imagen
//   if (!archivos || !archivos.length) {
//     $imagenPrevisualizacion.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png";
//     return;
//   }
//   // Ahora tomamos el primer archivo, el cual vamos a previsualizar
//   const primerArchivo = archivos[0];
//   // Lo convertimos a un objeto de tipo objectURL
//   const objectURL = URL.createObjectURL(primerArchivo);
//   // Y a la fuente de la imagen le ponemos el objectURL
//   $imagenPrevisualizacion.src = objectURL;
// });


document.getElementById("file").onchange = (e)=> {
  const files = e.target.files;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload = function(){
    const image = document.querySelector("#image");
    image.src = reader.result;
  }
}