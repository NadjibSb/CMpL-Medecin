// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Home index",
		hideLog: false
	} );

var navManager = require("/services/navManager");

function clickButton(e){
    log("buttonId " + e.buttonId);
    switch (e.buttonId) {
        case "publication":
            navManager.openWindow("home/publication/publications");
            break;
        default:

    }
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}
