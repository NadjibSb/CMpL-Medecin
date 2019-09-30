// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "risque eutos",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require('/services/alertManager');


const EUTOS = "EUTOS";


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function onCalculer(e){
    navManager.openWindow("home/test/result/index", {
        source: EUTOS,
        rate: 3.5,
        bosiphiles: 50
    });
    /*
    checkEmptyFields( ()=>{
        checkValidFields( (args)=>{
            log(args);
            navManager.openWindow("home/test/result/index", args);
        })
    });*/
}

function exitKeyBoard(e){
    $.tfRate.blur();
    $.tfBosiphiles.blur();
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}


function checkEmptyFields(callback){
    var msg="";
    switch ("") {
        case $.tfRate.value:
            msg = "Le champ 'Rate' doit être renseigné";
            break;
        case $.tfBosiphiles.value:
            msg = "Le champ 'Bosiphiles' doit être renseigné";
            break;
        default:
    }
    log(msg, 'checkEmptyFields');
    if (msg != "") {
        alertDialog.show({
            title: L("missed_field"),
            message: msg
        })
    }else {
        _.isFunction( callback ) && callback();
    }
}

function checkValidFields(callback){
    // verify rate
    var rate = $.tfRate.value;
    if ( rate>= 1 && rate <= 150) {
        // verify bosiphiles
        try {
            var bosiphiles = parseFloat( $.tfBosiphiles.value.replace(",", ".") );
            if (bosiphiles >=0 && bosiphiles <=100) {
                _.isFunction( callback ) && callback({
                    rate: rate,
                    bosiphiles: bosiphiles
                });
            }else {
                throw "bosiphiles not in the intervale"
            }
        } catch (e) {
            log(e);
            alertDialog.show({
                title: L("invalid_field"),
                message: "Le champ 'Bosiphiles' doit avoir une valeur comprise entre 0.00 et 100.00"
            });
        }
        //---- END verify bosiphiles

    }else {
        log("rate not in the intervale");
        alertDialog.show({
            title: L("invalid_field"),
            message: "Le champ 'Rate' doit avoir une valeur comprise entre 1 et 150"
        });
    }
    //---- END verify rate
}
