$(function () {
    $("#search_song_button").click(function () {
        alert('clicked!');
    });
});

function getExample() {
    jQuery.getJSON("http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV&format=json&results=1&artist=radiohead&title=karma%20police",
        function () {
            console.log("success")
        }
    )
}


