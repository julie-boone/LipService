


//fetch title
function writeTexts(texts) {
  const $title = document.getElementById("title");
  $title.innerText = texts[0].titel;
  // $image.src = `images/${texts.image}`;
  // $image.alt = texts.image_alt;
}

function fetchTexts() {
  fetch("/data/index.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not fetch texts");
      }

      return response.json();
    })
    .then(function (texts) {
      writeTexts(texts);
    })
    .catch(function (error) {
      console.error(error);
    });
}


//disappear nav bar
let lastKnownScrollPosition = 0;
let $header = document.getElementById('header');

function disappear() {
  let currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastKnownScrollPosition) {
    $header.classList.add("disappear");
    lastKnownScrollPosition = currentScrollPosition;
  }

  else {
    $header.classList.remove("disappear");
    lastKnownScrollPosition = currentScrollPosition;
  }
}

document.addEventListener('scroll', disappear);

fetchTexts();

//fetch nav menu
function placeMenuText(menuText) {
  const $navDesktop = document.getElementById('nav');
  const $navDesktopElem = $navDesktop.querySelectorAll('a');

  for (let i = 0; i < $navDesktopElem.length; i++) {
    //console.log('li lijst',$navDesktopElem);
    let ObjectNav = menuText[i];
    let curObjectNav = ObjectNav.nav[0];
    //console.log('menutext', curObjectNav);

    let curObjectNavKeys = Object.keys(curObjectNav);
    //console.log('menutext object keys', curObjectNavKeys);

    for (let i = 0; i < curObjectNavKeys.length; i++) {
      let curKey = curObjectNavKeys[i];
      let hrefValue = curObjectNav[curKey].href;
      //console.log('href', hrefValue);

      $navDesktopElem[i].setAttribute("href", hrefValue);
      $navDesktopElem[i].innerText = curKey;
    }
  }
}

  //place footer in mobile nav
function placeNewsletterNav() {
  let $inputToggle = document.getElementById('toggle');
  let $inputNav = document.querySelectorAll('nav-desktop');
  //console.log($inputToggle);
  
  
  if ($inputToggle.checked === true) {

    let $formData = `<form id="form">
        <p id="titleNewsletter"></p>
        <input type="text" id="email" name="email" >
        <br>
        <input type="submit" id="submit"></form>
        `;
  
    $inputNav.insertAdjacentHTML('afterend', $formData);
  }  
}
placeNewsletterNav();

  

function fetchMenuNav() {
  fetch('/data/index.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Could not fetch texts');
      }
      return response.json();
    }).then(function (menuText) {
      placeMenuText(menuText);
    }).catch(function (error) {
      console.error(error);
    })
}

fetchMenuNav();












