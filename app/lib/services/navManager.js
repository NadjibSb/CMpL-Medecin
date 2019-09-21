const log = require('/services/logger')({
    tag : "navManager",
    hidelag : false
});



//PUBLIC INTERFACE
var $ = module.exports = {
    openWindow: openWindow,
    closservicesw: closeWindow,
    openAndCloseAll: openAndCloseAll
};


//PRIVATE VARIABLES

var stackController = [];
var tabGroupWindow;
var currentNavWindow= null;
var previousEvent;
var previousStackSize = 0;



// PRIVATE FUNCTIONS

function openWindow(path,params={}) {
	try {
        log("create controller");
    	var controller = Alloy.createController(path, params);

        // si android
        if (OS_ANDROID) {
          // quand on press back
          log("taille stack cont : "+ stackController.length);
          stackController.push(controller);
          log("taille stack apres push cont : "+ stackController.length);
          controller.getView().addEventListener('android:back',()=>{
            var cont = stackController.pop();
            log("apres le pop :"+ stackController.length);
            cont.getView().close();
          })
          //ouvrire la view
          controller.getView().open();
                //sinon ios
        }else{
            log(currentNavWindow)
            if(currentNavWindow){
              //il existe deja un nav windows
              log("there is a navwindow");
              currentNavWindow.openWindow(controller.getView());
            }else{
              // il n'existe pas deja un navigationWindow
              var navigationWindow = Ti.UI.createNavigationWindow( {
          			window: controller.getView(),
          		} );
              navigationWindow.hideNavBar();
              controller.closeWindow = function(){
          			navigationWindow.popToRootWindow();
          			navigationWindow.close();
          		};
              currentNavWindow = navigationWindow;
              currentNavWindow.open()
            }
        }
    	return controller;
        
	} catch(e) {
    log(e);
	}
};

// to close window
function closeWindow(window,tabgroup=1) {
    window.close();
};

// pour ouvrire un liste de window et
function openAndCloseAll(path,params={}){
  if(OS_ANDROID){
    var stack = stackController;
    stackController=[];
    Ti.API.info(stack.length);
    openWindow(path,params);
    // vider la liste
    for (var i = 0; i < stack.length; i++) {
      var cont=stack.pop();
      cont.getView().close();
    }

    Ti.API.info("after boucle stack "+tailleStack(stackController));
  }else{
    tmpControllers=currentNavWindow;
    currentNavWindow = null;
    log("current Window in openClose"+currentNavWindow)
    openWindow(path,params);
    if(tmpControllers != null) tmpControllers.close();

  }
};
