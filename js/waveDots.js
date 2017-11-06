var waveDots = function () {

    var context = bitlib.context(0, 0),
        width = context.width,
        height = context.height,
        audioSource = new AudioSource('player');
    context.translate(width / 2, height / 2);
    var res = 10,cd
        wave = 0.060,
        baseScale = 0.4;
    function draw() {
        context.clear("white");
        context.fillStyle = "#ffd700";
        context.fillRect(-width, -height, width*2, height*2);
        // var total = 0;
        // for (var i = 0; i < audioSource.streamData.length; i++) {
        //     total += audioSource.streamData[i];
        // }
        // var val = total / audioSource.streamData.length;
        var val = audioSource.streamData[70];
        wave = val / 255 * 0.25 + 0.05;
        var x_centre = 0;
        var y_centre = 0;
        var magnitude = 1;
        var baseRadius = 5000000;
        for (var x = -width / 2; x <= width / 2; x += res) {
            for (var y = -height / 2; y < height / 2; y += res) {
                if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius)) {
                    magnitude = 0
                } else if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius) / 2) {
                    magnitude = 0.1
                } else if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius) / 3) {
                    magnitude = 0.2
                } else if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius) / 4) {
                    magnitude = 0.5
                } else if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius) / 6) {
                    magnitude = 0.8
                } else if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius) / 7) {
                    magnitude = 1
                } else if (((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) > (wave * baseRadius) / 8) {
                    magnitude = 0.9
                }
                if(((x - x_centre) * (x - x_centre)) + ((y - y_centre) * (y - y_centre)) < wave * 3000000 + 50000) {
                    var dist = Math.sqrt(x * x + y * y),
                        scale = bitlib.math.map(Math.sin(dist * wave), -1, 1, baseScale, 1) * magnitude;
                    context.save();
                    context.translate(x, y);
                    context.scale(scale, scale);
                    context.fillStyle = "#000";
                    context.fillCircle(0, 0, res * 0.5);
                    context.restore();
                }
            }
        }
        setTimeout(function () {
            requestAnimationFrame(draw)
        }, 60)
    }
    audioSource.playStream('mp3/Rodrigo_Y_Gabriela_-_Hanuman_Live__KEXP.mp3');
    draw();

};

waveDots();
