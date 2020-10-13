#! /usr/bin/env node

console.log('This script populates some test movies, and genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Movie = require('./models/movie')
var Genre = require('./models/genre')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var movies = [];

function movieCreate(title, description, cost, stock, cb) {
  moviedetail = {
    title: title,
    description: description,
    cost: cost,
    stock: stock
  }

  var movie = new Movie(moviedetail);
  movie.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Movie: ' + movie);
    movies.push(movie)
    cb(null, movie)
  });
}

function createMovies(cb) {
  async.parallel([
      function(callback) {
        movieCreate(
          '2001: A Space Odyssey',
          'After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer H.A.L. 9000. "2001" is a story of evolution.',
          420,
          39,
          callback
        );
      },
      function(callback) {
        movieCreate(
          'South Park: Bigger Longer Uncut',
          'In this feature film based on the hit animated series, the third graders of South Park sneak into an R-rated film by ultra-vulgar Canadian television personalities Terrance (Matt Stone) and Phillip (Trey Parker), and emerge with expanded vocabularies that leave their parents and teachers scandalized. When outraged Americans try to censor the film, the controversy becomes a call to war with Canada, and Terrance and Phillip end up on death row -- with only the kids left to save them.',
          3.50,
          17,
          callback
        );
      }
    ],
    // optional callback
    cb);
}



async.series([
    createMovies,
  ],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      //console.log('BOOKInstances: '+bookinstances);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });
