
let gameCanvas, screen;
const FPS = 10;  //Frame Per Second
const tilesCount = 20;
let snakePositionX = 10, snakePositionY = 10;
let applePositionX = 15, applePositionY = 15; 
let xVelocity = 0, yVelocity = 0;
let snakeBoxes = [];
let tailLength = 4;
let score = 0;


window.onload = function(){
    gameCanvas = document.getElementById('gameCanvas');
    screen = gameCanvas.getContext('2d');

    // add keyboard event listner
    document.addEventListener('keyup', onKeyUp)

    setInterval(function(){
       gameLoop()
    }, 1000 / FPS)
}

function gameLoop(){

    //move the snake/player
    snakePositionX += xVelocity;
    snakePositionY += yVelocity;

    //keep the snake on the canvas - collision with walls
    if(snakePositionX < 0){ // if snake goes beyond left boundary, appear on the right
        snakePositionX = tilesCount - 1;
    }
    if(snakePositionX > tilesCount - 1){ // if snake goes beyond right boundary, appear on the left
        snakePositionX = 0; 
    }
    if(snakePositionY < 0 ){   // if snake goes beyond top boundary, appear at the bottom
        snakePositionY = tilesCount - 1;
    }
    if(snakePositionY > tilesCount - 1){ // if snake goes beyond bottom boundar, appear at the top
        snakePositionY = 0;
    }

    //Game screen background
    screen.fillStyle = '#000';
    screen.fillRect(0, 0, gameCanvas.width, gameCanvas.height);   

    //showing Snake
    screen.fillStyle = 'yellow';

     //loop through the snake body and add all boxes on the screen
     for(let i = 0; i < snakeBoxes.length; i++){
        screen.fillRect(snakeBoxes[i].x * tilesCount, snakeBoxes[i].y * tilesCount, tilesCount -2, tilesCount -2)
    

    //if the snake eat its own body
    if(snakeBoxes[i].x === snakePositionX && snakeBoxes[i].y === snakePositionY){
        tailLength = 4;  // reset the tail length

        //reset the co ordinates to what was the game start
        snakePositionX = 10;
        snakePositionY = 10;
        xVelocity = 0;
        yVelocity = 0;

        score = 0;
    }

   
    }

    //create a snake body by creating every pixel where the player moves
    snakeBoxes.push({x: snakePositionX, y: snakePositionY});

    
    while(snakeBoxes.length > tailLength){
        snakeBoxes.shift(); 
    }
    
    //showing apple
    screen.fillStyle = 'red';
    screen.fillRect(applePositionX * tilesCount, applePositionY * tilesCount, tilesCount - 2, tilesCount - 2);


   

    

    // snake eat apple - re-initiate apple somewhere else on the screen
    //if snake eat apple
    if (snakePositionX === applePositionX && snakePositionY === applePositionY){
        tailLength++;
        applePositionX = Math.floor(Math.random() * tilesCount);
        applePositionY = Math.floor(Math.random() * tilesCount);
        score++;
    }
    screen.font = "14px TimesNewRoman";
    screen.strokeStyle = 'white';
    screen.strokeText(`Score: ${score}`, 10, 20);
}

function onKeyUp(event){
    switch(event.keyCode){
        case 37: //left
            xVelocity = -1; // go left
            yVelocity = 0; // no y axis movement
            break;
        case 38: //up
           xVelocity = 0; // go up
           yVelocity = -1;  // no y axis movement
           break;
        case 39: //right
            xVelocity = 1; // go right
            yVelocity = 0; //no y axis movement
            break;
        case 40: //down
            xVelocity = 0; //no x axis movement
            yVelocity = 1; //go down 
            break;        

    }
}

