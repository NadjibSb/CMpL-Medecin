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

function openWindow(path,params={}) {
	try {
        log("create controller");
    	var controller = Alloy.createController(path, params);

        // si android
        if (Alloy.Globals.isAndroid) {
          log("taille stack cont : "+ stackController.length);
          stackController.push(controller);
          log("taille stack apres push cont : "+ stackController.length);
          // quand on press back
          controller.getView().addEventListener('android:back',()=>{
            var cont = stackController.pop();
            log("apres le pop :"+ stackController.length);
            cont.getView().close();
          })
          //ouvrire la view
          controller.getView().open();

        }else{//sinon ios
            stackController.push(controller);
            if(currentNavWindow){ //il existe deja un nav windows
              log("there is a navwindow", "openWindow");
              currentNavWindow.openWindow(controller.getView());

            }else{ // il n'existe pas deja un navigationWindow
                log("there is no navwindow", "openWindow");
                var navigationWindow = Ti.UI.createNavigationWindow( {
                		window: controller.getView(),
                } );
                navigationWindow.hideNavBar();
                /*
                controller.closeWindow = function(){
                	navigationWindow.popToRootWindow();
                	navigationWindow.close();
                };*/
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
        log("current Window in openClose "+currentNavWindow, "before openAndCloseAll");
        var win = openWindow(path,params, true);
        log("current Window in openClose "+currentNavWindow, "after openAndCloseAll");
    }
};
