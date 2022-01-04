const myGifosSection = document.getElementById("myGifosSection");
const createSection = document.getElementById('create')
const beginBtn = document.getElementById("beginBtn");
const recordBtn = document.getElementById("recordBtn");
const endBtn = document.getElementById("endBtn");
const uploadBtn = document.getElementById("uploadBtn");
const newGifoStepFirst = document.getElementById("newGifoStepFirst");
const newGifoStepSecond = document.getElementById("newGifoStepSecond");
const newGifoStepThird = document.getElementById("newGifoStepThird");
const recording = document.getElementById("recording");
const recordingRepeat = document.getElementById("recordingRepeat");
const uploadTitle = document.getElementById("uploadTitle");
const uploadText = document.getElementById("uploadText");
const overlayVideo = document.getElementById("overlayVideo");
const overlayVideoIcon = document.getElementById("overlayVideoIcon");
const overlayVideoText = document.getElementById("overlayVideoText");
const overlayVideoActions = document.getElementById("overlayVideoActions");
const recordingVideo = document.getElementById("recordingVideo");
const recordedGifo = document.getElementById("recordedGifo");
const createGifoLink = document.getElementById("createGifoLink");
const trendingGifosSection = document.getElementById("trendingGifosSection")
const myGifosIcon = "./assets/icon-mis-gifos-sin-contenido.svg";
const trashImg = "./assets/icon-trash-hover.svg";
let myGifosArray = [];
let myGifosString = localStorage.getItem("myGifos");
const eraseGifo = "erase";
const viewMoreBtnMyGifos = document.getElementById("viewMoreBtnMyGifos");
let recorder;
let blob;
let dateStarted;
let form = new FormData();
let clicksCounter = 0;

myGifosLink.addEventListener("click", (e) => {
    e.preventDefault();
    searhGifoSection.style.display = 'none';
    searchedGifosSection.classList.add("hidden");
    favoritesSection.classList.add("hidden");
    createSection.classList.add("hidden");
    trendingGifosSection.classList.remove("hidden")
    myGifosSection.classList.remove("hidden")
    renderMyGifos();
});

createGifoLink.addEventListener("click", (e) => {
    e.preventDefault();
    searhGifoSection.style.display = 'none';
    searchedGifosSection.classList.add("hidden");
    favoritesSection.classList.add("hidden");
    trendingGifosSection.classList.add("hidden");
    myGifosSection.classList.add("hidden")
    createSection.classList.remove("hidden");
});

/** === RENDERIZAR === **/
renderMyGifos();

function renderMyGifos() {
    myGifos.innerHTML = "";
    myGifosArray = JSON.parse(myGifosString);
    if (myGifosString == null || myGifosString == "[]") {
        viewMoreBtnMyGifos.style.display = "none"
        myGifos.classList.remove("area");
        noResults(myGifosIcon, myGifos, "¡Animate a crear tu primer GIFO!");
    } else if (myGifosArray.length <= 12) {
        viewMoreBtnMyGifos.style.display = "none"
        let urlMyGifos = `https://api.giphy.com/v1/gifs?ids=${myGifosArray.toString()}&api_key=${api_key}`;
        getSectionsData(urlMyGifos, myGifos, trashImg, eraseGifo, eraseGifo);
    } else {
        viewMoreBtnMyGifos.style.display = "inline-block"
        for (let i = 0; i < 12; i++) {
            let urlMyGifos = `https://api.giphy.com/v1/gifs?ids=${myGifosArray[i].toString()}&api_key=${api_key}`;
            getSectionsData(urlMyGifos, myGifos, trashImg, eraseGifo, eraseGifo);
        }
    }
};

viewMoreBtnMyGifos.addEventListener("click", (e) => {
    e.preventDefault();
    clicksCounter++
    let iValue = clicksCounter * 12;
    let arrayLength = iValue * 2
    let rest = myGifosArray.length - iValue
    for (let i = iValue; i < arrayLength; i++) {
        if (rest >= 12) {
            let urlMyGifos = `https://api.giphy.com/v1/gifs?ids=${myGifosArray[i].toString()}&api_key=${api_key}`;
            getSectionsData(urlMyGifos, myGifos, trashImg, eraseGifo, eraseGifo);
        } else {
            let urlMyGifos = `https://api.giphy.com/v1/gifs?ids=${myGifosArray[i].toString()}&api_key=${api_key}`;
            getSectionsData(urlMyGifos, myGifos, trashImg, eraseGifo, eraseGifo);
            viewMoreBtnMyGifos.style.display = "none"
        }
    }
})

/** === PROCESO DE GRABACIÓN Y SUBIDA === **/

beginBtn.addEventListener("click", getStreamAndRecord);

function getStreamAndRecord() {
    beginBtn.classList.add("hidden");
    uploadTitle.innerHTML = "¿Nos das acceso </br>a tu cámara?";
    uploadText.innerHTML =
        "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.";
    newGifoStepFirst.classList.add("step-now");
    navigator.mediaDevices.getUserMedia({ audio: false, video: { height: { max: 480 } } })
        .then(function(stream) {
            uploadTitle.classList.add("hidden");
            uploadText.classList.add("hidden");
            recordBtn.classList.remove("hidden");
            newGifoStepFirst.classList.remove("step-now");
            newGifoStepSecond.classList.add("step-now");
            recordingVideo.classList.remove("hidden");
            recordingVideo.srcObject = stream;
            recordingVideo.play();
            recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log("Iniciando grabación");
                },
            });
        });
}

recordBtn.addEventListener("click", recordGifo);

function recordGifo() {
    recorder.startRecording();
    recordBtn.classList.add("hidden");
    endBtn.classList.remove("hidden");
    recording.classList.remove("hidden");
    dateStarted = new Date().getTime();
    (function looper() {
        if (!recorder) {
            return;
        }
        recording.innerHTML = calculateTimeDuration(
            (new Date().getTime() - dateStarted) / 1000
        );
        setTimeout(looper, 1000);
    })();
}

endBtn.addEventListener("click", endingGifo);

function endingGifo() {
    endBtn.classList.add("hidden");
    uploadBtn.classList.remove("hidden");
    recording.classList.add("hidden");
    recordingRepeat.classList.remove("hidden");
    recorder.stopRecording(function() {
        recordingVideo.classList.add("hidden");
        recordedGifo.classList.remove("hidden");
        blob = recorder.getBlob();
        recordedGifo.src = URL.createObjectURL(recorder.getBlob());
        form.append("file", recorder.getBlob(), "myGifo.gif");
        form.append("api_key", api_key);
    });
}

function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    let sec = Math.floor(secs - hr * 3600 - min * 60);
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hr + ":" + min + ":" + sec;
}

uploadBtn.addEventListener("click", uploadGifo);

function uploadGifo() {
    overlayVideo.classList.remove("hidden");
    overlayVideoIcon.classList.remove("hidden");
    overlayVideoText.classList.remove("hidden");
    newGifoStepSecond.classList.remove("step-now");
    newGifoStepThird.classList.add("step-now");
    recordingRepeat.classList.add("hidden");
    fetch("https://upload.giphy.com/v1/gifs", {
            method: "POST",
            body: form,
        })
        .then((response) => {
            return response.json();
        })
        .then((gifo) => {
            let myGifoId = gifo.data.id;
            overlayVideoActions.classList.remove("hidden");
            overlayVideoIcon.src = "./assets/check.svg";
            overlayVideoText.innerText = "GIFO subido con éxito";
            overlayVideoActions.innerHTML = `
            <button class="trending-btns" id="download_btn" class="download-gifo-btn" onclick="downloadMyGifo('${myGifoId}')">
                <img src="./assets/icon-download-hover.svg" alt="download">
            </button>
            <button class="trending-btns" id="link_btn">
                <img src="./assets/icon-link-hover.svg" alt="link">
            </button>`;
            uploadBtn.classList.add("not-visible");
            if (myGifosString == null) {
                myGifosArray = [];
            } else {
                myGifosArray = JSON.parse(myGifosString);
            }
            myGifosArray.push(myGifoId);
            myGifosString = JSON.stringify(myGifosArray);
            localStorage.setItem("myGifos", myGifosString);
        })
        .then(function() {
            recordingVideo.srcObject.stop()
        })
        .then(function() {
            setTimeout(window.location.reload.bind(window.location), 1500);
        })
        .catch((error) => console.log(error));
}

recordingRepeat.addEventListener("click", repeatRecording);

function repeatRecording() {
    recorder.clearRecordedData();
    recordingRepeat.classList.add("hidden");
    uploadBtn.classList.add("hidden");
    recordedGifo.classList.add("hidden");
    recordBtn.classList.remove("hidden");
    navigator.mediaDevices
        .getUserMedia({ audio: false, video: { height: { max: 480 } } })
        .then(function(stream) {
            newGifoStepSecond.classList.add("step-now");
            recordingVideo.classList.remove("hidden");
            recordingVideo.srcObject = stream;
            recordingVideo.play();
            recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log("Iniciando grabación");
                },
            });
        });
}

async function downloadMyGifo(gifoImg) {
    let blob = await fetch(
        "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
    ).then((img) => img.blob());
    invokeSaveAsDialog(blob, "myGifo.gif");
}

/** === ELIMINAR GIFO === */
function erase(gifo) {
    let arrayAux = [];
    arrayAux = JSON.parse(myGifosString);
    let index = arrayAux.indexOf(gifo);
    arrayAux.splice(index, 1);
    let newMyGifosString = JSON.stringify(arrayAux);
    localStorage.setItem("myGifos", newMyGifosString);
    location.reload();
}