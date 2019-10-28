// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Monitoring index",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require( 'services/alertManager' );



// VARIABLS------------------------------------------------------------------
var args = {};



// CONSTRUCTOR------------------------------------------------------------------
(function constructor(){
    onScrollend();
})();


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    if ($.scrollableView.currentPage == 0) {
        navManager.closeWindow($);
    }else {
        $.scrollableView.movePrevious();
    }
}

function onScrollend( e ) {
	var index = $.scrollableView.currentPage;
	for( var i = 0; i < 4; i++ ) {
		$.treePoint.children[ i ].opacity = 0.5;
	}
    $.treePoint.children[ index ].opacity = 1;
}


function onChooseS1(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen01_btn1":
            _.extend(args, {ligne: L("monitoring_screen01_btn1")});
            break;
        case "screen01_btn2":
            _.extend(args, {ligne: L("monitoring_screen01_btn2")});
            break;
    }
    $.scrollableView.moveNext();
}

function onChooseS2(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen02_btn1":
            _.extend(args, {itk:L("monitoring_screen02_btn1")});
            break;
        case "screen02_btn2":
            _.extend(args, {itk:L("monitoring_screen02_btn2")});
            break;
        case "screen02_btn3":
            _.extend(args, {itk:L("monitoring_screen02_btn3")});
            break;
        case "screen02_btn4":
            _.extend(args, {itk:L("monitoring_screen02_btn4")});
            break;
    }
    $.scrollableView.moveNext();
}

function onChooseS3(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen03_btn1":
            _.extend(args, {duree:L("monitoring_screen03_btn1")});
            break;
        case "screen03_btn2":
            _.extend(args, {duree:L("monitoring_screen03_btn2")});
            break;
        case "screen03_btn3":
            _.extend(args, {duree:L("monitoring_screen03_btn3")});
            break;
        case "screen03_btn4":
            _.extend(args, {duree:L("monitoring_screen03_btn4")});
            break;
        case "screen03_btn5":
            _.extend(args, {duree:L("monitoring_screen03_btn5")});
            break;
    }
    $.scrollableView.moveNext();
}

function onDone(e){
    log(e.buttonId, 'onClick');
    if (e.buttonId == "Done") {
        if (e.tfValue != "") {
            try {
                var floatNumber = /((^[0-9]$)|(^[0-9]+(\.|\,)+[0-9]$))/;
                var bcr = parseFloat( e.tfValue.replace(",", ".") );
                if (floatNumber.test(e.tfValue) && bcr >=0 && bcr <=100) {
                    _.extend(args, {bcr_abl:bcr});
                    navManager.openWindow("home/test/monitoring/result", args);
                }else {
                    throw "parseFloat error";
                }
            } catch (e) {
                alertDialog.show({
                    title: L("invalid_field") ,
                    message: L("monitoring_invalid_tf")
                });
            }
        }else {
            alertDialog.show({
                title: L("missed_field") ,
                message: L("monitoring_missing_tf")
            });
        }




    }
}
