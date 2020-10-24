const fetch = require('node-fetch');
const MOVIEDB_KEY = process.env.MOVIEDB_KEY;
const FANART_KEY = process.env.FANART_KEY; 
let movieID;
let movieTitle;

function grabThumbnail(movie){
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&include_adult=false&query=${movie}`)
  .then(response => response.json())
  .then((data) => {
    movieTitle = data.results[0].title;
    movieID = data.results[0].id;
    return fetch(`http://webservice.fanart.tv/v3/movies/${movieID}?api_key=${FANART_KEY}`)
    	.then(thumbResponse => thumbResponse.json())
    	.then((thumbData) => {
    		const thumbnail = thumbData.moviethumb.filter(thumb => thumb.lang == 'en')[0].url;
    		return thumbnail;
    	})
  })
  .catch(error => console.warn(error));
}

exports.grabThumbnail = grabThumbnail;

