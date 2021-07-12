// Базовая задача

const trafficLightEl = document.querySelector('#trafficLight');

function makeGreen() {
    trafficLightEl.style.background = ('green');
    trafficLightEl.removeEventListener('click', makeGreen);
    trafficLightEl.addEventListener('click', makeYellow);
}

function makeYellow() {
    trafficLightEl.style.background = ('yellow');
    trafficLightEl.removeEventListener('click', makeYellow);
    trafficLightEl.addEventListener('click', makeRed);
}

function makeRed() {
    trafficLightEl.style.background = ('red');
    trafficLightEl.removeEventListener('click', makeRed);
    trafficLightEl.addEventListener('click', makeGreen);
}


trafficLightEl.addEventListener('click', makeGreen);


// Усложненная задача

const trafficLightYellow = document.querySelector('#trafficLightYellow');
const trafficLightRed = document.querySelector('#trafficLightRed');
const trafficLightGreen = document.querySelector('#trafficLightGreen');

const mapLights = new Map();
mapLights.set("green", trafficLightGreen);
mapLights.set("yellow", trafficLightYellow);
mapLights.set("red", trafficLightRed);

let currentLight = -1;

trafficLightYellow.addEventListener('click', swithLight);
trafficLightRed.addEventListener('click', swithLight);
trafficLightGreen.addEventListener('click', swithLight);

function swithLight()
{
  currentLight = (currentLight + 1) % 3;
  let i=0;
  mapLights.forEach((value, key, map) => {
    if (i==currentLight)
      value.style.background = key;
    else
      value.style.background = ("black");
    i++;
  });

}


