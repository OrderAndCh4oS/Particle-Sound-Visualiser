;/**
 * Created by sarcoma on 24/04/17.
 */

var sprayFadeStraight = function () {

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
            context.fillStyle = "#ffd700";
            context.fillRect(0, 0, width, height);

            var i = 1;
            if (spacer % 4 === 0) {
                for (bin = 0; bin < audioSource.streamData.length; bin += 6) {
                    var val = audioSource.streamData[bin];
                    var velocity = val / 255 * 24;
                    var radius = 30;
                    particles.push(particle.create(i * width / 23, height-radius/2, velocity, Math.PI * 1.50, 0.1, radius, 0.01));
                    i++;
                }
            }
            spacer++;
            for (var j = 0; j < particles.length; j += 1) {
                removal = [];
                p = particles[j];
                p.update();

                context.fillStyle = "rgba(0, 0, 0, " + p.getOpacity() + ")";
                context.beginPath();
                context.arc(p.position.getX(), p.position.getY(), p.getRadius(), 0, Math.PI * 2, false);
                context.fill();

            }

            removeDeadParticles(particles, width, height);

            requestAnimationFrame(update);
        };

        audioSource.playStream('mp3/Rodrigo_Y_Gabriela_-_Hanuman_Live__KEXP.mp3');
        update();

    };

sprayFadeStraight();