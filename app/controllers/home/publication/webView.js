// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication WebView",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    http = require("/services/httpManager"),
    alertDialog = require( 'services/alertManager' );

(function constructor(){
    log($.args);
    //$.pdf.url = "http://www.google.com"; //https://docs.google.com/viewer?embedded=true&url=http://novartis.dzmob.com/uploads/documents/1569832834VpA8g.pdf
    if (Alloy.Globals.isAndroid) {
        $.pdf.url = "https://docs.google.com/viewer?embedded=true&url="+$.args.url;
    }else {
        $.pdf.url = $.args.url;
    }
    log($.pdf.url, 'url to load');
    $.args.title && $.navBar.setTitle($.args.title);
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
    log(e, 'onloaded');
    $.ProgressIndecator.hide();
    if (Alloy.Globals.isAndroid) {
        //navigateUp();
        var button = Titanium.UI.createButton({
            title: "Ouvrir dans le navigateur",
            backgroundColor: '#EEE',
            color: 'black',
            bottom: 8,
            right: 8,
            height: 35
        });
        button.addEventListener("click", (e)=>{
            Ti.Platform.openURL($.args.url);
        });
        $.container.add(button);
    }
}
