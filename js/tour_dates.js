import '/js/components/header.js';
import '/js/components/footer.js';
import '/js/components/socials.js';


let upcomingInOrder = new Array();
let pastInOrder = new Array();
let fromDatabase = new Array();

const $containerUpcoming = document.getElementById("tourdates_upcoming");
const $containerPast = document.getElementById("tourdates_past");

function datesInOrder (){
  const today = new Date();
  let listConcertDate;

  for (let i = 0; i < fromDatabase.length; i++) {
    let concertDate = new Date(fromDatabase[i].datum);


    if (concertDate >= today) {
      if(upcomingInOrder.length === 0) {
        upcomingInOrder.push(fromDatabase[i]);
      } else {
      for (let j = 0; j < upcomingInOrder.length; j++) {
        listConcertDate = new Date(upcomingInOrder[j].datum);
        if (concertDate < listConcertDate) {
          upcomingInOrder.splice(j, 0, fromDatabase[i]);
          break;
        } 
        else {
          if (j === upcomingInOrder.length - 1) {
            upcomingInOrder.push(fromDatabase[i]);
            break;
          }
        }
      }
    }
    } else {
      if(pastInOrder.length === 0) {
        pastInOrder.push(fromDatabase[i]);
      } else {
      for (let k = 0; k < pastInOrder.length; k++) {
        listConcertDate = new Date(fromDatabase[k].datum);
        if (concertDate > listConcertDate) {
          pastInOrder.splice(k, 0, fromDatabase[i]);
          break;
        }
        else {
          if (k === pastInOrder.length - 1) {
            pastInOrder.push(fromDatabase[i]);
            break;
          }
        }
      }
    }
    }
  }
}


function upcomingHTML() {
  let upcomingHTML = "";

  for(let i=0; i<upcomingInOrder.length; i++) {
    let concertVenue = upcomingInOrder[i].locatie;
    let concertCity = upcomingInOrder[i].stad
    let concertLocation = concertCity.toUpperCase() + ', ' + upcomingInOrder[i].landcode;
    let ticketLink = upcomingInOrder[i].tickets;
    let uitverkocht;
    let concertDate = new Date(upcomingInOrder[i].datum);
    let dateHTML = concertDate.getDate() + "/" + concertDate.getMonth() + "/" + concertDate.getFullYear();
    let weekDayHTML = concertDate.getDay();

    switch (weekDayHTML) {
      case 0:
        weekDayHTML = "Sunday";
        break;
      case 1: 
        weekDayHTML = "Monday";
        break;
      case 2:
        weekDayHTML = "Tuesday";
        break;
      case 3:
        weekDayHTML = "Wednesday";
        break;
      case 4: 
        weekDayHTML = "Thursday";
        break;
      case 5:
        weekDayHTML = "Friday";
        break;
      case 6:
        weekDayHTML = "Saturday";
        break;
    }

    if (upcomingInOrder[i].uitverkocht === true) {
      uitverkocht = 'uitverkocht';
    } else {
      uitverkocht = 'niet_uitverkocht';
    }

    let htmlToAdd = `
        <article class="grid grid-col3">
          <div class="date_column">
              <p class="weekday">${weekDayHTML}</p>
              <p class="date">${dateHTML}</p>
          </div>
          <div class="location_column">
              <p class="venue">${concertVenue}</p>
              <p class="city_country">${concertLocation}</p>
          </div>
          <div class="tickets_column">
              <a class="tickets" href="${ticketLink}" target="_blank">TICKETS</a>
              <p class="sold_out ${uitverkocht}">SOLD OUT</p>
          </div>
        </article>
        <br>`
    ;

    upcomingHTML+=htmlToAdd;
  }
  
  $containerUpcoming.insertAdjacentHTML('beforeend', upcomingHTML);
}

function pastHTML() {
  let pastHTML = "";

  for(let i=0; i<pastInOrder.length; i++) {
    let concertVenue = pastInOrder[i].locatie;
    let concertCity = pastInOrder[i].stad;
    let concertLocation = concertCity.toUpperCase() + ', ' + pastInOrder[i].landcode;
    let ticketLink = pastInOrder[i].tickets;
    let uitverkocht = 'niet_uitverkocht';
    let concertDate = new Date(pastInOrder[i].datum);
    let dateHTML = concertDate.getDate() + "/" + concertDate.getMonth() + "/" + concertDate.getFullYear();
    let weekDayHTML = concertDate.getDay();

    switch (weekDayHTML) {
      case 0:
        weekDayHTML = "Sunday";
        break;
      case 1: 
        weekDayHTML = "Monday";
        break;
      case 2:
        weekDayHTML = "Tuesday";
        break;
      case 3:
        weekDayHTML = "Wednesday";
        break;
      case 4: 
        weekDayHTML = "Thursday";
        break;
      case 5:
        weekDayHTML = "Friday";
        break;
      case 6:
        weekDayHTML = "Saturday";
        break;
    }

    let htmlToAdd = `
        <article class="grid grid-col3">
          <div class="date_column">
              <p class="weekday">${weekDayHTML}</p>
              <p class="date">${dateHTML}</p>
          </div>
          <div class="location_column">
              <p class="venue">${concertVenue}</p>
              <p class="city_country">${concertLocation}</p>
          </div>
          <div class="tickets_column">
              <a class="tickets">TICKETS</a>
              <p class="sold_out ${uitverkocht}">SOLD OUT</p>
          </div>
        </article>
        <br>`
    ;

    pastHTML+=htmlToAdd;
  }
  
  $containerPast.insertAdjacentHTML('beforeend', pastHTML);
}


function writeTexts(texts) {
  for(let i=0; i < texts.length; i++) {
    fromDatabase.push(texts[i]);
  }
  
  datesInOrder();

  upcomingHTML();
  pastHTML();

}


function fetchTexts() {
  fetch('/data/tour_dates.json')
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