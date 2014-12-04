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
        }
    });
}


