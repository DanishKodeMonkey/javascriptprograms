//So, for the snake game we will need alot of variables

//A constant to hold the gameboard
const gameBoard = document.querySelector("#gameBoard");
//One for the context of the canvas (ctx, short for context)
const ctx = gameBoard.getContext("2d");
//one for the score display
const scoreText = document.querySelector("#scoreText");
//one for the button
const resetBtn = document.querySelector("#resetBtn");
//And a couple to hold the game window size.
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
//Below are various color configurations of different elements
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
//Size of elements, the snake and food
const unitSize = 25;
//A check switch for running the game
let running = false;
//These will handle the velocity that the snake moves across the screen.
//We set that to unitSize(size of the snake)
let xVelocity = unitSize;
let yVelocity = 0;
//These will be used to calculate a random location later
let foodX;
let foodY;
//the storage of the score, start at 0
let score = 0;
//Then we need our snake, the parts of the snake is stored in an array.
//We will initially spawn 5 parts to the snake, each part lining up behind the last.
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

//Initially, we will add two listeners, one that will listen to the keyboard presses, and evoke changeDirection
window.addEventListener("keydown", changeDirection);
//And another to evoke the resetGame function, when resetBtn is clicked.
resetBtn.addEventListener("click", resetGame);

//evoke game start.
gameStart();
//Below are the different functions I use

//This handles setting the pieces of the game in motion
function gameStart(){
    //set the game to run
    running= true;
    //set the scoreText to display teh score
    scoreText.textContent = score;
    //invoke the functions to start the game
    createFood();
    drawFood();
    nextTick();
};
//nextTick handles the update of the game
//it effectively moves the game forward
function nextTick(){
    //if the game is running
    if(running){
        //set a timeout, that each 100 ms evokes a bunch of functions
        setTimeout(()=>{
            //Clear the board
            clearBoard();
            //draw some food
            drawFood();
            //move the snake coords
            moveSnake();
            //Draw the snake at new coords
            drawSnake();
            //check if the game is over
            checkGameOver();
            //repeat
            nextTick();
        }, 100)
    }
    //Otherwise, its game over
    else{
        displayGameOver();
    }

};
//
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)
};
//creatFood will manage spawning the food somewhere on the game board
function createFood(){
    //The inner function will generate the coordinates that the food will spawn
    function randomFood(min, max){
        //The number is randomly generated, rounded, and limited to within the max and min parameter.
        //The math here goes as follows: unitSize is set to 25 at the moment
        //Math.random picks any number between max and Min, 
        //and divides it by unitSize, this creates fields that the snake fits in, seperating the board
        //into equal cells. And to accurately place a food item in the corners, we will multiply by unitSize as well
        //This effectively makes 25 equal sized fields on the game board that the food can spawn in, and the snake can fetch.
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        //return a random number.
        return randNum;

    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
//This function handles the graphic of the food item.
function drawFood(){
    //It simply creates a red rectangle, at the randomly
    //generated foodX and foodY, with the same size as the snake, unitSize
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
//Function to handle snake movement
//To move the snake will create a new head every tick, and remove the tail.
function moveSnake(){
    //constant to hold the snake head
    const head =   {x: snake[0].x + xVelocity,
                    y: snake[0].y + yVelocity}
    //generate a new head with unshift, generating a new head at the top of the array.         
    snake.unshift(head);
    //to elemenate the tail we use an if else statement
    //if the snake head overlaps with the food item.
    if(snake[0].x == foodX && snake[0].y == foodY){
        //increment the score
        score += 1;
        //update teh score
        scoreText.textContent = score;
        //evoke createFood
        createFood();

    }
    //else will remove the tail with pop to remove the last part of the array every time
    else{
        snake.pop();
    }
};
//Function to handle the graphic render of the snake
function drawSnake(){
    //Generate the snake with the ste colors and borders
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    //open the array of snake we made above with forEach
    //for each snake part, do this:
    snake.forEach(snakePart => {
        //fill a rectangle at the current snakeparts location, with the unitsize size on x and y
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
//Function that handles control of the snake, accepts one parameter: event(from keypress)
function changeDirection(event){
    //fetched keycodes for arrow keys, assigned them to constants.
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    //constants to check what direction snake is going.
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    //Now we use a switch to do some condition checks on directions.
    switch(true){
        //if left key is pressed, and snake is not going right, go ahead.
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        //etc
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        //etc
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        //etc
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }

};
//Check if we game over
function checkGameOver(){
    //We will use a switch to check if any condition is true:
    switch(true){
        //if the head of the snake reaches coordinates of the walls. Stop the game.
        case (snake[0].x <0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y <0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    //to check if the snake hits itself
    //use a for loop to itterate each of the snakes parts
    for(let i = 1; i < snake.length; i += 1){
        //if any part matches the head of the snakes coordinates
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        //game over
        running = false;
        break;
    }
};
//Some simple text-on-screen action for gameover.
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
};
//And some function to the reset button
function resetGame(){
    //Basically reset the different values to how they started.
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    //and start again!
    gameStart();
};

