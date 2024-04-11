import '/js/components/header.js';
import '/js/components/footer.js';
import '/js/components/socials.js';


function placeImage(image) {
  const $imageBackground = document.getElementById('get-photo');
  const $imageBackgroundElem = $imageBackground.querySelectorAll('img');
  
  for (let i = 0; i < $imageBackground.children.length; i++) {
    let ObjectImg = image[i];
    let curObjectImg = ObjectImg.imageURL;
    $imageBackgroundElem[i].src = curObjectImg;
  }
}

function fetchImage() {
  fetch('/data/photo.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Could not fetch texts');
      }
      return response.json();
    }).then(function(image) {
    placeImage(image);
  }).catch(function(error) {
    console.error(error);
  })
}

fetchImage();