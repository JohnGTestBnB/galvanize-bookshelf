'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf2_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf2_test'
  },

  production: {}
};
