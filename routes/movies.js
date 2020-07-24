const express = require('express');
const movieRouter = express.Router();

const Movie = require('./../models/movie');
const { res } = require('express');

movieRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

// Handle GET request for website root
movieRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(movie => {
      res.render('movies/show', { movie: movie });
    })
    .catch(error => {
      next(error);
    });
});

movieRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .catch(error => {
      next(error);
    })
    .then(movie => {
      res.render('movies/edit', { movie: movie });
    });
});

// Post create movie
movieRouter.post('/', (req, res, next) => {
  const data = req.body;
  console.log(data);
  Movie.create(data)
    .then(movie => {
      movie.save();
    })
    .catch(error => {
      console.log('error: ', error);
      res.redirect('/create');
    })
    .then(() => {
      res.redirect('/movies');
    });
});

// Post edit movie
movieRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
    .catch(error => {
      next(error);
    })
    .then(() => {
      res.redirect('/movies');
    });
});

// Post update movie
movieRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(req.body.name, req.body.occupation, req.body.catchPhrase);
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Movie.findByIdAndUpdate(id, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .catch(error => {
      next(error);
    })
    .then(() => {
      res.redirect('/movies');
    });
});

// Get base /movies
movieRouter.get('/', (req, res, next) => {
  Movie.find({})
    .then(movies => {
      console.log(movies);
      res.render('movies/index', { movies: movies });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = movieRouter;
