import '/js/components/header.js';
import '/js/components/footer.js';
import '/js/components/socials.js';


// quantity

const $totalQuantity = document.getElementById('total');
const $minusQuantity = document.getElementById('minus');
const $plusQuantity = document.getElementById('plus');

const $addToCartBtn = document.querySelector('.add-to-cart');


function calculateMinus() {
    let currentQuantity = parseInt($totalQuantity.innerHTML);
    if (currentQuantity > 0) {
        currentQuantity--;
        $totalQuantity.innerHTML = currentQuantity;
    }
}

function calculatePlus() {
    let currentQuantity = parseInt($totalQuantity.innerHTML);
    currentQuantity++;
    $totalQuantity.innerHTML = currentQuantity;
}

function addToCart() {
    console.log(addToCart);
}

$minusQuantity.addEventListener('click', calculateMinus);
$plusQuantity.addEventListener('click', calculatePlus);
$addToCartBtn.addEventListener('click', addToCart);


// fetch


function getProductElements(product) {

    let $productContainer = document.getElementById('product-container');
    let $productName = $productContainer.querySelector('.product');
    let $name = $productContainer.querySelector('.name');
    let $price = $productContainer.querySelector('.price');
    let $image = document.getElementById('product-image');
    let $tracklist = document.getElementById('tracklist');


    for (let i = 0; i < product.length; i++) {
        
        let elements = product[i];
        console.log(elements);

        $image.src = elements.imageURL;
        console.log($image);

        $productName.textContent = elements.product;
        $name.textContent = elements.name;
        $price.textContent = elements.price.text;

        $tracklist.innerHTML = ''

        for (let j = 0; j < elements.tracklist.length; j++) {
            const $track = document.createElement('li');
            $track.textContent = elements.tracklist[j];
            $tracklist.appendChild($track);

        }
    }
}


function fetchProductData() {
    fetch('data/shop.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Could not fetch data');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            getProductElements(data);
        })
        .catch(function (error) {
            console.error(error);
        });
}

fetchProductData();