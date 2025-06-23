// Variables del DOM
const $tituloCancion = document.querySelector(".reproductor h1"),
  $nombreArtista = document.querySelector(".reproductor p"),
  $progresoCancion = document.querySelector("#progreso"),
  $cancion = document.querySelector("#cancion"),
  $btnAtras = document.querySelector(".btnAtras"),
  $btnPlay = document.querySelector(".btnReproducir"),
  $btnSiguiente = document.querySelector(".btnSiguiente"),
  $iconoControl = document.querySelector("#iconoControl");

const canciones = [
  {
    titulo: "A Year Ago",
    nombre: "NEFFEX",
    fuente: "music/A Year Ago - NEFFEX.mp3",
  },
  {
    titulo: "As You Fade Away",
    nombre: "NEFFEX",
    fuente: "music/As You Fade Away - NEFFEX.mp3",
  },
  {
    titulo: "Catch Me If I Fall",
    nombre: "NEFFEX",
    fuente: "music/Catch Me If I Fall - NEFFEX.mp3",
  },
  {
    titulo: "Chasing",
    nombre: "NEFFEX",
    fuente: "music/Chasing - NEFFEX.mp3",
  },
  {
    titulo: "Play Dead",
    nombre: "NEFFEX",
    fuente: "music/Play Dead - NEFFEX.mp3",
  },
];

let indiceCancionActual = 0;

function actualizarInfoCancion() {
  $tituloCancion.textContent = canciones[indiceCancionActual].titulo;
  $nombreArtista.textContent = canciones[indiceCancionActual].nombre;
  $cancion.src = canciones[indiceCancionActual].fuente;
  $cancion.addEventListener("loadeddata", function () {});
}

$btnPlay.addEventListener("click", reproducirPausar);
function reproducirPausar() {
  if ($cancion.paused) {
    reproducirCancion();
  } else {
    pausarCancion();
  }
}

function reproducirCancion() {
  $cancion.play();
  $iconoControl.classList.add("bi-pause-fill");
  $iconoControl.classList.remove("bi-play-fill");
}
function pausarCancion() {
  $cancion.pause();
  $iconoControl.classList.remove("bi-pause-fill");
  $iconoControl.classList.add("bi-play-fill");
}

$cancion.addEventListener("timeupdate", function () {
  if (!$cancion.paused) {
    $progresoCancion.value = $cancion.currentTime;
  }
});

$progresoCancion.addEventListener("input", function () {
  $cancion.currentTime = $progresoCancion.value;
});

// Siguiente cancion
$btnSiguiente.addEventListener("click", function () {
  indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
  actualizarInfoCancion();
  reproducirCancion();
});

$btnAtras.addEventListener("click", function () {
  indiceCancionActual =
    (indiceCancionActual - 1 + canciones.length) % canciones.length;
  actualizarInfoCancion();
  reproducirCancion();
});

document.addEventListener("DOMContentLoaded", actualizarInfoCancion());
