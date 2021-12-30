let zoom;
const maxBtn = document.querySelectorAll(".maximize-gifo-btn")
const downloadBtn = document.querySelectorAll(".download-gifo-btn")

function fullGifosMobile(img, id, slug, user, title) {
    if (window.matchMedia("(max-width: 899px)").matches) {
        gifoZoom(img, id, slug, user, title);
    }
};

function fullGifosDesktop(img, id, slug, user, title) {
    if (window.matchMedia("(min-width: 900px)").matches) {
        gifoZoom(img, id, slug, user, title);
    }
};

function gifoZoom(img, id, slug, user, title) {
    zoom = document.createElement("div");
    zoom.classList.add("zoom");
    zoom.innerHTML = ` 
        <div class="zoom-container">
            <button class="close-zoom-btn" onclick="closefullGifos()"><i class="fas fa-times"></i></button>
            <img src="${img}" alt="${id}" class="zoom-img">
            <div class="zoom-info">
                <div class="zoom-text">
                    <p class="zoom-user">${user}</p>
                    <p class="zoom-title">${title}</p>
                </div>
                <div>
                    <button class="fav-btn" onclick="addFavorite('${id}'),closefullGifos()"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-${id}"></button>
                    <button class="download-gifo-btn" onclick="downloadGifo('${img}','${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(zoom);
}

function closefullGifos() {
    document.body.removeChild(zoom);
}