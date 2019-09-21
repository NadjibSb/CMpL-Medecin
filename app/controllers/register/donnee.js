// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var labelWilaya = $.labelWilaya
// function
function choiceWilaya(e){
  $.trigger("chooseWilaya",labelWilaya)
}

// traitement
