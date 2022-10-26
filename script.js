const elList = document.querySelector(".movie-list");
const elFrag = document.createDocumentFragment();

const movieSlice = movies.slice(0, 100);


for (const movie of movieSlice) {
    
    const elTemp = document.querySelector(".temp").content.cloneNode(true);
    
    
    elTemp.querySelector(".movie-title").textContent = movie.Title;
    elTemp.querySelector(".movie-year").textContent = movie.movie_year;
    elTemp.querySelector(".categorie-text").textContent = movie.Categories + ".";
    elTemp.querySelector(".movie-time").textContent = Math.round(movie.runtime / 60) + " hour :";
    elTemp.querySelector(".movie-min").textContent = Math.round(movie.runtime % 60) + " min";

    
    elFrag.appendChild(elTemp);
}

elList.appendChild(elFrag);