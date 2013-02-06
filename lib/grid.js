
/**
 * Expose `GridView`.
 */

exports = module.exports = GridView;

/**
 * Initialize a grid view.
 *
 * @api public
 */

function GridView() {
  this.items = [];
}

/**
 * Size to `w` / `h`.
 *
 * @param {Number} w
 * @param {Number} h
 * @return {GridView} self
 * @api public
 */

GridView.prototype.size = function(w, h){
  this.w = w;
  this.h = h;
  return this;
};

/**
 * Add `item`.
 *
 * @param {Item} item
 * @return {Number}
 * @api public
 */

GridView.prototype.add = function(item){
  return this.items.push(item);
};

/**
 * Render to `ctx`.
 *
 * @api public
 */

GridView.prototype.draw = function(ctx){
  var self = this;
  var max = this.max;
  var w = this.w;
  var h = this.h;
  var x = 4;
  var y = 3;

  // this.browsers.forEach(function(browser){
  //   if (x + max > w - 5) { y += 3; x = 4; }
  //   var sym = self.symbolFor(browser);
  //   var color = self.colorFor(browser);
  //   var name = browser.browserName;
  //   var version = browser.version;
  //   var platform = browser.platform;
  //   var label = name + ' ' + version;
  //   var pad = Array(max - label.length).join(' ');
  //   var ppad = Array(max - platform.length + 2).join(' ');
  //   ctx.moveTo(x, y);
  //   ctx.write(label + pad);
  //   ctx.write(' \033[' + color + 'm' + sym + '\033[0m');
  //   ctx.moveTo(x, y + 1);
  //   ctx.write('\033[90m' + platform + ppad + '\033[0m');
  //   x += max + 6;
  // });
  // ctx.write('\n\n');
};

