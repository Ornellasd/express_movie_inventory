const async = require('async');
const Movie = require('../models/movie');

let testGenres = ['Fantasy', 'Science Fiction', 'Fiction', 'Documentary'];

exports.index = function(req, res) {
  Movie.find({}, 'title description cost stock')
    .exec(function(err, list_movies) {
      if(err) {
        return next(err);
      }
      res.render('index', {
        title: 'DankFlix',
        movies: list_movies
      });
      console.log(list_movies);
    });
};

exports.movie_create_get = function(req, res, next) {
  res.render('movie_form', { title: 'Add Movie', genres: testGenres});
}

exports.movie_create_post = function(req, res) {
  const movie = new Movie({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    cost: req.body.moviePrice,
    stock: req.body.movieStock, 
  });

  movie.save();
  res.redirect('/');
};

/*
  movie.save(function(err) {
    if(err){
      console.log(err);
    };
  });
*/
