var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var myKeyss = require('./keys.js');
var fs = require('fs');



var client = new Twitter(myKeyss.twitterKeys); 
var params = {screen_name: 'Gmes23', count: 20};
// var movie = 'Mr.nobody'
var a = process.argv[2];
var b = process.argv;
var c = " ";

for (var i=3; i<b.length; i++){
  if(i>3 && i<b.length){
    x = x + "+" + b[i];
  } else{
    c = c + b[i];
  }
}




switch(a) {
    case "my-tweets":
        myTweets();

    break;

    case "spotify-this-song":
        spotifyThis(); 
       
    break;

    case "movie-this":
        movieThis();
    break;

    case "do-something":
        doSomething();
}

function myTweets(){
client.get('statuses/user_timeline', params, function(error, tweets, response) {
            for(var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + " " + tweets[i].created_at);
            }
});
}


function spotifyThis(){
    spotify.search({ type: 'track', query: c}, function(err, data) {
        if ( err ) {
        console.log('Error occurred: ' + err);
        return;
        } else {
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
        }; 
});
}

function movieThis(){
    request('http://www.omdbapi.com/?t=' + c + '&plot=short&tomatoes=true', function (error, response, body) {
        if (!error && response.statusCode == 200) {
           var body = JSON.parse(body);
           console.log("Title: " + body.Title);
           console.log("Release Year: " + body.Year);
           console.log("IMdB Rating: " + body.imdbRating);
           console.log("Country: " + body.Country);
           console.log("Language: " + body.Language);
           console.log("Plot: " + body.Plot);
           console.log("Actors: " + body.Actors);
           console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
           console.log("Rotten Tomatoes URL: " + body.tomatoURL); 
        } 
    })

}

function doSomething(){
    fs.readfile('random.txt' , 'utf8', function(error , data)){
        var d = data.split(' , ')
        spotifySong(d[1]);
    }

}
