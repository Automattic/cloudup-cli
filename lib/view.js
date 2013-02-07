
/**
 * Expose `ItemView`.
 */

exports = module.exports = ItemView;

/**
 * Initialize a grid view.
 *
 * @api public
 */

function ItemView(ctx) {
  this.ctx = ctx;
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
  // TODO: add ItemView, change this to CollectionView
  item.on('progress', this.draw.bind(this));
  item.on('state', this.draw.bind(this));
  return this.items.push(item);
};

/**
 * Render to `ctx`.
 *
 * @api public
 */

ItemView.prototype.draw = function(){
  var self = this;
  var ctx = this.ctx;
  var max = 'http://local.cloudup.com/jgKpTRh0mTXolUpSAAAe#1'.length;
  var w = this.w;
  var h = this.h;
  var x = 4;
  var y = 3;

  this.items.forEach(function(item){
    var name = item.name;
    ctx.moveTo(x, y);
    ctx.write('\033[36m' + name + '\033[m');
    ctx.moveTo(x, y + 1);
    if ('complete' == item.state) {
      ctx.write('\033[90m' + item.url + '\033[0m');
    } else {
      var w = (max - 2) * (item.progress / 100) | 0;
      var bar = Array(w).join('░');
      var pad = Array(max - w).join(' ');
      ctx.write('\033[90m⎟' + bar + pad + '⎢\033[0m');
    }
    ctx.moveTo(x, y + 1);
    y += 3;
  });
  ctx.write('\n\n');
};

