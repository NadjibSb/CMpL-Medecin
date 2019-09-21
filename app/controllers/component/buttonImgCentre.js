var log = require("/services/logger")({
    tag: 'imagebuttoncentre',
	hideLog: false
})
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var titre = args.titre;
var icon = args.icon;
var color = args.color;
//variable


//function
function buttonClick(e){
  $.trigger('click',e)
}


function remplireData(){
  $.viewButton.backgroundColor = color;
  $.image_button.image = icon;
  $.label.text = titre
}

//traintement
remplireData()
