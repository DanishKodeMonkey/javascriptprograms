
//For the pong game, we need some constants
//A constant for the gameboard, so we can call it in javascript
const gameBoard = document.querySelector("#gameBoard");
//a constant for the context, so we can draw on the gameboard
const ctx = gameBoard.getContext("2d");
//One for the scoretext
const scoreText = document.querySelector("#scoreText");
//The reset button, all so we can call them in javascript
const resetBtn = document.querySelector("#resetBtn");
//And some constants for the game window size.
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
//Then some styling and color, see the below stuff as the config file.
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
//some adjustmentable values.
const ballRadius = 12.5;
const paddleSpeed = 50;
//A temp variable to call the interval later
let intervalID;
//A temp value to determine the current speed of the ball
let ballSpeed = 1;
//These will be the starting location of the ball, this will make it appear in the center
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
//The current direction the ball is heading
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
//Make a paddle object.
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
//Another one
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

//now for listeners
//one to watch for keystrokes on the keyboard
window.addEventListener("keydown", changeDirection);
//one for the resetbutton
resetBtn.addEventListener("click",resetGame);

//Evoke gameStart
gameStart();
drawPaddles();
//Now for functions
//This will handle starting each game, invoking functions basically
function gameStart(){
    createBall();
    nextTick();
};
//This will be the function that moves the game forward
function nextTick(){
    //Every tick (10 ms), the following will happen
    intervalID = setTimeout(() =>{
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();

    },10)
};
//This redraws the canvas
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight)
};
//This will handle spawning the paddles
function drawPaddles(){
    //Set stroke style to pre-defined paddleBorder
    ctx.strokeStyle = paddleBorder;
    //spawn paddle 1, followwing pre-defined config.
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    //spawn paddle 2, following pre-defined config
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
};
//Spawwns the ball
function createBall(){
    //set ballSpeed to 1, it moves.
    ballSpeed = 1;
    //pick a random number between -1 and 1. if its 1
    if(Math.round(Math.random()) == 1){
        //move the ball right
        ballXDirection = 1;
    }
    else{
        //move the ball left
        ballXDirection = -1;
    }
    //repeat for Y
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    //once spawned, set it in the middle
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    //And draw it!
    drawBall(ballX, ballY);

};
//Moves the ball
function moveBall(){
    //set the ball direction, to a random direction
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
//This will handle the ball graphic
function drawBall(ballX, ballY){
    //Long story short, it spawns the ball
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX,ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
//This keeps track of collisions
function checkCollision(){
    //If the ball Y coordinate is less than coordinates 0 on Y axis + ballRadius
    if(ballY <= 0 + ballRadius){
        //reverse direction
        ballYDirection *= -1;
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    //if ballX is less than 0, then it passed the goal, and player 2 scores
    if(ballX <= 0){
        //increment player 2 score
        player2Score+=1;
        //update score text
        updateScore();
        //create new ball
        createBall();
        return;
    }
    //same here for player 1.
    if(ballX >= gameWidth){
        //increment player 1 score
        player1Score+=1;
        //update score text
        updateScore();
        //create new ball
        createBall();
        return;
    }
    //Now for bouncing the paddles
    //First check if the ball X coordinate hits the paddle
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        //Then check if the ball Y coordinate hits the paddle
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            //SOME DEBUGGING! If ball got stuck it woudl go nuts! Found this on net:
            ballX = (paddle1.x + paddle1.width)+ballRadius; //if ball gets stuck
            //if so, reverse direction
            ballXDirection *= -1;
            //and increase speed.
            ballSpeed += 1;
        }
    }
    //repeat for paddle 2
    if(ballX >= (paddle2.x - ballRadius)){
        //Then check if the ball Y coordinate hits the paddle
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius; //if ball gets stuck
            //if so, reverse direction
            ballXDirection *= -1;
            //and increase speed.
            ballSpeed += 1;
        }
    }
};
//This will be in charge of moving the paddles
function changeDirection(event){
    //We fetch the keycodes for the buttons we need: WS and UParrow DOWNarrow.
    const keyPressed = event.keyCode;
    //assign the keycodes for easy reference
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down= 40;

    //Make a switch to track the keystrokes.
    switch(keyPressed){
        case(paddle1Up):
        //If the paddle is not moving the opposite way, and is inside the border. Move
        if(paddle1.y > 0){
            paddle1.y -= paddleSpeed;
        }
        break;
        case(paddle1Down):
        if(paddle1.y < gameHeight - paddle2.height){
            paddle1.y += paddleSpeed;
        }
        break;
        case(paddle2Up):
        //If the paddle is not moving the opposite way, and is inside the border. Move
        if(paddle2.y > 0){
            paddle2.y -= paddleSpeed;
        }
        break;
        case(paddle2Down):
        if(paddle2.y < gameHeight - paddle2.height){
            paddle2.y += paddleSpeed;
        }
        break;
    }
};
//Handles showing the score
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`
};
//And reset the game values
function resetGame(){
    //reset score
    player1Score = 0;
    player2Score = 0;
    //reset paddles
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};