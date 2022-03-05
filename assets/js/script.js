var introEl = document.querySelector(".intro");
var scoreEl = document.querySelector(".score");
var borderEl = document.querySelector(".border");
var pageContentEl = document.querySelector("body");
var timerEl = document.querySelector(".timer");
var timerFlag = 0;

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

var questionList = ["question0", "question1", "question2", "question3", "question4"]

// intro
var intro = function() {
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
    var timer = 75;
    timerEl.innerHTML = "Timer: " + timer;
    var timerInterval = setInterval(function() {
        timer = timer - 1;
        timerEl.innerHTML = "Timer: " + timer;
        if (timer === 0 || timerFlag === 1) {
            clearInterval(timerInterval);
        }
    }, 1000);


};

// lists questions and answer choices
var questions = function() {

}

// View High Score is clicked
var score = function() {

};

// taskHandler to handles which function to run depending on user's target
var taskHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        startBtn();
    }

    if (targetEl.matches(scoreEl)) {
        score();
    }
};

// calls intro function
intro();

// eventListener calls taskHandler
pageContentEl.addEventListener("click", taskHandler);