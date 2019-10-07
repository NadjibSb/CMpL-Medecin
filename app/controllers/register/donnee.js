const log = require( 'services/logger' )( {
		tag: "Register donnee",
		hideLog: false
	} );



// PUBLIC INTERFACE
_.extend($, {
    checkLabel: checkLabel,
    hideKeyBoard: hideKeyBoard
});

// PRIVATE FUNCTIONS ------------------------------------------------------------

function checkLabel(){
    var medical = $.textFieldNom.value || "";
    if( medical.length >0 ){
        return  medical
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
