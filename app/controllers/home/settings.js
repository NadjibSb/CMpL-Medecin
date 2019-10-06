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
    choosedWilaya,
    touchEnabled = false;


// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    getLocalData();
    if (Alloy.Globals.isAndroid) {
        $.androidPicker.hide();
        $.androidPicker.fillData("Choisissez une Wilaya :",wilayas);
    }else {
        fillPickerData();
    }
})();



// PRIVATE FUNCTIONS------------------------------------------------------------------
function fillPickerData(){
    var data = []
    wilayas.forEach(wilaya =>{
        data[wilaya.id] = Ti.UI.createPickerRow({
            title : wilaya.nom,
            id: wilaya.id
        });
        $.wilayaColumn.addRow(data[wilaya.id]);
        //log(wilaya.id+" "+wilaya.nom,"remplireWilaya");
    })
}

function getLocalData(){
    log(Alloy.Globals.getWilaya(), "Alloy.Globals.getWilaya()");
    $.labelWilaya.text = Alloy.Globals.getWilaya().name;
    $.textFieldNom.value = Alloy.Globals.getMedical();
}


// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    log("navigateUp");
    navManager.closeWindow($);
}

function onEdit(e){
    log("on Edit");
    if (touchEnabled) {
        if (Alloy.Globals.isAndroid) {
            var medical = $.textFieldNom.value || "";
            var wilaya = choosedWilaya ? choosedWilaya : Alloy.Globals.getWilaya();
            if (wilaya && (wilaya.id>=0) && wilaya.name && (medical.length >0)) {
                log(wilaya.id+ wilaya.name+ ' - '+ medical, 'onEdit');
                Alloy.Globals.setWilaya(wilaya.name, wilaya.id);
                Alloy.Globals.setMedical(medical);
                navManager.closeWindow($);
            }else {
                alertDialog.show(L("alertDialog_fill_regis_data"));
            }
        }else {
            var medical = $.textFieldNom.value || "";
            var wilaya = choosedWilaya ? choosedWilaya : Alloy.Globals.getWilaya();
            if( wilaya && (wilaya.id>=0) && wilaya.name && medical.length >0){
                log(wilaya+ ' - '+ medical, 'onEdit');
                Alloy.Globals.setWilaya(wilaya.name, wilaya.id);
                Alloy.Globals.setMedical(medical);
                navManager.closeWindow($);
            }else {
                alertDialog.show(L("alertDialog_fill_regis_data"));
            }
        }
    }else {
        touchEnabled = true;
        $.labelWilaya.color = "black";
        $.textFieldNom.color = 'black';
        $.textFieldNom.editable = true;
        $.editBtn.setTitle(L("save"));
        if (Alloy.Globals.isAndroid) {
            $.containerWilaya.addEventListener('click', (e)=>{
                var id;
                if (choosedWilaya) {
                    id = choosedWilaya.id;
                    $.androidPicker.selectItem(id);
                }else if ( id = Alloy.Globals.getWilaya().id) {
                    $.androidPicker.selectItem(id);
                }
                $.androidPicker.show();
            } );
        }else {
            $.containerWilaya.addEventListener('click', (e)=>{
                chooseWilaya(e);
            } );
        }
    }
}


// Picker events
function chooseWilaya(e){
    log("choose Wilaya");
    if (touchEnabled) {
        exitPickerAndKeyboard();
        (!choosedWilaya) && (choosedWilaya = Alloy.Globals.getWilaya());
        currentWilaya = choosedWilaya;
        setTimeout(()=>{
            $.pickerContainer.visible = true;
            $.picker.setSelectedRow(0, currentWilaya.id-1, false);
        }, 100);
    }
}

function wilayaChanged(e){
    currentWilaya = {name: e.row.title, id: e.row.id};
    log(currentWilaya);
}

function wilayaChoosed(e){
    choosedWilaya = currentWilaya;
    $.labelWilaya.text = choosedWilaya.name;
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




function exitAndroidPicker(e){
    $.androidPicker.hide();
}

function onItemselected(_id){
    choosedWilaya = {name: wilayas[_id].nom, id: _id};
    $.labelWilaya.text = choosedWilaya.name;
    log(choosedWilaya, "itemselected");
}
