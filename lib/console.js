
/**
 * Module dependencies.
 */

var sprintf = require('printf');
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
 * @param {Stream} stream
 * @param {Object} options
 * @api public
 */

function Console(stream, options) {
  this.y = 0;
  this.stream = stream;
  this.direct = options.direct;
  stream.on('item', this.progress.bind(this));
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
  var stream = this.stream;

  if (isatty) {
    process.nextTick(function(){
      move(0, 2 + y);
      log(ctx(item), '0%');
    });

    item.on('progress', function(e){
      var n = e.percent | 0;
      move(0, 2 + y);
      log(ctx(item), n + '%');
    });
  }

  item.on('end', function(){
    move(0, 2 + y);

    if (direct) {
      log(ctx(item), item.remote_url);
    } else {
      log(ctx(item), item.url);
    }
  });
};

/**
 * Output collection link on save.
 *
 * @api private
 */

Console.prototype.onsave = function(){
  move(0, 2 + this.y);
  log('stream', this.stream.url);
};

/**
 * Add padding on end.
 *
 * @api private
 */

Console.prototype.onend = function(){
  move(0, 3 + this.y);
  if (isatty) console.log();
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
  if (!isatty) return;
  process.stdout.write('\033[0m\033[1J');
  process.stdout.write('\033[J');
}

/**
 * Hide the cursor.
 */

function hideCursor(){
  if (!isatty) return;
  process.stdout.write('\033[?25l');
}

/**
 * Show the cursor.
 */

function showCursor(){
  if (!isatty) return;
  process.stdout.write('\033[?25h');
}

/**
 * Move to (x, y).
 */

function move(x, y) {
  if (!isatty) return;
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
  if (isatty) {
    process.stdout.write(sprintf('\033[36m%25s\033[0m : \033[90m%s\033[m\n', key, str));
  } else {
    process.stdout.write(sprintf('%s : %s\n', key, str));
  }
}

/**
 * Context string for `item`.
 */

function ctx(item) {
  return truncate(item._file
    ? basename(item.filename || item._file)
    : item._url);
}
