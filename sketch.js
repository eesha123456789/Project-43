var coin, coinIMG
var ball, playerPaddle, computerPaddle
var topEdge, bottomEdge, rightEdge, leftEdge
var ballIMG, playerFallIMG, playerKickIMG, playerPlayIMG, computerPaddleIMG
var gameState ="serve"
var compScore=0
var playerScore = 0;
var level="level1"
var trex, trexCollided, ground, invground, rand, cactus1, cactusGroup, cloudGroup, gameOver, restart;
var highScore=0;
var score=0;
var PLAY=1;
var END=0;
var cloudImage, cactusImage1, cactusImage2, cactusImage3, cactusImage4, cactusImage5, cactusImage6, groundImage, trexImage, gameOverImage, restartImage, checkPointSound, dieSound, jumpSound;

function preload(){
  coinIMG=loadImage('coin.png')
  ballIMG=loadImage("PingPongIMG/ball.png");
  playerFallIMG=loadImage("PingPongIMG/littleboyFall.png");
  playerKickIMG=loadImage('PingPongIMG/littleboyKick.png')
  playerPlayIMG=loadImage('PingPongIMG/littleboyPlay.png')
  computerPaddleIMG=loadImage("PingPongIMG/robot.png");

  //trexImage=loadAnimation('TRexIMG/trex1.png','TRexIMG/trex3.png','TRexIMG/trex4.png');
  trexImage=loadImage('TRexIMG/trex1.png')
  trexCollided=loadImage('TRexIMG/trex_collided.png');
  groundImage=loadImage('TRexIMG/ground2.png');
  cloudImage=loadImage('TRexIMG/cloud.png');
  cactusImage1=loadImage('TRexIMG/obstacle1.png');
  cactusImage2=loadImage('TRexIMG/obstacle2.png');
  cactusImage3=loadImage('TRexIMG/obstacle3.png');
  cactusImage4=loadImage('TRexIMG/obstacle4.png');
  cactusImage5=loadImage('TRexIMG/obstacle5.png');
  cactusImage6=loadImage('TRexIMG/obstacle6.png');
  gameOverImage=loadImage('TRexIMG/gameOver.png');
  restartImage=loadImage('TRexIMG/restart.png');
  checkPointSound=loadSound('TRexIMG/checkPoint.mp3')
  dieSound=loadSound('TRexIMG/die.mp3');
  jumpSound=loadSound('TRexIMG/jump.mp3');
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  coin = createSprite(200,200)
  coin.addImage(coinIMG)
  coin.scale=0.5
  pingpongSetup()
  trexSetup()
}
function draw() {
  console.log(gameState)
  if(level==="level1"){
    PingPongGame()
  }
  if(level==="level2"){
    ball.visible=false
    computerPaddle.visible=false
    playerPaddle.visible=false
    topEdge.visible=false
    bottomEdge.visible=false
    rightEdge.visible=false
    leftEdge.visible=false

    trex.visible=true
    ground.visible=true
    cactusGroup.visible=true
    cloudGroup.visible=true
    trexGame()

  }
  drawSprites();
}
function pingpongSetup(){
  ball = createSprite(200,200,10,10);
  ball.addImage(ballIMG)
  playerPaddle = createSprite(370,500,10,70);
  playerPaddle.addImage(playerPlayIMG)
  computerPaddle = createSprite(40,200,10,70);
  computerPaddle.addImage(computerPaddleIMG)
  topEdge=createSprite(425/2,0,425,5)
  bottomEdge=createSprite(425/2,400,425,5)
  rightEdge=createSprite(425,200,5,400)
  leftEdge=createSprite(0,200,5,400)
}
function PingPongGame(){
  if (gameState === "serve") {
    background(255,255,255);
    text("Press Space to Serve",150,180);
  }
  if(gameState==="play" || gameState==="over"){
    background(255,255,255);
  }
  text(compScore, 170,20);
  text(playerScore, 230,20);
  if(World.mouseY<400){
  playerPaddle.y = World.mouseY;}
  computerPaddle.y = ball.y;
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  } 
  if (ball.isTouching(playerPaddle) || ball.isTouching(computerPaddle))
  {
   // playSound("hit.mp3");
  }
    if (ball.bounceOff(topEdge)||ball.bounceOff(bottomEdge))
  {
   // playSound("wall_hit.mp3");
  }
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(computerPaddle);
  ball.bounceOff(playerPaddle)
  playerPaddle.bounceOff(topEdge)
  playerPaddle.bounceOff(bottomEdge)

  if (keyDown("space") &&  gameState === "serve") {
    playerPaddle.addImage(playerPlayIMG)
    ball.velocityX = 3;
    ball.velocityY = 4;
    gameState = "play";
  }
   if (keyWentDown("a"))
   {
     playerPaddle.addImage(playerKickIMG)  
   }
   if (keyWentUp("a"))
   {
     playerPaddle.addImage(playerPlayIMG);
   }
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400 || ball.isTouching(playerPaddle)) {
      compScore = compScore + 1;
      //playSound("score.mp3");
      playerPaddle.addImage(playerFallIMG)
      background(255,255,255);
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
      playSound("score.mP3");
    }
    
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
  }
  if (playerScore === 1 || compScore === 1){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'Enter' to move to the next level",150,180);
  }
  if (keyDown("Enter") && gameState === "over") {
    compScore=0
    playerScore=0
    level="level2"
  }

  
}
function trexSetup(){
  invground = createSprite(200,380,displayWidth,10);
  invground.shapeColor='white'
  //invground.visible=false;
  trex = createSprite(200,340,10,10);
  trex.addImage(trexImage)
  trex.addImage(trexCollided)
  trex.scale=0.7
  trex.visible=false
  ground = createSprite(200,380,displayWidth,20);
  ground.addImage("ground2",groundImage);
  ground.x = ground.width/2;
  ground.visible=false
  cactusGroup=new Group();
  cactusGroup.visible=false
  cloudGroup=new Group();
  cloudGroup.visible=false
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible=false;
  gameOver.scale=0.6;
  restart = createSprite(200,250,20,20);
  restart.addImage("restart", restartImage);
  restart.visible=false;
  restart.scale=0.5;

}
function trexGame(){
  background(160);
  gameState=1
  ground.depth=trex.depth-1
  console.log("hello")
  trex.collide(invground)

  fill("white");
  textSize(15); 
  text("score: "+score,310,30);
  if(score%100===0 && score>0){
    checkPointSound.play();
  }

  if (gameState===1){
    if(highScore===0){
      fill(165);
    }
    text("HI:"+highScore,220,30);
      ground.velocityX=-4
    if(World.frameCount%10===0)
    {
      score++;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && Math.floor(trex.y)===362){
       trex.velocityY = -12 ;  
       jumpSound.play(); 
    }

    trex.velocityY = trex.velocityY + 0.7;
    spawnClouds();
    spawnCactus();
  }
  if(gameState===0){
    trex.velocityY=0; 
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.changeAnimation('trexcollided',trexCollided);
    
    if(highScore<score){
      highScore=score;
    }
      fill("white");
      text("HI:"+highScore,220,30);
    dieSound.play();
  }
  trex.setCollider("circle",0,0,40)
  if(trex.isTouching(cactusGroup) && gameState===1)
  {
    gameState=0;
    
  }
  if(mousePressedOver(restart) && gameState===0)
  {
    gameState=1;
    gameOver.visible=false;
    restart.visible=false;
    cactusGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation('running',trexImage)
    score=0;
    cactusGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
  }
  
  drawSprites();
  
}
function spawnClouds(){

  if(World.frameCount%100===0)
  {
  cloud=createSprite(800,200,10,10);
  cloud.addImage("cloud",cloudImage);
  rand=random(100,300);
  cloud.velocityX=-3;
  cloud.y=rand;
  //console.log(cloud.depth);
  trex.depth=cloud.depth+1;
  cloud.lifetime=270;
  cloudGroup.add(cloud);
  }

}
function spawnCactus(){
  if(World.frameCount%75===0)
  {
    cactus1=createSprite(800,370);
    var rand1=Math.round(random(1,6));
    //console.log(rand1);
    cactus1.velocityX=-(4+World.frameCount/100);
    //cactus1.addImage("obstacle"+rand1); 
    switch(rand1){
      case 1:cactus1.addImage("obstacle1",cactusImage1);
        break;
      case 2:cactus1.addImage("obstacle2",cactusImage2);
        break;
      case 3:cactus1.addImage("obstacle3",cactusImage3);
        break;
      case 4:cactus1.addImage("obstacle4",cactusImage4);
        break;
      case 5:cactus1.addImage("obstacle5",cactusImage5);
        break;
      case 6:cactus1.addImage("obstacle6",cactusImage6);
        break;
      default:
        break;
    }
    cactus1.scale=0.5;
    cactus1.lifetime=150;
    cactusGroup.add(cactus1);
    
  }
}