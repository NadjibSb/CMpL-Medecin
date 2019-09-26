// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Settings",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require('/services/alertManager'),
    wilayas = require('/dataFile/wilaya').default;


// PRIVATE VAR-------------------------------------------------------------------
var currentWilaya;


// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    fillPickerData();
    getLocalData();
})();


// PRIVATE FUNCTIONS------------------------------------------------------------------
function fillPickerData(){
    var data = []
    wilayas.forEach(wilaya =>{
        data[wilaya.id] = Ti.UI.createPickerRow({
            title : wilaya.nom
        });
        $.wilayaColumn.addRow(data[wilaya.id]);
        //log(wilaya.id+" "+wilaya.nom,"remplireWilaya");
    })
}

function getLocalData(){
    $.labelWilaya.text = Alloy.Globals.getWilaya();
    $.textFieldNom.value = Alloy.Globals.getMedical();
}


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    navManager.closeWindow($.window);
}

function onEdit(e){
    var medical = $.textFieldNom.value || "";
    var wilaya = $.labelWilaya.text;
    if( medical.length >0 && wilaya != L('wilaya')){
        log(wilaya+ ' - '+ medical, 'onEdit');
        Alloy.Globals.setWilaya(wilaya);
        Alloy.Globals.setMedical(medical);
        navManager.closeWindow($.window);
    }else {
        alertDialog.show(L("alertDialog_fill_regis_data"));
    }
}


// Picker events
function chooseWilaya(e){
    exitPickerAndKeyboard();
    currentWilaya = wilayas[0].nom;
    setTimeout(()=>{
        $.pickerContainer.visible = true;
    }, 100);
}

function wilayaChanged(e){
    currentWilaya = e.row.title;
    log(currentWilaya);
}

function wilayaChoosed(e){
  $.labelWilaya.text = currentWilaya;
  $.labelWilaya.color =  "#000";
  $.pickerContainer.visible = false
}

function exitPickerAndKeyboard(e){
    $.pickerContainer.visible = false;
    $.textFieldNom.blur();
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}
