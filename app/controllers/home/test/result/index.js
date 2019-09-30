// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "result sokal",
		hideLog: false
	} );

var navManager = require("/services/navManager");


const SOKAL = "SOKAL",
    EUTOS = "EUTOS";
var args = $.args;

// CONSTRUCTOR
(function contructor(){
    log(args);
    var result;
    switch (args.source) {
        case SOKAL:
            $.navBar.setTitle(L("result_sokal_title"));
            result = calculScore(args);
            updateSokalUI(result);
            break;
        case EUTOS:
            $.navBar.setTitle(L("result_eutos_title"));
            result = calculScore(args);
            updateEutosUI(result);
            break;
        default:
    }
    log(result, "result");
})();


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

function calculScore(args){
    var result = 0;
    switch (args.source) {
        case SOKAL:
            if (args && args.age && args.rate && args.plaquette && args.sang ) {
                result = (0.0016 * (args.age - 43.4)) + (0.0345 * (args.rate- 7.51)) + (0.188 * ( Math.pow(( args.plaquette / 700 ), 2)- 0.563)) + (0.0887 * (args.sang - 2.10))
            }
            break;
        case EUTOS:
            if (args && args.rate && args.bosiphiles) {
                result = (7 * args.bosiphiles) + (4 * args.rate)
            }
            break;
        default:
    }
    return result
}

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function navigateToRecommendations(e){
}

function onSave(e){
}
