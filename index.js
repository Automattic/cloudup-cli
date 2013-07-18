#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Cloudup = require('cloudup-client');

/**
 * Cloudup remote.
 */

var remote = process.env.CLOUDUP_REMOTE || 'https://api.cloudup.com';

/**
 * Cloudup client.
 */

var client = new Cloudup({
  url: remote,
  user: process.env.CLOUDUP_USER,
  pass: process.env.CLOUDUP_PASS
});

/**
 * Upload stream.
 *
 * @param {Object} options
 * @return {Stream}
 * @api public
 */

exports.stream = function(options){
  var stream = client.stream(options);
  if (!options.reporter) return stream;
  var Reporter = require('./lib/' + options.reporter);
  var reporter = new Reporter(stream, { remote: remote, direct: options.direct });
  return stream;
};


