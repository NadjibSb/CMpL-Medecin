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
    navManager.closeWindow($);
}

function onCalculer(e){

    checkEmptyFields( ()=>{
        checkValidFields( (args)=>{
            _.extend(args, {
                source: EUTOS
            });
            navManager.openWindow("home/test/result/index", args);
        })
    });
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
            msg = L("risque_eutos_missing_rate");
            break;
        case $.tfBosiphiles.value:
            msg = L("risque_eutos_missing_basophiles");
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
    var rate = parseFloat($.tfRate.value);
    if ( rate>= 1 && rate <= 150) {
        // verify basophiles
        try {
            var basophiles = parseFloat( $.tfBosiphiles.value.replace(",", ".") );
            if (basophiles >=0 && basophiles <=100) {
                _.isFunction( callback ) && callback({
                    rate: rate,
                    basophiles: basophiles
                });
            }else {
                throw "basophiles not in the intervale"
            }
        } catch (e) {
            log(e);
            alertDialog.show({
                title: L("invalid_field"),
                message: L("risque_eutos_invalide_basophiles")
            });
        }
        //---- END verify basophiles

    }else {
        log("rate not in the intervale");
        alertDialog.show({
            title: L("invalid_field"),
            message: L("risque_eutos_invalide_rate")
        });
    }
    //---- END verify rate
}
