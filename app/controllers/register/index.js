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
    var medical = $.donneeComponent.textFieldNom.getValue()
    var wilaya = $.donneeComponent.labelWilaya.text
    if (medical == "" || wilaya == "Wilaya") {
        alertDialog.show("Veuillez renseigner votre wilaya ainsi que l’établissement médical que vous visitez.")
    }else{
        Ti.App.Properties.setString(Alloy.Globals.WILAYA_NAME,wilaya)
        Ti.App.Properties.setString(Alloy.Globals.MEDICAL_NAME,medical)
        _.isFunction( callback ) && callback();
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
