const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;


var canvas, angle, tower, ground, cannon, cannonBall;
var cannonImage, cannon2Image;
var balls = [];
var groupBoat = [];
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;
var wreckAnimation = [];
var wreckJson, wreckSpriteSheet;
var boatCollision;
var evilLaught, backGroundSound, cannonShot;
var isLaughing = false;
var pontuacao = 0;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  cannonImage = loadImage("./assets/cannonBase.png");
  cannon2Image = loadImage("./assets/canon.png");
  boatSpriteData = loadJSON("./assets/boat/ship-sailing.json");
  boatSpriteSheet = loadImage("./assets/boat/ship-sailing.png");
  wreckJson = loadJSON("./assets/boat/broken-ship-01.json");
  wreckSpriteSheet = loadImage("./assets/boat/broken-ship-01.png");
  evilLaught = loadSound("./assets/pirate_laugh.mp3");
  backGroundSound = loadSound("./assets/background_music.mp3");
  cannonShot = loadSound("./assets/cannon_explosion.mp3");
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

  var boatFrames = boatSpriteData.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  

  var wreckFrames = wreckJson.frames;

 
  for(var i = 0; i < wreckFrames.length; i++) {
    var pos = wreckFrames[i].position;
    var img = wreckSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    wreckAnimation.push(img);
  }

  
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  cannon.display();

  showBoats();

  textSize(40);
  text(`pontua????o: ${pontuacao}`, width-400, 50);

  



  
  for(var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }
  
  if(!backGroundSound.isPlaying()) {
    backGroundSound.play();
    backGroundSound.setVolume(0.1);
  }

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
}

function keyReleased() {
  if (keyCode == 32) {
    cannonBall.shoot();
    cannonShot.play();
  }
}

function keyPressed() {

    if(DOWN_ARROW) {
      cannonBall = new CannonBall(cannon.x, cannon.y);
      balls.push(cannonBall);
      
    }

    
  
}

function showCannonBalls(ball, index) {
  if(ball) {
    ball.display();
    if(ball.circle.position.x >= width || ball.circle.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats() {
  if (groupBoat.length > 0) {
    
      if(groupBoat[groupBoat.length -1] == undefined || groupBoat[groupBoat.length-1].body.position.x < width - 300) {
        var positions = [-4, -60, -70, -20];
        var position = random(positions);
        var boat = new Boat(width, height-100, 170, 170, position,boatAnimation);

        groupBoat.push(boat);
      }
    

  


    for(var y = 0; y < groupBoat.length; y++) {
      if(groupBoat[y]) {
        groupBoat[y].display();
        groupBoat[y].animate();
        Matter.Body.setVelocity(groupBoat[y].body, {x:-0.9, y:0 });

        boatCollision = Matter.SAT.collides(tower, groupBoat[y].body);

        if(boatCollision.collided && !groupBoat[y].isBroken) {
          
          if(!isLaughing) {
            evilLaught.play();
            isLaughing = true;
          }
          
          gameOver();

        }
      }
    }
  } else {
    var boat = new Boat(width, height-60, 170, 170, -80, boatAnimation);

    groupBoat.push(boat);
  }
}

function collisionWithBoat(index) {
  for (var i = 0; i < groupBoat.length; i++){
    if (groupBoat[i] !== undefined && balls[index] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].circle, groupBoat[i].body);
      
      if (collision.collided) {
        groupBoat[i].remove(i);
        balls[index].remove(index);

        pontuacao += 5;
      }
    }
  }
}

function gameOver(){
  swal({
    title: "Fim de Jogo!!!",
    text: "Obrigada por jogar!",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize:"150x150",
    confirmButtonText: "jogar novamente"
  },
  function(isConfirm) {
    if(isConfirm){
      location.reload();
    }
  }
  );
}