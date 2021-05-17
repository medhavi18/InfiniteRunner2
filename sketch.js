var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameState = 1;
var PLAY

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("rectangle",0,0,280,1000,0);

  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  //code to reset the background
  if(gameState===1){
    if(path.y > 400 ){
      path.y = height/2;
    }
    
    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
      createCash();
      createDiamonds();
      createJwellery();
      createSword();
  
      if (cashG.isTouching(boy)) {
        treasureCollection+=50;
        cashG.destroyEach();
      }
      else if (diamondsG.isTouching(boy)) {
        treasureCollection+=100;
        diamondsG.destroyEach();
        
      }else if(jwelleryG.isTouching(boy)) {
        treasureCollection+=50;
        jwelleryG.destroyEach();
        
      }else{
        if(swordGroup.isTouching(boy)) {
           swordGroup.destroyEach();
           boy.destroy();
           gameState = 2;
      }
    }
  }


  drawSprites();
  
  if(gameState===1){
    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,150,30);
  }

  if(gameState===2){
    path.velocityY=0;
    fill("white");
    strokeWeight(6);
    stroke("black");
    textSize(18);
    text("GAME ENDED! "+"TOTAL TREASURE: "+treasureCollection,30,200);
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
  }

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

