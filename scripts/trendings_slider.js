let api_key = "aSkPUTk4nUZBfbcftWwsvZfRvXgqoYAE";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=6`;
const favImg = "./assets/icon-fav.svg";
favAdd = "addFavorite";
const favoriteGifo = "fav";
const iconSearch = "./assets/icon-busqueda-sin-resultado.svg";
let start;
let change;

const trendingElements = {
    trendingResults: document.getElementById('trendingGifosContent'),
    trendingGifosBox: document.getElementById('trendingGifosBox'),
    prevBtn: document.getElementById('trendingSliderPrevBtn'),
    nextBtn: document.getElementById('trendingSliderNextBtn'),
    trendingWords: document.getElementById('trendingResultsWords'),
    searchInput: document.getElementById('searchInput'),
    searchedGifosResults: document.getElementById('searchedGifosResults'),
    viewMoreBtn: document.getElementById('viewMoreBtn'),
};

/*=== Obtener datos de la API y renderizar (slider) ===*/
async function getTrendingData() {
    try {
        const response = await fetch(trendingUrl);
        const data = await response.json();
        renderTrendingGifos(data, trendingElements.trendingResults, favImg, favAdd, favoriteGifo);
    } catch (error) {
        error;
    }
};
getTrendingData()

function renderTrendingGifos(arrayGifos, container, favButton, favFunction, type) {
    let content = "";
    if (arrayGifos.data.length == 0) {
        container.classList.remove("area");
        noResults(iconSearch, trendingElements.searchedGifosResults, "Intenta con otra búsqueda");
        trendingElements.viewMoreBtn.classList.add("not-visible");
    } else {
        for (const gifo of arrayGifos.data) {
            content += trendingSliderTemplate(gifo, favButton, favFunction, type);
            trendingElements.viewMoreBtn.classList.remove("not-visible");
        }
        container.innerHTML += content;
        if (
            arrayGifos.pagination.total_count <=
            arrayGifos.pagination.offset + 12
        ) {
            trendingElements.viewMoreBtn.classList.add("not-visible");
        }
    }
};

/*=== Slider Desktop ===*/

trendingElements.prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    trendingElements.trendingGifosBox.scrollLeft -= 500;
});

trendingElements.nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    trendingElements.trendingGifosBox.scrollLeft += 500;
});

/*=== Slider Mobile ===*/

trendingElements.trendingGifosBox.addEventListener("touchstart", (e) => {
    start = e.touches[0].clientX
}, { passive: false });

trendingElements.trendingGifosBox.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    change = start - touch.clientX
}, { passive: false });

trendingElements.trendingGifosBox.addEventListener("touchend", slideShow);

function slideShow() {
    change > 0 ?
        trendingElements.trendingGifosBox.scrollLeft += 200 :
        trendingElements.trendingGifosBox.scrollLeft -= 200
};

/*=== Template ===*/
function trendingSliderTemplate(tGifo, lBtn, lfx, type) {
    return (
        `
        <div class="trending-gifo" onclick="fullGifosMobile('${tGifo.images.downsized.url}', '${tGifo.id}', '${tGifo.slug}', '${tGifo.username}', '${tGifo.title}')">
            <img class="trending-gifo-img" src=${tGifo.images.downsized.url} alt=${tGifo.title}>
            <div class="trending-hover-container">
                <div class="trending-btns-container">
                    <button class="trending-btns">
                        <img src=${lBtn} alt="${type}" class="${type}_btn" id="icon-${type}-${tGifo.id}" onclick="${lfx}('${tGifo.id}')">
                    </button>
                    <button class="trending-btns">
                        <img src="./assets/icon-download-hover.svg" alt="download" class="download-gifo-btn" onclick="downloadGifo('${tGifo.images.downsized.url}', '${tGifo.slug}')">
                    </button>
                    <button class="trending-btns">
                        <img src="./assets/icon-max-hover.svg" alt="fullsize" class="maximize-gifo-btn" onclick="fullGifosDesktop('${tGifo.images.downsized.url}', '${tGifo.id}', '${tGifo.slug}', '${tGifo.username}', '${tGifo.title}')">
                    </button>
                </div>
                <div class="trending-text-content">
                    <p>${tGifo.username}</p>
                    <h6>${tGifo.title}</h6>
                </div>
            </div>
        </div>
        `
    );
};