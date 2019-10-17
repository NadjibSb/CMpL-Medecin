const log = require( 'services/logger' )( {
		tag: "Register donnee",
		hideLog: false
	} );



// PUBLIC INTERFACE
_.extend($, {
    checkLabel: checkLabel,
    hideKeyBoard: hideKeyBoard
});

(function constructor(){
    // exit picker when the keyboard appears
    $.textFieldNom.addEventListener('focus', ()=>{
        hidePicker();
    });
})();
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

function focusOnTextField(e){
    $.textFieldNom.focus();
}

function hidePicker(e){
    $.trigger("hidepicker", e);
}
