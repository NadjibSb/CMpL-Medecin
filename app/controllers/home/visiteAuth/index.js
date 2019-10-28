// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Visite Auth",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertManager = require("/services/alertManager"),
    httpManager = require("/services/httpManager"),
    BASE_URL = Alloy.CFG.urls.apiUrl;
var barcode = require('ti.barcode');




var codePatient= "";

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}


function sucessScan(e){
    var type = e.contentType;
    codePatient = e.result;
    log(codePatient, "codePatient");
    barcode.cancel();
    if (type == barcode.TEXT) {
        $.progressIndicator.show("Authentification...");

        authPatient(codePatient,
            (response)=>{
                setTimeout(()=>{
                    $.progressIndicator.hide();
                    barcode.removeEventListener('success', sucessScan); // prevent to call it again if we enter this screen again
                    navManager.openWindow("home/test/index", {codePatient: codePatient});
                },1000);
            },
            (error)=>{
                $.progressIndicator.hide();
                if (error.error_message) {
                    switch (error.error_message) {
                        case "invalidCode":
                            alertManager.show(L("codebar_invalide"));
                            break;
                        case "notRegistered":
                            alertManager.show({title: L("codebar_not_registered") , message: L("codebar_not_registered_msg")});
                            break;
                        default:
                            alertManager.show({title: error.error_message , message: L("codebar_invalide")});
                            break;
                    }
                }else {
                    if (error.errorMessage) {
                        alertManager.show(error.errorMessage);
                    }else {
                        alertManager.show(L("HTTP_DEFAULT_ERROR"));
                    }
                }
        });
    }else {
        setTimeout(()=>{
            alertManager.show(L("codebar_unkown"));
        }, 100);
    }
}

function authPatient(code, successCallback, errorCallback){
    httpManager.request({
        url: BASE_URL+ "patients/verify/"+code,
        fullResponse: true,
        method: "GET",
        header:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        ignoreAlert: true
        },
        (r)=>{
            log(r, "auth sucess");
            _.isFunction(successCallback) && successCallback(r);
        },
        (e,r)=>{
            log.e(e, "auth error");
            log.e(r, "auth error");
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
