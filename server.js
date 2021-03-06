/*
 * audio example
 */
var koa = require('koa');
var send = require('koa-send');
var serve = require('koa-static');
var router = require('koa-router')();

var app = koa();

// Static Middleware
app.use(serve('public'));

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/demo', function *(next) {
  var action = this.query.action || '';
  switch(action) {
  	case 'audio_play':
  	yield send(this, __dirname + '/views/audio_play.html');
  	break;
  	case 'audio_touch':
  	yield send(this, __dirname + '/views/audio_touch.html');
  	break;
  	case 'video':
  	yield send(this, __dirname + '/views/video.html');
  	break;
    default:
    	yield send(this, __dirname + '/views/demo.html');
  }
});

app.use(router.routes())

app.listen(3011);
