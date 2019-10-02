// Dependencies------------------------------------------------------------
const log = require( 'services/logger' )( {
		tag: "indexRegister",
		hideLog: false
	} );


var alertDialog = require('/services/alertManager');
var wilayas = require('/dataFile/wilaya').default;
var navmanager = require('/services/navManager');


// PRIVATE VARIABLES------------------------------------------------------------
var currentWilaya = "Wilaya",
    labelWilaya= null,
    pickerContainer = $.pickerContainer,
    picker = $.picker;


// CONSTRUCTOR ------------------------------------------------------------
(function contructor(){
    log("constructor");
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
    remplireWilaya();
})();


// PRIVATE FUNCTIONS  ------------------------------------------------------------

function remplireWilaya(){
    var data = []
    wilayas.forEach(wilaya =>{
        data[wilaya.id] = Ti.UI.createPickerRow({
            title : wilaya.nom
        });
        $.wilayaColumn.addRow(data[wilaya.id]);
        log(wilaya.id+" "+wilaya.nom,"remplireWilaya");
    })
}

function medicalCheck(callback){
    var data = $.donneeComponent.checkData();
    if (data) {
        log(data.wilaya+ ' - '+ data.medical, 'medicalCheck');
        Alloy.Globals.setWilaya(data.wilaya);
        Alloy.Globals.setMedical(data.medical);
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
        navmanager.openWindow("home/index");
        //navmanager.closeWindow($.window);
    }else if ($.scrollableView.currentPage == 1) {
        medicalCheck(()=>{
            $.scrollableView.moveNext();
        })
    }else{
      $.scrollableView.moveNext();
    }
}

function chooseWilaya(e){
    exitPickerAndKeyboard();
    (currentWilaya == "Wilaya") && (currentWilaya = wilayas[0].nom);
    labelWilaya = e;
    setTimeout(()=>{
        $.pickerContainer.visible = true;
    }, 100);

}

function wilayaChanged(e){
  currentWilaya = e.row.title;
    log(currentWilaya);
}

function wilayaChoosed(e){
  labelWilaya.text = currentWilaya;
  labelWilaya.color =  "#000";
  $.pickerContainer.visible = false
}

function exitPickerAndKeyboard(e){
    $.pickerContainer.visible = false
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}

function exitPicker(e){
    $.pickerContainer.visible = false
}
