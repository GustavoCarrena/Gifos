let fav_gifos = document.getElementById("favoritesGifosResults");
const fav_link = document.getElementById("fav_link");
const afavLink = document.getElementById("aFavLink")
const fav_icon = "./assets/icon-fav-sin-contenido.svg";
const fav_act_img = "./assets/icon-fav-active.svg";
const fav_remove = "removeFav";
const fav = "fav";
const favoritesSection = document.getElementById("favoritesSection");
const searhGifoSection = document.getElementById("searhGifoSection");
const searchedGifosSection = document.getElementById("searchedGifosSection");
const create = document.getElementById("create");
const myGifosLink = document.getElementById("myGifosLink");
const myGifos = document.getElementById("myGifos");
const viewMoreBtnFav = document.getElementById("viewMoreBtnFav");
let favoriteArray = [];
let favoriteString = localStorage.getItem("favoriteGifos");
let cantidadClicks = 0;
let intervalId = 0;

/**Agregar a favoritos**/
function addFavorite(gifoId) {
    let iconFav = document.getElementById(`icon-fav-${gifoId}`);
    iconFav.setAttribute('src', fav_act_img)
    addFav(gifoId);
    renderFavorites();
}

function addFav(gifo) {
    if (favoriteString == null) {
        favoriteArray = [];
    } else {
        favoriteArray = JSON.parse(favoriteString);
    }
    favoriteArray.push(gifo);
    favoriteString = JSON.stringify(favoriteArray);
    localStorage.setItem("favoriteGifos", favoriteString);
}

/**Renderizar favoritos**/
function renderFavorites() {
    fav_gifos.innerHTML = "";
    favoriteArray = JSON.parse(favoriteString);
    if (favoriteString == null || favoriteString == "[]") {
        viewMoreBtnFav.style.display = "none"
        fav_gifos.classList.remove("area");
        noResults(fav_icon, fav_gifos, `"¡Guarda tu primer GIFO en favoritos para que se muestre aquí!"`);
    } else if (favoriteArray.length < 12) {
        for (let i = 0; i < 12; i++) {
            viewMoreBtnFav.style.display = "none"
            let urlFavorites = `https://api.giphy.com/v1/gifs?ids=${favoriteArray[i].toString()}&api_key=${'aSkPUTk4nUZBfbcftWwsvZfRvXgqoYAE'}`;
            getSectionsData(urlFavorites, fav_gifos, fav_act_img, fav_remove, fav);
        }
    } else if (favoriteArray.length >= 12) {
        viewMoreBtnFav.style.display = "inline-block"
        for (let i = 0; i < 12; i++) {
            let urlFavorites = `https://api.giphy.com/v1/gifs?ids=${favoriteArray[i].toString()}&api_key=${'aSkPUTk4nUZBfbcftWwsvZfRvXgqoYAE'}`;
            getSectionsData(urlFavorites, fav_gifos, fav_act_img, fav_remove, fav);
        }
    }
}

viewMoreBtnFav.addEventListener("click", (e) => {
    e.preventDefault();
    cantidadClicks++
    let iValue = cantidadClicks * 12;
    let arrayLength = iValue * 2
    let rest = favoriteArray.length - arrayLength
    for (let i = iValue; i < arrayLength; i++) {
        if (rest <= 0) {
            let urlFavorites = `https://api.giphy.com/v1/gifs?ids=${favoriteArray[i].toString()}&api_key=${'aSkPUTk4nUZBfbcftWwsvZfRvXgqoYAE'}`;
            getSectionsData(urlFavorites, fav_gifos, fav_act_img, fav_remove, fav);
            viewMoreBtnFav.style.display = "none"
        } else {
            let urlFavorites = `https://api.giphy.com/v1/gifs?ids=${favoriteArray[i].toString()}&api_key=${'aSkPUTk4nUZBfbcftWwsvZfRvXgqoYAE'}`;
            getSectionsData(urlFavorites, fav_gifos, fav_act_img, fav_remove, fav);
        }
    }
})

/**Eliminar favoritos**/
function removeFav(gifo) {
    let arrayAux = [];
    arrayAux = JSON.parse(favoriteString);
    let index = arrayAux.indexOf(gifo);
    arrayAux.splice(index, 1);
    let newFavoritesString = JSON.stringify(arrayAux);
    localStorage.setItem("favoriteGifos", newFavoritesString);
    /**Cambiar icono */
    let eraseIconFav = document.getElementById("icon-fav-" + gifo);
    eraseIconFav.setAttribute("src", "./assets/icon-fav-hover.svg");
    location.reload()
}

/**Descargar gifo**/
async function downloadGifo(gifoImg, gifoName) {
    let blob = await fetch(gifoImg).then((img) => img.blob());
    invokeSaveAsDialog(blob, gifoName + "myGifo.gif");
}

/*Mostrar favoritos*/
fav_link.addEventListener("click", (e) => {
    e.preventDefault();
    scrollStep();
    searhGifoSection.style.display = 'none';
    searchedGifosSection.classList.add("hidden");
    myGifosSection.classList.add("hidden");
    create.classList.add("hidden");
    favoritesSection.classList.remove("hidden");
    trendingGifosSection.classList.remove("hidden");
    renderFavorites();
});

function scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(intervalId);
    }
    window.scroll(window.pageYOffset, 0);
}