
var express = require('express')
var app = express()


var Canvas = require('canvas')
  , Image = Canvas.Image
const IdentiHeart = require('./IdentiHeart');

function generateIdenticon(key) {

  var canvas = new Canvas(240, 240)
    , ctx = canvas.getContext('2d');



  var h = new IdentiHeart(canvas, ctx, 0, 10);
  h.setUsername(key);
  h.setHasStroke(true);
  h.setStrokeWeight(100);
  h.setStrokeColor('#000000');
  h.setCompositeOperation('multiply');
  h.init();
  h.draw();


  return canvas.pngStream();

}

var fs = require('fs')



app.get('/:key', function (req, res) {

  var stream = generateIdenticon(req.params.key)

  stream.on('data', function(chunk){
    res.write(chunk);
  });

  stream.on('end', function(){
    res.end();
  });

})

app.listen(3001)
