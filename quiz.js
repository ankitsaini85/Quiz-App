const questions = [
  {
    question: "What is the capital of France?",
    options: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "J.K. Rowling", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    options: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Pb", correct: false },
      { text: "Fe", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("nextbutton");
const timerElement = document.getElementById("timer");
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft;
let shuffledquestions = [];
function startQuiz() {
  shuffledquestions = shuffleArray(questions);
  currentIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";

  showQuestion();
}
function showQuestion() {
  resetState();
  startTimer(4);
  let currentQuestion = shuffledquestions[currentIndex];
  let questionNumber = currentIndex + 1;
  question.innerHTML = questionNumber + "." + currentQuestion.question;
  currentQuestion.options.forEach((option) => {
    let button = document.createElement("button");
    button.textContent = option.text; //
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (option.correct) {
      button.dataset.correct = option.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  // startTimer();
}
function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  clearInterval(timer);

  timerElement.textContent = `Time left: ${timeLeft} seconds`;
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const iscorrect = selectBtn.dataset.correct === "true";
  if (iscorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  clearInterval(timer);
}
nextButton.addEventListener("click", () => {
  if (currentIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
function handleNextButton() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
function showScore() {
  resetState();
  question.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}
//shuffled array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//Set timer
function startTimer(duration) {
  timeLeft = duration;
  timerElement.textContent = `Time left: ${timeLeft} seconds`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNextButton();

      // nextButton.style.display="block";
      // Array.from(answerButtons.children).forEach(button=>{
      //     button.disabled = true;
      // });
    }
  }, 1000);
}
startQuiz();
