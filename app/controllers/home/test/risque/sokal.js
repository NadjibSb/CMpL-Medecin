// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "risque sokal",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require('/services/alertManager');


const SOKAL = "SOKAL";


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function onCalculer(e){
    checkEmptyFields( ()=>{
        checkValidFields( (args)=>{
            _.extend(args, {
                source: SOKAL
            });
            navManager.openWindow("home/test/result/index", args);
        })
    });
}


function exitKeyBoard(e){
    $.tfAge.blur();
    $.tfRate.blur();
    $.tfPlaquette.blur();
    $.tfSang.blur();
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}


function checkEmptyFields(callback){
    var msg="";
    switch ("") {
        case $.tfAge.value:
            msg =  L("risque_sokal_missing_age");
            break;
        case $.tfRate.value:
            msg = L("risque_sokal_missing_rate");
            break;
        case $.tfPlaquette.value:
            msg = L("risque_sokal_missing_plaquette");
            break;
        case $.tfSang.value:
            msg = L("risque_sokal_missing_sang");
            break;
        default:
    }
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
    // verify age
    var floatNumber = /((^[0-9]$)|(^[0-9]+(\.|\,)+[0-9]$))/;
    var age = parseFloat($.tfAge.value);
    if ( age>= 1 && age <= 150) {
        // verify rate
        try {
            var rate = parseFloat( $.tfRate.value.replace(",", ".") );
            if (floatNumber.test($.tfRate.value) && rate >=0 && rate <=100) {
                // verify plaquette
                try {
                    var plaquette = parseFloat( $.tfPlaquette.value.replace(",", ".") );
                    if (floatNumber.test($.tfPlaquette.value) && plaquette >=0 && plaquette <=100) {
                        // verify sang
                        var sang = parseFloat($.tfSang.value);
                        if (sang>=0 && sang<=100) {
                            _.isFunction( callback ) && callback({
                                age: age,
                                rate: rate,
                                plaquette: plaquette,
                                sang: sang
                            });
                        }else {
                            log("Myéloblastes dansle sang => not in the intervale");
                            alertDialog.show({
                                title: L("invalid_field"),
                                message: L("risque_sokal_invalid_sang")
                            });
                        }

                        //---- END verify sang
                    }else {
                        throw "plaquette not in the intervale"
                    }
                } catch (e) {
                    log(e);
                    alertDialog.show({
                        title: L("invalid_field"),
                        message: L("risque_sokal_invalid_plaquette")
                    });
                }
                //---- END verify plaquette
            }else {
                throw "rate not in the intervale"
            }
        } catch (e) {
            log(e);
            alertDialog.show({
                title: L("invalid_field"),
                message: L("risque_sokal_invalid_rate")
            });
        }
        //---- END verify rate

    }else {
        log("age not in the intervale");
        alertDialog.show({
            title: L("invalid_field"),
            message: L("risque_sokal_invalid_age")
        });
    }
    //---- END verify age
}
