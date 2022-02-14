const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;


var canvas, angle, tower, ground, cannon, cannonBall;
var cannonImage, cannon2Image;
var balls = [];
var groupBoat = [];


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

  showBoats();


  
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

function showBoats() {
  if(groupBoat.length > 0) {
    if(groupBoat[groupBoat.length-1].body.position.x < width - 300) {
      var positions = [-4, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height-100, 170, 170, position);

      groupBoat.push(boat);
    }

    for(var y = 0; y < groupBoat.length; y++) {
      if(groupBoat[y]) {
        groupBoat[y].display();
        Matter.Body.setVelocity(groupBoat[y].body, {x:-0.9, y:0 });
      }
    }
  } else {
    var boat = new Boat(width, height-60, 170, 170, -80);

    groupBoat.push(boat);
  }
  console.log("oi");
}