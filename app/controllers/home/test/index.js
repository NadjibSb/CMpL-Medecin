// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Test Med",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    fileManager = require("/services/fileManager");

const TMP_FILE = Alloy.Globals.TMP_FILE;
var args = $.args;
var visite = {
    date: Date.now()
};


(function constructor(){
    if (args && args.codePatient) {
        _.extend(visite, {codePatient: args.codePatient})
    }

    log(visite, "visite");
    fileManager.writeToFile(TMP_FILE, {});

})();


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
            saveVisite();
            break;
        default:
            navigateUp();
    }
}

function saveVisite(){
    log("save visite ...")
    if (fileManager.fileExists(TMP_FILE)) {
        var s = fileManager.readFile(TMP_FILE);
        log(s , "Visite data");
    }
}
