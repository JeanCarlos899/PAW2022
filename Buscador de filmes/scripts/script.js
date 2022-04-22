

const findFilm = async () => {
  
    const film = document.getElementById("boxText").value;
   
    if (film.length > 0) {
        document.getElementById("filmTitle").innerHTML = `<div class="c-loader"></div>`;
        synopsis.innerHTML = '';
        const url = `https://imdb-api.com/pt-bt/API/Search/k_8kw84xsp/${film}`;
        const dados = await fetch(url);
        const filmData = await dados.json();

        if (filmData.results.length > 0) {
            const filmId = filmData.results[0].id;

            (async () => {
                const filmInfo = await fetch(`https://imdb-api.com/pt-br/API/Title/k_8kw84xsp/${filmId}`);
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

                insertFilm(filmImage, filmTitle, filmYear, filmRating, filmDescription, filmGenre, filmWriters, filmRuntime, filmStars);
            })(); 
        } else {
            document.getElementById("filmTitle").innerHTML = `Nenhum filme encontrado`;
            document.getElementById("filmYear").innerHTML = "";
            document.getElementById("filmGenre").innerHTML = "";
            document.getElementById("filmRuntime").innerHTML = "";
            document.getElementById("synopsis").innerHTML = "";
            document.getElementById("filmRating").innerHTML = "";
            document.getElementById("estrelando").innerHTML = "";
            document.getElementById("escritores").innerHTML = "";
        }
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

    if (filmStars.length > 0) {
        document.getElementById("estrelando").innerHTML = "Estrelando: " + `<span>${filmStars}</span>`;
    } else {
        document.getElementById("estrelando").innerHTML = "";
    }

    if (filmWriters.length > 0) {
        document.getElementById("escritores").innerHTML = "Escritores: " + `<span>${filmWriters}</span>`;
    } else {
        document.getElementById("escritores").innerHTML = "";
    }

}