var introEl = document.querySelector(".intro");
var scoreEl = document.querySelector(".score");
var borderEl = document.querySelector(".border");
var resultsEl = document.querySelector(".results");
var pageContentEl = document.querySelector("body");
var timerEl = document.querySelector(".timer");
var timerFlag = 0;
var timer;
var loadedHighScores = [];

// questions
var question0 = {
    question: "Test Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    corrAnswer: "Answer 2"
};

var question1 = {
    question: "Test Question 2",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    corrAnswer: "Answer 3"
};

var question2 = {
    question: "Test Question 3",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    corrAnswer: "Answer 1"
};

var question3 = {
    question: "Test Question 4",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    corrAnswer: "Answer 4"
};

var question4 = {
    question: "Test Question 5",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    corrAnswer: "Answer 2"
};

var questionList = [question0, question1, question2, question3, question4];
var questionNumb = 0;


// intro
var intro = function() {
    borderEl.innerHTML = "";
    timer = 0;
    timerEl.innerHTML = "Timer: " + timer;
    questionNumb = 0;
    var titleEl = document.createElement("div");
    titleEl.textContent = "Coding Quiz Challenge";
    titleEl.className = "title";
    borderEl.appendChild(titleEl);

    var instructionsEl = document.createElement("div");
    instructionsEl.innerHTML = "Try to answer the following code-related questions within the time limit.<br> Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    instructionsEl.className = "instructions";
    borderEl.appendChild(instructionsEl);

    var startBtnEl = document.createElement("button");
    startBtnEl.textContent = "Start Quiz!";
    startBtnEl.className = "start-btn";
    borderEl.appendChild(startBtnEl);
};

// startBtn is clicked
var startBtn = function() {
    timer = 60;
    timerEl.innerHTML = "Timer: " + timer;
    var timerInterval = setInterval(function() {
        if (timer < 0) {
            timer = 0
            resultPage();
        }
        if (timer === 0 || timerFlag === 1) {
            clearInterval(timerInterval);
        }
        if (timer > 0) {
            timer = timer - 1;
        }
        timerEl.innerHTML = "Timer: " + timer;
    }, 1000);

    questions();
};

// lists questions and answer choices
var questions = function() {
    borderEl.innerHTML = "";
    borderEl.textContent = questionList[questionNumb].question;

    var answerChoicesEl = document.createElement("ol");
    borderEl.appendChild(answerChoicesEl);
    for (var i = 0; i < 4; i++) {
        var answerChoiceEl = document.createElement("li");
        answerChoiceEl.className = "answer-choices";
        answerChoiceEl.textContent = question0.answers[i];
        answerChoicesEl.appendChild(answerChoiceEl);
    }

    var resultEl = document.createElement("div");
}

// checks if user answer is right or wrong and if there are more questions in the quiz
var results = function(event) {
    if (event.textContent === questionList[questionNumb].corrAnswer) {
        resultsEl.textContent = "Right!";
    }
    else {
        resultsEl.textContent = "Wrong!";
        timer = timer - 10;
    }

    if (questionNumb < 4) {
        questionNumb = questionNumb + 1;
        questions();
    }
    else {
        timerFlag = 1;
        resultPage();
    }
}

// result page
var resultPage = function() {
    // Let's user know that the game is over and timer stops
    borderEl.innerHTML = "";
    var endingTitleEl = document.createElement("div");
    endingTitleEl.textContent = "All done!";
    endingTitleEl.className = "title";
    borderEl.appendChild(endingTitleEl);

    var score = timer - 1; // for offset in timer
    if (score < 0) {
        score = 0
    }
    var finalScoreEl = document.createElement("div");
    finalScoreEl.textContent = "Your final score is " + score + "!";
    borderEl.appendChild(finalScoreEl);

    var initialsEl = document.createElement("form");
    initialsEl.innerHTML = "Enter Initial: <input type='text' name='score-name'/> <button class='submit' type='submit'>Submit</button>";
    borderEl.appendChild(initialsEl);
};

var saveScore = function(event) {
    event.preventDefault();
    var initial = document.querySelector("input[name='score-name']").value;
    if (!initial) {
        alert("You need to enter a valid initial!")
        return false;
    }

    var highScores = {
        initial: initial,
        score: timer
    };

    for (var i = 0; i < 5; i++) {
        if (highScores.score > loadedHighScores[i].score) {
            loadedHighScores.splice(i, 0, highScores);
            if (loadedHighScores.length > 5) {
                loadedHighScores.pop();
            }
            break;
        }
    }

    localStorage.setItem("highScores", JSON.stringify(loadedHighScores));
    highScore();
};


// View High Score is clicked or submit button at end of game
var highScore = function() {
    timer = 0;
    timerEl.innerHTML = "Timer: " + timer;
    borderEl.innerHTML = "";
    resultsEl.innerHTML = "";
    var highScoreTitle = document.createElement("div");
    highScoreTitle.textContent = "High Scores";
    highScoreTitle.className = "title";
    borderEl.appendChild(highScoreTitle);
    
    var highScoreList = document.createElement("ol");
    borderEl.appendChild(highScoreList);
    for (var i = 0; i < 5; i++) {
        var topHighScores = document.createElement("li");
        highScoreList.appendChild(topHighScores);
        topHighScores.textContent = loadedHighScores[i].initial + " - " + loadedHighScores[i].score;
    }

    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    goBack.className = "btn-back";
    borderEl.appendChild(goBack);

    var clearScore = document.createElement("button");
    clearScore.textContent = "Clear Score";
    clearScore.className = "btn-clear";
    borderEl.appendChild(clearScore);
};

// clear high score
var clearHighScores = function() {
    var confirmClear = window.confirm("Are you sure you want to clear the leaderboard?");
    if (confirmClear) {
        for (var i = 0; i < 5; i++) {
            loadedHighScores[i].score = 0;
            loadedHighScores[i].initial = "??";
        }
        localStorage.setItem("highScores", JSON.stringify(loadedHighScores));
        highScore();
    }
    return false;
};

// taskHandler to handles which function to run depending on user's target
var taskHandler = function(event) {
    var targetEl = event.target;
    
    if (targetEl.matches(".start-btn")) {
        startBtn();
    }
    
    if (targetEl.matches(".answer-choices")) {
        results(targetEl);
    }
    
    if (targetEl.matches(".submit")) {
        saveScore(event);
    }
    
    if (targetEl.matches(".score")) {
        highScore();
    }

    if (targetEl.matches(".btn-back")) {
        intro();
    }

    if (targetEl.matches(".btn-clear")) {
        clearHighScores();
    }
};


// function to check localStorage if not create empty list
var loadHighScores = function() {
    var currScore = JSON.parse(localStorage.getItem("highScores"));
    if (!currScore) {
        for (var i = 0; i < 5; i++) {
            var highScoreObj = {
                initial: "??",
                score: 0
            };
            loadedHighScores.push(highScoreObj);
        }
        return false;
    }
    loadedHighScores = currScore;
}
// calls intro function
intro();

// calls loadHighScores
loadHighScores();

// eventListener calls taskHandler
pageContentEl.addEventListener("click", taskHandler);