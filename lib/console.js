
/**
 * Module dependencies.
 */

var ansi = require('ansi');
var path = require('path');
var sprintf = require('printf');
var sum = require('sum-component');
var basename = path.basename;

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
  this.newlines = 0;
  this.items = [];
  this.cursor = ansi(process.stdout);
  this.stream = stream;
  this.direct = options.direct;
  this.progressOnly = options.progressOnly;

  // bind event listeners to `this`
  this.onitem = this.onitem.bind(this);
  this.onsave = this.onsave.bind(this);
  this.onend = this.onend.bind(this);

  // attach event listeners to `stream`
  stream.on('item', this.onitem);
  stream.on('save', this.onsave);
  stream.on('end', this.onend);

  // setup the cursor and global event listeners
  this.cursor.hide();
  var self = this;
  function showCursor(){
    self.cursor.show();
  }
  process.on('uncaughtException', showCursor);
  process.on('uncaughtException', fatal);
  process.on('exit', showCursor);
  process.on('SIGINT', showCursor);
  process.on('SIGINT', process.exit.bind(null, 1));
}

/**
 * Stream "item" event listener.
 *
 * @api private
 */

Console.prototype.onitem = function(item){
  this.items.push(item);
  if (this.progressOnly) {
    this.aggregate(item);
  } else {
    this.progress(item);
  }
};

/**
 * Item aggregate progress.
 *
 * @api private
 */

Console.prototype.aggregate = function(item){
  var self = this;
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
  this.log(0, len + ' items', percent + '%');
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
  var cursor = this.cursor;

  function onprogress(e){
    var n = e.percent | 0;
    self.log(y, ctx(item), n + '%');
  }

  function onend(){
    var url = direct ? item.direct_url : item.url;
    self.log(y, ctx(item), url);
  }

  if (cursor.enabled) {
    process.nextTick(function(){
      // fire off a fake 0% event so that the line gets rendered
      item.emit('progress', 0);
    });

    item.on('progress', onprogress);
  }

  item.on('end', onend);
};

/**
 * Output collection link on save.
 *
 * @api private
 */

Console.prototype.onsave = function(){
  var y = this.progressOnly ? 1 : this.items.length;
  this.log(y, 'stream', this.stream.url);
};

/**
 * Stream "end" event listener.
 * Doesn't actually need to do anything...
 *
 * @api private
 */

Console.prototype.onend = function(){
  // no-op
  //var y = this.progressOnly ? 2 : this.items.length + 1;
  //this.log(y, 'that\'s all', 'folks!');
};

/**
 * Log `key` / `str` on the relative line index `y` (starts at 0).
 *
 * @param {Number} y
 * @param {String} key
 * @param {String} str
 * @api private
 */

Console.prototype.log = function(y, key, str){

  var up = 0;
  var moved = false;
  if (this.cursor.enabled) {
    // first ensure that we've at least written `y` newlines by now
    while (this.newlines < y) {
      this.cursor.write('\n');
      this.newlines++;
    }

    // at this point, we may need to move the cursor up one or more
    // rows in order to be on the correct `y` line before writing
    up = this.newlines - y;
    moved = false;
    if (up > 0) {
      moved = true;
      this.cursor.up(up);
    }
  }

  // now that we know we're on the correct `y` line, output the text
  this.cursor
    .fg.cyan()
    .write(sprintf('%25s', key))
    .fg.reset()
    .write(' : ')
    .fg.brightBlack()
    .write(str)
    .fg.reset()
    .write('\n');

  if (this.cursor.enabled) {
    up--; // subtract from `up` since we just output a \n
    if (up > 0) {
      this.cursor.down(up);
    }
    if (!moved) {
      // if we didn't call `cursor.up()` before, then we can increment the \n count
      this.newlines++;
    }
  }
};

/**
 * Fatal error.
 */

function fatal(err) {
  console.error(err.stack.replace(/^/gm, '  '));
  process.exit(1);
}

/**
 * Truncate `str`.
 */

function truncate(str, width) {
  if (null == width) width = 20;
  if (str.length < width) return str;
  return str.slice(0, width) + '…';
}

/**
 * Context string for `item`.
 */

function ctx(item) {
  return truncate(item._file ?
    basename(item.filename || item._file) :
    item._url);
}
