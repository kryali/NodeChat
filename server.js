express = require('express')
jade = require('jade')

app = express.createServer();

_env = "Hello World"
title = "NodeChat"
messages = []

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyDecoder());
	app.use(app.router);
	app.use(express.staticProvider(__dirname + '/public'));
	app.set('view engine', 'jade');
})

app.configure( function(){
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	_env = "You are in the anything environment"
});

app.configure('development', function(){
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	_env = "You are in the development environment"
});


app.get('/', function(req,res){
//res.send(_env);
	res.render('index');
});

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

app.listen(3000);
