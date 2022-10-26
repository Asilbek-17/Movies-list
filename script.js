const elList = document.querySelector(".movie-list");
const elFrag = document.createDocumentFragment();
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".search-inp")

const movieSlice = movies.slice(0, 100);

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
    modalTitle.textContent = topilganKino.Title;
    modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
    modalRating.textContent = topilganKino.imdb_rating;
    modalYear.textContent = topilganKino.movie_year;
    modalRuntime.textContent = Math.round(topilganKino.runtime / 60) + " hour :";
    modalRuntimeMin.textContent = Math.round(topilganKino.runtime % 60) + " min";
    modalCategories.textContent = topilganKino.Categories.split("|").join(", ");
    modalSummary.textContent = topilganKino.summary;
    modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
}

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    const newInputValue = elInput.value.trim().toUpperCase();
    
    if(newInputValue != ""){
        elList.innerHTML = null;
        
        for (let i = 0; i < movies.length; i++) {
            
            const search = ""+movies[i].Title;
            
            if(search.toUpperCase().indexOf(newInputValue) > -1){
                const elCloneMovie = document.querySelector(".temp").content.cloneNode(true);
                
                elCloneMovie.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${movies[i].ytid}/mqdefault.jpg `;
                elCloneMovie.querySelector(".movie-title").textContent = movies[i].Title;
                elCloneMovie.querySelector(".movie-year").textContent = movies[i].movie_year;
                elCloneMovie.querySelector(".categorie-text").textContent = movies[i].Categories + ".";
                elCloneMovie.querySelector(".movie-time").textContent = Math.round(movies[i].runtime / 60) + " hour :";
                elCloneMovie.querySelector(".movie-min").textContent = Math.round(movies[i].runtime % 60) + " min";
                
                elFrag.appendChild(elCloneMovie);
            }
        }
        elList.appendChild(elFrag);
    } else {
        for (const movie of movieSlice) {
            
            const elTemp = document.querySelector(".temp").content.cloneNode(true);
            
            
            elTemp.querySelector(".movie-title").textContent = movie.Title;
            elTemp.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg `;
            elTemp.querySelector(".movie-year").textContent = movie.movie_year;
            elTemp.querySelector(".categorie-text").textContent = movie.Categories + ".";
            elTemp.querySelector(".movie-time").textContent = Math.round(movie.runtime / 60) + " hour :";
            elTemp.querySelector(".movie-min").textContent = Math.round(movie.runtime % 60) + " min";
            elTemp.querySelector(".movie-btn").dataset.id = movie.imdb_id;
            
            elFrag.appendChild(elTemp);
        }
        
        elList.appendChild(elFrag);
    }
});


for (const movie of movieSlice) {
    
    const elTemp = document.querySelector(".temp").content.cloneNode(true);
    
    
    elTemp.querySelector(".movie-title").textContent = movie.Title;
    elTemp.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg `;
    elTemp.querySelector(".movie-year").textContent = movie.movie_year;
    elTemp.querySelector(".categorie-text").textContent = movie.Categories + ".";
    elTemp.querySelector(".movie-time").textContent = Math.round(movie.runtime / 60) + " hour :";
    elTemp.querySelector(".movie-min").textContent = Math.round(movie.runtime % 60) + " min";
    elTemp.querySelector(".movie-btn").dataset.id = movie.imdb_id;
    
    elFrag.appendChild(elTemp);
}

elList.appendChild(elFrag);

elList.addEventListener("click",(evt)=>{
    const targetElement = evt.target
    if(targetElement.matches(".movie-btn")){
        // buttonning id attributining qiymatini olib, o'sha qiymatga ega bo'lgan kinoni topish
        const btnId = targetElement.dataset.id
        const foundMovie = movies.find(kino => kino.imdb_id === btnId);
        renderModalInfo(foundMovie);
    }
});

elModal.addEventListener("hide.bs.modal", function(){
    modalIframe.src = "";
})