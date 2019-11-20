'use strict';

const canvas = document.getElementById("canvas");
const pencil = document.querySelector('.panel-element--pencil');
const bucket = document.getElementById("fillBucket");
const chooseColor = document.getElementById("chooseColor");
const chooseColorLabel = document.querySelector('.panel-element--choice');
const currentColor = document.getElementById("current-color");
const previousColor = document.getElementById("previous-color");
const buttonPrevious = document.querySelector('.panel-element--previous-color');
const redColor = document.querySelector('.panel-element--red');
const blueColor = document.querySelector('.panel-element--blue');

canvas.width = 512;                                     
canvas.height = 512;

const ctx = canvas.getContext('2d');

let buttonsConditions = {
  fillBucket: false,
  chooseColor: false,
  pencil: true,
}

const cellSize = 32;

let removeActives = () => {
  let activeElements = document.querySelectorAll('.panel-element');
  activeElements.forEach((element) => {
    element.classList.remove('panel-element--active');
  })
}

let clickBucket = () => {
  buttonsConditions.fillBucket = true;
  removeActives();
  bucket.classList.add('panel-element--active');
  buttonsConditions.pencil = false;
  buttonsConditions.chooseColor = false;
}

let clickPencil = () => {
  buttonsConditions.pencil = true;
  removeActives();
  pencil.classList.add('panel-element--active');
  buttonsConditions.fillBucket = false;
  buttonsConditions.chooseColor = false;
}

let clickChoosingColor = () => {
  buttonsConditions.chooseColor = true;
  removeActives();
  chooseColorLabel.classList.add('panel-element--active');
  chooseColor.onchange = (evt) => {
    previousColor.value = currentColor.value;
    currentColor.value = evt.target.value; 
  }
  buttonsConditions.fillBucket = false;
}

canvas.onmousedown = (evt) => {
  if (buttonsConditions.pencil === true) {
    let x = Math.floor(evt.offsetX/cellSize);
    let y = Math.floor(evt.offsetY/cellSize);
    ctx.fillStyle = currentColor.value;
    ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
    canvas.onmousemove = (evt) => {
      let x = Math.floor(evt.offsetX/cellSize);
      let y = Math.floor(evt.offsetY/cellSize);
      ctx.fillStyle = currentColor.value;
      ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);     
    }
    canvas.onmouseup =  () => {
      canvas.onmousemove = null;
    }
    buttonsConditions.fillBucket = false;
    buttonsConditions.chooseColor = false;
  }

  if (buttonsConditions.fillBucket === true) {
    ctx.fillStyle = currentColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    buttonsConditions.pencil = false;
    buttonsConditions.chooseColor = false;
  }
}

pencil.onclick = () => {
  clickPencil();
}

bucket.onclick = () => { 
  clickBucket ()
}

chooseColor.onclick = () => {
  clickChoosingColor ();
}

currentColor.onclick = (evt) => {
  previousColor.value = currentColor.value;
  currentColor.value = evt.target.value;
}

buttonPrevious.onclick = () => {
  currentColor.value = previousColor.value;
}

redColor.onclick = () => {
  previousColor.value = currentColor.value;
  currentColor.value = '#F74141';
}

blueColor.onclick = () => {
  previousColor.value = currentColor.value;
  currentColor.value = '#41B6F7';
}

let onButtonsPress = (evt) => {
  if (evt.keyCode === 66) {
    clickBucket ();
  }
  if (evt.keyCode === 80) {
    clickPencil ();
  }
  if (evt.keyCode === 67) {
    clickChoosingColor ();
  }
}

document.addEventListener('keydown', onButtonsPress);

window.onbeforeunload =  () => {
  localStorage.setItem('canvasImage', canvas.toDataURL());
};

let dataURL = localStorage.getItem('canvasImage');
let img = new Image;
img.src = dataURL;
img.onload =  () => {
    ctx.drawImage(img, 0, 0);
};


