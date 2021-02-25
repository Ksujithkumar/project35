var balloon,balloonImage;
var backgroundImage;
var database, position;

function preload(){
  balloonImage =loadImage("Hot Air Ballon-02.png")
  backgroundImage = loadImage("Hot Air Ballon-01.png")

}

function setup(){
    createCanvas(1000,1000);

    database = firebase.database();

    balloon = createSprite(350,350,70,150);
    balloon. addImage(balloonImage)
    var balloonPosition = database.ref("balloon/position")
    balloonPosition.on("value",readPosition,showError)

}

function draw(){
    background(backgroundImage);
    if(position != undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-7,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(7,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-7);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+7);
    }
}
    drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/position").set({
      'x': position.x + x,
      'y': position.y + y
  })
  
}

function readPosition(data){
    position = data.val()
    console.log(position);

    balloon.x = position.x
    balloon.y = position.y
}


function showError(){
    console.log("Error in the database");
}
