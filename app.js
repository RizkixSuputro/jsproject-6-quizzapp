const quizData = [
  {
    question: "Kunci Indonesia adalah?",
    options: ["jawa", "sumatra", "bali", "sulawesi"],
    answer: "jawa",
  },
  {
    question: "Lalapan yang enak di sibang gede adalah?",
    options: ["Asep", "Lalapan Pak Rizki", "Jamal", "udin"],
    answer: "Lalapan Pak Rizki",
  },
  {
    question: "Tahun berapa Indonesia merdeka?",
    options: ["1933", "1937", "1945", "1987"],
    answer: "1945",
  },
  {
    question: "Pancasila ada berapa?",
    options: ["2", "3", "5", "4"],
    answer: "5",
  },
];

const questionNum = document.getElementById("question-number");
const questionVal = document.getElementById("question");
const ansOption = document.querySelectorAll(".option");
const timeResult = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultAns = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;

function loadQuestion() {
  const { question, options } = quizData[currentQuestion];

  questionNum.textContent = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;
  questionVal.textContent = question;
  ansOption.forEach((option, index) => {
    option.textContent = options[index];
    option.classList.remove("correct", "incorrect");
    option.onclick = () => selectOption(option);
  });
  answerSelected = false;
  nextBtn.disabled = true;
  starTimer();
}
function selectOption(option) {
  if (!answerSelected) {
    answerSelected = true;
    const selectedAns = option.textContent;
    const correctAns = quizData[currentQuestion].answer;
    if (selectedAns === correctAns) {
      score++;
      option.classList.add("correct");
    } else {
      option.classList.add("incorrect");
      ansOption.forEach((opt) => {
        if (opt.textContent === correctAns) {
          opt.classList.add("correct");
        }
      });
    }
    nextBtn.disabled = false;
  }
}
function nextQuestion() {
  clearInterval(timer);
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}
// next button to load the next question
nextBtn.addEventListener("click", () => {
  nextQuestion();
});

// see how long it takes to answer
function starTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timeResult.textContent = `Time left ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timeResult.textContent = `Time Left : ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!answerSelected) {
        nextQuestion();
      }
    }
  }, 1000);
}

// to show result after answer the question
function showResult() {
  const quiz = document.getElementById("quiz");
  const resultBox = document.getElementById("result");
  quiz.classList.add("hide");
  resultBox.classList.remove("hide");
  resultAns.textContent = `${score} out of ${quizData.length}`;
}
// quiz
loadQuestion();
