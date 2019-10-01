// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Test Med",
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

function clickButton(e){
    log(e.buttonId);
    switch (e.buttonId) {
        case "eutos":
            navManager.openWindow("home/test/risque/eutos");
            break;
        case "sokal":
            navManager.openWindow("home/test/risque/sokal");
            break;
        case "tracker":
            navManager.openWindow("home/test/monitoring/index");
            break;
        case "finish":

            break;
        default:
            navigateUp();
    }
}
