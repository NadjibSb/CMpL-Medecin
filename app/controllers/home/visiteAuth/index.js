// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Visite Auth",
		hideLog: false
	} );

var navManager = require("/services/navManager");


var codePatient= "P00001";

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}

function scanneCode(e){
    navManager.openWindow("home/test/index", {codePatient: codePatient});
}
