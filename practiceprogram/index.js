

/*
For this experiment I will put into practise what I have learned so far, with an example granted from the net.
Particularly the math function.
I will create a small program that will find the hypotenus of a object.
*/

//For reference, the formular is as follows
// c = sqrt(a^2 + b^2)


//First, we define the variables we will need, the 3 lengths.

let a;
let b;
let c;
/* EASY WAY! Clear comment for test.
//lets try the easy way first.

//ask the user to input side As length
a = window.prompt("Enter side A");
//convert that to a number
a = Number(a)

//same with B side
b = window.prompt("Enter side B");
b = Number(b)

//Then math it up with the formula and math tools
//You can practically see the formula in javascript here!
c = Math.sqrt(Math.pow(a,2) + Math.pow(b, 2));

//Result to console
console.log("Side C: ", c);
*/

//for the HARDCORE MODE! we will need some html textboxes, to the HTML!
//As for THIS side we will need to fetch the input and do the calculatin

//Fetch a element caled submitbutton, on click execute a function.
document.getElementById("submitButton").onclick = function(){

    //Notice some similarities?

    //Get the value of aTextBox, and assign it to a.
    a =  document.getElementById("aTextBox").value;
    //convert that to a number
    a = Number(a)

    //same with B side
    b = document.getElementById("bTextBox").value;
    b = Number(b)

    //Then math it up with the formula and math tools
    //You can practically see the formula in javascript here!
    c = Math.sqrt(Math.pow(a,2) + Math.pow(b, 2));

    //Result to html page.
    document.getElementById("cLabel").innerHTML = "Side C: " + c;

}