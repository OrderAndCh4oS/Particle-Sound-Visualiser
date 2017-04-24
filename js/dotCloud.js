;/**
 * Created by sarcoma on 24/04/17.
 */

var dotCloud = function () {

        var audioSource = new AudioSource('player'),
            canvas = document.getElementById('canvas'),
            context = canvas.getContext("2d"),
            width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight,
            particles = [],
            spacer = 0;

        var update = function () {
            console.log(particles.length);
            context.clearRect(0, 0, width, height);
            context.fillStyle = "#164450";
            context.fillRect(0, 0, width, height);

            var i = 1;
            if (spacer % 4 == 0) {
                for (bin = 0; bin < audioSource.streamData.length; bin += 6) {
                    var val = audioSource.streamData[bin];
                    var velocity = val / 255 * 24;
                    particles.push(particle.create(width, (val/255)*1000, velocity, Math.PI * 1, 0, 24, 0));
                    i++;
                }
            }
            spacer++;
            for (var j = 0; j < particles.length; j += 1) {
                p = particles[j];
                p.update();

                context.fillStyle = "rgba(0, 212, 85, .08)";
                context.beginPath();
                context.arc(p.position.getX(), p.position.getY(), p.getRadius(), 0, Math.PI * 2, false);
                context.fill();
            }

            removeDeadParticles();

            requestAnimationFrame(update);
        };

        audioSource.playStream('mp3/Rodrigo_Y_Gabriela_-_Hanuman_Live__KEXP.mp3');
        update();

        function removeDeadParticles() {
            for (var i = particles.length - 1; i >= 0; i -= 1) {
                var p = particles[i];
                if (p.position.getX() < 0) {
                    particles.splice(i, 1);
                }
            }
        }
    };