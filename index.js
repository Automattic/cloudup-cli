#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Cloudup = require('cloudup-client');

/**
 * Upload stream.
 *
 * @param {Object} opts
 * @return {Stream}
 * @api public
 */

exports.stream = function(opts){
  opts = opts || {};

  var client = new Cloudup({
    url: opts.remote || 'https://api.cloudup.com',
    user: opts.user,
    pass: opts.pass
  });

  var stream = client.stream(opts);
  var Reporter = require('./lib/' + opts.reporter);
  var reporter = new Reporter(stream, opts);
  return stream;
};


