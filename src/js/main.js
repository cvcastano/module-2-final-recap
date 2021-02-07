'use strict';

const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('.js-filter');
const palettesContainer = document.querySelector('.js-palettes-container');

let palettes = [];

function fetchStoredData() {
  const storedPalettes = JSON.parse(localStorage.getItem('palettes'));
  if (storedPalettes === null) {
    fetchApiData();
  } else {
    palettes = storedPalettes;
    renderData();
  }
}

function fetchApiData() {
  fetch('https://beta.adalab.es/ejercicios-extra/js-ejercicio-de-paletas/data/palettes.json')
    .then(response => response.json())
    .then(data => {
      palettes = data.palettes;
      renderData();
      storeData();
    });
}

function storeData() {
  const stringPalettes = JSON.stringify(palettes);
  localStorage.setItem('palettes', stringPalettes);
}
// const chosenPalettes = inputElement.value.filter(palettes.name.include(inputElement.value));



function renderData() {

  for (const palette of palettes) {

    const paletteElement = document.createElement('li');
    palettesContainer.appendChild(paletteElement);
    paletteElement.classList.add('palette');

    const title = document.createElement('h2');
    paletteElement.appendChild(title);
    title.classList.add('palette__title');
    title.appendChild(document.createTextNode(`${palette.name}`));

    const colorsContainer = document.createElement('div');
    paletteElement.appendChild(colorsContainer);
    colorsContainer.classList.add('palette__colors');

    for (const paletteColor of palette.colors) {
      const color = document.createElement('div');
      colorsContainer.appendChild(color);
      color.classList.add('palette__color');
      color.setAttribute('style', 'background-color');
      color.style.backgroundColor = `#${paletteColor}`;
    }
  }

}

function handleFilter() {
  console.log('nah, no me sale');
}

inputElement.addEventListener('keyup', handleFilter);

function handleForm(ev) {
  ev.preventDefault();
  console.log('handleForm');
}
formElement.addEventListener('submit', handleForm);







fetchStoredData();