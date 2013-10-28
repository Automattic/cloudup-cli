
/**
 * Module dependencies.
 */

var ansi = require('ansi');
var sprintf = require('printf');
var sum = require('sum-component');
var path = require('path');
var basename = path.basename;
var isatty = process.stdout.isTTY;

/**
 * Expose `Console`.
 */

module.exports = Console;

/**
 * Initialize a new `Console` reporter.
 *
 * - `direct` show direct links
 * - `progressOnly` show aggregate progress only
 *
 * @param {Stream} stream
 * @param {Object} options
 * @api public
 */

function Console(stream, options) {
  this.y = 0;
  this.items = [];
  this.cursor = ansi(process.stdout);
  this.stream = stream;
  this.direct = options.direct;
  this.progressOnly = options.progressOnly;
  if (this.progressOnly) stream.on('item', this.aggregate.bind(this));
  else stream.on('item', this.progress.bind(this));
  stream.on('save', this.onsave.bind(this));
  stream.on('end', this.onend.bind(this));
  this.setup();
}

/**
 * Setup.
 *
 * @api private
 */

Console.prototype.setup = function(){
  if (isatty) console.log();
  this.cursor.eraseData(2);
  this.cursor.goto(0, 0);
  this.cursor.hide();
  var showCursor = this.cursor.show.bind(this.cursor);
  process.on('uncaughtException', showCursor);
  process.on('uncaughtException', fatal);
  process.on('exit', showCursor);
  process.on('SIGINT', showCursor);
  process.on('SIGINT', process.exit.bind(null, 1));
};

/**
 * Item aggregate progress.
 *
 * @api private
 */

Console.prototype.aggregate = function(item){
  var self = this;
  this.items.push(item);
  item.progress = 0;
  item.on('progress', function(e){
    item.progress = e.percent;
    self.update();
  });
};

/**
 * Update aggregate progress. 
 *
 * @api private
 */

Console.prototype.update = function(){
  var len = this.items.length;
  var percent = sum(this.items, 'progress') / len | 0;
  this.cursor.goto(0, 3);
  this.log(len + ' items', percent + '%');
};

/**
 * Item progress reporting.
 *
 * @api private
 */

Console.prototype.progress = function(item){
  var y = this.y++;
  var self = this;
  var direct = this.direct;
  var stream = this.stream;
  var cursor = this.cursor;

  if (isatty) {
    process.nextTick(function(){
      cursor.goto(0, 2 + y);
      self.log(ctx(item), '0%');
    });

    item.on('progress', function(e){
      var n = e.percent | 0;
      cursor.goto(0, 2 + y);
      self.log(ctx(item), n + '%');
    });
  }

  item.on('end', function(){
    cursor.goto(0, 2 + y);

    if (direct) {
      self.log(ctx(item), item.direct_url);
    } else {
      self.log(ctx(item), item.url);
    }
  });
};

/**
 * Output collection link on save.
 *
 * @api private
 */

Console.prototype.onsave = function(){
  this.cursor.goto(0, 2 + this.y);
  this.log('stream', this.stream.url);
};

/**
 * Add padding on end.
 *
 * @api private
 */

Console.prototype.onend = function(){
  this.cursor.goto(0, 3 + this.y);
  if (isatty) console.log();
};

/**
 * Log `key` / `str`.
 */

Console.prototype.log = function log(key, str) {
  this.cursor
    .fg.cyan()
    .write(sprintf('%25s', key))
    .fg.reset()
    .write(' : ')
    .fg.brightBlack()
    .write(str)
    .fg.reset()
    .write('\n');
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
 * Truncate `str`.
 */

function truncate(str) {
  var w = 20;
  if (str.length < w) return str;
  return str.slice(0, w) + '…';
}

/**
 * Context string for `item`.
 */

function ctx(item) {
  return truncate(item._file ?
    basename(item.filename || item._file) :
    item._url);
}
