

const findFilm = async () => {
    const film = document.getElementById("boxText").value;
    if (film.length > 0) {
    const url = `https://imdb-api.com/pt-bt/API/Search/k_9s9o7tmt/${film}`;
    
        const dados = await fetch(url);
        const filmData = await dados.json();
        const filmId = filmData.results[0].id;

        (async () => {
            const filmInfo = await fetch(`https://imdb-api.com/pt-br/API/Title/k_9s9o7tmt/${filmId}`);
            const filmData = await filmInfo.json();
            
            const filmImage = filmData.image;
            const filmTitle = filmData.title;
            const filmYear = filmData.year;
            const filmRating = filmData.imDbRating;
            const filmDescription = filmData.plotLocal;
            const filmGenre = filmData.genres;
            const filmWriters = filmData.writers;
            const filmRuntime = filmData.runtimeStr;
            const filmStars = filmData.stars;

            console.log(filmData);

            insertFilm(filmImage, filmTitle, filmYear, filmRating, filmDescription, filmGenre, filmWriters, filmRuntime, filmStars);
        })();
    } else {
        synopsis.innerHTML = "Insira um nome de filme ou série para buscar.";
    }
}

function insertFilm(filmImage, filmTitle, filmYear, filmRating, filmDescription, filmGenre, filmWriters, filmRuntime, filmStars) {
    const filmImg = document.getElementById("filmImg");
    filmImg.style.backgroundImage = `url(${filmImage})`;
    
    document.getElementById("filmTitle").innerHTML = filmTitle;
    document.getElementById("filmYear").innerHTML = filmYear;
    document.getElementById("filmGenre").innerHTML = filmGenre;
    document.getElementById("filmRuntime").innerHTML = filmRuntime;
    document.getElementById("synopsis").innerHTML = filmDescription;
    document.getElementById("filmRating").innerHTML = filmRating;

    document.getElementById("estrelando").innerHTML = "Estrelando: " + `<span>${filmStars}</span>`;

    if (filmWriters.length > 0) {
        document.getElementById("escritores").innerHTML = "Escritores: " + `<span>${filmWriters}</span>`;
    } else {
        document.getElementById("escritores").innerHTML = "Escritores não informados";
    }

}