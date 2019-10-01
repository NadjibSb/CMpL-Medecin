// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.isAndroid = (Ti.Platform.osname=='android') ? true : false;
Alloy.Globals.isIOS = (Ti.Platform.osname=='iphone') ? true : false;

Alloy.Globals.WILAYA_NAME = "cmplMedecin.WILAYA_NAME";
Alloy.Globals.MEDICAL_NAME = "cmplMedecin.MEDICAL_NAME";
Alloy.Globals.AUTHCODE = "cmplMedecin.AUTH_CODE";
Alloy.Globals.AUTH = "cmplMedecin.AUTHENTIFIED";
Alloy.Globals.DATA_FILE = "cmplMedecin_Data.json";


Alloy.Globals.setWilaya = (wilaya)=>{
  Ti.App.Properties.setString(Alloy.Globals.WILAYA_NAME,wilaya)
}

Alloy.Globals.getWilaya = ()=>{
  return Ti.App.Properties.getString(Alloy.Globals.WILAYA_NAME)
}

Alloy.Globals.setMedical = function setMedical(medical){
  Ti.App.Properties.setString(Alloy.Globals.MEDICAL_NAME,medical)
}

Alloy.Globals.getMedical = ()=>{
  return Ti.App.Properties.getString(Alloy.Globals.MEDICAL_NAME)
}

Alloy.Globals.getCode = ()=>{
  return Ti.App.Properties.getString(Alloy.Globals.AUTHCODE)
}

Alloy.Globals.setCode = (code)=>{
  Ti.App.Properties.setString(Alloy.Globals.AUTHCODE,code)
}

Alloy.Globals.HAS_AUTHENTIFIED = ()=>{
  Ti.App.Properties.setBool(Alloy.Globals.AUTH,true)
}

Alloy.Globals.AUTHENTIFIED = ()=>{
  return Ti.App.Properties.getBool(Alloy.Globals.AUTH, false)
}
