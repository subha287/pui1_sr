
let cart = JSON.parse(localStorage.getItem('cart')); 

// creating the objects that will hold the glaze and pack pricing details

let dictG = {
    "Keep Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double chocolate": 1.5
}

let dictP = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}



class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice, calculatedPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = calculatedPrice;
    }
}


// variables used in createRoll() func to manipulate and store the calculate price for each roll created
let glazePrice = 0;
let packPrice = 1;


// parse the cart and calculate the total
function priceUpdateFunc() {
    let totalPrice = 0;
    for (i = 0; i < cart.length; i++) {
        totalPrice = totalPrice + parseFloat(cart[i].calculatedPrice);
    }
    console.log(cart.length); //debugging
    console.log(totalPrice); // debugging 
    const theTotalPrice = document.querySelector('.cartprice22');
    theTotalPrice.innerText = "$" + totalPrice.toFixed(2);
    console.log("i'm called!"); //debugging

}



function delRoll(elementToBeDeleted, roll) {
    elementToBeDeleted.remove(); // just remove the element from html

    // now actuallly delete the roll from the cart in js
    let placeInArray = cart.indexOf(roll);
    console.log("place in array now is : " + placeInArray); // debug
    if (cart.length >= 0) { //when the cart still has atleast one elements 
        cart.splice(placeInArray, 1); // at the 'placeInArray' position of cart array, remove exactly one element
    }
    localStorage.setItem('cart', JSON.stringify(cart)); ///update local storage
    priceUpdateFunc();
    console.log('Current cart status', cart);  
}


// using template to populate HTML container for each roll in cart until the cart still has atleast 1 roll
for (i = 0; i < cart.length; i++) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    let cartObj = clone.querySelector('.cartItem'); //getting the whole div element inside the template

    const buttonRemove = cartObj.querySelector('.addremovetext');

    let roll = cart[i];



    // used the arrow in eventlistener for parameters, like in the lab example.
    buttonRemove.addEventListener('click', () => {
        delRoll(cartObj, roll);
    });


    // getting the container which holds the template from html to add the 
    const masterContainer = document.querySelector('#master');
    masterContainer.append(cartObj);


    // editing every individual element of the div which is being replicated using template
    const theRollImage = cartObj.querySelector('.pics3');
    let rollImage = rolls[cart[i].type].imageFile;
    theRollImage.src = 'assets/' + rollImage;

    const theRollType = cartObj.querySelector('.rtype');
    theRollType.innerText = cart[i].type + " Cinnamon Roll";

    const theRollGlazing = cartObj.querySelector('.rglazing');
    theRollGlazing.innerText = "Glazing: " + cart[i].glazing;

    const theRollPacksize = cartObj.querySelector('.rpacksize');
    theRollPacksize.innerText = "Pack size: " + cart[i].size;

    let fPrice = (cart[i].basePrice + dictG[cart[i].glazing])*dictP[cart[i].size]; //Compute calculated price
    console.log("final price is " + fPrice) //debug
    cart[i].calculatedPrice = fPrice.toFixed(2);
    const fPriceHtml = cartObj.querySelector('.cartprice');
    fPriceHtml.innerText = "$" + cart[i].calculatedPrice;

 }
priceUpdateFunc();