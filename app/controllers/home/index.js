// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Home index",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    fileManager = require("/services/fileManager");

const LOCALE_FILE = Alloy.Globals.DATA_FILE;

(function constructor(){
    if (!fileManager.fileExists(LOCALE_FILE)) {
        var data = {
            codeMedcin: "M00001",
            visites: []
        };
        fileManager.writeToFile(LOCALE_FILE, data);
        var s = fileManager.readFile(LOCALE_FILE);
        log(s , "data");
    }

})();




function clickButton(e){
    log("buttonId " + e.buttonId);
    switch (e.buttonId) {
        case "publication":
            navManager.openWindow("home/publication/publications");
            break;
        case "visite_auth":
            navManager.openWindow("home/visiteAuth/index");
            break;
        case "visite_anony":
            navManager.openWindow("home/test/index");
            break;
        default:

    }
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}
