
/**
 * Module dependencies.
 */

var max = require('max-component');

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
 * Compute the max width.
 *
 * @return {Number}
 * @api private
 */

GridView.prototype.maxWidth = function(){
  return max(this.items, function(item){
    return item.name.length;
  });
};

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
  var max = this.maxWidth();
  var w = this.w;
  var h = this.h;
  var x = 4;
  var y = 3;

  this.items.forEach(function(item){
    if (x + max > w - 5) { y += 3; x = 4; }
    var name = item.name;
    ctx.moveTo(x, y);
    ctx.write(name);
    ctx.moveTo(x, y + 1);
    x += max + 6;
  });
  ctx.write('\n\n');
};

