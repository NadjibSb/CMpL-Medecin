// DEPENDENCIES
var log = require( 'services/logger' )( {
		tag: "fileManager",
		hideLog: false
	} );

//PUBLIC INTERFACE
var $ = module.exports = {
	writeToFile: writeToFile,
    readFile: readFile,
    fileExists: fileExists,
    deleteFile: deleteFile
};



function deleteFile(fileName){
    var file = getFile(fileName);
    if (file.exists()) {
        log(file.deleteFile(), fileName + " > Delete file ");
    }
}


function writeToFile(fileName, data){
    var file = getFile(fileName);
    if (file.exists()){
        if (data) {
            var dataToSave = typeof(data)== "string" ? data : JSON.stringify(data);
            log( dataToSave , fileName + ' > Write data '+ file.write(JSON.stringify(dataToSave)));
        }
    }
}

function readFile(fileName){
    var data;
    var file = getFile(fileName);
    if (file.exists()){
        data = JSON.parse(file.read());
    }
    return data
}

function fileExists(fileName){
    var dir = getRootDir();
    var file = Titanium.Filesystem.getFile(dir.resolve(), fileName);
    return file.exists()
}






function getFile(fileName){

    var dir = getRootDir();
    var file = Titanium.Filesystem.getFile(dir.resolve(), fileName);
    if (!file.exists()) {
        log(file.createFile(), fileName+" > Create file");
    }
    return file
}

function getRootDir(){
    var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'CMpLDataDir');
    if (!dir.exists()) {
        log(dir.createDirectory(), "Create Dir 'APP_DATA': ");
    }
    return dir
}
