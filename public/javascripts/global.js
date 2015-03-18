/**
 * Created by daniel.neumann on 3/18/15.
 */

var songListData = [];
// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // Username link click
    $('#songList table tbody').on('click', 'td a.linkshowsong', showSongInfo);


});

// Functions ===================================

// Fill the table with data

function populateTable() {

    // Empty content string

    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/songs/songlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        songListData = data;
        // For each item in our JSON, add a table row and cells to the content string

        $.each(data,function(){
            tableContent +='<tr>';
            tableContent += '<td>' + this.artist + '</td>';
            tableContent += '<td><a href="#" class="linkshowsong" rel="' + this.song + '">' + this.song + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeletesong" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#songList table tbody').html(tableContent);

    });

}

// Show song info

function showSongInfo(event) {
    // Prevent default from firing
    event.preventDefault();
    var thisSongName = $(this).attr('rel');
    console.log('thisSongName = ' + thisSongName);
    // Get Index of object based on id value
    var arrayPosition = songListData.map(function(arrayItem) { return arrayItem.song; }).indexOf(thisSongName);
    // Get our User Object
    console.log('arrayPosition = '+arrayPosition)
    console.log('data = ' + songListData[arrayPosition]);
    var thisSongObject = songListData[arrayPosition];

    // Populate Info Box
    $('#songInfoArtist').text(thisSongObject.artist);
    console.log('thisSongObject.artist = ' + thisSongObject.artist);
    $('#songInfoSong').text(thisSongObject.song);
    $('#songInfoLyrics').text(thisSongObject.lyrics);
    $('#songInfoUrl').text(thisSongObject.url);
}