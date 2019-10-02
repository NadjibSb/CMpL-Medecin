// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Test Med",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    fileManager = require("/services/fileManager");

const TMP_FILE = Alloy.Globals.TMP_FILE,
    LOCALE_FILE = Alloy.Globals.DATA_FILE;
var args = $.args;
var visite;


(function constructor(){
    visite = {
        date: Date.now()
    };
    if (args && args.codePatient) {
        _.extend(visite, {codePatient: args.codePatient})
    }
    log(visite, "visite");

    // create a yemp file to save the current visite
    fileManager.deleteFile(TMP_FILE);
    fileManager.writeToFile(TMP_FILE, {});

})();


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    fileManager.deleteFile(TMP_FILE);
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
            navigateUp();
            break;
        default:
            navigateUp();
    }
}

function saveVisite(){
    log("save visite ...");

    if (fileManager.fileExists(TMP_FILE)) {
        // add the new visite data to visite
        var visiteData = fileManager.readFile(TMP_FILE);
        visiteData = JSON.parse(visiteData);
        _.extend(visite, {visite: visiteData});
        log(visite , "Visite ");
        // if there is data in visite => save it to the data locale file
        if (!_.isEmpty(visiteData)) {
            if (fileManager.fileExists(LOCALE_FILE)) {
                var allData = fileManager.readFile(LOCALE_FILE);
                //fileManager.deleteFile(LOCALE_FILE);
                allData = JSON.parse(allData);
                if (allData.visites) {
                    allData.visites.push(visite);
                    fileManager.writeToFile(LOCALE_FILE, allData);
                    log(fileManager.readFile(LOCALE_FILE), "visite saved");
                }
            }
        }
    }



}
