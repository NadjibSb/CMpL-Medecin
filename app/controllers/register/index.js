// Dependencies------------------------------------------------------------
const log = require( 'services/logger' )( {
		tag: "indexRegister",
		hideLog: false
	} );


var alertDialog = require('/services/alertManager'),
    wilayas = require('/dataFile/wilaya').default,
    navmanager = require('/services/navManager');



// PRIVATE VARIABLES------------------------------------------------------------
var currentWilaya = null,
    choosedWilaya = null,
    labelWilaya= null;






// CONSTRUCTOR ------------------------------------------------------------
(function contructor(){

    // select the onGoing vue

    if (Alloy.Globals.getCode()) {
        if (Alloy.Globals.getWilaya() && Alloy.Globals.getMedical() ) {
            $.scrollableView.currentPage = 2;
            $.treePoint.children[ 2 ].opacity = 1;
        }else {
            $.scrollableView.currentPage = 1;
            $.treePoint.children[ 1 ].opacity = 1;
        }
    }else {
        $.treePoint.children[ 0 ].opacity = 1;
    }
    //$.scrollableView.currentPage = 0;
    // setup picker
    if (Alloy.Globals.isAndroid) {
        $.androidPicker.hide();
        $.androidPicker.fillData(L("picker_choose_wilaya"),wilayas);
    }else {
        fillPickerData();
    }
})();


// PRIVATE FUNCTIONS  ------------------------------------------------------------

// on iOS
function fillPickerData(){
    var data = []
    wilayas.forEach(wilaya =>{
        data[wilaya.id] = Ti.UI.createPickerRow({
            title : wilaya.nom,
            id: wilaya.id
        });
        $.wilayaColumn.addRow(data[wilaya.id]);
        //log(wilaya.id+" "+wilaya.nom,"fillPickerData");
    })
}

function checkData(callback){
    var medical = $.donneeComponent.checkLabel();
    if ((medical) && choosedWilaya && (choosedWilaya.id >=0) && choosedWilaya.name ) {
        log(choosedWilaya.id+choosedWilaya.name+ ' - '+ medical, 'checkData');
        Alloy.Globals.setWilaya(choosedWilaya.name, choosedWilaya.id);
        Alloy.Globals.setMedical(medical);
        _.isFunction( callback ) && callback();
    }else{
        alertDialog.show(L("alertDialog_fill_regis_data"));
    }
}

// EVENTS Functions ------------------------------------------------------------

function onScrollend( e ) {
	var index = $.scrollableView.currentPage;
	for( var i = 0; i < 3; i++ ) {
		$.treePoint.children[ i ].opacity = 0.5;
	}
    $.treePoint.children[ index ].opacity = 1;
}

function btnClicked(e){
    if ($.scrollableView.currentPage == 2) {
        Alloy.Globals.HAS_AUTHENTIFIED();
        navmanager.openAndCloseAll("home/index");
    }else if ($.scrollableView.currentPage == 1) {
        checkData(()=>{
            $.scrollableView.moveNext();
        })
    }else{
        //Alloy.Globals.setCode("M000004");
        if (Alloy.Globals.getCode()) {
            $.scrollableView.moveNext();
        }else {
            alertDialog.show(L("codebar_missing"));
        }
    }
}

// event fired on both android & iOS picker
function chooseWilaya(e){
    $.donneeComponent.hideKeyBoard();
    labelWilaya = e;

    if (Alloy.Globals.isAndroid) {
        if (choosedWilaya) { //
            var id = choosedWilaya.id;
            $.androidPicker.selectItem(id-1);
        }
        $.androidPicker.show();
    }else {
        (!currentWilaya) && (currentWilaya = {name: wilayas[0].nom, id: wilayas[0].id});
        setTimeout(()=>{
            $.pickerContainer.visible = true;
        }, 100);
    }
}

// on iOS
function wilayaChanged(e){
    currentWilaya = {name: e.row.title, id: e.row.id};
    log(currentWilaya);
}

// on iOS
function wilayaChoosed(e){
    choosedWilaya = currentWilaya;
    labelWilaya.text = choosedWilaya.name;
    labelWilaya.color =  "#000";
    $.pickerContainer.visible = false
}

function exitPickerAndKeyboard(e){
    if (Alloy.Globals.isIOS) {
        $.pickerContainer.visible = false;
    }
    $.donneeComponent.hideKeyBoard();
}

// on iOS
function exitPicker(e){
    log("exitPicker");
    if (Alloy.Globals.isIOS) {
        $.pickerContainer.visible = false;
    }
}


function exitAndroidPicker(e){
    $.androidPicker.hide();
}

// on android
function onItemselected(_id){
    choosedWilaya = {name: wilayas[_id].nom, id: (_id+1)};
    labelWilaya.text = choosedWilaya.name;
    labelWilaya.color =  "#000";
    log(choosedWilaya, "itemselected");
}

function onScanned(e){
    $.scrollableView.moveNext();
}
