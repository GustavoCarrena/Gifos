const suggestionsUrl = "https://api.giphy.com/v1/tags/related/";
const searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key;
let sValue = '';
let offset = 0;
const favoriteImg = "./assets/icon-fav.svg";
let favAdd = 'addFavorite';
const favorite = 'fav';

const getTSearchElements = {
    results: document.getElementById('searchedGifosSection'),
    gTitle: document.getElementById('searchedGifosTitle'),
    searchedGifosResults: document.getElementById('searchedGifosResults'),
    predictiveResults: document.getElementById('predictiveResults'),
    defaultSearchBtn: document.getElementById('defaultSearchBtn'),
    defaultSearchBtnIcon: document.getElementById('defaultSearchBtnIcon'),
    searchBtn: document.getElementById('searchBtn'),
    searchInput: document.getElementById('searchInput'),
    trendingLinks: document.getElementById('trendingResultsWords'),
    viewMoreBtn: document.getElementById('viewMoreBtn'),
}

/*=== FUNCIONES GENERALES ===*/

function searchGifos() {
    getTSearchElements.searchedGifosResults.innerHTML = "";
    sValue = getTSearchElements.searchInput.value.trim();
    getTSearchElements.results.classList.remove("hidden");
    getTSearchElements.gTitle.textContent = sValue;
    const search = searchUrl + "&limit=12&q=" + sValue + "/";
    getSectionsData(search, getTSearchElements.searchedGifosResults, favoriteImg, favAdd, favorite);
    closeAutocompleteSection();
}

//Obtener datos de la API de giphy
function getSectionsData(url, container, favButton, favFunction, type) {
    fetch(url)
        .then((response) => response.json())
        .then((content) => {
            renderTrendingGifos(content, container, favButton, favFunction, type);
        })
        .catch((error) => console.log(error));
}

/*=== BUSQUEDA PREDICTIVA ===*/

//Autocompletar sugerencias y buscar gifos
getTSearchElements.searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchGifos();
    }
    sValue = getTSearchElements.searchInput.value;
    if (sValue.length >= 1) {
        showAutocompleteSection();
        fetch(`${suggestionsUrl}${sValue}?api_key=${api_key}`)
            .then((response) => response.json())
            .then((data) => {
                suggestedTerms(data);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        closeAutocompleteSection();
    }
});

//Mostrar seccion de autocompletar
function showAutocompleteSection() {
    getTSearchElements.predictiveResults.style.display = "block";
    getTSearchElements.defaultSearchBtnIcon.classList.remove("fa-search");
    getTSearchElements.defaultSearchBtnIcon.classList.add("fa-times");
    getTSearchElements.searchBtn.classList.remove("hidden");
}

//Ocultar autocompletar
function closeAutocompleteSection() {
    getTSearchElements.predictiveResults.style.display = "none";
    getTSearchElements.defaultSearchBtnIcon.classList.remove("fa-times");
    getTSearchElements.defaultSearchBtnIcon.classList.add("fa-search");
    getTSearchElements.searchBtn.classList.add("hidden");
}

//Renderizar resultados
function suggestedTerms(terms) {
    let suggested = terms.data;
    getTSearchElements.predictiveResults.innerHTML = `
    <li class="predictive-suggestions"> <i class="fas fa-search"></i> <p class="predictive-text-results">${suggested[0].name}</p></li>
    <li class="predictive-suggestions"> <i class="fas fa-search"></i> <p class="predictive-text-results">${suggested[1].name}</p></li>
    <li class="predictive-suggestions"> <i class="fas fa-search"></i> <p class="predictive-text-results">${suggested[2].name}</p></li>
    <li class="predictive-suggestions"> <i class="fas fa-search"></i> <p class="predictive-text-results">${suggested[3].name}</p></li>
    `
}

//Cancelar busqueda
getTSearchElements.defaultSearchBtn.addEventListener("click", () => {
    getTSearchElements.searchInput.value = "";
    closeAutocompleteSection();
});

//Buscar con sugerencias
getTSearchElements.predictiveResults.addEventListener("click", (li) => {
    getTSearchElements.searchInput.value = li.target.textContent;
    searchGifos();
});

//Buscar con click event
getTSearchElements.searchBtn.addEventListener("click", () => {
    searchGifos();
})

/*=== ENLACES TRENDING ===*/

async function trendingTopics() {
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${api_key}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        const topics = data.data;
        getTSearchElements.trendingLinks.innerHTML = `
            <p class="trending-words-link">${topics[0]}</p>, 
            <p class="trending-words-link">${topics[1]}</p>, 
            <p class="trending-words-link">${topics[2]}</p>, 
            <p class="trending-words-link">${topics[3]}</p>
            `;
        const tlinks = document.getElementsByClassName("trending-words-link");
        for (let i = 0; i < tlinks.length; i++) {
            tlinks[i].addEventListener("click", function() {
                getTSearchElements.searchInput.value = topics[i];
                searchGifos();

            });
        }
    } catch (err) {
        err;
    }
};
trendingTopics();

/*=== VER MAS ===*/

//Ver mas resultados
getTSearchElements.viewMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    seeMoreResults();
});

//Renderizar 12 resultados mas
function seeMoreResults() {
    offset = offset + 12;
    sValue = getTSearchElements.searchInput.value.trim();
    let searchMore = searchUrl + "&limit=12&q=" + sValue + "&offset=" + offset;
    getSectionsData(searchMore, getTSearchElements.searchedGifosResults, favoriteImg, favAdd, favorite);
};

//Sin resultados
function noResults(iconUrl, place, msg) {
    place.innerHTML = "";
    let cont = document.createElement("div");
    cont.classList.add("error_msg");
    let text = document.createElement("p");
    text.classList.add("no_results_title");
    text.textContent = msg;
    let icon = document.createElement("img");
    icon.src = iconUrl;
    cont.appendChild(icon);
    cont.appendChild(text);
    place.appendChild(cont);
};