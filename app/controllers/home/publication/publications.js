// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Publication",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    http = require("/services/httpManager"),
	alertDialog = require( 'services/alertManager' ),
    BASE_URL = Alloy.CFG.urls.apiUrl;

var publications = [],
    listToDisplay = [],
    total = 0,
    curentPage = 1;

// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    setup_refreshController();

    loadPage(curentPage, ()=>{
        setTimeout(function(){
            $.progressIndicator.hide();
        }, 100);

    }, ()=>{
        $.progressIndicator.hide();
    });
})();



// PRIVATE FUNCTIONS ------------------------------------------------------------------

function loadPage(page, sucessCallback, errorCallback ){
    getDataByPage(page, (newList)=>{
        if (newList && newList.length>0) {
            publications.push(...newList) ;
            bindDataList(newList, listToDisplay);
        }else {
            $.footer.visible = false;
        }
        _.isFunction( sucessCallback ) && sucessCallback();
    }, errorCallback);
}


function getDataByPage(pageNbr, successCallback, errorCallback){
    http.request({
        url: BASE_URL + "publications",
        fullResponse: true,
        ignoreAlert: true,
        params: {page: pageNbr},
        method: "GET"
        },
        (r)=>{
            log(r, "getPage "+pageNbr);
            try {
                var response = JSON.parse( r );
                total = response.total;
                _.isFunction( successCallback ) && successCallback( response.pubs);

            }catch (e) {
                log.e( e, "json parse error " );
                alertDialog.show({title: 'Error', message:L("HTTP_DEFAULT_ERROR")},()=>{
                    navigateUp();
                });
            }
        },
        (e)=>{
            log.e(e, "getPage "+pageNbr);
            setTimeout(function(){
                alertDialog.show({title: 'Error', message:L(e)},()=>{
                    _.isFunction( errorCallback ) && errorCallback();
                });
            }, 500);
        }
    );
}

function bindDataList(sourceList, resultList){
    _.each(sourceList, (item)=>{
        //log(item , 'bindDataList');
        resultList.push({
            template: "pubTemplate",
            title: {text: item.title},
        });
    });
    $.pubSection.items = resultList;
    $.listView.setMarker({
        sectionIndex:0,
        itemIndex: $.pubSection.items.length-1
    })
}


function setup_refreshController(){
    var control = Ti.UI.createRefreshControl({
        tintColor: Alloy.CFG.colors.primaryColor
    });
    $.listView.refreshControl = control;
    control.addEventListener('refreshstart',function(e){
        log('refreshstart');
        curentPage = 1;
        publications = [];
        listToDisplay = [];
        loadPage(curentPage, ()=>{
            control.endRefreshing();
        }, ()=>{
            control.endRefreshing();
        });
    });
}



// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function onItemclick(e){
    log(publications[e.itemIndex] , 'onItemclick');
    //navManager.openWindow("home/publication/webView",{url:"http://www.orimi.com/pdf-test.pdf",title:"title test"});
    navManager.openWindow("home/publication/webView",{
        url: Alloy.CFG.urls.backOfficeUrl + publications[e.itemIndex].path ,
        title: publications[e.itemIndex].title
    });
}

function onMarkerReached(e){
    log('Marker reached');
    $.footer.visible = true;
    curentPage++;
    loadPage(curentPage);
}
