// Quiz questions and answers
const quizQuestions = [
    {
      question: "Commonly used data types do NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      question: "Arrays in JavaScript can be used to store _____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },
    {
      question: "String values must be enclosed within ____ when being assigned to variables:",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
      answer: "console.log"
    },
    {
      question: "The condition in an if/else statement is enclosed within ____.",
      choices: ["curly brackets", "quotes", "parentheses", "square brackets"],
      answer: "curly brackets"
    }
  ];
  
  // Global variables for the quiz
  let currentQuestionIndex = 0;
  let timeLeft = 75;
  let timerId;
  let resultEl = document.getElementById("result");
  let playerScore = 0;
  let highScores = JSON.parse(localStorage.getItem("key")) || []

  console.log(highScores);
  // Function to start the quiz
  function startQuiz() {
    playerScore = 0;
    timeLeft = 75;
    currentQuestionIndex = 0;
    document.getElementById("no-high-scores").classList.add("hide")
    document.getElementById("result").classList.add("hide");
    document.getElementById("high-scores").classList.add("hide");
    // Hide the intro section and show the questions section
    document.getElementById("intro").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    displayQuestion();
    // Start the timer
    timerId = setInterval(updateTimer, 1000);
  }
  
  // Function to display question
  function displayQuestion() {
    document.getElementById("question-text").textContent = quizQuestions[currentQuestionIndex].question;
    document.getElementById("choices").innerHTML = "";

    quizQuestions[currentQuestionIndex].choices.forEach(function(choice) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.onclick = checkAnswer;
      document.getElementById("choices").appendChild(choiceButton);
    });
  }
  
  // Function to check the answer
  function checkAnswer(event) {

    document.getElementById("feedback").classList.remove("hide");
    const selectedAnswer = event.target.textContent;
    // Check if the answer is correct
    if (selectedAnswer === quizQuestions[currentQuestionIndex].answer) {
      // Display feedback that the answer is correct
      document.getElementById("feedback").textContent = "Correct!";
      currentQuestionIndex++;
      playerScore++;
      // Check if all questions have been answered
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    } else {
      // Display feedback that the answer is incorrect
      document.getElementById("feedback").textContent = "Incorrect!";
      // Subtract 5 seconds from the timer
      timeLeft -= 5;
      currentQuestionIndex++;
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
      // Check if the timer has reached 0
      if (timeLeft <= 0) {
        // End the quiz
        endQuiz();
      }
    }
  }
  
  // Function to update the timer
  function updateTimer() {

    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    // End quiz if timer reaches 0
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
  
  function saveScore() {

    var initials = document.getElementById("user-initials").value;
    highScores.push({
      initials: initials, 
      score: playerScore
    })
    highScores.sort((a,b) => b.score - a.score);

    localStorage.setItem("key", JSON.stringify(highScores))
    localStorage.getItem("key")
    highScores = JSON.parse(localStorage.getItem("key"))

    displayScores();
  }
  // Function to end the quiz
  function endQuiz() {
    document.getElementById("feedback").classList.add("hide");
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("result").classList.remove("hide");

    clearInterval(timerId);
    document.getElementById("time-remaining").textContent = timeLeft;
    
    let finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = playerScore;
  }

  function displayScores() {
    document.getElementById("result").classList.add("hide");
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("high-scores").classList.remove("hide");

    var noHighScores =  document.getElementById("no-high-scores");
    noHighScores.style.display = "block"

    if (highScores.length) {
      for (var i = 0; i < highScores.length; i++){
        var div = document.createElement("div")
        div.classList.add("divScores");
        var paragraph1 = document.createElement("p")
        var paragraph2 = document.createElement("p")

        noHighScores.appendChild(div);
        paragraph1.textContent = highScores[i].initials;
        paragraph2.textContent = highScores[i].score;
        div.append(paragraph1, paragraph2);
      } 
    } else {
      noHighScores.textContent = "No scores to display.";
    }
  }
