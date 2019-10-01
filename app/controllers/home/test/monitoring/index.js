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
            _.extend(args, {ligne:1});
            break;
        case "screen01_btn2":
            _.extend(args, {ligne:2});
            break;
    }
    $.scrollableView.moveNext();
}

function onChooseS2(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen02_btn1":
            _.extend(args, {itk:"Imatinib"});
            break;
        case "screen02_btn2":
            _.extend(args, {itk:"Nilotinib"});
            break;
        case "screen02_btn3":
            _.extend(args, {itk:"Dasatinib"});
            break;
        case "screen02_btn4":
            _.extend(args, {itk:"Autres"});
            break;
    }
    $.scrollableView.moveNext();
}

function onChooseS3(e){
    log(e.buttonId, 'onClick');
    switch (e.buttonId) {
        case "screen03_btn1":
            _.extend(args, {duree:3});
            break;
        case "screen03_btn2":
            _.extend(args, {duree:4});
            break;
        case "screen03_btn3":
            _.extend(args, {duree:7});
            break;
        case "screen03_btn4":
            _.extend(args, {duree:12});
            break;
        case "screen03_btn5":
            _.extend(args, {duree:24});
            break;
    }
    $.scrollableView.moveNext();
}

function onDone(e){
    log(e.buttonId, 'onClick');
    if (e.buttonId == "Done") {
        if (e.tfValue && e.tfValue >0 && e.tfValue <100) {
            _.extend(args, {bcr_abl:24});
            navManager.openWindow("home/test/monitoring/result", args);
        }else {
            alertDialog.show("Champ invalid");
        }

    }
}
