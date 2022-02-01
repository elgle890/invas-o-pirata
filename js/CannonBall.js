class CannonBall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.raio = 30;
        var options = {
            isStatic : true,
        }

        this.circle = Bodies.circle(x, y, this.raio, options);
        World.add(world, this.circle);

        this.image = loadImage("./assets/cannonball.png");
    }

    display() {
        var pos =  this.circle.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.raio, this.raio);
        pop(); 
    }

    shoot() {
        
        var newAngle = cannon.angle - 28;
        newAngle = newAngle * (3.14 / 180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.3);

        Matter.Body.setStatic(this.circle, false);
        Matter.Body.setVelocity(this.circle, { x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14) });
    }
}