var log = require("/services/logger")({
    tag: 'imagebutton',
	hideLog: false
})
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var titre = args.titre;
var icon = args.icon;
var color = args.color;
$.viewButton.buttonId = args.classe
//variable


//function
function buttonClick(e){
  $.trigger('click',$.viewButton.buttonId)
}


function remplireData(){
  if(titre == L("acuil_programme")) $.viewButton.top = "15%"
  $.viewButton.backgroundColor = color;
  $.image_button.image = icon;
  $.label.text = titre
}

//traintement
remplireData()
