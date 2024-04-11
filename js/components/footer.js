const $document = window.matchMedia("(max-width: 768px)");
const $form = document.getElementById("form");
const $booking = document.getElementById("booking");
const $footer = document.getElementById("footer");
const $copyright = document.getElementById("copyright");
const $titleNewsletter = document.getElementById("titleNewsletter");
const $email = document.getElementById("email");

let shortCopyright;
let longCopyright;


//fetch title
function writeTexts(texts) {
    longCopyright = texts[0].copyright;
    shortCopyright = texts[0].shortcopyright;
    changeFooter($document);
    $booking.innerText = texts[0].booking;
    $booking.href = "mailto:" + texts[0].bookingemail;
    if ($form) {
        let newsletterObject = texts[0].newsletter;
        $titleNewsletter.innerText = newsletterObject[0];
        $email.placeholder = newsletterObject[1];
    }

    // $image.src = `images/${texts.image}`;
    // $image.alt = texts.image_alt;
  }
  
function fetchTexts() {
    fetch("/data/footer.json")
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
  

  function changeFooter(document) {
    if (document.matches) { 
        if ($form){
            $form.remove();
        }
        $footer.classList.remove('grid-col3');
        $footer.classList.add('grid-col2');
        $copyright.innerText = shortCopyright;
    } else {
        $copyright.innerText = longCopyright;
    }
  }


  fetchTexts();




  $document.addListener(changeFooter); 


  


  
 
 
