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
        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.raio, this.raio);
        pop();
        
        
    }
}