'use strict';

const express = require('express');
const humps = require('humps');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const boom = require('boom');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

router.post('/', (req, res, next) => {
  if (!req.body.email) {
    return next(boom.create(400, 'Email must not be blank'))
  }
  if (!req.body.password) {
    return next(boom.create(400, 'Password must be at least 8 characters long'))
  }
  bcrypt.hash(req.body.password, 12)
  .then((hashed_password) => {
    return knex('users')
      .insert({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: hashed_password
      }, '*')
  })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.send(humps.camelizeKeys(user))
    })
    .catch((err) => {
      next(err);
    })

})

module.exports = router;
