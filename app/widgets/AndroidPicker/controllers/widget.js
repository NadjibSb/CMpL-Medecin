

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
    $.listView.scrollToItem(0,id, {animated: false});
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
