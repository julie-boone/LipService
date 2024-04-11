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


function writeTexts(texts) {
  const $musicContainer = document.getElementById('musicContainer');

  for (let i = 0; i < texts.length; i++)
  {
    let curObject = texts[i];
    $musicContainer.insertAdjacentHTML('beforeend', 
    '<div class="grid grid-col2 music"><div><iframe class="video" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div><div><h2 class="title_album"></h2><p id="description"></p><a  id="streaming" class="streaming" target= "_blank"></a></div></div>'
    )
    $musicContainer.children[i].children[0].children[0].src = curObject.embedcode;
    $musicContainer.children[i].children[1].children[0].innerText = curObject.titel;
    $musicContainer.children[i].children[1].children[1].innerText = curObject.beschrijving;
    $musicContainer.children[i].children[1].children[2].href = curObject.streamlink;
    $musicContainer.children[i].children[1].children[2].innerText = curObject.stream;
  }


}


function fetchTexts() {
  fetch('/data/music.json')
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