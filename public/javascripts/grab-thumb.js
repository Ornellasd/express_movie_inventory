const fetch = require('node-fetch');
const MOVIEDB_KEY = process.env.MOVIEDB_KEY;
const FANART_KEY = process.env.FANART_KEY; 
let movieID;
let movieTitle;

let FUCK;


async function fetchMovies() {
  const response = await fetch('/movies');
  // waits until the request completes...
  console.log(response);
}


async function grabThumbnail(movie) {
	await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&include_adult=false&query=${movie}`)
	.then(response => response.json())
	.then((data) => {
		return fetch(`http://webservice.fanart.tv/v3/movies/${data.results[0].id}?api_key=${FANART_KEY}`)
	})
	.then(response => response.json())
	.then(data => {
		FUCK = data.moviethumb.filter(thumb => thumb.lang == 'en')[0].url;
		console.log(FUCK);
	});
}

grabThumbnail('Snatch');
console.log(FUCK);

/*
const grabThumbnail = async movie => {
  try {
    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&include_adult=false&query=${movie}`)
    .then(response => response.json())
    .then((data) => {
      movieTitle = data.results[0].title;
      movieID = data.results[0].id;
      fetch(`http://webservice.fanart.tv/v3/movies/${movieID}?api_key=${FANART_KEY}`)
        .then(thumbResponse => thumbResponse.json())
        .then((thumbData) => {
          const thumbnail = thumbData.moviethumb.filter(thumb => thumb.lang == 'en')[0].url;
          return thumbnail;
          console.log(thumbnail);
        });
        
    });
  } catch (error) {
    console.log(error);
  }
};

grabThumbnail('Snatch');


exports.grabThumbnail = grabThumbnail;
*/
