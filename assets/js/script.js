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
    question: "What does HTML stand for",
    answers: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
    corrAnswer: "Hyper Text Markup Language"
};

var question1 = {
    question: "What does CSS stand for?",
    answers: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
    corrAnswer: "Cascading Style Sheet"
};

var question2 = {
    question: "The condition in an if / else statement is enclosed with:",
    answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    corrAnswer: "Parenthesis"
};

var question3 = {
    question: "Arrays in JavaScript can be used to store:",
    answers: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
    corrAnswer: "All of the above"
};

var question4 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
    corrAnswer: "console.log"
};

var questionList = [question0, question1, question2, question3, question4];
var questionNumb = 0;


// intro
var intro = function() {
    // resets functions for replayibility
    borderEl.innerHTML = "";
    timer = 0;
    timerEl.innerHTML = "Timer: " + timer;
    questionNumb = 0;
    
    // creates subtitle
    var titleEl = document.createElement("div");
    titleEl.textContent = "Coding Quiz Challenge";
    titleEl.className = "title";
    borderEl.appendChild(titleEl);

    // creates instructions
    var instructionsEl = document.createElement("div");
    instructionsEl.innerHTML = "Try to answer the following code-related questions within the time limit.<br> Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    instructionsEl.className = "instructions";
    borderEl.appendChild(instructionsEl);

    // creates start button to begin the game
    var startBtnEl = document.createElement("button");
    startBtnEl.textContent = "Start Quiz!";
    startBtnEl.className = "start-btn btn";
    borderEl.appendChild(startBtnEl);
};

// startBtn is clicked
var startBtn = function() {
    timer = 50; // time set to 50 so that player can't get any points if all answers are answered incorrectly
    timerEl.innerHTML = "Timer: " + timer;
    var timerInterval = setInterval(function() {
        if (timer < 0) { // prevents time/score to become negative
            timer = 0
            resultPage();
        }
        if (timer === 0 || timerFlag === 1) { // if timer goes to 0, ends the game and skips remaining questions to result page
            clearInterval(timerInterval);
        }
        if (timer > 0) {
            timer = timer - 1;
        }
        timerEl.innerHTML = "Timer: " + timer;
    }, 1000);

    // runs questions() function
    questions();
};

// lists questions and answer choices
var questions = function() {
    borderEl.innerHTML = "";
    var questionEl = document.createElement("div");
    questionEl.className = "title";
    borderEl.appendChild(questionEl);
    questionEl.textContent = questionList[questionNumb].question;

    var answerChoicesEl = document.createElement("ol");
    answerChoicesEl.className = "answer-list"
    borderEl.appendChild(answerChoicesEl);
    for (var i = 0; i < 4; i++) {
        var answerChoiceEl = document.createElement("li");
        answerChoiceEl.className = "answer-choices";
        answerChoiceEl.textContent = questionList[questionNumb].answers[i];
        answerChoicesEl.appendChild(answerChoiceEl);
    }

    questionList[questionNumb].question.className = "title";

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
    finalScoreEl.className = "info"
    borderEl.appendChild(finalScoreEl);

    var initialsEl = document.createElement("form");
    initialsEl.innerHTML = "Enter Initial: <input type='text' name='score-name'/> <button class='submit btn' type='submit'>Submit</button>";
    initialsEl.className = "enterInitial"
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
    
    var highScoreListEl = document.createElement("ol");
    highScoreListEl.className = "leaderboard-table"
    borderEl.appendChild(highScoreListEl);
    for (var i = 0; i < 5; i++) {
        var topHighScoresEl = document.createElement("li");
        topHighScoresEl.className = "leaderboard";
        highScoreListEl.appendChild(topHighScoresEl);
        topHighScoresEl.textContent = loadedHighScores[i].initial + " - " + loadedHighScores[i].score;
    }

    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    goBack.className = "btn-back btn";
    borderEl.appendChild(goBack);

    var clearScore = document.createElement("button");
    clearScore.textContent = "Clear Score";
    clearScore.className = "btn-clear btn";
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