'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');

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
  knex('books')
    .where('id', id)
    .select('*')
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})

router.post('/', (req, res, next) => {
  let newBook = req.body;
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
  knex('books')
    .returning(['title', 'author', 'genre', 'description', 'cover_url'])
    .where('id', id)
    .del()
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]))
    })
})

module.exports = router;
