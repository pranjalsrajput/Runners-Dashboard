//define data
var tabledata = [{
    "bib": "281",
    "image1":"./runners_images/281/9.jpg",
    "image2":"./runners_images/281/48.jpg",
    "timeline":"./timeline.png",
    "t_0k": "0:00:00",
    "t_1k": "0:00:03.356667",
    "t_2k": "0:00:06.713333",
    "t_3k": "0:00:10.070000",
    "t_4k": "0:00:13.426667",
    "t_5k": "0:00:16.783333"
},
    {
    "bib": "9",
    "image1":"./runners_images/9/9.jpg",
    "image2":"./runners_images/9/21.jpg",
    "timeline":"./timeline.png",
    "t_0k": "0:00:00",
    "t_1k": "0:00:03.076667",
    "t_2k": "0:00:06.153333",
    "t_3k": "0:00:09.230000",
    "t_4k": "0:00:12.306667",
    "t_5k": "0:00:15.383333"
},
    {
    "bib": "110", "image1":"./runners_images/110/21.jpg", "image2":"./runners_images/110/31.jpg",
    "timeline":"./timeline.png",
    "t_0k": "0:00:00",
    "t_1k": "0:00:03.540000",
    "t_2k": "0:00:07.080000",
    "t_3k": "0:00:10.620000",
    "t_4k": "0:00:14.160000",
    "t_5k": "0:00:17.700000"
},
    {
    "bib": "103", "image1":"./runners_images/103/9.jpg", "image2":"./runners_images/103/31.jpg",
    "timeline":"./timeline.png",
    "t_0k": "0:00:00",
    "t_1k": "0:00:03.356667",
    "t_2k": "0:00:06.713333",
    "t_3k": "0:00:10.070000",
    "t_4k": "0:00:13.426667",
    "t_5k": "0:00:16.783333"
},
    {
    "bib": "1688", "image1":"./runners_images/1688/9.jpg", "image2":"./runners_images/1688/10.jpg",
    "timeline":"./timeline.png",
    "t_0k": "0:00:00",
    "t_1k": "0:00:03.563333",
    "t_2k": "0:00:07.126667",
    "t_3k": "0:00:10.690000",
    "t_4k": "0:00:14.253333",
    "t_5k": "0:00:17.816667"
}];


//custom max min header filter
var minMaxFilterEditor = function (cell, onRendered, success, cancel, editorParams) {

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

    function buildValues() {
        success({
            start: start.value,
            end: end.value,
        });
    }

    function keypress(e) {
        if (e.keyCode == 13) {
            buildValues();
        }

        if (e.keyCode == 27) {
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
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams) {
    //headerValue - the value of the header filter element
    //rowValue - the value of the column in this row
    //rowData - the data for the row being filtered
    //filterParams - params object passed to the headerFilterFuncParams property

    if (rowValue) {
        if (headerValue.start != "") {
            if (headerValue.end != "") {
                return rowValue >= headerValue.start && rowValue <= headerValue.end;
            } else {
                return rowValue >= headerValue.start;
            }
        } else {
            if (headerValue.end != "") {
                return rowValue <= headerValue.end;
            }
        }
    }

    return true; //must return a boolean, true if it passes the filter.
}

//custom icon formatter
var iconFormatter = function (value1, data, cell, row, options) { //plain text value
    var x = document.createElement("IMG");
    x.setAttribute("src", value1._cell.value);
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("class", "infoImage");
    // x.setAttribute("alt", "The Pulpit Rock");
    // return "<img class='infoImage' src='" + value + "'>";
    return x
};

var buttonFormatter = function(cell, formatterParams, onRendered){ //plain text value
    var x = document.createElement("button");
    x.setAttribute("src", "btnid");
    x.innerText ="Click me";
    var style1 = document.createElement('style');
    style1.type = 'text/css';
    style1.innerHTML = '.button {padding: 16px 32px; text-align: center;' +
        ' text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; transition-duration: 0.4s;' +
        ' cursor: pointer;background-color: white; color: black; border: 2px solid #4CAF50;  }';
    document.getElementsByTagName('head')[0].appendChild(style1);
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.button2:hover { background-color: #4CAF50; color: white; }';
    document.getElementsByTagName('head')[0].appendChild(style);
    x.className = "button button2";
    return x;
};


var table = new Tabulator("#example-table", {
    data: tabledata,
    // height: "1020px",
    layout: "fitColumns",
    pagination:"local",
    paginationSize:6,
    paginationSizeSelector:[3, 6, 8, 10],
    columns: [
        // {formatter:printIcon, width:40, hozAlign:"center", cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().name)}},
        {title: "BibId", field: "bib", headerFilter: "input"},
        {title: "Timeline", formatter:buttonFormatter, align:"center", cellClick:function(e, cell){
            $('#imagepreview').attr('src', cell._cell.row.data.timeline);
            $("#myModal").modal();}},
        {title: "Image1", field: "image1", align: "center", formatter: iconFormatter},
        {title: "Image2", field: "image2", align: "center", formatter: iconFormatter},
        {title: "t_0k", field: "t_0k", hozAlign: "center", sorter: "time", sorterParams:{ format:"hh:mm:ss", alignEmptyValues:"top",}, headerFilter: "input"},
        {title: "t_1k", field: "t_1k", hozAlign: "center", sorter: "time", sorterParams:{ format:"hh:mm:ss", alignEmptyValues:"top",}, headerFilter: "input"},
        {title: "t_2k", field: "t_2k", hozAlign: "center", sorter: "time", sorterParams:{ format:"hh:mm:ss", alignEmptyValues:"top",}, headerFilter: "input"},
        {title: "t_3k", field: "t_3k", hozAlign: "center", sorter: "time", sorterParams:{ format:"hh:mm:ss", alignEmptyValues:"top",}, headerFilter: "input"},
        {title: "t_4k", field: "t_4k", hozAlign: "center", sorter: "time", sorterParams:{ format:"hh:mm:ss", alignEmptyValues:"top",}, headerFilter: "input"},
        {title: "t_5k", field: "t_5k", hozAlign: "center", sorter: "time", sorterParams:{ format:"hh:mm:ss", alignEmptyValues:"top",}, headerFilter: "input"},
    ],
});