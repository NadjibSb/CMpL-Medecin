// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication",
		hideLog: false
	} );

var navManager = require("/services/navManager");

var publications = [];

// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    for (var i = 0; i < 5; i++) {
        publications.push({
            template: "pubTemplate",
            title: {text:"titre titre "+i}
        })
    }
    $.pubSection.items = publications;
})();



// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function onItemclick(e){
}
