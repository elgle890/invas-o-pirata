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

        this.way = [];
    }

    display() {
        var pos =  this.circle.position;
        console.log(this.circle.position.x);
       
        if(this.circle.position.x > 196) {
            push();
            imageMode(CENTER);
            image(this.image, pos.x, pos.y, this.raio, this.raio);
            pop(); 

        }
        
        if(this.circle.position.x > 0 && this.circle.position.x > 300 && this.circle.position.y < 565) {
            var position = [this.circle.position.x, this.circle.position.y];
            this.way.push(position);

        }

        
        for(var z = 0; z < this.way.length; z++) {
            image(this.image, this.way[z][0], this.way[z][1], 5, 5);
        }
    }

    shoot() {
        
        var newAngle = cannon.angle - 28;
        newAngle = newAngle * (3.14 / 180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.3);

        Matter.Body.setStatic(this.circle, false);
        Matter.Body.setVelocity(this.circle, { x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14) });
    }


    remove(index) {
        if(balls[index]) {
            Matter.Body.setVelocity(balls[index].circle, {x: 0, y: 0});
            World.remove(world, balls[index].circle);
            setTimeout( () => {
                delete balls[index]
            },1000);
        }
    }
}