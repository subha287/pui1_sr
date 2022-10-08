
// hw5

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


let glazeArr = [original, sugarMilk, vanillaMilk, doubleChocolate];
let packArr = [one, three, six, twelve];

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




// compute calculated price for each roll
function createRoll(rollType, rollGlazing, packSize) {
    // extracting price for given roll glazing
    for (i=0; i<glazeArr.length; i++) {
        if (glazeArr[i].name == rollGlazing) {
            glazePrice = glazeArr[i].glazePrice;
        }
    }

    // extracting price for given roll pack size
    for (i=0; i<packArr.length; i++) {
        if (packArr[i].name == packSize) {
            packPrice = packArr[i].packPrice;
        }
    }

    // extracting base price for roll from the JSON
    let basePrice = rolls[rollType].basePrice;

    let calculatedPrice = ((basePrice + glazePrice) * packPrice).toFixed(2);
    console.log(calculatedPrice);

    // create new roll with current selections
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice, calculatedPrice);

    // update cart with this new roll
    cart.push(newRoll);

    //return roll with price data
    return newRoll;
}

// update the total price
function updateTotalPrice() {
    let totalPrice = 0;
    for (i=0; i<cart.length; i++) {
        totalPrice = totalPrice + parseFloat(cart[i].calculatedPrice);
    }
    const billTotalPriceElement = document.querySelector('.cartprice');
    billTotalPriceElement.innerText = "$" + totalPrice.toFixed(2);
    console.log("i'm called!");
}


// function to remove each roll and update price
function removeRoll(billItemElement, roll) {
    billItemElement.remove();
    let idx = cart.indexOf(roll);
    if (idx > -1) { // only splice when roll is found
        cart.splice(idx, 1); // remove roll
    }
    updateTotalPrice();
}

//creating the bill

// creating the 4 rolls for initial cart updation
const originalRoll =  createRoll('Original', 'Sugar Milk', '1');
const walnutRoll = createRoll('Walnut', 'Vanilla Milk', '12');
const raisinRoll = createRoll('Raisin', 'Sugar Milk', '3');
const appleRoll = createRoll('Apple', 'Original', '3');

// DEBUGGING : updated cart with above rolls
// console.log(cart);

// updating template for each roll of cart
for (i=0; i<cart.length; i++) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    let cartObj = clone.querySelector('.cartItem');

    const btnRemove = cartObj.querySelector('.addremovetext');

    let roll = cart[i]; // saving each roll

    /*  used the arrow in eventlistener for parameters, like in the lab example.
     */
    btnRemove.addEventListener('click', () => {
        removeRoll(cartObj, roll);
    });

    const billElement = document.querySelector('#bill');
    billElement.append(cartObj);

    const theRollImage = cartObj.querySelector('.pics3'); //refers to image in HTML
    let rollImage = rolls[cart[i].type].imageFile; // extracting image name from JSON
    theRollImage.src = 'assets/' + rollImage;

    const theRollType = cartObj.querySelector('.roll-type');
    theRollType.innerText = cart[i].type + " Cinnamon Roll";

    const theRollGlazing = cartObj.querySelector('.roll-glazing');
    theRollGlazing.innerText = "Glazing: " + cart[i].glazing;

    const theRollPacksize = cartObj.querySelector('.roll-packsize');
    theRollPacksize.innerText = "Pack size: " + cart[i].size;

    const TheRollPrice = cartObj.querySelector('.cartprice');
    TheRollPrice.innerText = "$" + cart[i].calculatedPrice;
}
updateTotalPrice();

