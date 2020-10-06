const async = require('async');

const Movie = require('../models/movie');

let movies = [
  {
    title: "Apocalypse Now",
    description: "In Vietnam in 1970, Captain Willard (Martin Sheen) takes a perilous and increasingly hallucinatory journey upriver to find and terminate Colonel Kurtz (Marlon Brando), a once-promising officer who has reportedly gone completely mad. In the company of a Navy patrol boat filled with street-smart kids, a surfing-obsessed Air Cavalry officer (Robert Duvall), and a crazed freelance photographer (Dennis Hopper), Willard travels further and further into the heart of darkness.",
    genres: ["war", 'fiction'],
    price: 3.50,
    stock: 50,    
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    description: "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.",
    genres: ["fantasy", 'fiction'],
    price: 3.50,
    stock: 45,    
  },
]

let genres = ['Fantasy', 'Science Fiction', 'Fiction', 'Documentary'];


exports.index = function(req, res) {
  res.render('index', { title: 'DankFlix', movies: movies });
};

exports.movie_create_get = function(req, res, next) {
  res.render('movie_form', { title: 'Add Movie', genres: genres});
}

exports.movie_create_post = function(req, res) {
  movies.push({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    genres: req.body.movieGenre,
    price: req.body.moviePrice,
    stock: req.body.movieStock,
  });

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
exports.movie_create_post = function(req, res) {
  movies.push({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    genres: req.body.movieGenre,
    price: req.body.moviePrice,
    stock: req.body.movieStock,
  });

  const movie = new Movie({
    title: req.body.movieTitle,
    description: req.body.movieDesc,
    price: req.body.moviePrice,
    stock: req.body.movieStock, 
  });

  movie.save(function(err) {
    if(err){
      console.log(err);
    };
  });

  res.redirect('/');
}
*/