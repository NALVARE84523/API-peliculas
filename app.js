// ------ Paginacion ------ //
// let pagina = 1;
// const btnAnterior = document.getElementById('btnAnterior');
// const btnSiguiente = document.getElementById('btnSiguiente');

// btnSiguiente.addEventListener('click', () => {
//   if(pagina < 1000) {
//     pagina += 1;
//     cargarPeliculas();
//   }
// });
// btnAnterior.addEventListener('click', () => {
//   if(pagina > 1) {
//     pagina -= 1;
//     cargarPeliculas();
//   }
// });

// ------- Paginacion con Scroll-------- //
let pagina = 1;
let peliculas = "";
let ultimaPelicula;

let observador = new IntersectionObserver((entradas, observador) => {
  entradas.forEach(entrada => {
    if(entrada.isIntersecting) {
      pagina++;
      cargarPeliculas();
    }
  })
}, {
  rootMargin: '0px 0px 300px 0px',
  threshold: 1.0
});

const cargarPeliculas = async () => {
  try {
    // ------- Link con paginacion------- //
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=12bb2b69299bc5534ff3f0ef888cb2c7&language=es-MX&page=${pagina}`);


    if(respuesta.status === 200) {
      const datos = await respuesta.json();

      // let peliculas = "";
      datos.results.forEach(peli => {
        peliculas += `
            <div class="pelicula">
              <img class="poster" src="https://image.tmdb.org/t/p/w500/${peli.poster_path}">
              <h3 class="titulo">${peli.title}</h3>
            </div>
        `;
      });

      document.getElementById('contenedor').innerHTML = peliculas;

      if(pagina < 1000) {
        if(ultimaPelicula) {
          observador.unobserve(ultimaPelicula);
        }
        const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
        ultimaPelicula =  peliculasEnPantalla[peliculasEnPantalla.length - 1];
        observador.observe(ultimaPelicula);
      }


    } else if(respuesta.status === 401) {
      console.log("Pusiste la llave mal");
    } else if(respuesta.status === 404) {
      console.log("La pelicula que buscas no existe");
    }
  } catch (error) {
    console.log(error);
  }
}

cargarPeliculas();