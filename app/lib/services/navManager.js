const log = require('/services/logger')({
    tag : "navManager",
    hidelag : false
});



//PUBLIC INTERFACE
var $ = module.exports = {
    openWindow: openWindow,
    closeWindow: closeWindow,
    openAndCloseAll: openAndCloseAll,
    popUpTo: popUpTo
};


//PRIVATE VARIABLES

var stackController = [];
var tabGroupWindow;
var currentNavWindow;
var previousEvent;
var previousStackSize = 0;



// PRIVATE FUNCTIONS

function openWindow(path,params={},newNavWindowFlag, oldNavWindow) {
	try {
        // if newNavWindowFlag is on
        if (newNavWindowFlag && oldNavWindow) {
            _.extend(params, {navWindow: oldNavWindow})
        }
        log("create controller", "openWindow");
    	var controller = Alloy.createController(path, params);
        stackController.push(controller);
        log("taille stack apres push : "+ stackController.length);

        if (Alloy.Globals.isAndroid) {
          // quand on press back
          controller.getView().addEventListener('android:back',()=>{
            var cont = stackController.pop();
            log("apres le pop :"+ stackController.length);
            cont.getView().close();
          })
          //ouvrire la view
          controller.getView().open();

        }else{//sinon ios
            if(!newNavWindowFlag && currentNavWindow){ //il existe deja un nav windows
              log("there is a navwindow", "openWindow");
              currentNavWindow.openWindow(controller.getView());

            }else{ // il n'existe pas deja un navigationWindow
                log("New navWindow", "openWindow");
                var navigationWindow = Ti.UI.createNavigationWindow( {
                		window: controller.getView(),
                } );
                navigationWindow.hideNavBar();
                currentNavWindow = navigationWindow;
                currentNavWindow.open();
            }
        }
    	return controller;

	} catch(e) {
    log(e, "openWindow");
	}
};

// to close window
function closeWindow(controller) {
    log("closeWindow");
    if (OS_ANDROID) {
        var cont = stackController.pop();
        log("apres le pop :"+ stackController.length);
        cont.getView().close();
    }else{
        log(controller.args, "closeWindow > ========== Close ");
        stackController.pop();
        currentNavWindow.closeWindow(controller.getView(), {animated: false});
    }
};

function popUpTo(controller, returnTag){
    if (OS_ANDROID) {
        closeWindow(controller);
    }else {
        // popup into the taged controller
        controller = stackController.pop();
        while (!(controller && controller.args && controller.args.tag == returnTag)) {
            log(controller.args, "popUpTo > ========== Close ");
            currentNavWindow.closeWindow(controller.getView(), {animated: false});
            controller = stackController.pop();
        }
        // if the controller existe re-push it to the stack
        if (controller) {
            stackController.push(controller);
        }
    }
}

// pour ouvrire un liste de window et
function openAndCloseAll(path,params={}){
    if(OS_ANDROID){
        var stack = stackController;
        stackController=[];
        log("stack.length = "+stack.length , " before openAndCloseAll");
        openWindow(path,params);
        // vider la liste
        for (var i = 0; i < stack.length; i++) {
          var cont=stack.pop();
          cont.getView().close();
        }
        log("stack.length = "+stackController.length, "after openAndCloseAll");


    }else{ //iOS
        log("current Window in openClose "+stackController.length, "before openAndCloseAll");
        var currentController = openWindow(path, params, true, currentNavWindow);
        if (currentController.args && currentController.args.navWindow) {
            currentController.args.navWindow.close();
        }
        stackController = [];
        stackController.push(currentController);
        log("current Window in openClose "+stackController.length, "after openAndCloseAll");
    }
};
