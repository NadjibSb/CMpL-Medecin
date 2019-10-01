// DEPENDENCIES ------------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "result index",
		hideLog: false
	} );

var navManager = require("/services/navManager");


// VARIABLES ------------------------------------------------------------------------
var args = $.args;


// CONSTRUCTOR ------------------------------------------------------------------------
(function contructor(){
    log(args, "args")
})();



// PRIVATE FUNCTIONS ------------------------------------------------------------------------
function calculScore(args){
}

function updateSokalUI(result){
    $.lbResultNbr.text = result.toFixed(2);
    if (result < 0.8) {
        $.lbResultText.text = L("result_faible");
        $.lbResultText.color = Alloy.CFG.colors.primaryColor;
        $.icon.backgroundColor = Alloy.CFG.colors.primaryColor;
        $.lbPStitle.text = L("result_bien");
        $.lbPStext.text = L("result_sokal_bien");
    }else if (result < 1.2) {
        $.lbResultText.text = L("result_intermediate");
        $.lbResultText.color = Alloy.CFG.colors.orange;
        $.icon.backgroundColor = Alloy.CFG.colors.orange;
        $.lbPStitle.text = L("result_attention");
        $.lbPStext.text = L("result_sokal_intermediate");
    }else if (result >= 1.2) {
        $.lbResultText.text = L("result_high");
        $.lbResultText.color = Alloy.CFG.colors.red;
        $.icon.backgroundColor = Alloy.CFG.colors.red;
        $.lbPStitle.text = L("result_danger");
        $.lbPStext.text = L("result_sokal_high");
    }
}

function updateEutosUI(result){
    $.lbResultNbr.text = result.toFixed(2);
    if (result < 87) {
        $.lbResultText.text = L("result_faible");
        $.lbResultText.color = Alloy.CFG.colors.primaryColor;
        $.icon.backgroundColor = Alloy.CFG.colors.primaryColor;
        $.lbPStitle.text = L("result_bien");
        $.lbPStext.text = L("result_eutos_bien");
    }else if (result >= 87) {
        $.lbResultText.text = L("result_high");
        $.lbResultText.color = Alloy.CFG.colors.red;
        $.icon.backgroundColor = Alloy.CFG.colors.red;
        $.lbPStitle.text = L("result_danger");
        $.lbPStext.text = L("result_eutos_high");
    }
}


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function navigateToRecommendations(e){
    navManager.openWindow("home/test/result/recommendations");
}
