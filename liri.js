//Loading modules
var Twitter = require('twitter');
// var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var tweetsArray = [];
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "hunger games";
var defaultSong = "All by Myself";


var client = new Twitter(keys);




//This function processes the input commands
function processCommands(command, commandParam){

	//console.log(commandParam);

	switch(command){

	case 'my-tweets':
		getMyTweets();

					break;
	case 'spotify-this-song':
		//If user has not specified a song , usse default
		// if(commandParam === undefined){
		// 	commandParam = defaultSong;
		// }
		spotifyThis(); break;
	case 'movie-this':
		//If user has not specified a movie Name , use default
		if(commandParam === undefined){
			commandParam = defaultMovie;
		}
		movieThis(commandParam); break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
	default:
		console.log("Please type node liri.js with the following options: my-tweets, spotify-this-song, movie-this, or do-what-it-says");
}

}

//Function to get tweets
function getMyTweets(){

	var params = {screen_name: '@people', count: 20, exclude_replies:true, trim_user:true};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {
					//console.log(tweets);
					tweetsArray = tweets;

					for(i=0; i<tweetsArray.length; i++){
						console.log("Created at: " + tweetsArray[i].created_at);
						console.log("Text: " + tweetsArray[i].text);
						console.log('--------------------------------------');

						// fs.appendFile("log.txt", "Created at: " + tweetsArray[i].created_at);
						// fs.appendFile("log.txt", "Text: " + tweetsArray[i].text);
						// fs.appendFile("log.txt", '--------------------------------------');

					}
				}
				else{
					console.log(error);
				}
	});

}
//end function tweets

function spotifyThis(){
//

var spotify = require('node-spotify-api');

var spotify = new spotify({
  id:'e6bf7692190c437e97474266854fa972',
  secret:'ae29067dafa74dacb3738353a9948659'
});
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//   //
var param = 'all by myself'
spotify.search({ type: 'track', query: param}, function(err, data) {
	if ( err ) {
			console.log('Error occurred: ' + err);
			return;

		    }else{
					var songInfo = data.tracks.items[0];
						console.log('');
	 									console.log("Artist Name: " + songInfo.artists[0].name)
										console.log("Song : " + songInfo.name)
										console.log("Album: " + songInfo.album.name)
										console.log("Preview link: " + songInfo.preview_url)
	 // console.log(songResult);


		    }
		});
	}



//movie-this function
function movieThis(){


	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + "Titanic" + "&y=&plot=short&apikey=trilogy&tomatoes=true";

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).


			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("Title: " + JSON.parse(body).Title);

      console.log("IMdB Rating: " + JSON.parse(body).imdbRating);
			console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
		console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
	  }
	});
}
//end of movie-this function

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    // Print each element (item) of the array/
    console.log(output[i]);


  }

});
}

//log text

//end of log text
//-------------------------MAIN PROCESS-------------------------------------------

processCommands(inputCommand, commandParam);
