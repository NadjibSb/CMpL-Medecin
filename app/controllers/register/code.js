// Dependencies------------------------------------------------------------
const log = require( 'services/logger' )( {
		tag: "indexRegister code",
		hideLog: false
	} );


var alertDialog = require('/services/alertManager'),
    httpManager = require("/services/httpManager"),
    BASE_URL = Alloy.CFG.urls.apiUrl;
var barcode = require('ti.barcode');





function sucessScan(result, type){
    var codeMedecin = result;
    log(codeMedecin, "codeMedecin");
    if (type == barcode.TEXT) {
        Alloy.Globals.setCode(codeMedecin);
        $.progressIndicator.show("Authentification...");

        auth(codeMedecin,
            (response)=>{
                setTimeout(()=>{
                    $.progressIndicator.hide();
                    $.trigger('scanned', codeMedecin);
                },1000);
            },
            (error)=>{
                $.progressIndicator.hide();
                if (error.error_message) {
                    switch (error.error_message) {
                        case "codeAlreadyUsed":
                            alertDialog.show(L("codebar_already_used"));
                            break;
                        case "invalidCode":
                            alertDialog.show(L("codebar_invalide"));
                            break;
                        default:
                            alertDialog.show({title: error.error_message , message: L("codebar_invalide")});
                    }
                }else {
                    alertDialog.show(error);
                }
        });

    }else {
        setTimeout(()=>{
            alertDialog.show(L("codebar_unkown"));
        }, 100);
    }
}

function auth(code, successCallback, errorCallback){
    httpManager.request({
        url: BASE_URL + "medecins/auth",
        fullResponse: true,
        params: {code: code},
        method: "POST",
        ignoreAlert: true
        },
        (r)=>{
            log(r, "auth ");
            _.isFunction(successCallback) && successCallback(r);
        },
        (e,r)=>{
            log.e(r, "auth ");
            _.isFunction(errorCallback) && errorCallback(r);
        }
    );
}


// CODEBAR ------------------------------------------------------------------

barcode.allowRotation = true;
barcode.displayedMessage = 'Scanner le code QR';
barcode.allowMenu = false;
barcode.allowInstructions = false;
barcode.useLED = false;

var overlay = Ti.UI.createView({
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
});
var cancelButton = Ti.UI.createButton({
    title: 'Cancel',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
    style: 0,
    font: {
        fontWeight: 'bold',
        fontSize: 16
    },
    borderRadius: 20,
    opacity: 0.7,
    width: "50%",
    height: 40,
    bottom: 20,
    elevation: 5
});

cancelButton.addEventListener('click', function() {
    barcode.cancel();
});
overlay.add(cancelButton);

//barcode event
barcode.addEventListener('error', function(e) {
    var resultCode = e.message;
    log(e, 'An Error occured: ' );
});

barcode.addEventListener('cancel', function(e) {
    log('Cancel received');
});

barcode.addEventListener('success', function(e) {
    log(e, 'Success called with barcode: ');
    barcode.cancel();
    sucessScan(e.result,e.contentType);
});

//function
function cameraPermission(callback) {
    if (Alloy.Globals.isAndroid) {
        if (Ti.Media.hasCameraPermissions()) {
            _.isFunction(callback) && callback(true);
        } else {
            Ti.Media.requestCameraPermissions(function(e) {
                if (e.success) {
                    _.isFunction(callback) && callback(true);
                } else {
                    _.isFunction(callback) && callback(false);
                    alert('No camera permission');
                }
            });
        }
    }
    if (Alloy.Globals.isIOS) {
        _.isFunction(callback) && callback(true);
    }
};

function scanneCode(e){
  // scanner le code qr et envoyer au backend
  cameraPermission(function(re) {
      barcode.capture({
          animate: true,
          overlay: overlay,
          showCancel: false,
          showRectangle: false,
          keepOpen: true
      });
  });
}

function exitSyncBox(e){
}
