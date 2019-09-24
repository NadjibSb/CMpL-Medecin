var log = require("/services/logger")({
    tag: 'imagebuttoncentre',
	hideLog: false
})
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var titre = args.titre;
var icon = args.icon;
var color = args.color;
var fontColor = args.fontColor;
var left = args.alignLeft;
//variable


//function
function buttonClick(e){
  $.trigger('click' ,_.extend(e,{ buttonId: args.id}))
}


function remplireData(){
  $.viewButton.backgroundColor = color;
  $.image_button.image = icon;
  $.label.text = titre,
  $.label.color = fontColor;
  if (left) {
      $.content.left = 24
  }
}

//traintement
remplireData()
