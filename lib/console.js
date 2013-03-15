#!/usr/bin/env node

/**
 * Module dependencies.
 */

var sprintf = require('printf')
  , path = require('path')
  , basename = path.basename;

/**
 * Expose `Console`.
 */

module.exports = Console;

/**
 * Initialize a new `Console` reporter.
 *
 * @param {Collection} col
 * @param {Object} options
 * @api public
 */

function Console(col, options) {
  this.y = 0;
  this.col = col;
  this.remote = options.remote;
  this.direct = options.direct;
  this.setup();
  col.on('item', this.progress.bind(this));
  col.on('save', this.onsave.bind(this));
  col.on('end', this.onend.bind(this));
}

/**
 * Setup.
 *
 * @api private
 */

Console.prototype.setup = function(){
  console.log();
  clear();
  hideCursor();
  process.on('uncaughtException', showCursor);
  process.on('uncaughtException', fatal);
  process.on('exit', showCursor);
  process.on('SIGINT', showCursor);
  process.on('SIGINT', clear);
  process.on('SIGINT', process.exit.bind(null, 1));
};

/**
 * Item progress reporting.
 *
 * @api public
 */

Console.prototype.progress = function(item){
  var y = this.y++;
  var direct = this.direct;
  var remote = this.remote;
  var col = this.col;

  function ctx() {
    return truncate(item._file
      ? basename(item.filename || item._file)
      : item._url);
  }

  process.nextTick(function(){
    move(0, 2 + y);
    log(ctx(), '0%');
  });

  item.on('progress', function(e){
    var n = e.percent | 0;
    move(0, 2 + y);
    log(ctx(), n + '%');
  });

  item.on('end', function(){
    move(0, 2 + y);

    if (direct) {
      log(ctx(), 'http://i.cloudup.com/' + item.remote);
      return;
    }

    log(ctx(), remote + '/' + col.uid + '/' + item.uid);
  });
};

/**
 * Output collection link on save.
 *
 * @api private
 */

Console.prototype.onsave = function(){
  move(0, 2 + this.y);
  log('collection', this.remote + '/' + this.col.uid);
};

/**
 * Add padding on end.
 *
 * @api private
 */

Console.prototype.onend = function(){
  move(0, 3 + this.y);
  console.log();
};

/**
 * Fatal error.
 */

function fatal(err) {
  console.log();
  console.error(err.stack.replace(/^/gm, '  '));
  console.log();
  process.exit(1);
}

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

