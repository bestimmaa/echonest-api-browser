$(function () {
    $("#search_song_button").click(function () {
        //alert('clicked!');
        getExampleJSONP();
    });
});

function getExampleJSONP() {
    jQuery.ajax({
        dataType: "jsonp",
        url: "http://developer.echonest.com/api/v4/song/search?api_key=QTJ926WQJ92B089WB&format=jsonp",
        data: {"results": 1, "artist": "Radiohead", "title": "Karma Police"},
        success: function (response) {
            console.log(response);

            $(".CSSTableGenerator").remove();

            var data = [["Artist", "Title", "Spotify URL"], //headers
                ["New York", "LA", "Seattle"],
                ["Paris", "Milan", "Rome"],
                ["Pittsburg", "Wichita", "Boise"]]
            var cityTable = makeTable($(document.body), data);
        }
    });
}

// the following functions are taken from http://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html

function makeTable(container, data) {
    var table = $("<table/>").addClass('CSSTableGenerator');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

function appendTableColumn(table, rowData) {
    var lastRow = $('<tr/>').appendTo(table.find('tbody:last'));
    $.each(rowData, function(colIndex, c) {
        lastRow.append($('<td/>').text(c));
    });

    return lastRow;
}


