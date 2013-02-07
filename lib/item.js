
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;

module.exports = Item;

function Item(options) {
  this.name = options.name;
  this.progress = 1;
}

/**
 * Inherit from `Emitter.prototype`.
 */

Item.prototype.__proto__ = Emitter.prototype;
