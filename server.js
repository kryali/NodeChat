express = require('express')
app = express.createServer();

_env = "Hello World"

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyDecoder());
	app.use(app.router);
	app.use(express.staticProvider(__dirname + '/public'));
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
	res.send(_env);
});

app.listen(3000);
