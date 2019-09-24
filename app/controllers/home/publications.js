// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication",
		hideLog: false
	} );

var navManager = require("/services/navManager");



// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    
})();



// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}
