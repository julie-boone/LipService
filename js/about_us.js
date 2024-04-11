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

// grid weg bij responsive


let $document = window.matchMedia('(max-width: 769px)');
let $square = document.getElementById('square');
let $intro = document.getElementById('intro');
let $gridSection = document.querySelector('.grid-col2_left_');
let $gridSectionMembers = document.querySelectorAll('.grid-col4');
let $memberSection = document.querySelectorAll('.member');
let $memberTwoSection = document.getElementById('member-2');


function removeGrid(mediaQuery) {
  if (mediaQuery.matches) {
    $square.classList.remove('grid');
    $intro.classList.remove('grid');
    $gridSection.classList.remove('grid');
    $gridSection.classList.remove('grid-col2');
    $gridSection.classList.remove('grid-col4');

    for (let i = 0; i < $gridSectionMembers.length; i++) {
      $gridSectionMembers[i].classList.remove('grid');
      $gridSectionMembers[i].classList.remove('grid-col4');
      $memberSection[i].classList.remove('member');
    }
  } else {
    $square.classList.add('grid');
    $intro.classList.add('grid');
    $gridSection.classList.add('grid');
    $gridSection.classList.add('grid-col2');
    $gridSection.classList.add('grid-col4');

    for (let i = 0; i < $gridSectionMembers.length; i++) {
      $gridSectionMembers[i].classList.add('grid');
      $gridSectionMembers[i].classList.add('grid-col4');
      $memberSection[i].classList.add('member');
    }
  }
}

$document.addEventListener('change', function (mediaQuery) {
  removeGrid(mediaQuery);
});


// herpositioneren van foto en tekst voor mobile 

function reorderElements(mediaQuery) {
  if (mediaQuery.matches) {
    const $squares = $memberTwoSection.querySelectorAll('.square.member-2');
    const $texts = $memberTwoSection.querySelectorAll('.member-2-text');

    for (let index = 0; index < $squares.length; index++) {
      $memberTwoSection.insertBefore($squares[index], $texts[index]);
    }
  } else {
    const $squares = $memberTwoSection.querySelectorAll('.square.member-2');
    const $texts = $memberTwoSection.querySelectorAll('.member-2-text');

    for (let index = 0; index < $squares.length; index++) {
      $memberTwoSection.insertBefore($texts[index], $squares[index]);
    }
  }
}

$document.addEventListener('change', function (mediaQuery) {
  reorderElements(mediaQuery);
});


// fetch

const sectionContainer = document.getElementById('section-container');

function createSections(data) {
  sectionContainer.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    const sectionData = data[i];

    if (sectionData.type === 'grid-col2_left_') {
      const sectionHTML = createCol2LeftSection(sectionData);
      sectionContainer.insertAdjacentHTML('beforeend', sectionHTML);

    } else if (sectionData.type === 'grid-col4') {
      
        const sectionHTML = createCol4Section(sectionData);
        sectionContainer.insertAdjacentHTML('beforeend', sectionHTML);
      }
    }
  }


function createCol2LeftSection(data) {
  const imageHtml = `
    <div class="square">
      <img src="${data.imageURL}" alt="${data.altText}">
    </div>
  `;

  const introHtml = `
    <div class="intro">
      <p>${data.introText || ''}</p>
    </div>
  `;

  return `
    <section class="grid grid-col2_left_">
      ${imageHtml}
      ${introHtml}
    </section>
  `;
}

function createCol4Section(data) {
  let membersHTML = '';
  for (let i = 0; i < data.members.length; i++) {
    membersHTML += createCol4MemberSection(data.members[i]);
  }
  
  return '<section class="member grid grid-col4">' + membersHTML + '</section>';
}

function createCol4MemberSection(member) {
  const imageHtml = '<div class="square"><img src="' + member.imageURL + '" alt="' + member.altText + '"></div>';
  const memberTextHtml = '<div class="member-text"><h3>' + (member.name || '') + '</h3><p>' + member.gender + ' ' + member.city + '<br>' + member.role + '</p></div>';
  
  return imageHtml + memberTextHtml;
}

function fetchDataAboutUs() {
  fetch('/data/about_us.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      return response.json();
    })
    .then(function (data) {
      createSections(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

fetchDataAboutUs();




