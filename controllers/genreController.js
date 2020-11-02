const Genre = require('../models/genre');
const Movie = require('../models/movie');

const async = require('async');

exports.genre_list = (req, res) => {
  Genre.find({}, 'name')
    .exec((err, list_genres) => {
      if(err) return err;

      // Sort genres alphabetically
      list_genres.sort((a, b) => a.name.localeCompare(b.name));

      res.render('genre_list', {
        title: 'Genre List',
        genres: list_genres
      });
    });
};

exports.genre_detail = (req, res, next) => {
 async.parallel({
    genre: (callback) => {
      Genre.findById(req.params.id)
        .exec(callback)
    },
    genre_movies: (callback) => {
      Movie.find({'genre': req.params.id }, 'title description cost stock genre poster').exec(callback);

    }
  }, (err, results) => {
    if (err) {
      return next(err);
    } // Error in API usage.
    if (results.genre == null) { // No results.
      var err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }

    // Sort movies alphabetically by title
    results.genre_movies.sort((a, b) => a.title.localeCompare(b.title));

    res.render('index', {
      title: results.genre.name,
      movies: results.genre_movies,
    });
  });
};

exports.genre_delete_get = (req, res, next) => {
   async.parallel({
    genre: (callback) => {
      Genre.findById(req.params.id)
        .exec(callback)
    },
    genre_movies: (callback) => {
      Movie.find({'genre': req.params.id }, 'title').exec(callback);

    }
  }, (err, results) => {
    if (err) {
      return next(err);
    } // Error in API usage.
    if (results.genre == null) { // No results.
      var err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }

    // Sort movies alphabetically by title
    results.genre_movies.sort((a, b) => a.title.localeCompare(b.title));

    res.render('genre_delete', {
      title: `Delete ${results.genre.name}`,
      genre_movies: results.genre_movies
    });
  }); 
}

exports.genre_delete_post = (req, res) => {
  Movie.find({'genre': req.params.id}, 'title')
    .exec((err, genre_movies) => {
      Genre.findByIdAndRemove(req.params.id, function(err, genre) {
        if(err) return next(err);
        res.redirect('/genres');
      });
    });
}