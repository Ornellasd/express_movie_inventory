const fetch = require('node-fetch');
const MOVIEDB_KEY = process.env.MOVIEDB_KEY;
const FANART_KEY = process.env.FANART_KEY;
let movieDescription;
let movieTitle;

function grabMovieData(movie) {
	return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&include_adult=false&query=${movie}`)
		.then(response => response.json())
		.then((data) => {
			try {
				movieTitle = data.results[0].title;
				movieDescription = data.results[0].overview;
				return fetch(`http://webservice.fanart.tv/v3/movies/${data.results[0].id}?api_key=${FANART_KEY}`)
			} catch (err) {
				console.log(`No movie named: ${movie}`);
			}
		});
}

const processMovieData = async (movie) => {
	let response;
	const movieData = await grabMovieData(movie);
	try {
		response = await movieData.json();
	} catch (err) {
		console.log('error processing movieData');
	}

	try {
		const thumbnail = response.moviethumb.filter(thumb => thumb.lang == 'en')[0].url;
		const poster = response.movieposter.filter(poster => poster.lang == 'en')[0].url;
		let artwork = {
			'thumbnail': thumbnail,
			'poster': poster
		};
		return artwork;  
	} catch (err) {
		console.log('NO ARTWORK FOUND!');
	}
}

processMovieData('Titanic').then(response => console.log(response));
