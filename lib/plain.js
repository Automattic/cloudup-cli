
/**
 * Expose `PlainReporter`.
 */

module.exports = PlainReporter;

/**
 * Initialize a new `PlainReporter` reporter.
 *
 * @param {Stream} stream
 * @param {Object} options
 * @api public
 */

function PlainReporter(stream, options) {
  stream.on('end', function(){
    console.log(stream.url);
  });
}
