class Cannon {
  constructor(x, y, width, height, angle, image, baseImage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.image = image;
    this.baseImage = baseImage;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
    image(this.baseImage, 70, 20, 200, 200);

    if(keyIsDown(UP_ARROW)) {
      this.angle = this.angle + 1;
    }
    if(keyIsDown(DOWN_ARROW)) {
      this.angle = this.angle - 1;
    }
  }
  
}
