// Define an array of quiz questions, each with a question, a set of choices, and the correct answer
var questions = [
    {
      question: "What is the result of the following expression: 5 + 5?",
      choices: ["55", "10", "555", "5"],
      answer: "10",
    },
    {
      question: "What is the output of console.log(typeof null);?",
      choices: ["object", "null", "undefined", "string"],
      answer: "object",
    },
    {
      question: "What is the output of console.log('hello'.charAt(0));?",
      choices: ["h", "e", "1", "o"],
      answer: "h",
    },
  ];
  
  // Get references to HTML elements
  var startBtn = document.getElementById("start-btn");
  var timer = document.getElementById("timer");
  var questionEl = document.getElementById("question");
  var answerEl = document.getElementById("answer");
  var submitBtn = document.getElementById("submit-btn");
  var resultEl = document.getElementById("result");
  
  // Initialize variables to keep track of the current question index and the time left
  var currentQuestionIndex = 0;
  var timeLeft = 60;
  
  // Function to start the game
  function startGame() {
    // Disable the start button and start the timer
    startBtn.disabled = true;
    setInterval(updateTimer, 1000);
    // Display the first question
    displayQuestion();
  }
  
  // Function to update the timer every second
  function updateTimer() {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;
    // End the game if time runs out
    if (timeLeft === 0) {
      endGame();
    }
  }
  
  // Function to display the current question
  function displayQuestion() {
    // Get the current question from the questions array
    const currentQuestion = questions[currentQuestionIndex];
    // Display the question text
    questionEl.textContent = currentQuestion.question;
    // Clear the answer input field
    answerEl.value = "";
    // Loop through the choices for the current question and create a radio button and label for each one
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choice = currentQuestion.choices[i];
      const radioEl = document.createElement("input");
      radioEl.type = "radio";
      radioEl.name = "answer";
      radioEl.value = choice;
      questionEl.appendChild(radioEl);
      const labelEl = document.createElement("label");
      labelEl.textContent = choice;
      questionEl.appendChild(labelEl);
    }
  }
  
  // Function to check the user's answer
  function checkAnswer() {
    // Get the current question and the selected answer
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );
    // If no answer is selected, display an error message and return
    if (!selectedAnswer) {
      resultEl.textContent = "Please select an answer";
      return;
    }
    // If the selected answer is correct, display a success message and move on to the next question
    if (selectedAnswer.value === currentQuestion.answer) {
      resultEl.textContent = "Correct!";
      currentQuestionIndex++;
      // If there are no more questions, end the game, otherwise display the next question
      if (currentQuestionIndex === questions.length) {
        endGame();
      } else {
        displayQuestion();
      }
    // If the selected answer is incorrect, display an error message and deduct 10 seconds from the timer
    } else {
      resultEl.textContent = "Incorrect!";
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
  }
  
  // Function to end the game
  function endGame() {
    // Stop the timer and clear the question and answer elements
    clearInterval();
    questionEl.textContent = "";
    answerEl.style.display = "none";
    submitBtn.style.display = "none";
    // Display the user's score and a form to enter their initials
    resultEl.textContent = `Game over! Your score is ${timeLeft}`;
    const formEl = document.createElement("form");
    const labelEl = document.createElement("label");
    labelEl.textContent = "Enter your initials:";
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    const submitEl = document.createElement("button");
    submitEl.type = "submit";
    submitEl.textContent = "Submit";
    formEl.appendChild(submitEl);
    resultEl.appendChild(formEl);
    // When the form is submitted, save the user's score and redirect to the high scores page
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const initials = inputEl.value;
      saveScore(initials, timeLeft);
      window.location.href = "highscores.html";
    });
  }
  
  // Function to save the user's score to local storage
  function saveScore(initials, score) {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials, score });
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  
  // Add event listeners to the start and submit buttons
  startBtn.addEventListener("click", startGame);
  submitBtn.addEventListener("click", checkAnswer);