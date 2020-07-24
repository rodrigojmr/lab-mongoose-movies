const express = require('express');
const celebritiesRouter = express.Router();

const Celebrity = require('./../models/celebrity');
const { res } = require('express');

celebritiesRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

// Handle GET request for website root
celebritiesRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render('celebrities/show', { celebrity: celebrity });
    })
    .catch(error => {
      next(error);
    });
});

celebritiesRouter.post('/', (req, res, next) => {
  const data = req.body;
  Celebrity.create(data)
    .then(celebrity => {
      celebrity.save();
    })
    .catch(error => {
      console.log('error: ', error);
      res.redirect('/create');
    })
    .then(() => {
      res.redirect('/celebrities');
    });
});

celebritiesRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndRemove(id)
    .catch(error => {
      next(error);
    })
    .then(() => {
      res.redirect('/celebrities');
    });
});

celebritiesRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .catch(error => {
      next(error);
    })
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity: celebrity });
    });
});

celebritiesRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;
  Celebrity.findByIdAndUpdate(id, {
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  })
    .catch(error => {
      next(error);
    })
    .then(() => {
      res.redirect('/celebrities');
    });
});

celebritiesRouter.get('/', (req, res, next) => {
  Celebrity.find({})
    .then(celebrities => {
      res.render('celebrities/index', { celebrities: celebrities });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = celebritiesRouter;
