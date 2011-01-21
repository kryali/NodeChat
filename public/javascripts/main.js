function message(obj){
	var el = document.createElement('p');
	if( 'announcement' in obj ) el.innerHTML = "<em>" + obj.announcement + "</em>";
	else if ('message' in obj) el.innerHTML = "<strong>" + obj.message[0] + ":</strong> " + obj.message[1];
	document.getElementById('chat').appendChild(el);
	document.getElementById('chat').scrollTop = 100000;
}

function send(){
	var val = document.getElementById('text').value;
	socket.send(val);
	message({ message: ['you', val] });
	document.getElementById('text').value = '';
}

var socket = new io.Socket(null, {port: 8080, rememberTransport: false});
socket.connect();
socket.on('message', function(obj){
	if ('buffer' in obj){
		document.getElementById('form').style.display='block';
		document.getElementById('chat').innerHTML='';

		for (var i in obj.buffer) message(obj.buffer[i]);
	} else message(obj);
});
