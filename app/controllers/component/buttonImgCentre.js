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
var alignLeft = args.alignLeft;
var top = args.top;
var bottom = args.bottom;
var left = args.left;
var right = args.right;
//variable

//traintement
remplireData();

//function
function buttonClick(e){
  $.trigger('click' ,_.extend(e,{ buttonId: args.buttonId}))
}


function remplireData(){
  color && ($.viewButton.backgroundColor = color);
  if (icon) {
      $.image_button.image = icon;
  }else {
      $.image_button.visible = false;
  }
  /*icon && ($.image_button.image = icon);*/
  titre && ($.label.text = titre);
  fontColor && ($.label.color = fontColor);
  if (alignLeft) {
      $.content.left = 24
  }
  top && ($.viewButton.top = top);
  bottom && ($.viewButton.bottom = bottom);
  left && ($.viewButton.left = left);
  right && ($.viewButton.right = right);
}
