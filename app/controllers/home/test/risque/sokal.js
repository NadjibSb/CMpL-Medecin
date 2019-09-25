// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "risque sokal",
		hideLog: false
	} );

var navManager = require("/services/navManager");





// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}
