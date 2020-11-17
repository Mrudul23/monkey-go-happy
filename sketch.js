
var monkey , monkey_running
var background,backgroundImage
var banana,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground
var survivaltime=0
var PLAY=1
var END=0
var gameState=PLAY
var stop 

var gameover,gameOver
var restart,Restart

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  stop=loadImage("sprite_1.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("jungle.jpg")
  
  gameover=loadImage("gameover.png")
  Restart=loadImage("restart.png")

}
function setup() {
  
  createCanvas(600,500)
  background("white")
  background=createSprite(300,250)
  background.addImage(backgroundImage)

  ground=createSprite(300,515,600,140)
  ground.visible=false;
  
  monkey=createSprite(70,380)
  monkey.addAnimation("monkey",monkey_running)
  monkey.addImage("stop",stop) 
  monkey.scale=0.2
  monkey.setCollider("circle",0,0,280)
    
  
  gameOver=createSprite(320,140)
  gameOver.addImage(gameover)
  gameOver.scale=0.7
  
  restart=createSprite(300,260)
  restart.addImage(Restart)
  restart.scale=0.15
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {                       
 
 
  
  if(gameState===PLAY){
      
    gameOver.visible=false
    restart.visible=false;
    
      if (monkey.isTouching(foodGroup)){
           foodGroup.destroyEach();
           score=score+1
         }
     spawnrocks();
     bananas();
    
     background.velocityX=-3
   if(background.x <70){
      background.x=background.width/2
      }
    
    if(keyDown("Space") && monkey.y>345){
      monkey.velocityY=-13.5
      }
    
    monkey.velocityY=monkey.velocityY+0.4
    monkey.collide(ground);
  
  if(frameCount% 33 === 0){
    survivaltime ++
  }
    if(monkey.isTouching(obstacleGroup)){
       gameState=END
     }
    
  }else if(gameState===END){
      
    gameOver.visible=true
    restart.visible=true;
    
    background.velocityX=0
    monkey.setVelocity(0,0)
    obstacleGroup.setVelocityEach(0,0)
    foodGroup.destroyEach()
    obstacleGroup.setLifetimeEach(-1);
    monkey.changeImage("stop",stop)
     
    
    } 
  
 
  if (mousePressedOver(restart)){
    reset()
  }

  
  drawSprites();
  
  textSize(30)
  fill("orange")
  stroke("red")
  strokeWeight(5)
  text("bananas collected = " +  score,290,40)
  text("Survival Time = "+ survivaltime,30,40)
}

 function spawnrocks(){
  if (frameCount % 120 === 0){
    obstacle=createSprite(620,400)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.23
    obstacle.lifetime=200
    obstacle.velocityX=-5
    obstacleGroup.add(obstacle);
   
  }
 }

function bananas(){
  if(frameCount % 110 === 0){
    banana=createSprite(620,random(120,240))
    banana.addImage(bananaImage)
    banana.lifetime=200
    banana.velocityX=-5
    banana.scale=0.1
    foodGroup.add(banana)    
   
  }
}

function reset(){
  if(gameState===END){
    gameState=PLAY
    obstacleGroup.destroyEach()
    spawnrocks()
    bananas()
    gameOver.visible=false
    restart.visible=false;
    monkey.changeAnimation("monkey",monkey_running)
    survivaltime=0
    score=0
    
    
  }
}

