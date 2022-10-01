
// populating the dropdown options

let allGlazes = [["Keep Original",0], ["Sugar Milk",0], ["Vanilla Milk",0.5], ["Double Chocolate",1.5]];

let allPacks = [1,3,6,12]
let basePrice;
let glazeChoice = "Keep original";
let packChoice = 1;

var dropdown1 = document.getElementById("glazingOptions");

for (i = 0; i < allGlazes.length; i++) {
   var opt = document.createElement("option");
   opt.text = allGlazes[i][0];
   opt.value = allGlazes[i][1];
   dropdown1.options.add(opt);
}

var dropdown2 = document.getElementById("pack");

for (i = 0; i < allPacks.length; i++) {
   var opt = document.createElement("option");
   opt.text = allPacks[i];
   opt.value = allPacks[i];
   dropdown2.options.add(opt);
}



cart = [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');



// run through rolls dictionary
for (r in rolls) {
   if (rollType == r) {
       document.querySelector("h3").textContent = r + " Cinnamon Roll";
       document.querySelector("#dynamicImg").src = "assets/"+rolls[r].imageFile;
       document.querySelector("#price").textContent = "$" +rolls[r].basePrice;
       basePrice = rolls[r].basePrice;
   }
}




// first function to change price when glazing option changes, second function is for when pack size changes.
function glazingChange(glazingOption) {
  var value = parseFloat(glazingOption.value);
  glazeChoice = glazingOption.options[glazingOption.selectedIndex].text;

  p=document.getElementById("pack").value;
  console.log(value)
  console.log("$" + (basePrice + value).toFixed(2).toString())
  console.log(glazingOption.options[glazingOption.selectedIndex].text)

  document.getElementById("price").innerHTML =
    "$" + ((basePrice + value)*p).toFixed(2).toString();
}

function packSizeChange(packSizeOption) {
  var pack = parseInt(packSizeOption.value);
  packChoice = pack;
  glazingprice = parseFloat(document.getElementById("glazingOptions").value);
  console.log("p",pack)
  console.log("gp",glazingprice)
  document.getElementById("price").innerHTML =
      "$" + ((basePrice + glazingprice) * pack).toFixed(2).toString();
}



class Rollprint {
   constructor(rollType, rollGlazing, pack, basePrice) {
       this.type = rollType;
       this.glazing =  rollGlazing;
       this.size = pack;
       this.basePrice = basePrice;
   }
}

//to print stuff in the console when cart is clicked
function printOnConsole() {
   let userSelection = new Rollprint(rollType, glazeChoice, packChoice, basePrice)
   cart.push(userSelection);
   console.log(cart);
}

