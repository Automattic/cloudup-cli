
/**
 * Expose `JSONReporter`.
 */

module.exports = JSONReporter;

/**
 * Initialize a new `JSONReporter` reporter.
 *
 * @param {Stream} stream
 * @param {Object} options
 * @api public
 */

function JSONReporter(stream, options) {
  stream.on('end', function(){
    console.log(JSON.stringify(stream, null, 2));
  });
}
