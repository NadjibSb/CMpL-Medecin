// DEPENDENCIES ------------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "result index",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    fileManager = require("/services/fileManager");


// VARIABLES ------------------------------------------------------------------------
const GOOD = 1, MOY = 0, LOW = -1;
const TMP_FILE = Alloy.Globals.TMP_FILE;
var args = $.args;

_.extend($ , {
    androidBack: androidBack
});


// CONSTRUCTOR ------------------------------------------------------------------------
(function contructor(){
    log(args, "args");
    if (args && args.ligne && args.itk && args.duree && args.bcr_abl) {
        calculResult(args);
    }

})();



// PRIVATE FUNCTIONS ------------------------------------------------------------------------
function calculResult(args){
    log("calculResult...");
    if (args.ligne == L("monitoring_screen01_btn1")) {
        switch (args.duree) {
            case L("monitoring_screen03_btn1"):
                (args.bcr_abl <=10) ? updateUIAndSave(GOOD) : updateUIAndSave(MOY);
                break;
            case L("monitoring_screen03_btn2"):
                if (args.bcr_abl <=1) {
                    updateUIAndSave(GOOD)
                }else if (args.bcr_abl <10) {
                    updateUIAndSave(MOY)
                }else {
                    updateUIAndSave(LOW)
                }
                break;
            case L("monitoring_screen03_btn3"):
            case L("monitoring_screen03_btn4"):
            case L("monitoring_screen03_btn5"):
                if (args.bcr_abl <= 0.1) {
                    updateUIAndSave(GOOD)
                }else if (args.bcr_abl <1) {
                    updateUIAndSave(MOY)
                }else {
                    updateUIAndSave(LOW)
                }
                break;
        }
    //------ args.ligne ==2
    }else{
        switch (args.duree) {
            case L("monitoring_screen03_btn1"):
                (args.bcr_abl <=10) ? updateUIAndSave(GOOD) : updateUIAndSave(MOY);
                break;
            case L("monitoring_screen03_btn2"):
                if (args.bcr_abl <=10) {
                    updateUIAndSave(GOOD)
                }else {
                    updateUIAndSave(LOW)
                }
                break;
            case L("monitoring_screen03_btn3"):
                if (args.bcr_abl <= 1) {
                    updateUIAndSave(GOOD)
                }else if (args.bcr_abl <=10) {
                    updateUIAndSave(MOY)
                }else {
                    updateUIAndSave(LOW)
                }
                break;
            case L("monitoring_screen03_btn4"):
            case L("monitoring_screen03_btn5"):
                if (args.bcr_abl <= 0.1) {
                    updateUIAndSave(GOOD)
                }else {
                    updateUIAndSave(LOW)
                }
                break;
        }
    }
}

function updateUIAndSave(type){
    log("updateUIAndSave ...");
    switch (type) {
        case GOOD:
            $.lbResultText.text = L('monitoring_result_Good');
            $.lbResultText.color = Alloy.CFG.colors.primaryColor;
            $.icon.backgroundColor = Alloy.CFG.colors.primaryColor;
            saveData(args, L('monitoring_result_Good'));
            break;
        case MOY:
            $.lbResultText.text = L('monitoring_result_Moy');
            $.lbResultText.color = Alloy.CFG.colors.orange;
            $.icon.backgroundColor = Alloy.CFG.colors.orange;
            saveData(args, L('monitoring_result_Moy'));
            break;
        case LOW:
            $.lbResultText.text = L('monitoring_result_Low');
            $.lbResultText.color = Alloy.CFG.colors.red;
            $.icon.backgroundColor = Alloy.CFG.colors.red;
            saveData(args, L('monitoring_result_Low'));
            break;
    }
}

function saveData(args, message){
    log("saveData ...");
    if (fileManager.fileExists(TMP_FILE)) {
        var data = fileManager.readFile(TMP_FILE);
        data = JSON.parse(data);
        var toSave = {
            ligne_traitement: args.ligne,
            itk: args.itk,
            temps_traitement: args.duree,
            taux_bcrabl: args.bcr_abl,
            resultat: {
                message: message
            }
        };
        _.extend(data, {tracker: toSave});
        fileManager.writeToFile(TMP_FILE, data);
        log(fileManager.readFile(TMP_FILE), "tracker data saved");
    }
}

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.popUpTo($,TEST);
}
function androidBack(e){
    navigateUp(e);
}

function navigateToRecommendations(e){
    navManager.openWindow("home/test/result/recommendations");
}
