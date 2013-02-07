
/**
 * Module dependencies.
 */

var Canvas = require('term-canvas')
  , GridView = require('./grid')
  , size = process.stdout.getWindowSize();

/**
 * Return a GridView.
 */

exports.view = function(){
  var canvas = new Canvas(size[0], size[1]);
  var ctx = canvas.getContext('2d');
  var view = new GridView(ctx);

  // ctx.hideCursor();
  view.size(canvas.width, canvas.height);

  process.on('SIGINT', function(){
    ctx.reset();
    process.nextTick(function(){
      process.exit();
    });
  });

  return view;
};
