const resultsHTML = document.querySelector('.wrapper--results');
const wrapperBtn = document.querySelector('.wrapper--btn');
const showDetailsHTML = document.querySelector('.show__details');
let showContainer;
let btnClose;

const apiKey = `6631e5f1dc96088e0d26b86da29b5b6a`;
let imgUrl = `https://image.tmdb.org/t/p/w500`;
let defautImg = `https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-300x450.jpg`
let imgPath;

// == Fetch API ==
async function getAPI(filter) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${filter}?api_key=${apiKey}&include_adult=false&language=en-US`);
      const dataID = await response.json();
      const data = dataID.results;
      return {
        data,
        dataID,
      }
  } catch (error) {
      alert('Erreur :', error);
  }
}

// == Display Shows ==
async function displayShows(showFilter, targetBtn) {
    resultsHTML.innerHTML = "";
    const { data, dataID } = await getAPI(showFilter);
    const btns = document.querySelectorAll('.btn');
    for (const btn of btns){
        btn.classList.contains('btn--is-active') ? btn.classList.remove('btn--is-active') : null;
    }
    targetBtn.classList.add('btn--is-active');

    for (const show of data){
        imgPath = show.poster_path ? `${imgUrl}${show.poster_path}` : `${defautImg}`;
        showContainer = document.createElement('div');
        showContainer.classList = "show__single";
        showContainer.dataset.id = show.id;
        showContainer.innerHTML += `
        <h2 class="show__title">${show.name}</h2>
        <div class="show__img"><img src="${imgPath}" alt=""></div>
        <div class="show__rating">${(show.vote_average).toFixed(1)}</div>
        `
        resultsHTML.append(showContainer);
    }
}

// == Display Show Details PopUp
async function displayShowDetails(showID) {
    showDetailsHTML.innerHTML = "";
    const { data, dataID }= await getAPI(showID)
    imgPath = dataID.poster_path ? `${imgUrl}${dataID.poster_path}` : `${defautImg}`;
    showDetailsHTML.innerHTML += `
    <div class="show__img show__img--details"><img src="${imgPath}" alt=""></div>
    <div class="show__infos">
       <h2 class="show__title show__title--details">${dataID.name}</h2> 
       <p class="show__overview">${dataID.overview}</p>
    </div>
    `;
    btnClose = document.createElement('div');
    btnClose.classList.add('show__close');
    btnClose.textContent = "❌";
    showDetailsHTML.append(btnClose);

    btnClose.addEventListener('click', () => {
      showDetailsHTML.classList.remove('show__details--is-active');
      showDetailsHTML.innerHTML = "";
    });

}


// == Initial display ==
displayShows("top_rated", document.querySelector('.btn--top-rated'));


// == Event Listener btns ==
wrapperBtn.addEventListener('click', async (e)=>{
    if (e.target.classList.contains('btn')) {
        const filter = e.target.dataset.filter;
        await displayShows(filter, e.target);
    }
})

resultsHTML.addEventListener('click', async (e)=>{
    btnClose = document.querySelector('.show__close');
    if (e.target.classList.contains('show__single')) {
        const id = e.target.dataset.id;
        showDetailsHTML.classList.toggle('show__details--is-active');
        await displayShowDetails(id);
    } 
})
