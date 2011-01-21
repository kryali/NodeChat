var jade = require('jade')

var express = require('express')
var app = module.exports = express.createServer();
var io = require('socket.io'); 

_env = "Hello World"
title = "NodeChat"
messages = []

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure( function(){
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('development', function(){
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.listen(8080);
io = io.listen(app);
var buffer = [];
io.on('connection', function(client){
  client.send({ buffer: buffer });
  client.broadcast({ announcement: client.sessionId + ' connected' });

  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
  });

  client.on('disconnect', function(){
    client.broadcast({ announcement: client.sessionId + ' disconnected' });
  });
});

//ROUTES

app.get('/', function(req,res){
//res.send(_env);
	res.render('index', {
	locals:{
		title: 'Hello World'
	  }
	});
});



/*
app.post('/send', function(req, res){
	messages.push(req.body.message);
	res.writeHead(302, { 'Location' : '/' });
	res.end();
});

app.get('/user/:id', function(req,res){
	id = req.params.id;
	if(id){
		res.send("Welcome user: " + id);
	} else {
		next();
	}
});

app.get('*', function(req,res){
	res.send("Woops, 404 dawg");
});

*/
