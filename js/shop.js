import '/js/components/header.js';
import '/js/components/footer.js';
import '/js/components/socials.js';

function getProductElements (product) {
  const $shop = document.getElementById('desktop_shop');
  //console.log($shop);

  for (let i = 0; i < product.length; i++) {
    let Elements = product[i];
    //console.log(Elements);
    let AllImages = Elements.imageURL;
    let AllDescriptions = Elements.description;
    let AllPrices = Elements.price.text;
    let productShopPage = Elements.price.href;
    //console.log(productShopPage);

    let newImage = `<div>
                      <img src="${AllImages}" alt="" class="image_product">
                      <p id="description" class="description_product">${AllDescriptions}</p>
                      <a href="${productShopPage}" target="_blank"><button id="price" class="price_product">${AllPrices}</button></a>
                    </div>`;
    $shop.insertAdjacentHTML('beforeend', newImage);
  }
}


function fetchProducts() {
  fetch('/data/shop.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Could not fetch texts');
      }

      return response.json();
    }).then(function(product) {
    getProductElements(product);
  }).catch(function(error) {
    console.error(error);
  })
}

fetchProducts();