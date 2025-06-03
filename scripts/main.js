const inputSearch = document.getElementById('search');
const btnSearch = document.querySelector('.btn--search');
const resultsHTML = document.querySelector('.swiper__results');
const apiKey = `6631e5f1dc96088e0d26b86da29b5b6a`;
let imgUrl = `https://image.tmdb.org/t/p/w500`;
let defautImg = `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg`
let movies;

async function getAPI(query) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&include_adult=false&language=en-US&page=1`);
      const data = await response.json();
      return data.results;
  } catch (error) {
      alert('Erreur :', error);
  }
}

async function displayMoviez(query) {
    resultsHTML.innerHTML = "";
    movies = await getAPI(query)
    const popArray =  movies.sort((a, b) => b.popularity - a.popularity);
    for (const movie of popArray){
        let imgPath = movie.poster_path ? `${imgUrl}${movie.poster_path}` : `${defautImg}`;
        const movieContainer = document.createElement('div');
        movieContainer.classList = "swiper-slide movie__single";
        movieContainer.innerHTML += `
        <h2 class="movie__title">${movie.original_title}</h2>
        <div class="movie__img"><img src="${imgPath}" alt=""></div>
        `
        resultsHTML.append(movieContainer);
        console.log(movie.popularity);
    }
    swiper.update();
}

btnSearch.addEventListener('click', async (e) => {
    e.preventDefault();
    await displayMoviez(inputSearch.value);
})