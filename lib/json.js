#!/usr/bin/env node

/**
 * Expose `JSONReporter`.
 */

module.exports = JSONReporter;

/**
 * Initialize a new `JSONReporter` reporter.
 *
 * @param {Collection} col
 * @param {Object} options
 * @api public
 */

function JSONReporter(col, options) {
  this.col = col;
  this.remote = options.remote;
  col.on('end', function(){
    console.log(JSON.stringify(col));
  });
}
