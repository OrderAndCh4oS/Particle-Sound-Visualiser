;/**
 * Created by sarcoma on 24/04/17.
 */

var sprayFade = function () {

        var audioSource = new AudioSource('player'),
            canvas = document.getElementById('canvas'),
            context = canvas.getContext("2d"),
            width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight,
            particles = [],
            removal = [],
            spacer = 0;

        var update = function () {
            context.clearRect(0, 0, width, height);
            context.fillStyle = "#164450";
            context.fillRect(0, 0, width, height);

            var i = 1;
            if (spacer % 4 == 0) {
                for (bin = 0; bin < audioSource.streamData.length; bin += 6) {
                    var val = audioSource.streamData[bin];
                    var velocity = val / 255 * 16;
                    particles.push(particle.create(i * width / 24, height, velocity, Math.PI * 1.58, 0.1, 24, 0.008));
                    i++;
                }
            }
            spacer++;
            for (var j = 0; j < particles.length; j += 1) {
                removal = [];
                p = particles[j];
                p.update();

                context.fillStyle = "rgba(0, 212, 85, " + p.getOpacity() + ")";
                context.beginPath();
                context.arc(p.position.getX(), p.position.getY(), p.getRadius(), 0, Math.PI * 2, false);
                context.fill();

            }

            removeDeadParticles(particles, width, height);

            // you can then access all the frequency and volume data
            // and use it to update whatever you like on your canvas
            // for (bin = 0; bin < audioSource.streamData.length; bin++) {
            //     // do something with each value. Here's a simple example
            //     var val = audioSource.streamData[bin];
            //     var red = val;
            //     var green = 255 - val;
            //     var blue = val / 2;
            //     context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
            //     context.fillRect(bin * 2, 0, 2, 200);
            //     // use lines and shapes to update to the canvas is various ways. Use your imagination!
            // }
            requestAnimationFrame(update);
        };

        audioSource.playStream('mp3/Rodrigo_Y_Gabriela_-_Hanuman_Live__KEXP.mp3');
        update();
    };