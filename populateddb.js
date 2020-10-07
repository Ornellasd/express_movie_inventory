#! /usr/bin/env node

console.log('This script populates some test movies, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

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

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
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
  movie.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Movie: ' + movie);
    movies.push(movie)
    cb(null, movie)
  }  );
}

function createMovies(cb) {
  async.parallel([
    function(callback) {
      movieCreate('Test Movie 1', 'Summary of test movie 1', 420, 69, callback);
    },
    function(callback) {
      movieCreate('Test Movie 2', 'Summary of test movie 2', 3.50, 17, callback)
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
      console.log('FINAL ERR: '+err);
  }
  else {
      //console.log('BOOKInstances: '+bookinstances);
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
});



