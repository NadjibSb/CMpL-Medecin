// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Visite Auth",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertManager = require("/services/alertManager");
var barcode = require('ti.barcode');

barcode.allowRotation = true;
barcode.displayedMessage = 'Scanner le code QR';
barcode.allowMenu = false;
barcode.allowInstructions = false;
barcode.useLED = false;


var codePatient= "";

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function navigateToSettings(e){
    navManager.openWindow("home/settings");
}

function sucessScan(result, type){
    codePatient = result;
    log(codePatient, "codePatient");
    log(type, "type");
    if (type == barcode.TEXT) {

        //navManager.openWindow("home/test/index", {codePatient: codePatient});
    }else {
        setTimeout(()=>{
            alertManager.show(L("codebar_unkown"));
        }, 100);
    }
}



// CODEBAR ------------------------------------------------------------------

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
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 1,
    opacity: 0.7,
    width: "50%",
    height: 40,
    bottom: 20
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


function parseContentType(contentType) {
    switch (contentType) {
        case barcode.URL:
            return 'URL';
        case barcode.SMS:
            return 'SMS';
        case barcode.TELEPHONE:
            return 'TELEPHONE';
        case barcode.TEXT:
            return 'TEXT';
        case barcode.CALENDAR:
            return 'CALENDAR';
        case barcode.GEOLOCATION:
            return 'GEOLOCATION';
        case barcode.EMAIL:
            return 'EMAIL';
        case barcode.CONTACT:
            return 'CONTACT';
        case barcode.BOOKMARK:
            return 'BOOKMARK';
        case barcode.WIFI:
            return 'WIFI';
        default:
            return 'UNKNOWN';
    }
}
