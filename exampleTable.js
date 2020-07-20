//define data
var tabledata = [
    {id:1,image:"./DurationStats.png", name:"Billy Bob", progress:12, gender:"male", rating:2, col:"red", dob:"14/05/2010", driver:"Yes"},
    {id:2,image:"DurationStats.png", name:"Jenny Jane", progress:42, gender:"female", rating:3, col:"blue", dob:"30/07/1954", driver:"No"},
    {id:3,image:"DurationStats.png", name:"Steve McAlistaire", progress:35, gender:"male", rating:5, col:"green", dob:"04/11/1982", driver:"Yes"},
];

// var table = new Tabulator("#example-table", {
//     data:tabledata,
//     height:"311px",
//     columns:[
//     {title:"Name", field:"name"},
//     {title:"Progress", field:"progress", hozAlign:"right", sorter:"number"},
//     {title:"Gender", field:"gender"},
//     {title:"Rating", field:"rating", hozAlign:"center"},
//     {title:"Favourite Color", field:"col"},
//     {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date"},
//     {title:"Driver", field:"driver", hozAlign:"center"},
//     ],
// });



//custom max min header filter
var minMaxFilterEditor = function(cell, onRendered, success, cancel, editorParams){

    var end;

    var container = document.createElement("span");

    //create and style inputs
    var start = document.createElement("input");
    start.setAttribute("type", "number");
    start.setAttribute("placeholder", "Min");
    start.setAttribute("min", 0);
    start.setAttribute("max", 100);
    start.style.padding = "4px";
    start.style.width = "50%";
    start.style.boxSizing = "border-box";

    start.value = cell.getValue();

    function buildValues(){
        success({
            start:start.value,
            end:end.value,
        });
    }

    function keypress(e){
        if(e.keyCode == 13){
            buildValues();
        }

        if(e.keyCode == 27){
            cancel();
        }
    }

    end = start.cloneNode();
    end.setAttribute("placeholder", "Max");

    start.addEventListener("change", buildValues);
    start.addEventListener("blur", buildValues);
    start.addEventListener("keydown", keypress);

    end.addEventListener("change", buildValues);
    end.addEventListener("blur", buildValues);
    end.addEventListener("keydown", keypress);


    container.appendChild(start);
    container.appendChild(end);

    return container;
 }

//custom max min filter function
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams){
    //headerValue - the value of the header filter element
    //rowValue - the value of the column in this row
    //rowData - the data for the row being filtered
    //filterParams - params object passed to the headerFilterFuncParams property

        if(rowValue){
            if(headerValue.start != ""){
                if(headerValue.end != ""){
                    return rowValue >= headerValue.start && rowValue <= headerValue.end;
                }else{
                    return rowValue >= headerValue.start;
                }
            }else{
                if(headerValue.end != ""){
                    return rowValue <= headerValue.end;
                }
            }
        }

    return true; //must return a boolean, true if it passes the filter.
}

//custom icon formatter
var iconFormatter= function(value1, data, cell, row, options){ //plain text value
    var x = document.createElement("IMG");
    x.setAttribute("src", value1._cell.value);
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("class", "infoImage");
    // x.setAttribute("alt", "The Pulpit Rock");
    // return "<img class='infoImage' src='" + value + "'>";
    return x
};

var table = new Tabulator("#example-table", {
    data:tabledata,
    height:"1311px",
    layout:"fitColumns",
    columns:[
        {title:"Image", field:"image", align:"center", formatter:iconFormatter},
        {title:"Name", field:"name", width:150, headerFilter:"input"},
        {title:"Progress", field:"progress", width:150, formatter:"progress", sorter:"number", headerFilter:minMaxFilterEditor, headerFilterFunc:minMaxFilterFunction, headerFilterLiveFilter:false},
        {title:"Gender", field:"gender", editor:"select", editorParams:{values:{"male":"Male", "female":"Female"}}, headerFilter:true, headerFilterParams:{values:{"male":"Male", "female":"Female", "":""}}},
        {title:"Rating", field:"rating", editor:"star", hozAlign:"center", width:100, headerFilter:"number", headerFilterPlaceholder:"at least...", headerFilterFunc:">="},
        {title:"Favourite Color", field:"col", editor:"input", headerFilter:"select", headerFilterParams:{values:true}},
        {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date",  headerFilter:"input"},
        {title:"Driver", field:"car", hozAlign:"center", formatter:"tickCross",  headerFilter:"tickCross",  headerFilterParams:{"tristate":true},headerFilterEmptyCheck:function(value){return value === null}},
    ],
});