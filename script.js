const elList = document.querySelector(".movie-list");
const elFrag = document.createDocumentFragment();
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".search-inp");
const elInpMin = document.querySelector(".search-year")
const elInpMax = document.querySelector(".search-year2")


const movieSlice = fullMovies.slice(0, 100);

const elModal = document.querySelector(".modal");
const modalTitle = elModal.querySelector(".modal-title");
const modalIframe = elModal.querySelector(".modal-iframe");
const modalRating = elModal.querySelector(".modal-rating");
const modalYear = elModal.querySelector(".modal-year");
const modalRuntime = elModal.querySelector(".modal-runtime");
const modalRuntimeMin = elModal.querySelector(".modal-runtime-min");
const modalCategories = elModal.querySelector(".modal-categories");
const modalSummary = elModal.querySelector(".modal-summary");
const modalLink = elModal.querySelector(".modal-imdb-link");

function renderModalInfo(topilganKino){
    modalTitle.textContent = topilganKino.title;
    modalIframe.src = topilganKino.yt_iframe;
    modalRating.textContent = topilganKino.imdb_rating;
    modalYear.textContent = topilganKino.movie_year;
    modalRuntime.textContent = Math.round(topilganKino.runtime / 60) + " hour :";
    modalRuntimeMin.textContent = Math.round(topilganKino.runtime % 60) + " min";
    modalCategories.textContent = topilganKino.categories.join(", ");
    modalSummary.textContent = topilganKino.summary;
    modalLink.href = topilganKino.imdb_id_link;
}

function getDuration (time){
    
    const hours = Math.floor(time / 60 );
    const minuts = Math.floor(time % 60 );
    return `${hours} hrs ${minuts} min  `
    
}

function renderMovies(kino){
    
    kino.forEach(item => {
        
        elList.innerHTML = ""
        
        const elCloneMovie = document.querySelector(".temp").content.cloneNode(true);
        
        
        elCloneMovie.querySelector(".movie-img").src = item.poster_md;
        elCloneMovie.querySelector(".movie-title").textContent = item.title;
        elCloneMovie.querySelector(".movie-year").textContent = item.movie_year;
        elCloneMovie.querySelector(".movie-time").textContent =  getDuration(item.runtime);
        elCloneMovie.querySelector(".categorie-text").textContent = item.categories.join(", ");
        elCloneMovie.querySelector(".movie-btn").dataset.id = item.imdb_id;
        
        elFrag.appendChild(elCloneMovie);
        
    });
    
    elList.appendChild(elFrag)
    
}

// Catigories
const elSelection = document.querySelector(".js-select");
const elOption = document.querySelector(".all-option");

const genres = [];

fullMovies.forEach(itm => {
    itm.categories.forEach (item => {
        if (! genres.includes(item)) {
            genres.push(item)
        }
    })
})

const categorieFrag = document.createDocumentFragment();

genres.forEach(i => {
    const newOption = document.createElement("option");
    
    newOption.value = i;
    newOption.textContent = i;
    
    categorieFrag.appendChild(newOption)
})

elSelection.appendChild(categorieFrag);



// Form

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    const newInputValue = elInput.value.trim();
    const newSelectionValue = elSelection.value;
    const newMinInp = Number(elInpMin.value.trim());
    const newMaxInp = Number(elInpMax.value.trim());

    
    const regexTitle = new RegExp(newInputValue, "gi");
    const regexSelect = new RegExp(newSelectionValue, "gi");
    
    const searchMovie = fullMovies.filter(item => {
        const searchInp = String(item.title).match(regexTitle) && (String(item.categories).match(regexSelect) || newSelectionValue === "all") && ((newMinInp <= item.movie_year && newMaxInp >= item.movie_year) || (newMinInp == "" && newMaxInp >= item.movie_year) || (newMinInp <= item.movie_year && newMaxInp == ""));
        
        return searchInp
    });
    
    // if(newSelectionValue == "all") {
    //     renderMovies(searchMovie);
    // }
    
    if(searchMovie.length > 0) {
        renderMovies(searchMovie);
    } else {
        elList.innerHTML = "Movie not found !"
    }
});

elList.addEventListener("click",(evt)=>{
    const targetElement = evt.target
    if(targetElement.matches(".movie-btn")){
        // buttonning id attributining qiymatini olib, o'sha qiymatga ega bo'lgan kinoni topish
        const btnId = targetElement.dataset.id
        const foundMovie = fullMovies.find(kino => kino.imdb_id === btnId);
        renderModalInfo(foundMovie);
    }
});

elModal.addEventListener("hide.bs.modal", function(){
    modalIframe.src = "";
})

renderMovies(fullMovies.slice(0, 100))
