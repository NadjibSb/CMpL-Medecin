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



(function constructor(){
    if (Alloy.Globals.isAndroid) {
        checkPermission(()=>{
            createLocalFile();
        });
    }else {
        createLocalFile();
    }

})();

function checkPermission(callback){
    if (!Ti.Filesystem.hasStoragePermissions()) {
        Ti.Filesystem.requestStoragePermissions(function(result) {
          log('Permission granted? ' + result.success);
          if (result.success) {
              _.isFunction( callback ) && callback();
          }
          else {
            alert('Permission denied.');
          }
        });
    }else {
        log('Permission granted');
        _.isFunction( callback ) && callback();
    }
}

// FUNCTIONS ----------------------------------------------------------------

function createLocalFile(){
    if (!fileManager.fileExists(LOCALE_FILE)) {
        var data = {
            codeMedcin: "M000001",
            visites: []
        };
        fileManager.writeToFile(LOCALE_FILE, data);
        var s = fileManager.readFile(LOCALE_FILE);
        log(s , "data");
        log(fileManager.fileExists(LOCALE_FILE) , "after creation > file exist");
    }
}

function syncronization(){
    $.progressIndicator.setMessage(L("home_syncronization"));
    $.progressIndicator.show();
    var localData = fileManager.readFile(LOCALE_FILE);
    log(localData, "localData1");
    if (fileManager.fileExists(LOCALE_FILE)) {
        var localData = fileManager.readFile(LOCALE_FILE);
        // localData = JSON.parse(localData);
        /*
        log(typeof(localData.visites) , "Visite type ---------------");
        log(typeof(localData.visites[0]) , "Visite 0 type ---------------");
        log(localData.visites.length , "Visite len ---------------");
        log(localData.visites , "localData ---------------");
        log(localData , LOCALE_FILE);*/
        log(localData, "localData");
        httpManager.request({
            url: BASE_URL + "medecins/sync",
            fullResponse: true,
            //header: {"Content-Type": "application/json"},
            params: {data: localData},
            method: "POST"
        },
        (r)=>{
            log(typeof( r), "reponse");
            log(typeof( JSON.parse(r)), "reponse parse");
            log(typeof( JSON.parse(r).visites), "visites");
            log(r, "reponse");
            $.progressIndicator.hide();
        },
        (e)=>{
            $.progressIndicator.hide();
            log(e, "error");
        });
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
