const buttons = document.querySelector('.btn-container');
const fullscreen = document.querySelector('.fullscreen');
const piano = document.querySelector('.piano');
const pianokey = document.querySelectorAll('.piano-key');
const audio = document.querySelector('audio');
const main = document.querySelector('.main');
const btnnotes = document.querySelector('.btn-notes');
const btnletters = document.querySelector('.btn-letters');

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }


let mouseposition = false;

function handlerpiano_u(){
     mouseposition = false;
     event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
}

function handlerpiano_o(){
     event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
}

function activePlay(event) {
     let src = `./assets/audio/${event.target.dataset.note}.mp3`
     event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
     playAudio(src);
}

function handlerpiano(event) {
     mouseposition = true
     activePlay(event)
}
    
function handlerpiano_m(event) {
     if (mouseposition == true) {
          activePlay(event)
          }  
     }

function handlerpiano_r(event){
     document.getElementById(`${event.which}`).classList.remove('piano-key-active')
}

function handlerpiano_b(event){
     let activeEl = document.getElementById(`${event.which }`);
     let src = `./assets/audio/${activeEl.dataset.note}.mp3`

     if (!event.repeat){
          playAudio(src);
          activeEl.classList.add('piano-key-active')
     }
    
}

function handlerbuttons() {
    if (event.target.classList.contains('btn-notes')){
     btnnotes.classList.add('btn-active');
     btnletters.classList.remove('btn-active');
     pianokey.forEach(key => key.classList.remove('piano-key-letter'));
    } else if (event.target.classList.contains('btn-letters')){
     btnnotes.classList.remove('btn-active');
     btnletters.classList.add('btn-active');
    pianokey.forEach(key => key.classList.add('piano-key-letter'));

     }
    
}

function handlerfullscreen() {
    if (!document.fullscreenElement && event.target.id == "fullscreen") {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen && event.target.id == "fullscreen") {
        document.exitFullscreen();
      }
    }
  }

  

window.addEventListener('keyup', handlerpiano_r)
window.addEventListener('keydown', handlerpiano_b)
fullscreen.addEventListener('click', handlerfullscreen)
piano.addEventListener('mousedown', handlerpiano);
piano.addEventListener('mouseout', handlerpiano_o);
piano.addEventListener('mouseover', handlerpiano_m);
main.addEventListener('mouseup', handlerpiano_u);
buttons.addEventListener('click', handlerbuttons);


