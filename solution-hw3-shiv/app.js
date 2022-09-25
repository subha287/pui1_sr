glazingprice_list = {
  keep_original: 0.0,
  sugar_milk: 0.0,
  vanilla_milk: 0.5,
  double_chocolate: 1.5,
};

function glazingChange(glazingOption) {
  var value = glazingOption.value;
  pack = document.getElementById("pack").value;
  document.getElementById("price").innerHTML =
    "$" + ((2.49 + glazingprice_list[value]) * pack).toFixed(2).toString();
}

function packSizeChange(packSizeOption) {
  var value = packSizeOption.value;
  glazingprice =
    glazingprice_list[document.getElementById("glazingOptions").value];
  document.getElementById("price").innerHTML =
    "$" + ((2.49 + glazingprice) * value).toFixed(2).toString();
}
