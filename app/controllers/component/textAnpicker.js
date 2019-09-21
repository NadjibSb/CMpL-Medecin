var log = require( '/services/logger' )( {
		tag: "textPickerComponenet",
		hideLog: false
	} );
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var imageLocalisation = $.imagePicker
var imageHopital = $.ImageText
var labelPicker = $.labelPicker
var textFeild = $.textFieldNom
_.extend($, {
  notFocus : notFocus,
  focus : focus,
  getValue :getValue,
  setValue :setValue,
  getLabelPicker : getLabelPicker,
  reset : reset
})

function choiceDonnee(e){
  $.trigger('choiceDonnee',labelPicker)
}

function focus(){
  log("editable")
  textFeild.tfInput.editable = true
}

function notFocus(){
  log("not editable")
  textFeild.tfInput.editable = false
}

function getValue(){
  return textFeild.tfInput.getValue()
}

function setValue(value){
  textFeild.tfInput.setValue(value)
}

function getLabelPicker(){
  return labelPicker
}


function reset(){
  textFeild.tfInput.color = "#929292"
}
//traitement
(()=>{
  imageLocalisation.image = args.iconPicker
  imageHopital.image = args.iconText
  labelPicker.text = Ti.App.Properties.getString(Alloy.Globals.WILAYA_NAME)
  labelPicker.color = args.labelColor
})()
