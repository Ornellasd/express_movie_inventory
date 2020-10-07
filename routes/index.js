const express = require('express');
const router = express.Router();

const movie_controller = require('../controllers/movieController');
const Movie = require('../models/movie');

router.get('/', movie_controller.index);

router.get('/movie/create', movie_controller.movie_create_get);

router.post('/movie/create', movie_controller.movie_create_post);

router.get('/movie/:id', movie_controller.movie_detail);


module.exports = router;
