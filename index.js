#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Cloudup = require('cloudup-client');
var pkg = require('./package');

/**
 * Create a client with `opts`.
 *
 * @param {Object} opts
 * @return {Cloudup}
 * @api private
 */

exports.client = function(opts){
  opts = opts || {};
  opts.useragent = ' up/' + pkg.version;
  opts.url = opts.remote || 'https://api.cloudup.com';
  return new Cloudup(opts);
};

/**
 * Upload stream.
 *
 * @param {Object} opts
 * @return {Stream}
 * @api private
 */

exports.stream = function(opts){
  opts = opts || {};
  var client = exports.client(opts);
  var stream = client.stream(opts);
  var Reporter = require('./lib/' + opts.reporter);
  var reporter = new Reporter(stream, opts);
  return stream;
};