var RaspiCam = require("raspicam");
var spawn = require('child_process').spawn;

var camera = new RaspiCam({
	mode: "photo",
	output: "../data/image.jpg",
	encoding: "jpg",
	w: 320,
	h: 240,
	timeout: 0 // take the picture immediately
});

camera.on("start", function( err, timestamp ){
	console.log("photo started at " + timestamp );
});

camera.on("read", function( err, timestamp, filename ){
	console.log("photo image captured with filename: " + filename );
	spawn("fbi", ["-d", "/dev/fb1", "-T", "1", "-noverbose", "-a", "../data/image.jpg"]);
	camera.stop();
});

camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
});

camera.start();
