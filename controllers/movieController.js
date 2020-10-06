const async = require('async');
const Movie = require('../models/movie');

let genres = ['Fantasy', 'Science Fiction', 'Fiction', 'Documentary'];


exports.index = function(req, res) {
  Movie.find({}, 'title description price stock')
    .exec(function(err, list_movies) {
      if(err) {
        return next(err);
      }
      res.render('index', {
        title: 'DankFlix',
        movies: list_movies
      });
    });
};

exports.movie_create_get = function(req, res, next) {
  res.render('movie_form', { title: 'Add Movie', genres: genres});
}

exports.movie_create_post = function(req, res) {
  const movie = new Movie({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    price: req.body.moviePrice,
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
