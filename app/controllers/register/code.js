// Dependencies------------------------------------------------------------
const log = require( 'services/logger' )( {
		tag: "indexRegister code",
		hideLog: false
	} );


var alertDialog = require('/services/alertManager'),
    httpManager = require("/services/httpManager"),
    BASE_URL = Alloy.CFG.urls.apiUrl;
var barcode = require('ti.barcode');





function sucessScan(e){
    var codeMedecin = e.result,
        type = e.contentType;
    log(codeMedecin, "codeMedecin");
    barcode.cancel();
    if (type == barcode.TEXT) {
        Alloy.Globals.setCode(codeMedecin);
        $.progressIndicator.show("Authentification...");

        auth(codeMedecin,
            (response)=>{
                setTimeout(()=>{
                    $.progressIndicator.hide();
                    barcode.removeEventListener('success', sucessScan); // prevent to call it again if we enter this screen again
                    $.trigger('scanned', codeMedecin);
                },1000);
            },
            (error)=>{
                $.progressIndicator.hide();
                if (error.error_message) {
                    switch (error.error_message) {
                        case "codeAlreadyUsed":
                            var msg = L("codebar_already_used");
                            alertDialog.show(msg);
                            break;
                        case "invalidCode":
                            var msg = L("codebar_invalide");
                            alertDialog.show(msg);
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

barcode.addEventListener('success', sucessScan );

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
