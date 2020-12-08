var coin1, coin2, coin3;
var planeImage;
var space, spaceImage;
var fire, fireImage;
var boy, boyImage;
var coin1Group, coin2Group, coin3Group;
var planeGroup;
var planeImage;
var fireGroup;
var score = 0;
var start;
var play;
var end;
var gameState = "start";

function preload() {

  spaceImage = loadImage("space.jpg");

  coin1Image = loadImage("coin1.png");
  coin2Image = loadImage("coin2.png");
  coin3Image = loadImage("coin3.png");

  boyImage = loadImage("boy.png");
  fireImage = loadImage("raygun.png");
  planeImage = loadImage("plane.png");

}

function setup() {

  createCanvas(800, 600);





  space = createSprite(400, 300);
  space.addImage("space", spaceImage);
  space.scale = 3;
  space.velocityX = -3;

  boy = createSprite(50, 200, 20, 100);
  boy.addImage("boy", boyImage);
  boy.scale = 0.13;

  coin1Group = createGroup();
  coin2Group = createGroup();
  coin3Group = createGroup();
  planeGroup = createGroup();
  fireGroup = createGroup();
}

function draw() {
  background(0);

  if (gameState === "start") {

    textSize (35);
    fill("white");
    textFont("BOLD");
    text("USE THE ARROWS TO AVOID THE PLANES", 30, 50);
    text("USE SPACE TO SHOOT AND COLLECT COINS", 30, 130);
    text("GOLD COINS - 1 POINT", 30, 210);
    text("SILVER COINS - 2 POINT", 30, 290);
    text("BRONZE COINS - 3 POINT", 30, 370);
    text("PRESS SPACE TO PLAY", 30, 450);
    text("GOOD LUCK", 30, 530);

  }



  if (space.x < 0) {

    space.x = 400;

  }



  if (keyDown("down")) {

    boy.y = boy.y + 5;

  }

  if (keyDown("up")) {

    boy.y = boy.y - 5;

  }

  if (keyDown("space") && gameState === "play") {

    var fire = createRay();
    fire.addImage("ray", fireImage);
    fire.y = boy.y;
    fire.scale = 0.1;

  }

  if (keyDown("space") && gameState === "start") {

    gameState = "play";

  }

  if (keyDown("space") && gameState === "end") {

    gameState = "start";

  }
  
  if (planeGroup.isTouching(boy)){
    
    gameState = "end";
    
  }
  
  if(fireGroup.isTouching(coin1Group)){
    
    coin1Group.destroyEach();
    fireGroup.destroyEach();
    score = score+1;
    
  }
  
  if(fireGroup.isTouching(coin2Group)){
    
    coin2Group.destroyEach();
    fireGroup.destroyEach();
    score = score+2;
    
  }
  
  if(fireGroup.isTouching(coin3Group)){
    
    coin3Group.destroyEach();
    fireGroup.destroyEach();
    score = score+3;
    
  }
  
  if (gameState === "play") {

    if (frameCount % 60 === 0) {

      var r = Math.round(random(1, 3));

      if (r === 1) {

        coins1();

      }

      if (r === 2) {

        coins2();

      }

      if (r === 3) {

        coins3();

      }

    }
    planes();

    drawSprites();
    textSize (30);
    fill("white")
    text("Score-"+score,650,50);
  }
  
  if (gameState === "end") {
    
    
    textSize (45);
    fill("white");
    textFont("BOLD");
    text("GAME OVER", 250, 50);
    text("BETTER LUCK NEXT TIME", 100, 150);
    text("PRESS SPACE TO TRY AGAIN", 70, 250);
    
  }


}

function coins1() {

  var coin1 = createSprite(700, 200, 20, 20);
  coin1.addImage("coin1", coin1Image);
  coin1.scale = 0.15;
  coin1.y = Math.round(random(50, 350));
  coin1.velocityX = -8;
  coin1.lifetime = 80;
  coin1Group.add(coin1);
}

function coins2() {

  var coin2 = createSprite(700, 200, 20, 20);
  coin2.addImage("coin2", coin2Image);
  coin2.scale = 0.15;
  coin2.y = Math.round(random(50, 350));
  coin2.velocityX = -8;
  coin2.lifetime = 80;
  coin2Group.add(coin2);
}

function coins3() {

  var coin3 = createSprite(700, 200, 20, 20);
  coin3.addImage("coin3", coin3Image);
  coin3.scale = 0.15;
  coin3.y = Math.round(random(50, 350));
  coin3.velocityX = -8;
  coin3.lifetime = 80;
  coin3Group.add(coin3);
}




function planes() {

  if (frameCount % 200 === 0) {

    var plane = createSprite(750, 200, 70, 20);
    plane.addImage("plane", planeImage);
    plane.scale = 0.7;
    plane.y = Math.round(random(50, 350));
    plane.velocityX = -6;
    plane.lifetime = 120;

    planeGroup.add(plane);
  }


}

function createRay() {
  fire = createSprite(160, 100, 5, 10);
  fire.velocityX = 6;
  fire.scale = 0.3;
  fire.lifetime = 90;
  fireGroup.add(fire);
  return fire;
}