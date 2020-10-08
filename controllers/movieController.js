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

exports.movie_detail = function(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    if(err) {
      return err;
    } else {
      res.render('movie_detail', { 
        title: movie.title,
        description: movie.description,
        cost: movie.cost_formatted,
        stock: movie.stock,
        url: movie.url 
      });
    }
  });
};  

exports.movie_delete_get = function(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    if(err) {
      return err;
    } else {
      res.render('movie_delete', {
        title: `Delete ${movie.title}?`,
      });
    }
  });
};

exports.movie_delete_post = function(req, res) {
  Movie.findByIdAndRemove(req.params.id, function (err, movie) {
    if (err) {
      return err;
    } else {
      res.redirect('/');
    }
  });
}

exports.movie_edit_get = function(req, res) {
  Movie.findById(req.params.id).
  exec(function(err, movie) {
    if(err) return err;
    res.render('movie_form', { 
      title: 'Edit Movie',
      movie: movie,
      genres: testGenres
    });
  });
};

exports.movie_edit_post = function(req, res) {
  const movie = new Movie({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    cost: req.body.moviePrice,
    stock: req.body.movieStock,
    _id: req.params.id, 
  });

  Movie.findByIdAndUpdate(req.params.id, movie, {}, function(err, movie) {
    if (err) return err;
    res.redirect(movie.url);
  });
};

/*
  ---- Expand save function? ----
  movie.save(function(err) {
    if(err){
      console.log(err);
    };
  });

  ---- Why use exec? ----
  Movie.findById(req.params.id)
    .exec(function(err) {
      res.render('movie_detail', { title: 'MOVIE WHAT WHAT'});
    })
*/
