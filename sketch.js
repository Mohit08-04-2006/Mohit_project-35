var dog, dogImg, dogImg2;
var food = 20;

function preload(){
	 dogImg = loadImage("images/dog.png");
   dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);

	createCanvas(500,500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  var foodStock = database.ref("food");
  foodStock.on("value",readStock);

}

function draw() {  
  background(46,139,87);
  fill('skyblue');
  text("Food Remaining = "+food,200,200);

  if ( keyWentDown(UP_ARROW)){
   writeStock(food);
   dog.addImage(dogImg2);

  }
 
  drawSprites();
}

function readStock(data){
  food = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }
  else{
   x = x-1;
  }

  database.ref('/').update({
    food:x
  })
}
