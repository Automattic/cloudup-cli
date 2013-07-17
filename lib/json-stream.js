#!/usr/bin/env node

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
  this.stream = stream;
  var remote = options.remote;

  write('[\n');

  stream.on('save', function(){
    var json = stream.toJSON();
    delete json.items;
    json.url = remote + '/' + stream.id;
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
      item.url = remote + '/' + stream.id + '/' + item.id;
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
