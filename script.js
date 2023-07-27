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