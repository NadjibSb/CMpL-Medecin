var log = require( '/services/logger' )( {
		tag: "PickerComponenet",
		hideLog: false
	} );
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentData = ""

function dataChoosed(e){
  $.trigger('dataChoosed',currentData)
}

function dataChanged(e){
  currentData = e.row.title
  $.trigger('dataChanged',e.row.title)
}
