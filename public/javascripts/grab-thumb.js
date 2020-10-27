const fetch = require('node-fetch');
const MOVIEDB_KEY = process.env.MOVIEDB_KEY;
const FANART_KEY = process.env.FANART_KEY;
let movieDescription;

  function grabMovieData(movie) {
    try {
      return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&include_adult=false&query=${movie}`)
        .then(response => response.json())
        .then((data) => {
          movieTitle = data.results[0].title;
          movieDescription = data.results[0].overview;
          return fetch(`http://webservice.fanart.tv/v3/movies/${data.results[0].id}?api_key=${FANART_KEY}`);
        });
      } catch(err) {
        console.log(err);
      }
  }
   
const processMovieData = async (movie) => {
    const movieData = await grabMovieData(movie);
    const response = await movieData.json();
    try {
    	const thumbnail = await response.moviethumb.filter(thumb => thumb.lang == 'en')[0].url;
    	return response;	
    } catch(err) {
    	console.log('HERRRRRP');
    	console.log(movieDescription);
    }
    
    
  }


processMovieData('Wet Hot American Summer').then(response => console.log(response));