const Movie = require('../models/movie');
const Genre = require('../models/genre');
const async = require('async');

exports.index = function(req, res) {
  Movie.find({}, 'title description cost stock genre')
    .populate('genre')
    .exec(function(err, list_movies) {
      if (err) return next(err);
      res.render('index', {
        title: 'All Movies',
        movies: list_movies,
      });
    });
};

exports.movie_create_get = function(req, res, next) {
  async.parallel({
    genres: function(callback) {
      Genre.find(callback);
    },
  }, function(err, results) {
    if (err) return next(err);
    res.render('movie_form', {
      title: 'Add Movie',
      genres: results.genres,
    });
  });
}

exports.movie_create_post = function(req, res) {
  let genreSelection;

  async.parallel({
    genre: function(callback) {
      Genre.findOne({
        'name': req.body.otherGenre
      }).exec(callback)
    },
  }, function(err, results) {
    if (err) return err;
    if (req.body.otherGenre.length == 0) {
      genreSelection = req.body.selectedGenre;
    } else if (results.genre) {
      genreSelection = results.genre._id;
    } else {
      const newGenre = new Genre({
        name: req.body.otherGenre
      });
      newGenre.save(function(err) {
        return err;
      });
      genreSelection = newGenre._id;
    }

    const movie = new Movie({
      title: req.body.movieTitle,
      description: req.body.movieDesc,
      cost: req.body.moviePrice,
      stock: req.body.movieStock,
      genre: genreSelection,
      _id: req.params.id,
    });

    movie.save(function(err) {
      if (err) return err;
      res.redirect(movie.url);
    });

  });

};

exports.movie_detail = function(req, res) {
  async.parallel({
    movie: function(callback) {
      Movie.findById(req.params.id)
        .populate('genre')
        .exec(callback);
    },

  }, function(err, results) {
    if (err) return next(err);
    if (results.movie == null) { // No results.
      var err = new Error('Movie not found');
      err.status = 404;
      return err;
    }
    // Successful, so render.
    res.render('movie_detail', {
      title: results.movie.title,
      movie: results.movie
    });
  });
};

exports.movie_delete_get = function(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    if (err) return err;
    res.render('movie_delete', {
      title: `Delete ${movie.title}?`,
    });
  });
};

exports.movie_delete_post = function(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err, movie) {
    if (err) return err;
    res.redirect('/');
  });
}

exports.movie_edit_get = function(req, res) {
  Genre.find({}, 'name', function(err, genres) {
    if (err) return err;
    existingGenres = genres;
  });

  Movie.findById(req.params.id).
  exec(function(err, movie) {
    if (err) return err;
    res.render('movie_form', {
      title: 'Edit Movie',
      movie: movie,
      genres: existingGenres
    });
  });
};

exports.movie_edit_post = function(req, res) {
  let genreSelection;

  async.parallel({
    genre: function(callback) {
      Genre.findOne({
        'name': req.body.otherGenre
      }).exec(callback)
    },
  }, function(err, results) {
    if (err) return err;
    if (req.body.otherGenre.length == 0) {
      genreSelection = req.body.selectedGenre;
    } else if (results.genre) {
      genreSelection = results.genre._id;
    } else {
      const newGenre = new Genre({
        name: req.body.otherGenre
      });
      newGenre.save(function(err) {
        return err;
      });
      genreSelection = newGenre._id;
    }

    const movie = new Movie({
      title: req.body.movieTitle,
      description: req.body.movieDesc,
      cost: req.body.moviePrice,
      stock: req.body.movieStock,
      genre: genreSelection,
      _id: req.params.id,
    });

    Movie.findByIdAndUpdate(req.params.id, movie, {}, function(err, movie) {
      if (err) return err;
      res.redirect(movie.url);
    });
  });

};
