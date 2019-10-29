var args = arguments[ 0 ] || {};

_.extend($ , {
    sucess: sucess,
    failed: failed,
    hide: hide,
    show: show
})

hide();
if (args.backgroundColor) {
    $.vue.backgroundColor = args.backgroundColor;
}
/*
(function constructor(){
    hide();
    if (args.backgroundColor) {
        $.vue.backgroundColor = args.backgroundColor;
    }
})();

setTimeout(()=>{
    sucess("eeeee");
},3000);
*/

function hide(){
    $.vue.hide();
    // removeEventListener for the next show()
    $.vue.removeEventListener("click",hide);
    $.insideContainer.removeEventListener("click",hide);
}
function show(text){
    $.title.text = text;
    $.indecator.visible = true;
    $.crossContainer.visible = false;
    $.checkContainer.visible = false;
    $.vue.show();
}

function sucess(text){
    $.title.text = text;
    $.indecator.visible = false;
    $.checkContainer.visible = true;
    var matrix = Ti.UI.createMatrix2D();
    matrix = matrix.scale(1.15, 1.15);
    var a = Ti.UI.createAnimation({
        transform : matrix,
        duration : 150,
        autoreverse : true,
        repeat : 2
    });
    $.checkContainer.animate(a);
    // addEventListener to exit the box
    $.vue.addEventListener("click", hide);
    $.insideContainer.addEventListener("click", hide);
}

function failed(text){
    $.title.text = text;
    $.indecator.visible = false;
    $.crossContainer.visible = true;
    var matrix = Ti.UI.createMatrix2D();
    matrix = matrix.scale(1.1, 1.1);
    var a = Ti.UI.createAnimation({
        transform : matrix,
        duration : 150,
        autoreverse : true,
        repeat : 2
    });
    $.crossContainer.animate(a);
    // addEventListener to exit the box
    $.vue.addEventListener("click", hide);
    $.insideContainer.addEventListener("click", hide);
}
