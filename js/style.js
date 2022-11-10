"use strict";
movies.splice(100);

const $=(selector)=> document.querySelector(selector);
const $$=(selector)=> document.querySelectorAll(selector);

// --- NORMALIZE ALL MOVIES ---//

const AllMovies = movies.map((movies)=>{
    return {
        title:movies.title,
        year:movies.year,
        language:movies.language,
        categories:movies.categories,
        id:movies.imdbId,
        time:`${Math.floor(movies.runtime/60)} soat ${movies.runtime%60} daqiqa`,
        summary:movies.summary,
        link:`https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg:movies.bigThumbnail,
        minImg:movies.smallThumbnail,
        reating:movies.imdbRating,
    }
});

// --- RENDER ALL MOVIES FUNCTION --- //

function renderAllMovies() {
    AllMovies.forEach((el)=>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `  
        
        <img src="${el.minImg}" alt="img" class="card-img">
        <div class="card-body">
            <h2>${el.title}</h2>
            <ul class="list-unstyled">
                <li><strong>${el.year}</strong></li>
                <li><strong>${el.language}</strong></li>
                <li><strong>${el.reating}</strong></li>
                <li><strong>${el.categories}</strong></li>
                <li><strong>${el.time}</strong></li>
            </ul>
            <div class="social d-flex">
                <button class="btn btn-danger">Trailers</button>
                <button class="btn btn-primary mx-1">Read more</button>
                <button class="btn btn-warning">Add bookmark</button>
            </div>
        </div>
              
        `;

        $('.wrapper').appendChild(card);
    })
}

renderAllMovies()

// --- FIND FILM FUNCTION --- //

const findFilm = (regexp)=> {
    console.log(regexp);
    return AllMovies.filter((film)=> {
        return film.title.match(regexp);
    });

}

console.log(findFilm())


$('#submitForm').addEventListener('submit', ()=> {
    $('.wrapper').innerHTML = `<span class="loader"></span>`;

    const searchValue = $('#filmName').value;
    
    const regexp = new RegExp(searchValue , "gi");
    const searchResult = findFilm(regexp);

    setTimeout(()=> {
        if (searchResult.length > 0) { 
            searchResultsRender(searchResult);
            $('.card-res').classList.remove('d-none');
            $('#res').innerHTML = `<strong>${searchResult.length}</strong> ta malumot topildi`;  
            
            if (searchValue.length === 0) {
                $('.card-res').classList.add('d-none');
            }

        } else{
            $('.wrapper').innerHTML = `<h1 class = "text-danger">Malumot topilmadi</h1>`;
        }
    },2000)
  

});

function searchResultsRender(data = []) {

    $('.wrapper').innerHTML = "";

    data.forEach((el)=>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `  
        
        <img src="${el.minImg}" alt="img" class="card-img">
        <div class="card-body">
            <h2>${el.title}</h2>
            <ul class="list-unstyled">
                <li><strong>${el.year}</strong></li>
                <li><strong>${el.language}</strong></li>
                <li><strong>${el.reating}</strong></li>
                <li><strong>${el.categories}</strong></li>
                <li><strong>${el.time}</strong></li>
            </ul>
            <div class="social d-flex">
                <button class="btn btn-danger">Trailers</button>
                <button class="btn btn-primary mx-1">Read more</button>
                <button class="btn btn-warning">Add bookmark</button>
            </div>
        </div>
              
        `;

        $('.wrapper').appendChild(card);
    })
}
