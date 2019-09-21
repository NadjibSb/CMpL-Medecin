// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

const navmanager = require('/services/navmanager');

// Dependencies
var log = require( 'services/logger' )( {
		tag: "indexRegister",
		hideLog: false
	} );
var alertDialog = require('/services/alertManager')
var wilayas = require('/dataFile/wilaya').default
//Variable

var picker = $.picker
var pickerContainer = $.pickerContainer
var currentWilaya = "Wilaya"
var labelWilaya= null
// Events Functions
function onScrollend( e ) {
	var index = $.scrollableView.currentPage;
	for( var i = 0; i < 3; i++ ) {
		$.treePoint.children[ i ].opacity = 0.5;
	}
    $.treePoint.children[ index ].opacity = 1;
}

function onScroll(e){
    if ($.scrollableView.currentPage ==2) {
        $.btStart.title = L("on_boarding_btn_begin");
    }else {
        $.btStart.title = L("on_boarding_btn_next");
    }
}

function btnClicked(e){
    if ($.scrollableView.currentPage == 2) {
        navmanager.openAndCloseAll("/acuille/index")
    }else if ($.scrollableView.currentPage == 1) {
        medicalCheck()
        //$.scrollableView.moveNext();
    }else{
      $.scrollableView.moveNext();
    }
}

function remplireWilaya(){
  var data = []
  wilayas.forEach(wilaya =>{
    data[wilaya.id] = Ti.UI.createPickerRow({
      title : wilaya.nom
    })
    $.wilayaColumn.addRow(data[wilaya.id])
    log(wilaya.id)
    log(wilaya.nom)
  })
}
function medicalCheck(){
  var medical = $.donneeComponent.textFieldNom.getValue()
  var wilaya = $.donneeComponent.labelWilaya.text
  if (medical == "" || wilaya == "Wilaya") {
    alertDialog.show("Veuillez renseigner votre wilaya ainsi que l’établissement médical que vous visitez.")
  }else{
    Ti.App.Properties.setString(Alloy.Globals.WILAYA_NAME,wilaya)
    Ti.App.Properties.setString(Alloy.Globals.MEDICAL_NAME,medical)
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



// constructor
(function contructor(){
    $.treePoint.children[ $.scrollableView.currentPage ].opacity = 1;

})();

remplireWilaya()
