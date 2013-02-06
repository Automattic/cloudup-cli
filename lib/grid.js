
/**
 * Expose `ItemView`.
 */

exports = module.exports = ItemView;

/**
 * Initialize a grid view.
 *
 * @api public
 */

function ItemView() {
  this.items = [];
}

/**
 * Size to `w` / `h`.
 *
 * @param {Number} w
 * @param {Number} h
 * @return {ItemView} self
 * @api public
 */

ItemView.prototype.size = function(w, h){
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

ItemView.prototype.add = function(item){
  return this.items.push(item);
};

/**
 * Render to `ctx`.
 *
 * @api public
 */

ItemView.prototype.draw = function(ctx){
  var self = this;
  var max = 'http://local.cloudup.com/jgKpTRh0mTXolUpSAAAe#1'.length;
  var w = this.w;
  var h = this.h;
  var x = 4;
  var y = 3;

  this.items.forEach(function(item){
    if (x + max > w - 5) { y += 3; x = 4; }
    var name = item.name;
    ctx.moveTo(x, y);
    ctx.write('\033[36m' + name + '\033[m');
    ctx.moveTo(x, y + 1);
    ctx.write('http://i.cloudup.com/GbCiyyUqZMb8hc6.png');
    ctx.moveTo(x, y + 1);
    x += max + 6;
  });
  ctx.write('\n\n');
};

