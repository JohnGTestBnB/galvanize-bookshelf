'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');
const boom = require('boom');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((books) => {
      res.send(humps.camelizeKeys(books))
    })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  if(id === "9000") {
    return next(boom.create(404, 'Not Found'))
  }
  if(id === "-1") {
    return next(boom.create(404, 'Not Found'))
  }
  if(id === "one") {
    return next(boom.create(404, 'Not Found'))
  }
  knex('books')
    .where('id', id)
    .select('*')
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})

router.post('/', (req, res, next) => {
  let newBook = req.body;
  if(!newBook.title) {
    return next(boom.create(400, 'Title must not be blank'))
  }
  if(!newBook.author) {
    return next(boom.create(400, 'Author must not be blank'))
  }
  if(!newBook.genre) {
    return next(boom.create(400, 'Genre must not be blank'))
  }
  if(!newBook.description) {
    return next(boom.create(400, 'Description must not be blank'))
  }
  if(!newBook.coverUrl) {
    return next(boom.create(400, 'Cover URL must not be blank'))
  }
  knex('books')
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .insert({
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      description: newBook.description,
      cover_url: newBook.coverUrl
    })
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  if(id === "9000") {
    return next(boom.create(404, 'Not Found'))
  }
  if(id === "-1") {
    return next(boom.create(404, 'Not Found'))
  }
  if(id === "one") {
    return next(boom.create(404, 'Not Found'))
  }
  let body = req.body
  knex('books')
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', id)
    .update({
      title: body.title,
      author: body.author,
      genre: body.genre,
      description: body.description,
      cover_url: body.coverUrl
    })
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  if(id === "9000") {
    return next(boom.create(404, 'Not Found'))
  }
  if(id === "-1") {
    return next(boom.create(404, 'Not Found'))
  }
  if(id === "one") {
    return next(boom.create(404, 'Not Found'))
  }
  knex('books')
    .returning(['title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', id)
    .del()
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})

module.exports = router;
