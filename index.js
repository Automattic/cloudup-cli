#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Cloudup = require('cloudup-client')
  , Console = require('./lib/console');

/**
 * Cloudup remote.
 */

var remote = process.env.CLOUDUP_REMOTE || 'https://cloudup.com';

/**
 * Cloudup client.
 */

var client = new Cloudup({
  url: remote,
  user: process.env.CLOUDUP_USER,
  pass: process.env.CLOUDUP_PASS
});

/**
 * Upload collection.
 *
 * @param {Object} options
 * @return {Collection}
 * @api public
 */

exports.collection = function(options){
  var col = client.collection(options);
  var reporter = new Console(col, { remote: remote });
  return col;
};


