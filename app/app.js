var express = require('express')
, http = require('http')
, app = express()
, server = http.Server(app)
, io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

function action(data) {
	var px = data.player.x
	, py = data.player.y
	, tx = data.target.x
	, ty = data.target.y
	, x = Math.round(Math.random()*600)
	, y = Math.round(Math.random()*600);
	if ( tx <= (px + 50) && ty <= (py + 50) ) {
		return {x: y, y: x};
	} else {
		return {x: ty, y: tx};
	}

}

io.on('connection', function(socket) {
	console.log("Client " + socket.id + " has connected");
	socket.on('moving', function(data) {
		console.log(data);
		io.emit('react', action(data));
	});
	socket.on('disconnect', function() {
		console.log("Client " + socket.id + " has disconnected");
	})
});

module.exports = server;
