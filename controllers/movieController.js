const Movie = require('../models/movie');
const Genre = require('../models/genre');
const async = require('async');

exports.index = (req, res) => {
  Movie.find({}, 'title description cost stock genre image')
    .populate('genre')
    .exec((err, list_movies) => {
      if (err) return next(err);
      res.render('index', {
        title: 'All Movies',
        movies: list_movies,
      });
    });
};

exports.movie_create_get = (req, res, next) => {
  async.parallel({
    genres: (callback) => {
      Genre.find(callback);
    },
  }, (err, results) => {
    if (err) return next(err);
    res.render('movie_form', {
      title: 'Add Movie',
      genres: results.genres,
    });
  });
}

exports.movie_create_post = (req, res) => {
  let genreSelection;
  let imagePath;

  if(req.file) {
    imagePath = `images/uploads/${req.file.filename}`;
    console.log('IMAGE UPLOADED');
  } else {
    console.log('NO IMAGE UPLOADED');
  }
  
  async.parallel({
    genre: (callback) => {
      Genre.findOne({ 'name': { $regex : new RegExp(req.body.otherGenre, 'i') } }).exec(callback)
    },
  }, (err, results) => {
    if (err) return err;
    if(req.body.otherGenre.length == 0) {
      genreSelection = req.body.selectedGenre;
    } else if(results.genre && req.body.otherGenre.length >= 1) {
      //Genre exists, set id to it
      genreSelection = results.genre._id;
    } else {
      // Genre doesn't exist, create genre and set id
      const newGenre = new Genre({ name: req.body.otherGenre });
      newGenre.save(err => err);
      genreSelection = newGenre._id
    }
    
    const movie = new Movie({
      title: req.body.movieTitle,
      description: req.body.movieDesc,
      cost: req.body.moviePrice,
      stock: req.body.movieStock,
      genre: genreSelection,
      image: imagePath,
      _id: req.params.id,
    });

    movie.save((err) => {
      if (err) return err;
      res.redirect(movie.url);
    });
  });

};

exports.movie_detail = (req, res) => {
  async.parallel({
    movie: (callback) => {
      Movie.findById(req.params.id)
        .populate('genre')
        .exec(callback);
    },

  }, (err, results) => {
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

exports.movie_delete_get = (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) return err;
    res.render('movie_delete', {
      title: `Delete ${movie.title}?`,
    });
  });
};

exports.movie_delete_post = (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, movie) => {
    if (err) return err;
    res.redirect('/');
  });
}

exports.movie_edit_get = (req, res) => {
  Genre.find({}, 'name', (err, genres) => {
    if (err) return err;
    existingGenres = genres;
  });

  Movie.findById(req.params.id).
  exec((err, movie) => {
    if (err) return err;
    res.render('movie_form', {
      title: 'Edit Movie',
      movie: movie,
      genres: existingGenres
    });
  });
};

exports.movie_edit_post = (req, res) => {
  let genreSelection;

  async.parallel({
    genre: (callback) => {
      Genre.findOne({ 'name': { $regex : new RegExp(req.body.otherGenre, 'i') } }).exec(callback)
    },
  }, (err, results) => {
    if (err) return err;
    if(req.body.otherGenre.length == 0) {
      genreSelection = req.body.selectedGenre;
    } else if(results.genre && req.body.otherGenre.length >= 1) {
      //Genre exists, set id to it
      genreSelection = results.genre._id;
    } else {
      // Genre doesn't exist, create genre and set id
      const newGenre = new Genre({ name: req.body.otherGenre });
      newGenre.save(err => err);
      genreSelection = newGenre._id
    }
    
    const movie = new Movie({
      title: req.body.movieTitle,
      description: req.body.movieDesc,
      cost: req.body.moviePrice,
      stock: req.body.movieStock,
      genre: genreSelection,
      _id: req.params.id,
    });
    
    Movie.findByIdAndUpdate(req.params.id, movie, {}, (err, movie) => {
      if (err) return err;
      res.redirect(movie.url);
    });
  });
};
