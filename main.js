;/**
 * Created by sarcoma on 24/04/17.
 */
var SoundCloudAudioSource = function (audioElement) {
        var player = document.getElementById(audioElement);
        var self = this;
        var analyser;
        var audioCtx = new (window.AudioContext || window.webkitAudioContext); // this is because it's not been standardised across browsers yet.
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256; // see - there is that 'fft' thing.
        var source = audioCtx.createMediaElementSource(player); // this is where we hook up the <audio> element
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        var sampleAudioStream = function () {
            // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
            // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and
            // continue to give real-time data on the audio stream.
            analyser.getByteFrequencyData(self.streamData);
            // calculate an overall volume value
            var total = 0;
            for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
                total += self.streamData[i];
            }
            self.volume = total;
        };
        setInterval(sampleAudioStream, 20); //
        // public properties and methods
        this.volume = 0;
        this.streamData = new Uint8Array(128); // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255.
        this.playStream = function (streamUrl) {
            // get the input stream from the audio element
            player.setAttribute('src', streamUrl);
            player.play();
        }
    };

var audioSource = new SoundCloudAudioSource('player');
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

var
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    particles = [],
    removal = [],
    spacer = 0;

var draw = function () {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#164450";
    context.fillRect(0, 0, width, height);

    var i = 1;
    if (spacer % 4 == 0) {
        for (bin = 0; bin < audioSource.streamData.length; bin += 6) {
            var val = audioSource.streamData[bin];
            var velocity = val / 255 * 16;
            particles.push(particle.create(i * width / 24, height, velocity, Math.PI * 1.58, 0.1, 0.008));
            i++;
        }
    }
    spacer++;
    for (var j = 0; j < particles.length; j += 1) {
        removal = [];
        p = particles[j];
        p.update();


        context.fillStyle = "rgba(0, 212, 85, " + p.opacity + ")";
        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), 24, 0, Math.PI * 2, false);
        context.fill();

        if (p.position.getY() > height || p.opacity <= 0) {
            removal.push(j)
        }
    }

    for (var k = 0; j < removal.length; k++) {
        particles.pop(k);
    }

    // you can then access all the frequency and volume data
    // and use it to draw whatever you like on your canvas
    // for (bin = 0; bin < audioSource.streamData.length; bin++) {
    //     // do something with each value. Here's a simple example
    //     var val = audioSource.streamData[bin];
    //     var red = val;
    //     var green = 255 - val;
    //     var blue = val / 2;
    //     context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    //     context.fillRect(bin * 2, 0, 2, 200);
    //     // use lines and shapes to draw to the canvas is various ways. Use your imagination!
    // }
    requestAnimationFrame(draw);
};

audioSource.playStream('Rodrigo_Y_Gabriela_-_Hanuman_Live__KEXP.mp3');
draw();