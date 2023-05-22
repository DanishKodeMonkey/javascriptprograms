
//Assign myLabel from HTML to a constant in javascript
const myLabel = document.getElementById("myLabel");

setInterval(update, 1000);
//create function for updating the clock
function update(){
    let date = new Date();
    //update HTML element with data from formatTime function, with date as argument.
    myLabel.innerHTML = formatTime(date);
    //nested function to format the time
    function formatTime(date){
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        //check if am or pm
        let amOrPm = hours >= 12 ? "pm" : "am"
        //Convert from military to standard time with a modulus method (internet.. I dunno)
        hours = (hours % 12) || 12;

        //Implement formatZeroes
        hours = formatZero(hours);
        minutes = formatZero(minutes);
        seconds = formatZero(seconds);

        //And finally, the format we want all these pieces in
        return `${hours}:${minutes}:${seconds} ${amOrPm}`
    }
    //Function to add a zero to a single digit time (so it doesnt say 7:1:9)
    //name it formatZero, argument time
    function formatZero(time){
        //time formatted to string
        time = time.toString();
        //if time.length is less than 2, add 0, otherwise return time as is.
        return time.length < 2 ? "0" + time : time;
    }
}