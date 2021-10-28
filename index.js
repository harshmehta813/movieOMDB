let query = "";

function fetchMovieDetails(movieName){
    return fetch(`https://www.omdbapi.com/?apikey=c75d84ce&t=${movieName}&type=movie&page=1`)
        .then( ( res ) => {
            return res.json()
        })
        .catch( ( err) => {
            console.log(err);
        });
}

function displayMovie(movieDetails){
    const container = document.getElementById("movie");
    container.innerHTML = null;

    const info = document.createElement('div');
    const movie = document.createElement('div');
    const header = document.createElement('div');
    
    header.id = "movie-header";
    movie.id = "movie-container";
    info.id = "movie-info";

    const poster = document.createElement('img');
    const title = document.createElement('h1');
    const releaseYear = document.createElement('h1');
    const description = document.createElement('p');
    const rating = document.createElement('h4');
    const genre = document.createElement('p');
    const director = document.createElement('p');
    const actors  = document.createElement('p');
    
    poster.src = movieDetails.Poster
    title.textContent = movieDetails.Title;
    releaseYear.textContent = movieDetails.Year;
    description.textContent = movieDetails.Plot;
    genre.textContent = "Genres - " + movieDetails.Genre;
    director.textContent = "Director - " + movieDetails.Director;
    actors.textContent = "Actors - " + movieDetails.Actors;
    rating.textContent = "IMDB Rating - " + movieDetails.imdbRating; 

    if ( movieDetails.imdbRating > 8.5 ){
        displayRecommended(movie)
    }

    header.append( title, releaseYear )
    info.append( header, description, genre, actors, director, rating)
    movie.append( poster, info );
    container.append(movie);
}

function displayRecommended(target){
    const div = document.createElement('div');
    div.id = "recommended";
    div.textContent = "Recommended"
    target.append(div);
}

function validateInput(text){
    if ( !text || text.length < 3 ){
        return false;
    }
    return true;
}

function setSpinner(isLoading){
    
    const spinner = document.getElementById("spinner");
    if ( isLoading ){
        const container = document.getElementById("movie");
        container.innerHTML = null;

        spinner.className = "visible";
    } else {
        spinner.className = "hidden";
    }
}

function noValidMovie(){    
    const container = document.getElementById("movie")
    container.innerHTML = null;

    const img = document.createElement('img');
    img.src = './404.png';

    container.append(img);
}


async function handleSearch(e){
    try {
        e.preventDefault();
        setSpinner(true);
        const searchQuery = document.getElementById("name");
        const query = searchQuery.value;
        
        if ( !validateInput(query) ){
            
            setSpinner(false);
            alert('Please enter the exact movie name')
            return;
        }

        const movieResult = await fetchMovieDetails(query);

        if ( movieResult.Title && movieResult.Title.toLowerCase() == query.toLowerCase()){
            displayMovie(movieResult);
        } else {
            noValidMovie();
        }
        
        setSpinner(false);

        searchQuery.value = "";
    } catch(err) {
        console.log(err);
    }
}

window.addEventListener("load", ( ) => {
    const btn = document.getElementById('search');
    btn.addEventListener("click", handleSearch);
})