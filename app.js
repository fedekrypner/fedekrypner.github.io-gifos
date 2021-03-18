//Menu hambur

let iconoAbierto = document.getElementById("iconoAbierto");
let opciones = document.getElementById("opcionesNavBar");
iconoAbierto.addEventListener("click", showHideMenu);

function showHideMenu() {
  console.log(document.documentElement.clientWidth);
  if (opciones.style.display === "none") {
    iconoAbierto.src = "./assets/close.svg";
    opciones.style.display = "block";
  } else {
    iconoAbierto.src = "./assets/burger.svg";
    opciones.style.display = "none";
  }
}

let resultadoBusqueda = document.getElementById('resultadoBusqueda');
let buscarGif = document.getElementById('buscarGif');
let tituloBusqueda = document.getElementById('tituloBusqueda')
let btnVerMas = document.getElementById('btnVerMas');
let buscador = document.getElementById('buscador');
const url_base_trending = 'https://api.giphy.com/v1/gifs/trending?api_key=XMxhHwKl7vxxotFk5I9kn8rVJwA6qtP7';
const url_base_search = 'https://api.giphy.com/v1/gifs/search?api_key=XMxhHwKl7vxxotFk5I9kn8rVJwA6qtP7&limit=20&offset=';

//mostrarTrending();

let trending = document.getElementById('trending');
let carrusel = document.getElementById('carrusel');

carrusel.innerHTML = '';
let result = await fetch(url_base_trending);
let json = await result.json();
 json.data.forEach(trending => {
    carrusel.innerHTML += `
    <div>
        <img src="${trending.images.fixed_height.url}">
    </div>
    `;
});

//Busqueda

let offset = 0; 

async function traerBusqueda(palabra, inicio) {
  const url = url_base_search + inicio + '&q=' + palabra;
  const response = await fetch(url);
  const info = await response.json();
  console.log(info);
  info.data.forEach(data => {
    resultadoBusqueda.innerHTML += `
    <div>
        <img src="${data.images.fixed_height.url}">
    </div>
    `;
  })
  tituloBusqueda.innerHTML = buscarGif.value;
}

buscador.addEventListener('click', () => {
  offset = 0;
  resultadoBusqueda.innerHTML = '';
  traerBusqueda(buscarGif.value, offset);
})

 buscarGif.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
  offset = 0;
  resultadoBusqueda.innerHTML = '';
  traerBusqueda(buscarGif.value, offset);
}
})

btnVerMas.addEventListener('click', () => {
  offset += 20;
  traerBusqueda(buscarGif.value, offset);
})





 




