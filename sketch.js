const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;


var canvas, angle, tower, ground, cannon, cannonBall;
var cannonImage, cannon2Image;
var balls = [];


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  cannonImage = loadImage("./assets/cannonBase.png");
  cannon2Image = loadImage("./assets/canon.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  cannon = new Cannon(180, 110, 130, 100, 20, cannon2Image, cannonImage);
  
  
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);


  angleMode(DEGREES);
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  cannon.display();
  
  for(var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
}

function keyReleased() {
  if (RIGHT_ARROW) {
    cannonBall.shoot();
  }
}

function keyPressed() {

    if(DOWN_ARROW) {
      cannonBall = new CannonBall(cannon.x, cannon.y);
      balls.push(cannonBall);
    }
  
}

function showCannonBalls(ball) {
  if(ball) {
    ball.display();
  }
}