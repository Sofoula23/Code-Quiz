// Gathering HTML elements for manipulation
var quizBody = document.getElementById("quiz");
console.log(quizBody) 
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "How many colors can you create out one color?",
    choiceA: "Only 3",
    choiceB: "6",
    choiceC: "256",
    choiceD: "100",
    correctAnswer: "c"},
  {
    question: "What is the meaning of color scheme?",
    choiceA: "Arrangement or combination of colors",
    choiceB: "The amount of color one can see",
    choiceC: "Different ways of perceiving color",
    choiceD: "A trap for color blind people",
    correctAnswer: "a"},
   {
    question: "How can you make color purple from other colors?",
    choiceA: "Lilac + Blue",
    choiceB: "Blue + Red",
    choiceC: "Red + Green",
    choiceD: "Blue + Orange",
    correctAnswer: "b"},
    {
    question: "What things cause people to go Red?",
    choiceA: "Allergies, fever, sadness",
    choiceB: "sunburn, eating tomatoes, heat",
    choiceC: "sweets, self-esteem, tiredness",
    choiceD: "heat, allergies, anger",
    correctAnswer: "d"},
    {
    question: "What is the most edible color?",
    choiceA: "Brilliant blue",
    choiceB: "Dark brown",
    choiceC: "Rosie red",
    choiceD: "Sunny yellow",
    correctAnswer: "a"},  
    {
    question: "What is the saddest color?",
    choiceA: "brown",
    choiceB: "blue",
    choiceC: "gray",
    choiceD: "peach",
    correctAnswer: "c"},
    {
    question: "What is the most popular color?",
    choiceA: "pink",
    choiceB: "blue",
    choiceC: "red",
    choiceD: "green",
    correctAnswer: "b"},
        
    
    ];
// Other variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore 
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        timeLeft -= 15;
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        
        
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
