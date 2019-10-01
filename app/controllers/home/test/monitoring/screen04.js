// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function onClick(e){
    _.extend(e, {tfValue: $.tfContent.value})
    $.trigger('click' , e);
}

function onFocusInTF(e){
    $.tfContent.focus();
}

function exitKeyBoard(e){
    $.tfContent.blur();
    if (Alloy.Globals.isAndroid) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}
