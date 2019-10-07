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
    navManager.closeWindow($);
}

function onError(e){
    log.e(e,"onError");
    alertDialog.show({title: 'Error', message: "Can not load document"});
}

function OnLoaded(e){
    //log(e, 'onloaded');
    $.ProgressIndecator.hide();
    if (Alloy.Globals.isAndroid) {
        //navigateUp();
        var button = Titanium.UI.createButton({
            title: "Ouvrir avec ...",
            backgroundColor: '#EEE',
            color: 'black',
            bottom: 8,
            right: 8,
            height: 38
        });
        button.addEventListener("click", (e)=>{
            Ti.Platform.openURL(Alloy.CFG.urls.recommendations);
        });
        $.container.add(button);
    }
}
