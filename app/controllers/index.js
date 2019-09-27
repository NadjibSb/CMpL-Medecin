// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "root index",
		hideLog: false
	} );

var navManager = require("/services/navManager");

if (Alloy.Globals.AUTHENTIFIED()) {
    log("open home/index");
    navManager.openWindow("home/index")
}else {
    log("open register/index");
    navManager.openWindow("register/index")
}
