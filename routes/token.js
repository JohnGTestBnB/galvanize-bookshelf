'use strict';

const express = require('express');
const humps = require('humps');
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/', (req, res, next) => {
  if (!req.cookies.token) {
    res.status(200).send(false)
  }
  else {
    res.status(200).send(true)
  }
})

router.post('/', (req, res, next) => {
  knex('users')
  .where('email', req.body.email)
  .select('*')
  .then((user) => {
    if(user.length > 0) {
      bcrypt.compare(req.body.password, user[0].hashed_password, (err,boolean) =>{
        if (boolean) {
          let token = jwt.sign({email: user[0].email, password: user[0].hashed_password}, 'secret')
          res.cookie('token', token, {httpOnly:true});
          delete user[0].hashed_password;
          res.send(humps.camelizeKeys(user[0]))
        }
        else {
          next(boom.create(400, 'Bad email or password'))
        }
      })
    }
    else {
      next(boom.create(400, 'Bad email or password'))
    }
  })
})

router.delete('/', (req, res, next) => {
  res.clearCookie('token');
  res.status(200);
  res.send()
})

module.exports = router;
