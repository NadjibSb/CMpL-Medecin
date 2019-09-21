// Dependencies------------------------------------------------------------
const log = require( 'services/logger' )( {
		tag: "indexRegister",
		hideLog: false
	} ),
    navmanager = require('/services/navmanager'),
    alertDialog = require('/services/alertManager'),
    wilayas = require('/dataFile/wilaya').default;


// PRIVATE VARIABLES------------------------------------------------------------
var currentWilaya = "Wilaya",
    labelWilaya= null,
    pickerContainer = $.pickerContainer,
    picker = $.picker;


// CONSTRUCTOR ------------------------------------------------------------
(function contructor(){
    if (Alloy.Globals.getCode()) {
        if (Alloy.Globals.getWilaya() && Alloy.Globals.getMedical() ) {
            $.scrollableView.currentPage = 2;
        }else {
            $.scrollableView.currentPage = 1;
        }
    }
    $.treePoint.children[ $.scrollableView.currentPage ].opacity = 1;
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
        navmanager.openAndCloseAll("/acuille/index")
    }else if ($.scrollableView.currentPage == 1) {
        medicalCheck(()=>{
            $.scrollableView.moveNext();
        })
    }else{
      $.scrollableView.moveNext();
    }
}

function chooseWilaya(e){
  $.pickerContainer.visible = true
  labelWilaya = e
}

function wilayaChanged(e){
  log(e.row.title);
  currentWilaya = e.row.title
}

function wilayaChoosed(e){
  labelWilaya.text = currentWilaya
  $.pickerContainer.visible = false
}
