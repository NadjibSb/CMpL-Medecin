// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication WebView",
		hideLog: false
	} );

var navManager = require("/services/navManager");

(function constructor(){
    log($.args);
    $.pdf.url = $.args.url;
    $.args.title && $.navBar.setTitle($.args.title);
})();

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}
