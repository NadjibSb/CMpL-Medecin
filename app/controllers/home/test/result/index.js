// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "result sokal",
		hideLog: false
	} );

var navManager = require("/services/navManager");



// CONSTRUCTOR
(function contructor(){
    log(args);
    var args = $.args;
})();

function calculScore(age,rate){
    var result = 0.0016 * (age - 0.0345 + (43.4 *(rate - 0.188 + (7.51 *()))))
}

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function navigateToRecommendations(e){
}

function onSave(e){
}
