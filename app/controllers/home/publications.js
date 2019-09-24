// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication",
		hideLog: false
	} );

var navManager = require("/services/navManager");

var publications = [];

// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    setup_refreshController();

    for (var i = 0; i < 5; i++) {
        publications.push({
            template: "pubTemplate",
            title: {text:"titre titre "+i}
        })
    }
    $.pubSection.items = publications;
})();



// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function onItemclick(e){
}


function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.colors.primaryColor
    });
    $.listView.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        //getData(()=>{control.endRefreshing();});
        control.endRefreshing();
    });
}
