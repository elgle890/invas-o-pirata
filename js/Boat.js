class Boat {
    constructor(x, y, width, height, boatPos, animation) {
        this.x = x;
        this.x = y;
        this.width = width;
        this.height = height;
        this.animation = animation;
        this.boatPos = boatPos;
        this.speed = 0.05;
        this.image = loadImage("./assets/boat.png");

        this.body = Bodies.rectangle(x, y, width, height);
        World.add(world, this.body);
    }

    animate() {
        this.speed += 0.05;
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.boatPos, this.width, this.height);
        pop();
    }
    
    remove(index) {
        if (groupBoat[index]) {
            this.animation = wreckAnimation;
            this.speed = 0.05;
            this.width = 300;
            this.height = 300;
            World.remove(world, groupBoat[index].body);
            setTimeout(() => {
                delete groupBoat[index];
            }, 2000);  
        }
    }

}