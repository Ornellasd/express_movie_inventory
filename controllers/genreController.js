const Genre = require('../models/genre');

exports.genre_list = function(req, res) {
  const genre = new Genre({
    name: 'test'
  })

  genre.save();

  Genre.find({}, 'name')
    .exec(function(err, list_genres) {
      if(err) return err;
      res.render('genre_list', {
        title: 'Genre List',
        genres: list_genres
      });
    });
};