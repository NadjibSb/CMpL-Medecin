const log = require( 'services/logger' )( {
		tag: "Register donnee",
		hideLog: false
	} );



// PUBLIC INTERFACE
_.extend($, {
    checkData: checkData
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
  $.trigger("chooseWilaya",$.labelWilaya);
}
