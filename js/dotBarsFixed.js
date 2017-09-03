/**
 * Created by sarcoma on 24/04/17.
 */

var dotBarsFixed = function () {

  var audioSource = new AudioSource('player'),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    particles = [],
    spacer = 0

  var update = function () {
    console.log(particles.length)
    context.clearRect(0, 0, width, height)
    context.fillStyle = '#ffd700'
    context.fillRect(0, 0, width, height)

    var i = 1
    if (spacer % 4 === 0) {
      for (bin = 0; bin < audioSource.streamData.length; bin += 10) {
        var val = audioSource.streamData[bin]
        var velocity = 10
        var radius = 14
        particles.push(
          particle.create(width, (height - (bin / 255) * height) / 2,
            velocity, Math.PI, 0, (val / 255) * radius, 0))
        particles.push(
          particle.create(width, (height + (bin / 255) * height) / 2,
            velocity, Math.PI, 0, (val / 255) * radius, 0))
        i++
      }
    }
    spacer++
    for (var j = 0; j < particles.length; j += 1) {
      p = particles[j]
      p.update()

      context.fillStyle = 'rgba(0, 0, 0, 1)'
      context.beginPath()
      context.arc(p.position.getX(), p.position.getY(), p.getRadius(),
        0, Math.PI * 2, false)
      context.fill()
    }

    removeDeadParticles(particles, width, height)

    requestAnimationFrame(update)
  }

  audioSource.playStream('mp3/Rodrigo_Y_Gabriela_-_Hanuman_Live__KEXP.mp3')
  update()

}

dotBarsFixed()
