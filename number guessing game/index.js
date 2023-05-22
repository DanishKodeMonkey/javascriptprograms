
//Create constant called answer, generate a random number between 1-10, and round it with floor
const answer = Math.floor(Math.random() * 10 + 1);
//create variable starting at 0
let guesses = 0;

//Fetch the element from HTML called submitButton, when clicked, execute function
document.getElementById("submitButton").onclick = function(){
    //When executed, get value from guessField, assign to new guess variable.
    let guess = document.getElementById("guessField").value
    //itterate guesses by 1
    guesses+=1;
    //if statement checking if the answer is correct, and notifies user by alert.
    if (guess == answer){
        alert(`${answer} is the number! It took you ${guesses} guesses!`);
    }
    else if (guess < answer){
        alert("Too small");
    }
    else{
        alert("Too large!");
    }
    //Cycle repeats after each press of submit button.



}