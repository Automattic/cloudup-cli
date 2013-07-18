
/**
 * Module dependencies.
 */

var sprintf = require('util').format;

/**
 * Expose `JSONStream`.
 */

module.exports = JSONStream;

/**
 * Initialize a new `JSONStream` reporter.
 *
 * @param {Stream} stream
 * @param {Object} options
 * @api public
 */

function JSONStream(stream, options) {
  write('[\n');

  stream.on('save', function(){
    var json = stream.toJSON();
    delete json.items;
    write('  ["%s", %j],\n', 'stream saved', json);
  });

  stream.on('item', function(item){
    item.on('save', function(){
      write('  ["%s", %j],\n', 'item saved', item);
    });

    item.on('progress', function(e){
      e.id = item.id;
      e.percent |= 0;
      write('  ["%s", %j],\n', 'item progress', e);
    });

    item.on('end', function(){
      var json = item.toJSON();
      write('  ["%s", %j],\n', 'item uploaded', json);
    });
  });

  stream.on('end', function(){
    write('  ["%s"]', 'end');
    write('\n]');
  });
}

/**
 * Write util.
 */

function write(str) {
  process.stdout.write(sprintf.apply(null, arguments));
}
