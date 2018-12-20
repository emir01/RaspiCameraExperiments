const PiMotion = require('node-pi-motion');
const PiCamera = require('pi-camera');

var options = {
    verbose: false,
    throttle: 200
}

var nodePiMotion = new PiMotion(options);

var recording = false;
var motionIndex = 0;

nodePiMotion.on('DetectedMotion', function () {
    if (!recording) {
        console.log("Motion Has been detected! RECORDING");
        var name = `${__dirname}/capture${motionIndex}.h264`;
        
        motionIndex++;

        const myCamera = new PiCamera({
            mode: 'video',
            output: name,
            width: 1920,
            height: 1080,
            timeout: 5000, // Record for 5 seconds
            nopreview: true,
        });

        myCamera.record()
            .then((result) => {
                recording = false;
            })
            .catch((error) => {
                recording = false;
            });
    }
    else{
        console.log("Motion Has been detected! ALREADY RECORDING");
        return false;
    }
});