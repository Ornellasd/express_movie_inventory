const Genre = require('../models/genre');
const Movie = require('../models/movie');

const async = require('async');

exports.genre_list = function(req, res) {
  Genre.find({}, 'name')
    .exec(function(err, list_genres) {
      if(err) return err;
      res.render('genre_list', {
        title: 'Genre List',
        genres: list_genres
      });
    });
};

exports.genre_detail = function(req, res) {
 async.parallel({
    genre: function(callback) {
      Genre.findById(req.params.id)
        .exec(callback)
    },
    genre_movies: function(callback) {
      Movie.find({'genre': req.params.id }, 'title description cost stock genre').exec(callback);

    }
  }, function(err, results) {
    if (err) {
      return next(err);
    } // Error in API usage.
    if (results.genre == null) { // No results.
      var err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render('index', {
      title: results.genre.name,
      movies: results.genre_movies,
    });
  });
};