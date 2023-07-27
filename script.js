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
  
  var startBtn = document.getElementById("start-btn");
  var timer = document.getElementById("timer");
  var questionEl = document.getElementById("question");
  var answerEl = document.getElementById("answer");
  var submitBtn = document.getElementById("submit-btn");
  var resultEl = document.getElementById("result");
  
  var currentQuestionIndex = 0;
  var timeLeft = 60;
  
  function startGame() {
    startBtn.disabled = true;
    setInterval(updateTimer, 1000);
    displayQuestion();
  }
  
  function updateTimer() {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      endGame();
    }
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerEl.value = "";
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

  function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (!selectedAnswer) {
      resultEl.textContent = "Please select an answer";
      return;
    }
    if (selectedAnswer.value === currentQuestion.answer) {
      resultEl.textContent = "Correct!";
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length) {
        endGame();
      } else {
        displayQuestion();
      }
    } else {
      resultEl.textContent = "Incorrect!";
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
  }

  function endGame() {
    clearInterval();
    questionEl.textContent = "";
    answerEl.style.display = "none";
    submitBtn.style.display = "none";
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
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const initials = inputEl.value;
      saveScore(initials, timeLeft);
      window.location.href = "highscores.html";
    });
  }
  
  function saveScore(initials, score) {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials, score });
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  
  startBtn.addEventListener("click", startGame);
  submitBtn.addEventListener("click", checkAnswer);