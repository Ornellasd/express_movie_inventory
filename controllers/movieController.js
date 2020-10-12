const Movie = require('../models/movie');
const Genre = require('../models/genre');
const async = require('async');

let testGenres = ['Fantasy', 'Science Fiction', 'Fiction', 'Documentary'];

exports.index = function(req, res) {
  Movie.find({}, 'title description cost stock genre')
    .exec(function(err, list_movies) {
    
      if(err) {
        return next(err);
      }
      res.render('index', {
        title: 'DankFlix',
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
    if (err) {
      return next(err);
    }

    res.render('movie_form', {
      title: 'Add Movie',
      genres: results.genres,
    });
  });
}

exports.movie_create_post = function(req, res) {
  //let genreSelection;
  //if(req.body.otherGenre.length > 0) {
  //  genreSelection = req.body.otherGenre;
  //}
  /*
 if (!(req.body.Other instanceof Array)) {
    if (typeof req.body.otherGenre === 'undefined')
      req.body.otherGenre = [];
    else
      req.body.otherGenre = new Array(req.body.genre);
  }
  */
  //req.body.otherGenre = new Array(req.body.otherGenre);
  console.log(req.body.selectedGenre);

  const movie = new Movie({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    cost: req.body.moviePrice,
    stock: req.body.movieStock, 
    genre: req.body.selectedGenre
  });

  movie.save(function(err) {
    if(err) return err;
    res.redirect(movie.url);
  });

  
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
  let existingGenres = [];
  console.log(Genre.find());
  Genre.find({}, 'name', function(err, genres) {
    if(err) return err;
    existingGenres = genres;
  });


  Movie.findById(req.params.id).
  exec(function(err, movie) {
    if(err) return err;
    res.render('movie_form', { 
      title: 'Edit Movie',
      movie: movie,
      genres: existingGenres
    });
  });
};

exports.movie_edit_post = function(req, res) {
  const movie = new Movie({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    cost: req.body.moviePrice,
    stock: req.body.movieStock,
    //genre:
    _id: req.params.id, 
  });

  
  //var genre = new Genre({ name: req.body.otherGenre });
  //genre.save();

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
