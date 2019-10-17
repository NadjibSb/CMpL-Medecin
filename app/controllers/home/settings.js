// DEPENDENCIES------------------------------------------------------------------
const log = require( '/services/logger' )( {
		tag: "Settings",
		hideLog: false
	} );

var navManager = require("/services/navManager"),
    alertDialog = require('/services/alertManager'),
    httpManager = require("/services/httpManager"),
    wilayas = require('/dataFile/wilaya').default;


// PRIVATE VAR-------------------------------------------------------------------
var currentWilaya,
    choosedWilaya,
    touchEnabled = false;


// CONSTRUCTOR ------------------------------------------------------------------
(function constructor(){
    getLocalData();
    // custom picker for ios/android
    if (Alloy.Globals.isAndroid) {
        $.androidPicker.hide();
        $.androidPicker.fillData(L("picker_choose_wilaya"),wilayas);
    }else {
        filliOSPickerData();
    }
})();



// PRIVATE FUNCTIONS------------------------------------------------------------------


// on iOS
function filliOSPickerData(){
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
    // Get Fields
    //log(Alloy.Globals.getWilaya(), "Alloy.Globals.getWilaya()");
    $.labelWilaya.text = Alloy.Globals.getWilaya().name;
    $.textFieldNom.value = Alloy.Globals.getMedical();
    // get QRCode img and display it
    var code = Alloy.Globals.getCode();
    if (code) {
        var url = 'http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=' + encodeURI(code) + '&chld=H';
        //$.QRCodeImg.image = url;
        log(url, "QRCode URL");
        //get remote QRimg if and save it
        var imageView = createImageViewFromUrl( {
            top: 8,
            width: "50%",
            image: url
        }, 'qrCode.jpg', Ti.Filesystem.applicationDataDirectory );

        $.QRcontainer.add(imageView);
    }

}

//get remote QRimg if and save it if the img not already existe , or simpelly get the img from the saved file
function createImageViewFromUrl( args, filename, directory ) {
    args = args || {};
    var file = Ti.Filesystem.getFile( directory, filename );

    if ( file.exists() ) { // if the img already saved
        args.image = file.nativePath;
        return Titanium.UI.createImageView( args );

    } else { // get remote img and save it to a file
        var image = Titanium.UI.createImageView( args );
        function saveImage( e ) {
            image.removeEventListener( 'load', saveImage );
            var blob = Ti.UI.createImageView( {
                image: image.image,
            } ).toImage();
            file.write( Alloy.Globals.isAndroid ? blob.media : blob );
        }
        image.addEventListener( 'load', saveImage );
        return image;
    }
}

// EVENTS HANDLERS------------------------------------------------------------------
function navigateUp(e){
    log("navigateUp");
    navManager.closeWindow($);
}

function onEdit(e){
    log("on Edit");
    if (touchEnabled) { // if edit is anabled
        var medical = $.textFieldNom.value || "";
        var wilaya = choosedWilaya ? choosedWilaya : Alloy.Globals.getWilaya(); // if not choosed, get the local data
        //validate data
        if (wilaya && (wilaya.id>=0) && wilaya.name && (medical.length >0)) {
            log(wilaya.id+ wilaya.name+ ' - '+ medical, 'onEdit');
            Alloy.Globals.setWilaya(wilaya.name, wilaya.id);
            Alloy.Globals.setMedical(medical);
            navManager.closeWindow($);
        }else {
            alertDialog.show(L("alertDialog_fill_regis_data"));
        }
    }else { // enable edit
        touchEnabled = true;
        $.labelWilaya.color = "black";
        $.textFieldNom.color = 'black';
        $.textFieldNom.editable = true;
        $.editBtn.setTitle(L("save"));
        // add EventListener for picker and TextField
        if (Alloy.Globals.isAndroid) {
            $.containerWilaya.addEventListener('click', (e)=>{
                // exit Keyboard
                Ti.UI.Android.hideSoftKeyboard();
                $.textFieldNom.blur();
                // scroll to the choosed wilaya
                var id = choosedWilaya ? choosedWilaya.id : Alloy.Globals.getWilaya().id;
                $.androidPicker.selectItem(id-1);
                $.androidPicker.show();
            } );
        }else {
            $.containerWilaya.addEventListener('click', (e)=>{
                chooseWilaya(e);
            } );
            $.containerDonnee.addEventListener('click', (e)=>{
                $.textFieldNom.focus();
            } );
            $.textFieldNom.addEventListener('focus', (e)=>{
                $.pickerContainer.visible = false;
            } );
        }
    }
}


// Picker events
// on iOS
function chooseWilaya(e){
    log("choose Wilaya");
    if (touchEnabled) {
        $.textFieldNom.blur();
        (!choosedWilaya) && (choosedWilaya = Alloy.Globals.getWilaya());
        currentWilaya = choosedWilaya;
        setTimeout(()=>{
            $.pickerContainer.visible = true;
            $.picker.setSelectedRow(0, currentWilaya.id-1, false);
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
    $.labelWilaya.text = choosedWilaya.name;
    $.labelWilaya.color =  "#000";
    $.pickerContainer.visible = false
}

function exitPickerAndKeyboard(e){
    if (Alloy.Globals.isIOS) {
        $.pickerContainer.visible = false;
    }
    $.textFieldNom.blur();
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}




// on android
function exitAndroidPicker(e){
    $.androidPicker.hide();
}

// on android
function onItemselected(_id){
    choosedWilaya = {name: wilayas[_id].nom, id: (_id+1)};
    $.labelWilaya.text = choosedWilaya.name;
    log(choosedWilaya, "itemselected");
}
