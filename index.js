#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Cloudup = require('cloudup-client');

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
  var Reporter = require('./lib/' + options.reporter);
  var reporter = new Reporter(col, { remote: remote, direct: options.direct });
  return col;
};


