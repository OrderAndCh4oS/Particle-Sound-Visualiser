var particle = {
    position: null,
    velocity: null,
    gravity: null,
    mass: 1,
    radius: 0,
    bounce: -1,
    friction: 1,
    opacity: 1,
    fade: 0.01,

    create: function (x, y, speed, direction, grav, radius, fade) {
        var obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, grav || 0);
        obj.radius = radius;
        obj.fade = fade;
        return obj;
    },

    getRadius: function () {
        return this.radius;
    },

    getOpacity: function () {
        return this.opacity;
    },

    reduce: function (reduction) {
        this.radius -= reduction;
    },

    accelerate: function (accel) {
        this.velocity.addTo(accel);
    },

    update: function () {
        this.velocity.multiplyBy(this.friction);
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
        this.opacity -= this.fade;
    },

    angleTo: function (p2) {
        return Math.atan2(
            p2.position.getY() - this.position.getY(),
            p2.position.getX() - this.position.getX()
        );
    },

    distanceTo: function (p2) {
        var dx = p2.position.getX() - this.position.getX(),
            dy = p2.position.getY() - this.position.getY();
        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function (p2) {
        var grav = vector.create(0, 0),
            dist = this.distanceTo(p2);

        grav.setLength(p2.mass / (dist * dist));
        grav.setAngle(this.angleTo(p2));

        this.velocity.addTo(grav);
    }

};
