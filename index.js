
var express = require('express')
var app = express()

var fs = require('fs')

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




app.get('/:key', function (req, res) {

  var stream = generateIdenticon(req.params.key)

  const fd = fs.openSync('../clap-photos/public/profilePic/'+req.params.key+'.png', 'w');

  stream.on('data', function(chunk){
    res.write(chunk);
    fs.writeSync(fd, chunk, 0, chunk.length);
  });

  stream.on('end', function(){
    res.end();
    fs.close(fd);
  });

})

app.listen(3001)
