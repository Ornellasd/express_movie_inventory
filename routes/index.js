const express = require('express');
const router = express.Router();

const movie_controller = require('../controllers/movieController');
const movie_genre_controller = require('../controllers/genreController');

// GET Movie Index Page
router.get('/', movie_controller.index);

// GET request for creating a Movie.
router.get('/movie/create', movie_controller.movie_create_get);

// POST request for creating a Movie.
router.post('/movie/create', movie_controller.movie_create_post);

// GET request for one Movie.
router.get('/movie/:id', movie_controller.movie_detail);

// GET request to delete a Movie.
router.get('/movie/:id/delete', movie_controller.movie_delete_get);

// POST request to delete a Movie
router.post('/movie/:id/delete', movie_controller.movie_delete_post);

// GET request to edit a Movie.
router.get('/movie/:id/edit', movie_controller.movie_edit_get);

// POST request to edit a Movie.
router.post('/movie/:id/edit', movie_controller.movie_edit_post);

// GET Genre list page
router.get('/genres', movie_genre_controller.genre_list);

// Get Genre detail
router.get('/genre/:id', movie_genre_controller.genre_detail);

// POST request to edit a Movie.
module.exports = router;
