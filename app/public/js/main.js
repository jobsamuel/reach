angular.module('main', [])

.controller('mainCtrl', ['$scope', function($scope) {
	
	var space = document.getElementById('arena')
	, height = space.offsetHeight
	, width = space.offsetWidth
	, socket = io.connect('http://localhost:3000')
	, counter = 0;

	$scope.message = "Just try to reach the square.";
	$scope.cx = 0;
	$scope.cy = 0;
	$scope.px = 0;
	$scope.py = 0;
	$scope.moving = function(event) {
		counter++;
		var target = $('.target')
		, p = target.position()
		, x = event.offsetX
		, y = event.offsetY
		, t = new Date(event.timeStamp)
		, movement = { 
			counter: counter,
			time: t,
			player: {
				x: x,
				y: y
			},
			target: {
				x: p.left,
				y: p.top
			} 
		};

		// Display position.
		$scope.px = x;
		$scope.py = y;

		// Talk to the server.
		socket.emit('moving', movement);
	}

	// Listen to the server.
	socket.on('react', function(data) {

		// Change target position.
		$('.target').css({top: data.x, left: data.y });

		// Display position.
		$scope.cx = data.y;
		$scope.cy = data.x;
	});

}]);