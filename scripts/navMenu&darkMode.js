const getModeElement = {
    modeSelect: document.getElementById('modeSelect'),
    body: document.getElementById('body'),
    ppalLogo: document.getElementById('ppalLogo'),
    linkMode: document.getElementById('linkMode'),
    createGifoLogo: document.getElementById('createGifoLogo'),

}

const getMenuElement = {
    burguerBtn: document.getElementById('burguerBtn'),
    burguerImg: document.getElementById('burguerImg'),
    ulMobileMenu: document.getElementById('ulMobileMenu'),
    modeSelect: document.getElementById('modeSelect'),
    favoriteLink: document.getElementById('fav_link'),
    myGifosLink: document.getElementById('myGifosLink'),
    createLink: document.getElementById('createLink'),
    createGifText: document.getElementById('createGifText'),
}

/*==== Menu ====*/
getMenuElement.burguerBtn.addEventListener('click', () => {
    getMenuElement.burguerImg.classList.toggle('fa-bars');
    getMenuElement.burguerImg.classList.toggle('fa-times');
    getMenuElement.ulMobileMenu.classList.toggle('not-visible');
    getMenuElement.ulMobileMenu.classList.toggle('visible');
})

getMenuElement.modeSelect.addEventListener('click', () => {
    getMenuElement.ulMobileMenu.classList.remove('visible');
    getMenuElement.ulMobileMenu.classList.add('not-visible');
    getMenuElement.burguerImg.classList.remove('fa-times');
    getMenuElement.burguerImg.classList.add('fa-bars');
})

getMenuElement.favoriteLink.addEventListener('click', () => {
    getMenuElement.ulMobileMenu.classList.remove('visible');
    getMenuElement.ulMobileMenu.classList.add('not-visible');
    getMenuElement.burguerImg.classList.remove('fa-times');
    getMenuElement.burguerImg.classList.add('fa-bars');
})

getMenuElement.myGifosLink.addEventListener('click', () => {
    getMenuElement.ulMobileMenu.classList.remove('visible');
    getMenuElement.ulMobileMenu.classList.add('not-visible');
    getMenuElement.burguerImg.classList.remove('fa-times');
    getMenuElement.burguerImg.classList.add('fa-bars');
})

getMenuElement.createLink.addEventListener('click', () => {
    getMenuElement.ulMobileMenu.classList.remove('visible');
    getMenuElement.ulMobileMenu.classList.add('not-visible');
    getMenuElement.burguerImg.classList.remove('fa-times');
    getMenuElement.burguerImg.classList.add('fa-bars');
})

/*==== Modo Nocturno ====*/
getModeElement.modeSelect.addEventListener('click', (ev) => {
    ev.preventDefault();
    getModeElement.body.classList == "" ?
        (getModeElement.body.classList.add("dark-mode"),
            getModeElement.createGifoLogo.src = "./assets/CTA-crear-gifo-modo-noc.svg",
            getModeElement.ppalLogo.src = "./assets/Logo-modo-noc.svg",
            getModeElement.linkMode.textContent = "Modo Diurno") :
        (getModeElement.body.classList.remove("dark-mode"),
            getModeElement.createGifoLogo.src = "./assets/button-crear-gifo.svg",
            getModeElement.ppalLogo.src = "./assets/logo-mobile.svg",
            getModeElement.linkMode.textContent = "Modo Nocturno")
});