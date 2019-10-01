// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Monitoring index",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require( 'services/alertManager' );

(function constructor(){
    onScrollend();
})();

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    if ($.scrollableView.currentPage == 0) {
        navManager.closeWindow($.window);
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

            break;
        case "screen01_btn2":

            break;
    }
    $.scrollableView.moveNext();
}

function onChooseS2(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen02_btn1":

            break;
        case "screen02_btn2":

            break;
        case "screen02_btn3":

            break;
        case "screen02_btn4":

            break;
    }
    $.scrollableView.moveNext();
}

function onChooseS3(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen03_btn1":

            break;
        case "screen03_btn2":

            break;
        case "screen03_btn3":

            break;
        case "screen03_btn4":

            break;
    }
    $.scrollableView.moveNext();
}

function onDone(e){
    log(e.buttonId, 'onClick');
    if (e.buttonId == "Done") {

    }
}
