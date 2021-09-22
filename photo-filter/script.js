const fullscreen = document.querySelector('.fullscreen');
const filters = document.querySelectorAll('.filters input');
const buttons = document.querySelectorAll('.editor');
const fileInput = document.querySelector('input[type=file]');
const download = document.querySelector('#save');
const canvas = document.querySelector('#canvas');

let time = new Date;
let currtime = `${time.getHours()}:${time.getMinutes()}`;
let currhour = time.getHours();

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
let i = 0;
let day;
if (currhour >= 6 && currhour < 12 ){
  day = 'morning/'
} else if (currhour >= 12 && currhour < 18){
  day = 'day/'
} else if (currhour >= 18 && currhour <= 23){
  day = 'evening/'
}  else if (currhour >= 0 && currhour < 6 ){
  day = 'night/'
};



function handlerfullscreen() {
  if (!document.fullscreenElement && event.target.id == "fullscreen") {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen && event.target.id == "fullscreen") {
      document.exitFullscreen();
    }
  }
}


function handlerupdate(){
  const metric = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + metric);
  document.getElementById(this.name).innerHTML = this.value;
}



function handlereditors(){
  if(event.target.id === 'reset'){
    reset.classList.add("btn-active");
    next.classList.remove('btn-active');
    loadl.classList.remove("btn-active");
    save.classList.remove('btn-active');
    document.documentElement.style.setProperty('--blur', '0px');
    document.getElementById('blur-slr').value = 0;
    document.getElementById('blur').value = 0;
    document.documentElement.style.setProperty('--invert', '0%');
    document.getElementById('invert-slr').value = 0;
    document.getElementById('invert').value = 0;
    document.documentElement.style.setProperty('--sepia', '0%');
    document.getElementById('sepia-slr').value = 0;
    document.getElementById('sepia').value = 0;
    document.documentElement.style.setProperty('--saturate', '100%');
    document.getElementById('saturate-slr').value = 100;
    document.getElementById('saturate').value = 100;
    document.documentElement.style.setProperty('--hue', '0deg');
    document.getElementById('hue-slr').value = 0;
    document.getElementById('hue').value = 0;
  } else if (event.target.id === 'next'){
    reset.classList.remove("btn-active");
    next.classList.add('btn-active');
    loadl.classList.remove("btn-active");
    save.classList.remove('btn-active')
    getImage();
    i++;
    if (i == 19){
      i = 0;
    }
  } else if (event.target.id === 'save'){
    reset.classList.remove("btn-active");
    next.classList.remove('btn-active');
    loadl.classList.remove("btn-active");
    save.classList.add('btn-active');
  } else if (event.target.id === 'load'){
    reset.classList.remove("btn-active");
    next.classList.remove('btn-active');
    save.classList.remove('btn-active');
  }

}

    function getImage(){
      setSrc = base + day + images[i];
      document.getElementById('main-img').src = setSrc; 
    }

 

    function loadfunction(){
      loadl.classList.add("btn-active");
      const file = fileInput.files[0];
     // console.log(file.name);
     const reader = new FileReader();
     document.getElementById('main-img').src = URL.createObjectURL(file);
     fileInput.value = '';
    }
    let ws = document.getElementById('main-img').width;
    let hs = document.getElementById('main-img').height;


    function createpicture(){
      const blur = document.getElementById('blur-slr').value;
      const invert = document.getElementById('invert-slr').value;
      const sepia = document.getElementById('sepia-slr').value;
      const saturate = document.getElementById('saturate-slr').value;
      const hue = document.getElementById('hue-slr').value;
      const img = new Image;
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = document.getElementById('main-img').src; 
      img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        let w = canvas.width;
        let h = canvas.height;
        let coaf = 0;
        if( w > h){
          coaf = w / ws;
          coaf = Math.floor(blur * coaf);
        } else if (h > w){
          coaf = h / hs;
          coaf = Math.floor(blur * coaf);
        }
        const ctx = canvas.getContext("2d");
        ctx.filter = 'blur('+ coaf +'px)' + 'invert('+ invert +'%)' + 'sepia('+ sepia +'%)' + 'saturate('+ saturate +'%)' + 'hue-rotate('+ hue +'deg)'; 
        ctx.drawImage(img, 0, 0);
        let link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL("png");
        link.click();
        link.delete; 
      };
    }
    

    function downloadfunction(){
      createpicture();
    }




 
download.addEventListener('click', downloadfunction);
fullscreen.addEventListener('click', handlerfullscreen);
buttons.forEach(buttons => buttons.addEventListener('click', handlereditors));
filters.forEach(filters => filters.addEventListener('input', handlerupdate));
fileInput.addEventListener('change', loadfunction);

