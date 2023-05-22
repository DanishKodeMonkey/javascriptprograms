//To make a random number generator we use math... the function
//Lets make some dice rollers actually!



//See HTML on how to throw results into the DOM
//to execute the function, we use javascript

document.getElementById("rollButton").onclick = function(){
//4 dice
    let a = Math.floor(Math.random() * 4) + 1;
//6 dice
    let b = Math.floor(Math.random() * 6) + 1;
//10 dice
    let c = Math.floor(Math.random() * 10) + 1;
//20 dice
    let d = Math.floor(Math.random() * 20) + 1;
//display results in labels a,b,c, and d
document.getElementById("alabel").innerHTML = a;
document.getElementById("blabel").innerHTML = b;
document.getElementById("clabel").innerHTML = c;
document.getElementById("dlabel").innerHTML = d;

}
