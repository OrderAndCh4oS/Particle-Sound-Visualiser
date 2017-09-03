/**
 * Created by sarcoma on 24/04/17.
 */
function removeDeadParticles (particles, width, height) {
  for (var i = particles.length - 1; i >= 0; i -= 1) {
    var p = particles[i]
    var radius = p.radius
    if (
      p.position.getY() > height + radius ||
      p.position.getY() < 0 - radius ||
      p.position.getX() > width + radius ||
      p.position.getX() < 0 - radius ||
      p.opacity <= 0) {
      particles.splice(i, 1)
    }
  }
}