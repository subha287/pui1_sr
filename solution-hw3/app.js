
// populating the dropdown options

let allGlazes = [["Keep Original",0], ["Sugar Milk",0], ["Vanilla Milk",0.5], ["Double Chocolate",1.5]];

let allPacks = [1,3,6,12]

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


// first function to change price when glazing option changes, second function is for when pack size changes.
function glazingChange(glazingOption) {
  var value = parseFloat(glazingOption.value);
  p=document.getElementById("pack").value;
  console.log(value)
  console.log("$" + (2.49 + value).toFixed(2).toString())

  document.getElementById("price").innerHTML =
    "$" + ((2.49 + value)*p).toFixed(2).toString();
}

function packSizeChange(packSizeOption) {
  var pack = parseInt(packSizeOption.value);
  glazingprice = parseFloat(document.getElementById("glazingOptions").value);
  console.log("p",pack)
  console.log("gp",glazingprice)
  document.getElementById("price").innerHTML =
      "$" + ((2.49 + glazingprice) * pack).toFixed(2).toString();
}





