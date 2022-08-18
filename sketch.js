var bg, bgImg
var bottomGround
var topGround
var bird, birdImg
var pipeImg
var pipeTop, pipeDown;
var gameOverImg;
var restartImg;
var score = 0
var heart1Img
var heart2Img
var life = 2
// ESTADOS
var FORM = 1;
var PLAY = 2;
var END = 0;
var LIFE = 3;
var gameState = FORM;

function preload(){
bgImg = loadImage("assets/bg.png")
pipeImg = loadImage("assets/pipe.jpg")
birdImg = loadImage("assets/bird2.png")
logoImg = loadImage("assets/logo.png")
startImg = loadImage("assets/start.png")
gameOverImg = loadImage("assets/fimdejogo.png")
restartImg = loadImage("assets/restart.png")
heart1Img = loadImage("assets/heart_1.png")
heart2Img = loadImage("assets/heart_2.png")
}

function setup(){
createCanvas(700,800)

bottomGround = createSprite(200,790,800,20);
bottomGround.visible = false;
topGround = createSprite(200,10,800,20);
topGround.visible = false;

logo= createSprite(width/2 , height/2-200)
logo.addImage(logoImg)
logo.scale = 0.8
start= createSprite(width/2 , height/2)
start.addImage(startImg)
start.scale= 1.5

bird = createSprite(100,200,20,50);
bird.addAnimation("bird",birdImg);
bird.scale = 0.2;
bird.debug=true
bird.setCollider("rectangle",0,0,1,280)

gameOver = createSprite(width/2, height/2-150);
gameOver.addImage(gameOverImg);
gameOver.visible = false

restart = createSprite(width/2, height/2);
restart.addImage(restartImg)
restart.visible = false
restart.scale = 0.8

heart1 = createSprite(width/2+200,40,20,20)
heart1.addImage(heart1Img)
heart1.visible = false;
heart1.scale = 0.2

heart2 = createSprite(width/2+200,40,20,20)
heart2.addImage(heart2Img)
heart2.visible = true;
heart2.scale = 0.2

pipeTopGroup = new Group()
pipeDownGroup = new Group()
barraGroup = new Group ()
}

function draw() {
  background("black");
  image(bgImg,0,0,width,height)    
    
  if(gameState === FORM){
    bird.visible=false
    if(mousePressedOver(start)){
      logo.visible=false
      start.visible=false
      gameState = PLAY
    }
    
  }  
    // ESTADO PLAY
    if(gameState === PLAY){
      bird.visible=true
      if(keyDown("space")) {
        bird.velocityY = -6 ;
      }
      bird.velocityY = bird.velocityY + 2; //[GRAVIDADE]
    if(pipeTopGroup.isTouching(bird) ||
     pipeDownGroup.isTouching(bird) ||
      bird.isTouching(bottomGround)||
      bird.isTouching(topGround)){
      life -=1
      gameState = LIFE;
    }
  if(life===2){
    heart1.visible = false;
    heart2.visible = true;
  }
  if(life===1){
    heart1.visible = true;
    heart2.visible = false;
  }
  if(life===0){
    heart1.visible = false;
    heart2.visible = false;
    gameState = END;
  }

  spawnObstaclesTop()
  spawnObstaclesDown()
  Barra()
}
    if(gameState === END){
      bird.y = 400
      bird.velocityX = 0
      bird.velocityY = 0
      gameOver.visible = true
      restart.visible = true
      pipeTopGroup.setVelocityXEach(0)
      pipeDownGroup.setVelocityXEach(0)
      pipeTopGroup.setLifetimeEach(-1)
      pipeDownGroup.setLifetimeEach(-1)
      barraGroup.setVelocityXEach(0)
      pipeTop.depth = gameOver.depth
      gameOver.depth = gameOver.depth +1
      pipeTop.depth = heart1.depth
      heart1.depth = heart1.depth +1
      if(mousePressedOver(restart)){
        life = 2
        bird.visible = true;
        reset()
      }
    }
   Score()
  if(gameState === LIFE){
    bird.y = 400
    gameState = PLAY;
}
  drawSprites();      
}
function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  pipeTopGroup.destroyEach()
  pipeDownGroup.destroyEach()
  score = 0
}
function spawnObstaclesTop(){
  if(frameCount%60===0){
    pipeTop = createSprite(1200,100,100,70)
    pipeTop.velocityX = -10
    pipeTop.addImage(pipeImg)
    pipeTop.scale = 0.6
    pipeTop.rotation += 180
    pipeTop.lifetime = 200
    pipeTop.y = Math.round(random(5,100))
    pipeTopGroup.add(pipeTop)
    pipeTop.depth = heart1.depth
    heart1.depth = heart1.depth +1
  }
}
function spawnObstaclesDown(){
  if(frameCount%60===0){
    pipeDown = createSprite(1200,700,100,70)
    pipeDown.velocityX = -10
    pipeDown.addImage(pipeImg)
    pipeDown.scale = 0.6
    pipeDown.lifetime = 200
    pipeDown.y = Math.round(random(630,750))
    pipeDownGroup.add(pipeDown)
  }
}
function Barra(){
  if(frameCount%60===0){
    var barra = createSprite(700,200,10,900)
    barra.velocityX = -6
    barra.visible = false
    barraGroup.add(barra)
  }
}
function Score(){
  if(bird.isTouching(barraGroup)){
    score = score +1
  }
  textSize(30)
  fill("yellow")
  text("Pontuação: "+score, 250,50)
}
async function fundoapi(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responsejson = await response.json()
  var datetime = responsejson.datetime
  var hour = datetime.slice(11,13)
  if(hour >= 06 && hour <= 19){
    
  }
}