/* Upon start I need something listening for clicking the startBtn
Once the start button is clicked, I need the timer to fire.
    >Simultaneously, I need the first question to be diplayed, along with the possible answers.

*/

var startBtn = document.querySelector("#startBtn");
var btnA = document.querySelector("#btnA");
var btnB = document.querySelector("#btnB");
var btnC = document.querySelector("#btnC");
var btnD = document.querySelector("#btnD");

let questions = [
    'Did this work', 
    'Are you still going'
]
let answers = [
    'Yes it worked', 
    'I will continue going'
]

function timerStart() {
    var timer = 100;
    var interval = setInterval(function () {
        document.getElementById('timer').innerHTML = "Time Remaining: " + timer + " seconds";
        timer--;
        if (timer === 0) {
            clearInterval(interval);
            document.getElementById('timer').innerHTML = 'Done';
            // or...
            alert("You ran out of time!");
        }
    }, 1000);
}

// function displayQuestions() {
//     prompt(answers[1])
// }

startBtn.addEventListener("click", timerStart)
// btnA.addEventListener("click", displayQuestions)
// btnB.addEventListener("click", timerStart)
// btnC.addEventListener("click", timerStart)
// btnD.addEventListener("click", timerStart)

