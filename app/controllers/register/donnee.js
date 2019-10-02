const log = require( 'services/logger' )( {
		tag: "Register donnee",
		hideLog: false
	} );



// PUBLIC INTERFACE
_.extend($, {
    checkData: checkData,
});

// PRIVATE FUNCTIONS ------------------------------------------------------------

function checkData(){
    var medical = $.textFieldNom.value || "";
    var wilaya = $.labelWilaya.text;
    if( medical.length >0 && wilaya != L('wilaya')){
        return { wilaya: wilaya , medical: medical}
    }else return null
}


// EVENTS Handler ---------------------------------------------------------------
function choiceWilaya(e){
    hideKeyBoard();
  $.trigger("chooseWilaya",$.labelWilaya);
}

function hideKeyBoard(e){
    $.textFieldNom.blur();
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}

function hidePicker(e){
    $.trigger("hidePicker", e);
}
