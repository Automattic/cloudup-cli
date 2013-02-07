
/**
 * Module dependencies.
 */

var Canvas = require('term-canvas')
  , GridView = require('./grid')
  , size = process.stdout.getWindowSize();

/**
 * Expose the view.
 */

var view = module.exports = new GridView;

// setup

var canvas = new Canvas(size[0], size[1]);
var ctx = canvas.getContext('2d');

// size

ctx.hideCursor();
view.size(canvas.width, canvas.height);

// reset on SIGINT

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

ctx.showCursor();
