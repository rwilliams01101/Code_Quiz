/*
T  A  C  T  I  C  A  L        E  S  P  I  O  N  A  G  E       A  C  T  I  O  N
 _    _  ___ _____  _    _    ___   ___    _    ____    __    __   _   _  ___
| \  / ||  _|_   _|/ \  | |  / _ \ |  _|  / \  |  _ \  /  \  /  \ | | | ||   \
|  \/  || |   | | / _ \ | | | / \_|| |   / A \ | | | || |\_|| /\ || | | || |\ |
| \  / || |_  | || |_| || | | | __ | |_ | /_\ || |_| | \ \  | || || | | || || |
| |\/| ||  _| | ||  _  || | | ||_ ||  _||  _  ||  _ <   \ \ | || || | | || || |
| |  | || |   | || | | || | | | | || |  | | | || | | | _ \ \| || || | | || || |
| |  | || |_  | || | | || |_| \_/ || |_ | | | || | | || \| || \/ || |_| || |/ |
|_|  |_||___| |_||_| |_||___|\__,_||___||_| |_||_| \_\ \__/  \__/ |___|_||___/
*/


// set variables for current question and score to 0. Will increment up from there.
var currentQuestion = 0;
var score = 0;
var timer = 3;

// declare all the variables!!! or at least a lot of them
var playerInitials = "";
var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var totQuestions = questions.length;
var nextButton = document.getElementById('nextBtn');
var resultCont = document.getElementById('result');
var startBtn = document.querySelector('#startBtn');
var confirmAns = document.querySelector('#confirmAns');
var highScores = document.querySelector('.highScores');
// This would have returned back to the main screen from the High Scores view, ran out of time
var returnToGame = document.querySelector('#returnToGame');

// if time expires, user can retry
function retry() {
    window.location.reload();
}

// timerStart fires loadQuestion and timer
function timerStart() {
    loadQuestion(currentQuestion);
    var interval = setInterval(function () {
        document.getElementById('timer').innerHTML = 'Time Remaining: ' + timer + ' seconds';
        timer--;
        if (timer < -1) {
            clearInterval(interval);
            // if time expires timer stops and timer countdown clears to show reload
            document.getElementById('startBtn').style.display = 'none';
            document.getElementById('retryBtn').style.display = '';
            document.getElementById('timer').innerHTML = '';
            document.getElementById('nextBtn').style.display = 'none';

            return;
        }

    }, 1000);
}

// references ids and replaces text with questions, answers from array
function loadQuestion(questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
};

// when nextBtn is clicked an alert is shown if no answer is selected
// otherwise it checks the answer and returns "correct" or "incorrect"
function loadNextQuestion() {
    var selectedOption = document.querySelector('input[type=radio]:checked')
    if (!selectedOption) {
        alert('!');
        return;
    }

    var answer = selectedOption.value;
    if (questions[currentQuestion].answer == answer) {
        score += 5
        confirmAns.textContent = 'Correct'
    } else {
        (questions[currentQuestion].answer != answer)
        confirmAns.textContent = 'Incorrect'
        timer = timer - 5
    }

    // this advances to the next question/answer array
    selectedOption.checked = false;
    currentQuestion++;

    // if only one question remains, the nextBtn shows "Finish"
    if (currentQuestion == totQuestions - 1) {
        nextButton.textContent = 'Finish';
    }

    // if no questions remain, the total score is shown
    if (currentQuestion == totQuestions) {
        container.style.display = 'none';
        resultCont.style.display = '';
        resultCont.textContent = 'Total Score: ' + score;
        playerInitials = prompt('High Score!!! Enter your initials')
        // this saves the highscorer intials on local storage
        window.localStorage.setItem('highscorer', playerInitials);
        window.localStorage.setItem('scores', score);
        return;
    }


    loadQuestion(currentQuestion);
}

function leaderBoard () {
    container.style.display = 'none';
    resultCont.style.display = '';
    // this recalls the highscorer initials from local storage
    var playerHigh = localStorage.getItem('highscorer')
    var scores = localStorage.getItem('scores')
    // this makes the highscorer information visible when "High Score" is clicked
    highScores.textContent = ("High Scoring Player: "+ playerHigh + "  Score: " + scores);
}



// Event Listener should listen for startBtn click
startBtn.addEventListener('click', timerStart)
highScores.addEventListener('click', leaderBoard)