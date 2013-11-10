#!/usr/bin/env node

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var osenv = require('osenv');
var Cloudup = require('cloudup-client');
var pkg = require('./package');

/**
 * Configuration path.
 */

exports.configPath = path.resolve(osenv.home(), '.cloudup.json');

/**
 * Create a client with `opts`.
 *
 * @param {Object} opts
 * @return {Cloudup}
 * @api private
 */

exports.client = function(opts){
  opts = opts || {};
  opts.useragent = ' cloudup-cli/' + pkg.version;
  if (process.env.UP_API_URL) opts.url = process.env.UP_API_URL;
  if (process.env.UP_CLOUDUP_URL) opts.cloudupUrl = process.env.UP_CLOUDUP_URL;
  return new Cloudup(opts);
};

/**
 * Read config.
 *
 * @return {Object}
 * @api public
 */

exports.readConfig = function(){
  var json, obj;

  // read
  try {
    json = fs.readFileSync(exports.configPath, 'utf8');
  } catch (err) {
    console.error('\n  Failed to load configuration.');
    console.error('  Execute: `up config` to get started!\n');
    process.exit(1);
  }

  // parse
  try {
    obj = JSON.parse(json);
  } catch (err) {
    console.error('\n  Failed to parse ' + exports.configPath + '\n');
    process.exit(1);
  }

  // validate
  if (!(obj.user && obj.token)) {
    console.error('\n  Auth token missing.');
    console.error('  Execute: `up config` to get a token!\n');
    process.exit(1);
  }

  return obj;
};

/**
 * Save config `obj`.
 *
 * @param {Object} obj
 * @api public
 */

exports.saveConfig = function(obj){
  var json = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(exports.configPath, json);
};
