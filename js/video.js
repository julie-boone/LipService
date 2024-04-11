import '/js/components/header.js';
import '/js/components/footer.js';
import '/js/components/socials.js';

// function writeTexts(texts) {
//   const $title = document.getElementById('title');
//   const $image = document.getElementById('image');

//   $title.innerText = texts.title;
//   $image.src = `images/${texts.image}`;
//   $image.alt = texts.image_alt;
// }

function fetchTexts() {
  fetch('/data/index.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Could not fetch texts');
      }

      return response.json();
    }).then(function(texts) {
    writeTexts(texts);
  }).catch(function(error) {
    console.error(error);
  })
}

fetchTexts();