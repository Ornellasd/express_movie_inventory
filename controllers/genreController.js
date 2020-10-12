const Genre = require('../models/genre');

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
  Genre.findById(req.params.id, function(err, genre) {
    if(err) { return err };
    res.render('genre_detail', {
      title: genre.name,
    });
  });
}
