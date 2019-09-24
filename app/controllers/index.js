// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "root index",
		hideLog: false
	} );

var navManager = require("/services/navManager");

if (Alloy.Globals.AUTHENTIFIED()) {
    navManager.openWindow("home/index")
}else {
    navManager.openWindow("register/index")
}
