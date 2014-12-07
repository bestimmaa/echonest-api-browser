// Read api key from echonest_api_key file
var api_key;
var musical_key = 0;
var musical_key_enabled = false;
var mode = 0;
var mode_enabled = false;
var tempo = 120;
var tempo_enabled = false;
var energy = 50;
var energy_enabled = false;
var danceability = 50;
var danceability_enabled = false;
var acousticness = 50;
var acousticness_enabled = false;
var speechiness = 50;
var speechiness_enabled = false;

/**
 * Taken from: http://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
 *
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

$(function () {

    // read api key from file and store to global variable
    apiKey();

    $("#button_search_song").click(function () {
        data = {"results": 10, "api_key": api_key, "limit":"yes"};
        if(musical_key_enabled) data["key"]=musical_key;
        if(mode_enabled) data["mode"]=mode;
        if(tempo_enabled){
            data["min_tempo"] = (tempo - 1).clamp(0,500);
            data["max_tempo"] = (tempo + 1).clamp(0,500);
        }
        if(energy_enabled){
            data["min_energy"] = (energy/100.0 - 0.1).clamp(0.0,1.0);
            data["max_energy"] = (energy/100.0 + 0.1).clamp(0.0,1.0);
        }
        if(danceability_enabled){
            data["min_danceability"] = (danceability/100.0 - 0.1).clamp(0.0,1.0);
            data["max_danceability"] = (danceability/100.0 + 0.1).clamp(0.0,1.0);
        }
        if(acousticness_enabled){
            data["min_acousticness"] = (acousticness/100.0 - 0.1).clamp(0.0,1.0);
            data["max_acousticness"] = (acousticness/100.0 + 0.1).clamp(0.0,1.0);
        }
        if(speechiness_enabled){
            data["min_speechiness"] = (speechiness/100.0 - 0.1).clamp(0.0,1.0);
            data["max_speechiness"] = (speechiness/100.0 + 0.1).clamp(0.0,1.0);
        }
        retrieveSongs(data);
    });

    $("#button_toogle_key").click(function(){
        if (musical_key_enabled){
            $( "#attribute_controls_key" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            musical_key_enabled = false;
        }
        else{
            $( "#attribute_controls_key" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            musical_key_enabled = true;
        }
    });

    $("#button_toogle_mode").click(function(){
        if (mode_enabled){
            $( "#attribute_controls_mode" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            mode_enabled = false;
        }
        else{
            $( "#attribute_controls_mode" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            mode_enabled = true;
        }
    });

    $("#button_toogle_tempo").click(function(){
        if (tempo_enabled){
            $( "#attribute_controls_tempo" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            tempo_enabled = false;
        }
        else{
            $( "#attribute_controls_tempo" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            tempo_enabled = true;
        }
    });

    $("#button_toogle_energy").click(function(){
        if (energy_enabled){
            $( "#attribute_controls_energy" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            energy_enabled = false;
        }
        else{
            $( "#attribute_controls_energy" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            energy_enabled = true;
        }
    });

    $("#button_toogle_danceability").click(function(){
        if (danceability_enabled){
            $( "#attribute_controls_danceability" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            danceability_enabled = false;
        }
        else{
            $( "#attribute_controls_danceability" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            danceability_enabled = true;
        }
    });

    $("#button_toogle_acousticness").click(function(){
        if (acousticness_enabled){
            $( "#attribute_controls_acousticness" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            acousticness_enabled = false;
        }
        else{
            $( "#attribute_controls_acousticness" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            acousticness_enabled = true;
        }
    });

    $("#button_toogle_speechiness").click(function(){
        if (speechiness_enabled){
            $( "#attribute_controls_speechiness" ).switchClass( "attribute_control_container", "attribute_control_container_hidden", 200 );
            speechiness_enabled = false;
        }
        else{
            $( "#attribute_controls_speechiness" ).switchClass( "attribute_control_container_hidden", "attribute_control_container", 200 );
            speechiness_enabled = true;
        }
    });

    $("#key").selectmenu({
        change: function( event, data ) {
            musical_key = data.item.index;
        }
    });

    $("#mode").selectmenu({
        change: function( event, data ) {
            mode = data.item.index;
        }
    });

    $("#slider_tempo").slider({
        min: 50,
        max: 500,
        value: 120,
        slide: function( event, ui ) {
            tempo = ui.value;
            $( "#label_tempo" ).val( ui.value );
        }
    });
    $( "#label_tempo" ).val( $( "#slider_tempo").slider( "value" ) );

    $("#slider_energy").slider({
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
            energy = ui.value;
            $( "#label_energy" ).val( ui.value );
        }
    });
    $( "#label_energy" ).val( $( "#slider_energy").slider( "value" ) );

    $("#slider_danceability").slider({
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
            danceability = ui.value;
            $( "#label_danceability" ).val( ui.value );
        }
    });
    $( "#label_danceability" ).val( $( "#slider_danceability").slider( "value" ) );

    $("#slider_acousticness").slider(
        {
            min: 0,
            max: 100,
            value: 50,
            slide: function( event, ui ) {
                acousticness = ui.value;
                $( "#label_acousticness" ).val( ui.value );
            }
        }
    );
    $( "#label_acousticness" ).val( $( "#slider_acousticness").slider( "value" ) );

    $("#slider_speechiness").slider(
        {
            min: 0,
            max: 100,
            value: 50,
            slide: function( event, ui ) {
                speechiness = ui.value;
                $( "#label_speechiness" ).val( ui.value );
            }
        }
    );
    $( "#label_speechiness" ).val( $( "#slider_speechiness").slider( "value" ) );

});


function getExampleJSONP() {
    jQuery.ajax({
        dataType: "jsonp",
        url: "http://developer.echonest.com/api/v4/song/search?format=jsonp",
        data: {"results": 1, "artist": "Radiohead", "title": "Karma Police", "api_key": api_key},
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

function retrieveSongs(data) {
    jQuery.ajax({
        dataType: "jsonp",
        url: "http://developer.echonest.com/api/v4/song/search?format=jsonp&bucket=id:spotify-WW&bucket=tracks",
        data: data,
        success: function (response) {
            console.log(response);

            $(".CSSTableGenerator").remove();

            var header = ["artist_name", "title", "spotify-uri"];

            var songs = response["response"]["songs"];
            var tableRows = new Array();
            tableRows.push(header);
            for (i = 0; i < songs.length; ++i) {
                var row = new Array();
                for (var s in songs[i]) {
                    if (s == "artist_name"){
                        row.push(String(songs[i][s]));
                    }
                    if (s == "title"){
                        row.push(String(songs[i][s]));
                    }
                    if (s == "tracks"){
                        var spotify_id = songs[i][s][0]["foreign_id"];
                        //spotify_id = spotify_id.replace("spotify:track:","");
                        //row.push("http://open.spotify.com/track/"+spotify_id);
                        row.push(spotify_id);
                    }
                }
                tableRows.push(row);
            }

            var song_results = makeTable($(document.body), tableRows);

        }
    });
}

function apiKey() {
    jQuery.getJSON('config.json', function (data) {
        console.log("Found API Key: " + data.api_key);
        api_key = (String(data.api_key));
    });
}

// the following functions are taken from http://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html

function makeTable(container, data) {
    var table = $("<table/>").addClass('CSSTableGenerator');
    $.each(data, function (rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function (colIndex, c) {
            if (colIndex != 2) row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
            // insert the entries from the third column as anchors
            if (colIndex == 2 && rowIndex != 0) row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").append($("<a href='"+c+"'></a>").text(c)));
        });
        table.append(row);
    });
    return container.append(table);
}

function appendTableColumn(table, rowData) {
    var lastRow = $('<tr/>').appendTo(table.find('tbody:last'));
    $.each(rowData, function (colIndex, c) {
        lastRow.append($('<td/>').text(c));
    });

    return lastRow;
}



