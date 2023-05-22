//SO! Making a stopwatch, styled in CSS, placed in HTML


//Here we fetch the different elements from the HTML, and assign them a constant
const timeDisplay = document.querySelector("#timeDisplay")
const startBtn = document.querySelector("#startBtn")
const pauseBtn = document.querySelector("#pauseBtn")
const resetBtn = document.querySelector("#resetBtn")

//Here is the variables that were gonna need.
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

//From here, we catch a click event on the buttons from the HTML, and execute a function.
startBtn.addEventListener("click", () => {
    //If paused is true
    if(paused){
        //set paused to false
        paused = false;
        //Returns current time in ms - elapsedTime
        startTime = Date.now() - elapsedTime
        //Set the update interval of the clock, 1000 ms(1 second) sounds good
        intervalId = setInterval(updateTime, 1000)
    }
});

//Now for the pause button.
pauseBtn.addEventListener("click", () => {
    //if paused is NOT true
    if(!paused){
        //set paused to true
        paused=true;
        //set elapsedTime to the current time in ms - startTime
        elapsedTime = Date.now() - startTime;
        //clearInterval to stop the clock.
        clearInterval(intervalId);
    }
});

//And now for the reset button
resetBtn.addEventListener("click", () => {
    //Set paused to true
    paused = true;
    //clearInterval to stop the clock
    clearInterval(intervalId);
    //set all the counters back to 0
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    //and reset the display
    timeDisplay.textContent = "00:00:00"
});

//And finally, updateTime. THis handles the actualy counter.
function updateTime(){
    //elapsedTime is whatever time it is now in ms - startTime
    elapsedTime = Date.now() - startTime;

    //These will round down whatever value elapsedTime has, and convert
    //the value from ms, to seconds, minutes, and hours. MATH!
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    //Here, there is added some zeroes to make sure it doesnt say things like 1:23:4
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    //Update the text content, with whatever value hrs, mins, and secs currently has.
    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    //the function that adds the 0 padding, it accepts a unit(secs, mins, hrs)
    function pad(unit){
        //It basically returns unit with a 0 in front of it, as long as its value is not 2 long.
        return(("0") + unit).length > 2 ? unit : "0" + unit;
    }
}
