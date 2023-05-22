
//For the rock paper scissors game we will need to fetch the HTML elements
//and assign them to constants
const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
//note that choicesbtns fetches all queryselectors of the class choiceBtn.
const choicesBtn = document.querySelectorAll(".choiceBtn");

//We will need some variables for the choices of the player and computer, and a result.
let player;
let computer;
let result;

//For the choices buttons, we will add event listeners to all 3 buttons.
choicesBtn.forEach(button => button.addEventListener("click", () =>{
    //when a button is clicked, whatever text is in that button element
    //will be assigned to player.
    player = button.textContent;
    //Then, we invokes the computers turn.
    computerTurn();
    //Then we update the text on the HTML document:
    playerText.textContent = `Player: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    resultText.textContent = checkWinner();
}));

//This function handles the computers turn.
function computerTurn(){
    //This constant will hold a random number, between 1 and 3, that is rounded down.
    const randNum = Math.floor(Math.random() * 3) + 1;

    //This switch will then determine the computers choice, based on the random number
    switch(randNum){
        case 1:
            computer = "Rock";
            break;
        case 2:
            computer = "Paper";
            break;
        case 3:
            computer = "Scissors";
            break;
    }

}

//And for the win condition function
function checkWinner(){
    //A else if loop.
    //If player is the same as computer its a draw
    if(player == computer){
        return "Draw!";
    }
    //Otherwise, match the different cases, if comptuer chooses rock, and player chooses paper, then player wins, if not, then player lose.
    else if(computer == "Rock"){
        return (player == "Paper") ? "You Win!" : "You Lose!"
    }
    //etc
    else if(computer == "Paper"){
        return (player == "Scissors") ? "You Win!" : "You Lose!"
    }
    //etc
    else if(computer == "Scissors"){
        return (player == "Rock") ? "You Win!" : "You Lose!"
    }
}