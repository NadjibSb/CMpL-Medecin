// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Settings",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require('/services/alertManager'),
    wilayas = require('/dataFile/wilaya').default;


// PRIVATE VAR-------------------------------------------------------------------
var currentWilaya,
    touchEnabled = false;


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
    log("navigateUp");
    navManager.closeWindow($.window);
}

function onEdit(e){
    log("on Edit");
    if (touchEnabled) {
        var medical = $.textFieldNom.value || "";
        var wilaya = $.labelWilaya.text;
        if( medical.length >0){
            log(wilaya+ ' - '+ medical, 'onEdit');
            Alloy.Globals.setWilaya(wilaya);
            Alloy.Globals.setMedical(medical);
            navManager.closeWindow($.window);
        }else {
            alertDialog.show(L("alertDialog_fill_regis_data"));
        }
    }else {
        touchEnabled = true;
        $.labelWilaya.color = "black";
        $.textFieldNom.color = 'black';
        $.textFieldNom.editable = true;
        $.editBtn.setTitle(L("save"))
        $.containerWilaya.addEventListener('click', (e)=>{
            chooseWilaya(e);
        } );
    }
}


// Picker events
function chooseWilaya(e){
    log("choose Wilaya");
    if (touchEnabled) {
        exitPickerAndKeyboard();
        (!currentWilaya) && (currentWilaya = wilayas[0].nom);
        setTimeout(()=>{
            $.pickerContainer.visible = true;
        }, 100);
    }
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
