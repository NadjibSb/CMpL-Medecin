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


Alloy.Globals.WILAYA_NAME = "WILAYA_NAME";
Alloy.Globals.MEDICAL_NAME = "MEDICAL_NAME";
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
