
// hw5 file

let cart = [];
class Pack {
    name;
    packPrice;
    constructor(name, price) {
        this.name = name;
        this.packPrice = price;
    }
}

const one = new Pack('1', 1);
const three = new Pack('3', 3);
const six = new Pack('6', 5);
const twelve = new Pack('12', 10);


class Glaze {
    name;
    glazePrice;
    constructor(name, price) {
        this.name = name;
        this.glazePrice = price;
    }
}


const original = new Glaze('Keep Original', 0.0);
const sugarMilk = new Glaze('Sugar Milk', 0.0);
const vanillaMilk = new Glaze('Vanilla Milk', 0.50);
const doubleChocolate = new Glaze('Double Chocolate', 1.50);


let glazeArray = [original, sugarMilk, vanillaMilk, doubleChocolate];
let packArray = [one, three, six, twelve];

let glazePrice = 0; 
let packPrice = 1; 


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice, calculatedPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = calculatedPrice;
    }
}



// calc price for each roll using glaze and pack info
function createRoll(rollType, rollGlazing, packSize) {

    for (i=0; i<glazeArray.length; i++) {
        if (glazeArray[i].name == rollGlazing) {
            glazePrice = glazeArray[i].glazePrice;
        }
    }


    for (i=0; i<packArray.length; i++) {
        if (packArray[i].name == packSize) {
            packPrice = packArray[i].packPrice;
        }
    }

    // base price from json's rolls
    let basePrice = rolls[rollType].basePrice;

    let calculatedPrice = ((basePrice + glazePrice) * packPrice).toFixed(2);
    console.log(calculatedPrice);
 
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice, calculatedPrice);

    // add roll calculated to cart
    cart.push(newRoll);
    return newRoll;
}

// parse the cart and calculate the total
function priceUpdateFunc() {
    let totalPrice = 0;
    for (i=0; i<cart.length; i++) {
        totalPrice = totalPrice + parseFloat(cart[i].calculatedPrice);
    }
    console.log(totalPrice)
    const theTotalPrice = document.querySelector('.cartprice22');
    theTotalPrice.innerText = "$" + totalPrice.toFixed(2);
    console.log("i'm called!" );
    console.log(totalPrice);
}


//remove the element when button is clicked as well as update the cart 
function removeRoll(elementToBeDeleted, roll) {
    elementToBeDeleted.remove();
    let placeInArray = cart.indexOf(roll);
    if (placeInArray > -1) { 
        cart.splice(placeInArray, 1); // at the 'placeInArray' position of cart, remove exactly one element
    }
    priceUpdateFunc();
}



// creating the 4 rolls which will be part of the cart
const originalRoll =  createRoll('Original', 'Sugar Milk', '1');
const walnutRoll = createRoll('Walnut', 'Vanilla Milk', '12');
const raisinRoll = createRoll('Raisin', 'Sugar Milk', '3');
const appleRoll = createRoll('Apple', 'Original', '3');



// using template to populate HTML container for each roll in cart
for (i=0; i<cart.length; i++) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    let cartObj = clone.querySelector('.cartItem');
    
    const buttonRemove = cartObj.querySelector('.addremovetext');

    let roll = cart[i]; 

    // used the arrow in eventlistener for parameters, like in the lab example.
    buttonRemove.addEventListener('click', () => {
        removeRoll(cartObj, roll);
    });

    const masterContainer = document.querySelector('#master');
    masterContainer.append(cartObj);

    const theRollImage = cartObj.querySelector('.pics3'); 
    let rollImage = rolls[cart[i].type].imageFile; 
    theRollImage.src = 'assets/' + rollImage;

    const theRollType = cartObj.querySelector('.rtype');
    theRollType.innerText = cart[i].type + " Cinnamon Roll";

    const theRollGlazing = cartObj.querySelector('.rglazing');
    theRollGlazing.innerText = "Glazing: " + cart[i].glazing;

    const theRollPacksize = cartObj.querySelector('.rpacksize');
    theRollPacksize.innerText = "Pack size: " + cart[i].size;

    const TheRollPrice = cartObj.querySelector('.cartprice');
    TheRollPrice.innerText = "$" + cart[i].calculatedPrice;
}
priceUpdateFunc();

