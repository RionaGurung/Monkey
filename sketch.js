var monkey, monkey0;

var ground, ground0, iground;

var banana, banana0, bananaGroup;

var stone, stone0, stoneGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var highScore = 0;

//to load images
function preload(){
  
  monkey0 = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  
  ground0 = loadImage("images/jungle.jpg");
  
  banana0 = loadImage("images/banana.png");
  
  stone0 = loadImage("images/stone.png");
  
}

function setup(){
  
  createCanvas(1200,600);
  
  //to create ground sprite
  ground = createSprite(1000,200,500,5);
  //to add image to sprite
  ground.addImage('jungle', ground0);
  //size
  ground.scale = 2;
  
  //to create invisible ground sprite
  iground = createSprite(250,270,500,5);
  //visibility of sprite
  iground.visible = false;
  
  //to create monkey sprite
  monkey = createSprite(60,240,10,10);
  //to add animation to sprite
  monkey.addAnimation("moving monkey",monkey0);
  //size
  monkey.scale = 0.08;
  monkey.debug = false;
  
  //to create new groups
  bananaGroup = new Group();
  stoneGroup = new Group();
  
}

function draw(){
  
  //background
  background("white");
  
  //to create sprites
  drawSprites();
  
  
  //if gamestate is play
  if(gameState === PLAY){  

      //ground velocity
      ground.velocityX = -(4 + 3 * score/100);    
    
      //to jump
      jump();
    
      //infinite ground
      infiniteg()

      //to spawn bananas
      spawnBanana();

      //to spawn stones
      spawnStone();
    
      //to score
      scoring();
    
      //high score
      hiSc(); 
    
      //monkey size increase
      size();

      lose();
        
      }
    
  else if(gameState === END){
     
     background("black");
    
     //colour of text
     fill("white");
     //text size
     textSize(17);  
     //text displayed
     text("Game Over",210,100);
     text("Press R To Restart",190,180); 
     
     //size of monkey
     monkey.scale = 0.08;
    
     //to set ground velocity
     ground.setVelocity(0,0);
     
     //to set banana velocity
     bananaGroup.setVelocityEach(0,0);
     //to set stone velocity
     stoneGroup.setVelocityEach(0,0);
    
     //to set lifetime
     stoneGroup.setLifetimeEach(-1)
    
     restart();
    
     }
  
  //to make monkey collide with invisible ground
  monkey.collide(iground);
  
  
  //text colour
  fill("white");
  //text size
  textSize(15);
  //text displayed
  text("Score:"+ score,290,20);
  text("High Score:"+highScore,120,20);
  
}
  
//custom function
function infiniteg(){
  
  if (ground.x < 0){
    
      ground.x = ground.width/2 
    
    }
  
} 

//custom function
function spawnBanana(){
  
  if(frameCount%100 === 0){
    
    banana = createSprite(500,200,10,10);
    banana.addImage('banana', banana0);
    banana.scale = 0.08;
    banana.velocityX = -(6+(score/2));
    banana.y = Math.round(random(50,220));
    banana.lifetime = 250;
    banana.debug = false;
    
    bananaGroup.add(banana);
    
  }
  
}

//custom function
function spawnStone(){
  
  if(frameCount%200 === 0){
   
    stone = createSprite(500,250,10,10);
    stone.addImage('stone', stone0);
    stone.scale = 0.11;
    stone.velocityX = -(6+(score/2));
    stone.lifetime = 250;
    stone.debug = false;
    
    
    stoneGroup.add(stone);
    
  }
  
}

//custom function
function jump(){
  
  if(keyDown("space") && monkey.y >= 100){
    
    monkey.velocityY = -10;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
}

//custom function
function scoring(){
  
  if(bananaGroup.isTouching(monkey)){
    
    score = score + 2;
    
    bananaGroup.destroyEach();
    
  }
  
}

//custom function
function hiSc(){
  
   if(highScore < score){
    
    highScore = score;
     
  }
  
}

//custom function
function size(){
  
  var sscore = Math.round(random(10,40));
  
  switch(score){
      
    case 10 : monkey.scale = 0.1;
             break; 
      
    case 20 : monkey.scale = 0.12;
             break; 
             
    case 30 : monkey.scale = 0.14;
             break;        
      
    case 40 : monkey.scale = 0.16;
             break; 
             
    default : break; 
             
  }
  
}

//custom function
function lose(){
  
  
   if(stoneGroup.isTouching(monkey)){
        
        gameState =END;
     
   }

}

function restart(){
  
  if(gameState === END && keyDown("r")){
    
    gameState = PLAY;
    
    bananaGroup.destroyEach();
    stoneGroup.destroyEach(); 
    
    score = 0;
    
  }
  
}



