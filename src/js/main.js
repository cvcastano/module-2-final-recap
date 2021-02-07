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
    renderPalettes();
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

function renderPalettes() {
  let htmlCode = '';

  for (const palette of palettes) {
    htmlCode += '<li class="palette">';
    htmlCode += `<h2 class="palette__title">${palette.name}</h2>`;
    htmlCode += '<div class="palette__colors">';

    for (const paletteColor of palette.colors) {
      htmlCode += `<div class="palette__color" style="background-color: #${paletteColor}"></div>`;
    }
    htmlCode += '</div>';
    htmlCode += '</li>';
  }
  palettesContainer.innerHTML = htmlCode;
}

function handleFilter() {
  console.log('listening...');
  renderPalettes();
}
inputElement.addEventListener('keyup', handleFilter);

function handleForm(ev) {
  ev.preventDefault();
  console.log('handleForm');
}
formElement.addEventListener('submit', handleForm);


fetchStoredData();