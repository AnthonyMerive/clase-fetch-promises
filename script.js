//llamo las api

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.querySelector('#form');
const main = document.querySelector('#main');
const search = document.querySelector('#search');

//async lo ejecuta fuera de tiempo evita estancamiento
// async function getMovies(url){
//     //recibo la info con fetch(peticion a servidor) en res
//     const res = await fetch(url)
//     //desestructurar en un JSON
//     const data = await res.json()
//     console.log(data.results)
// }

//con funcion anonima:
const getMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    //console.log(data.results)
    showMovie(data.results)
}

//con callbak hell: hace promesas indefinidas
//forma incorrecta:
// const getMovies = url => {
//     const peticion = fetch(url)
//     peticion.then(res=>{
//         res.json().then(data =>{
//             console.log(data.results)
//         })
//     })
// }
//forma correcta:
//  const getMovies = url => {
//      const peticion = fetch(url)
//      peticion.then(res=>res.json())
//              .then(data => console.log(data.results))
//      }

getMovies(API_URL)

//muestro las peliculas
function showMovie(movie) {
    //asigno valor vacion al innerHTML del main
    console.log(movie);
    main.innerHTML = '';
    //traigo el main que tenia hecho para editarlo y agregarlo
    //desde aca
    movie.map((movie, index) => {
        //desestructurar, tomo lo que quiero del arreglo de la api
        const { title, poster_path, vote_average, overview } = movie;
        //creo los elementos guiandome con lo que quite del html
        //creo el elemento div
        const movieEl = document.createElement('div')
        //creo el elemento class
        movieEl.classList.add('movie')
        //agrego con inner lo que tenia en el HTML
        movieEl.innerHTML = `
        
        <img src="${IMG_PATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">${overview}
        </div>
        `
        //agrego el hijo movieEl al padre main
        main.appendChild(movieEl)

    })
    //condicional para pintar el numero de votacion con funcion
    function getClassByRate(vote){
        if (vote >= 8.0 ){
            return 'green'
        }else if (vote >=5.0){
            return 'orange'
        }else{
            return 'red'
        }
    }
}
