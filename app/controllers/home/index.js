// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Home index",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    fileManager = require("/services/fileManager"),
    httpManager = require("/services/httpManager"),
	alertDialog = require( 'services/alertManager' ),
    BASE_URL = Alloy.CFG.urls.apiUrl;;

const LOCALE_FILE = Alloy.Globals.DATA_FILE;

_.extend($.args, {
    tag: HOME
});



(function constructor(){
    $.progressIndicator.hide();
    createLocalFile();

})();



// FUNCTIONS ----------------------------------------------------------------

function createLocalFile(){
    if (!fileManager.fileExists(LOCALE_FILE)) {
        var codeMedcin = Alloy.Globals.getCode();
        var data = {
            codeMedcin: codeMedcin,
            visites: []
        };
        fileManager.writeToFile(LOCALE_FILE, data);
        var s = fileManager.readFile(LOCALE_FILE);
        log(s , "data");
        log(fileManager.fileExists(LOCALE_FILE) , "after creation > file exist");
    }
}

function syncronization(){
    $.progressIndicator.show("Syncroniser ...");
    var localData = fileManager.readFile(LOCALE_FILE);
    if (fileManager.fileExists(LOCALE_FILE)) {
        var localData = fileManager.readFile(LOCALE_FILE);
        log(localData, "localData");
        setTimeout(()=>{// Syncronize
            httpManager.request({
                url: BASE_URL + "medecins/sync",
                fullResponse: true,
                params: {data: localData},
                method: "POST"
            },
            (r)=>{
                log(r, "syncronization sucess");
                fileManager.deleteFile(LOCALE_FILE);
                createLocalFile();
                $.progressIndicator.sucess("Synchronisation réussie");
            },
            (e)=>{
                $.progressIndicator.failed("Echec de la synchronisation");
                log(e, "syncronization error");
            });
        },500);
    }
}


// EVENT HENDLERS ----------------------------------------------------------------

function clickButton(e){
    log("buttonId " + e.buttonId);
    switch (e.buttonId) {
        case "visite_auth":
            navManager.openWindow("home/visiteAuth/index");
            break;
        case "visite_anony":
            navManager.openWindow("home/test/index");
            break;
        case "publication":
            navManager.openWindow("home/publication/publications");
            break;
        case "syncronization":
            syncronization();
            break;
        default:

    }
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}

function exitSyncBox(e){
    $.progressIndicator.hide();
}
