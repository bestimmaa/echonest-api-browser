$(function () {
    $("#search_song_button").click(function () {
        //alert('clicked!');
        getExampleJSONP();
    });
});

function getExampleJSONP() {
    jQuery.ajax({
        dataType: "jsonp",
        url: "http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV&format=jsonp",
        data: {"results": 1, "artist": "Radiohead", "title": "Karma Police"},
        success: function (response) {
            console.log(response);

            $(".CSSTableGenerator").remove();

            var header = ["artist_id", "id", "artist_name", "title"];

            var songs = response["response"]["songs"];
            var tableRows = new Array();
            tableRows.push(header);
            for (i = 0; i < songs.length; ++i) {
                var row = new Array();
                for (var s in songs[i]) {
                    row.push(String(songs[i][s]));
                }
                tableRows.push(row);
            }

            var song_results = makeTable($(document.body), tableRows);

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


