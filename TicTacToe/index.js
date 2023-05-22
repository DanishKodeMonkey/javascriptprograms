

//SO! A tic tac toe game, aside from the styling of CSS, and layout of HTML.
//here is the actual UTILITY!

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
//This will be a constant of all win conditions.
//This can be done in a 2d array
const winConditions = [
    //each array here resembles a possible win condition, combination of cells
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//options will be placeholders for the empty cells, so 9 empty strings.
let options = ["","","","","","","","",""];
//A variable to keep track of the current player
let currentPlayer = "X";
//and a variable to handle if the game is running.
let running = false;

initializeGame();

//TIME FOR FUNCTIONS!
//NOW, a function to start the game,
//this will handle the setup before starting
function initializeGame(){
    //for EACH CELL, add a event listener, when any cell is clicked, initialise cellClicked
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    //add event listener to restartBtn, invoke restartGame
    restartBtn.addEventListener("click", restartGame)
    //And update the text to tell whos turn it is
    statusText.textContent = `${currentPlayer}'s turn`;
    //Aaand start the game!
    running = true;
}
//This function will handle the event of clicking on a cell
function cellClicked(){
    //This will handle checking the cell if it is a placeholder(empty) or not.
    const cellIndex = this.getAttribute("cellIndex")
    //if the chosen option is not blank, or the game is not running. Dont do anything.
    if(options[cellIndex] != "" || !running){
        return;
    }
    //Otherwise, invoke updateCell with the cell index
    updateCell(this, cellIndex)
    //and invoke the checkWinner function
    checkWinner();
}
//This will handle updating the cells content when called
function updateCell(cell, index){
    //update the placeholders at the index, to the value of CurrentPlayer (X or O)
    options[index] = currentPlayer;
    //update the text content
    cell.textContent = currentPlayer;
}
//This will handle the switch between players
function changePlayer(){
    //set current player to, if current player is X, then change to O, otherwise X.
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    //and update the text!
    statusText.textContent = `${currentPlayer}'s turn`;
}
//now for the big one: Checking for a winner!
function checkWinner(){
    //We will make a bool switch here, if roundWon is true, well ... someone won! So it starts false
    let roundWon = false;
    //We will itterate through all the possible win conditions in our 2d array
    //itteration starts at 0, continue as long as I is less than winConditions.length, and increment by 1.
    for(let i = 0; i < winConditions.length; i++){
        //To do this, we will store each array in a tempoairy variable
        const condition = winConditions[i];
        //each itteration will check 3 cells of each condition in the inner arrays of the 2d array if they have matching text.
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        //If cell A, B or C are empty... then theres no winner, continue.
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        //If cell A, matches celLB, and cell B matches cell C.... WELL!
        if(cellA == cellB && cellB == cellC){
            //We gotta winner, flip the switch!
            roundWon = true;
            break;
        }
    }
    //Now if roundWon is true, then:
    if(roundWon){
        //update the status text
        statusText.textContent = `${currentPlayer} wins!`
        //switch off the game!
        running = false;
    }
    //If a draw has occours, and we will check this by seeing if any options include no empty spaces
    else if(!options.includes(""))
    statusText.textContent = `Draw!`;

    //If nothing above applies, invoke changePlayer
    else{
        changePlayer()
    }
}

//Finally, the restartbutton. 
function restartGame(){
    //We effectively reset all variables to what they started as.
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "")
    running = true;
}
