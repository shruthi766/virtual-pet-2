var dog,dogImg,dogImg1;
var database;
var foodobj
var foodS,foodStock;
var fedTime,lastFed,feed,addFood

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1600,400);

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodobj= new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed= createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}

// function to display UI
function draw() {
  background(46,139,87);
  foodobj.display();

  fedTime= database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  
  fill(255,255,254);
  textSize(15);
  if (lastFed>=12){
    text("Last Feed:" +lastFed %12+ "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12AM",350,30);
  }
  else{
    text("Last Feed:" +lastFed + "AM",350,30);
  }
  drawSprites();

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage("images/happy dog.png")

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
Food:foodobj.getFoodStock(),
FeedTime:hour()
  })
}
function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}
