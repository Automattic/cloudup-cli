#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Cloudup = require('cloudup-client')
  , sprintf = require('printf')
  , path = require('path')
  , basename = path.basename;

/**
 * Cloudup remote.
 */

var remote = process.env.CLOUDUP_REMOTE || 'https://cloudup.com';

/**
 * Cloudup client.
 */

var client = new Cloudup({
  url: remote,
  user: process.env.CLOUDUP_USER,
  pass: process.env.CLOUDUP_PASS
});

/**
 * Item progress row index.
 */

var y = 0;

/**
 * Upload collection.
 *
 * @param {Object} options
 * @return {Collection}
 * @api public
 */

exports.collection = function(options){
  var col = client.collection(options);

  // track progress
  progress(col);

  // setup
  console.log();
  clear();
  hideCursor();

  // done
  col.on('end', function(){
    move(0, 2 + y);
    log('collection', remote + '/' + col.uid);
    console.log();
  });

  return col;
};

/**
 * Track progress.
 */

function progress(col) {
  col.on('item', function(item){
    var cy = y++;

    function ctx() {
      return truncate(item._file
        ? basename(item._file)
        : item._url);
    }

    process.nextTick(function(){
      move(0, 2 + cy);
      log(ctx(), '0%');
    });

    item.on('progress', function(e){
      var n = e.percent | 0;
      move(0, 2 + cy);
      log(ctx(), n + '%');
    });

    item.on('end', function(){
      move(0, 2 + cy);
      log(ctx(), remote + '/' + col.uid + '/' + item.uid);
    });
  });
}

// restore

process.on('exit', showCursor);
process.on('SIGINT', showCursor);
process.on('SIGINT', clear);
process.on('SIGINT', process.exit.bind(null, 1));

/**
 * Clear the term.
 */

function clear() {
  process.stdout.write('\033[0m\033[1J');
  process.stdout.write('\033[J');
}

/**
 * Hide the cursor.
 */

function hideCursor(){
  process.stdout.write('\033[?25l');
}

/**
 * Show the cursor.
 */

function showCursor(){
  process.stdout.write('\033[?25h');
}

/**
 * Move to (x, y).
 */

function move(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  process.stdout.write('\033[' + y + ';' + x + 'H');
}

/**
 * Truncate `str`.
 */

function truncate(str) {
  var w = 20;
  if (str.length < w) return str;
  return str.slice(0, w) + '…';
}

/**
 * Log `key` / `str`.
 */

function log(key, str) {
  process.stdout.write(sprintf('\033[36m%25s\033[0m : \033[90m%s\033[m\n', key, str));
}

