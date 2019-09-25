// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "risque sokal",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require('/services/alertManager');





// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function onCalculer(e){
    checkEmptyFields(
        checkValidFields( (args)=>{
            log(args);
            navManager.openWindow("home/test/result/index", args);
        })
    );

}


function exitKeyBoard(e){
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }else {
        $.tfAge.blur();
        $.tfRate.blur();
        $.tfPlaquette.blur();
        $.tfSang.blur();
    }
}


function checkEmptyFields(callback){
    var msg="";
    switch ("") {
        case $.tfAge.value:
            msg =  "Le champ 'Age' doit être renseigné";
            break;
        case $.tfRate.value:
            msg = "Le champ 'Rate' doit être renseigné";
            break;
        case $.tfPlaquette.value:
            msg = "Le champ 'Plaquettes' doit être renseigné";
            break;
        case $.tfSang.value:
            msg = "Le champ 'Myéloblastes dansle sang' doit être renseigné";
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
    var age = $.tfAge.value;
    if ( age>= 1 && age <= 150) {
        // verify rate
        try {
            var rate = parseFloat( $.tfRate.value.replace(",", ".") );
            if (rate >=0 && rate <=100) {
                // verify plaquette
                try {
                    var plaquette = parseFloat( $.tfPlaquette.value.replace(",", ".") );
                    if (plaquette >=0 && plaquette <=100) {
                        // verify sang
                        var sang = $.tfSang.value;
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
                                message: "Le champ 'Myéloblastes dansle sang' doit avoir une valeur comprise entre 0.00 et 100.00"
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
                        message: "Le champ 'Plaquette' doit avoir une valeur comprise entre 0.00 et 100.00"
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
                message: "Le champ 'Rate' doit avoir une valeur comprise entre 0.00 et 100.00"
            });
        }
        //---- END verify rate

    }else {
        log("age not in the intervale");
        alertDialog.show({
            title: L("invalid_field"),
            message: "Le champ 'Age' doit avoir une valeur comprise entre 1 et 150"
        });
    }
    //---- END verify age
}
