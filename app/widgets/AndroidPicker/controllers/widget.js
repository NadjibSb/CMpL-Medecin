/*
setTimeout(()=>{
    var list = [];
    for (var i = 0; i < 15; i++) {
        list.push({
            template: "listTemplate",
            text: {text: "titre "+i}
            //icon: {image: "/images/checkmark.png"}
        });
    }
    //Ti.API.info(JSON.stringify(list));

    $.section.items = list;
    _.extend(list[2] , {
        icon: {image: "/images/checkmark.png"}
    });
    $.section.items = list;
},1000);*/

_.extend($ , {
    fillData: fillData,
    selectItem: selectItem,
    hide: hide,
    show: show
})

function fillData(title, list){
    $.title.text = title;
    //Ti.API.info(JSON.stringify(list));
    var dataList = [];
    _.each(list, (item)=>{
        dataList.push({
            template: "listTemplate",
            text: {text: item.id +"- "+ item.nom}
            //icon: {image: "/images/checkmark.png"}
        });
    });
    $.section.items = dataList;
}

function selectItem(id){
    var list = $.section.items;
    list.forEach((item, key)=>{
        _.extend(item , {
            icon: {image: (key == id) ?  "/images/checkmark.png" : ""}
        });
    })
    $.section.items = list;
}

function onItemclick(e){
    //Ti.API.info(JSON.stringify(e.itemIndex));
    $.trigger('itemselected', e.itemIndex);
    hide();
}

function exit(e){
    $.trigger('exit', e);
}

function hide(){
    $.vue.hide();
}
function show(){
    $.vue.show();
}
