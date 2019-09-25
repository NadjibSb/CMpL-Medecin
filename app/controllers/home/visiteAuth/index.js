// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Visite Auth",
		hideLog: false
	} );

var navManager = require("/services/navManager");





// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}

function scanneCode(e){
    navManager.openWindow("home/test/index");
    navManager.closeWindow($.window);
}
