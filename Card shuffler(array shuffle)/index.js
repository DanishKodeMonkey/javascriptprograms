
//First, an array. Just going with one face of cards.
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

//invoke shuffle, input cards.
shuffle(cards);

//show the top card.
console.log(cards[0]);

//To shuffle the array, we can use a function:
function shuffle(array){
    //to start, we begin shuffling at the end of the array
    let currentIndex = array.length;
    // using a while loop. As long as currentIndex is not equal to 0 in array.
    while(currentIndex != 0){
        //So we will swap the last index item, with another one, and do this again for
        //the next to last index, etc.
        let randomIndex = Math.floor(Math.random() * array.length)
        //for each itteration, go to the next index from last.
        currentIndex-=1
        //and store the processed cards tempoarily
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temp;
    }
    //return to array to use later.
    return array;
}