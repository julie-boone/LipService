
function placeLinks(links) {
    const $socialsContainer = document.getElementById('socials');

    for (let i = 0; i < $socialsContainer.children.length; i++)
    {
      let curObject = links[i];
      $socialsContainer.children[i].firstChild.src = curObject[0];
      $socialsContainer.children[i].firstChild.alt = curObject[2];
      $socialsContainer.children[i].href = curObject[1];
      $socialsContainer.children[i].target = "_blank";
    }
}


function fetchLinks() {
    fetch('/data/socials.json')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Could not fetch texts');
        }
  
        return response.json();
      }).then(function(links) {
      placeLinks(links);
    }).catch(function(error) {
      console.error(error);
    })
  }
  
  fetchLinks();