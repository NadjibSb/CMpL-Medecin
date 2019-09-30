// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication WebView",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require( 'services/alertManager' );

(function constructor(){
    if (Alloy.Globals.isAndroid) {
        $.pdf.url = "https://docs.google.com/viewer?embedded=true&url="+ Alloy.CFG.urls.recommendations;
    }else {
        $.pdf.url = Alloy.CFG.urls.recommendations;
    }
})();

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function onError(e){
    log.e(e,"onError");
    alertDialog.show({title: 'Error', message: "Can not load document"});
}

function OnLoaded(e){
    //log(e, 'onloaded');
    $.ProgressIndecator.hide();
}
