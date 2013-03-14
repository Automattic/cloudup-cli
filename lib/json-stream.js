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
 * @param {Collection} col
 * @param {Object} options
 * @api public
 */

function JSONStream(col, options) {
  this.col = col;
  var remote = options.remote;

  write('[\n');

  col.on('save', function(){
    var json = col.toJSON();
    delete json.items;
    json.url = remote + '/' + col.uid;
    write('  ["%s", %j],\n', 'collection saved', json);
  });

  col.on('item', function(item){
    item.on('progress', function(e){
      e.percent |= 0;
      write('  ["%s", %j],\n', 'item progress', e);
    });

    item.on('end', function(){
      var json = item.toJSON();
      item.url = remote + '/' + col.uid + '/' + item.uid;
      write('  ["%s", %j],\n', 'item saved', json);
    });
  });

  col.on('end', function(){
    write('  ["%s"],\n', 'end');
    write('\n]');
  });
}

/**
 * Write util.
 */

function write(str) {
  process.stdout.write(sprintf.apply(null, arguments));
}
