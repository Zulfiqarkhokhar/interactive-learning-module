import { quizData } from "./quizdata.js";

let currentSectionIndex = 0;
let currentQuestionIndex = 0;
// Function to load the current question
function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  // Get the current section's quiz data
  const currentSection = quizData[0];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  console.log(currentQuestion.options);

  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn", "explore", "option-btn");
    button.onclick = () => selectOption(index);
    optionsElement.appendChild(button);
  });
}

// Function to handle option selection
function selectOption(selectedOptionIndex) {
  const currentSection = quizData[0];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  console.log(selectedOptionIndex);
  console.log(currentQuestion.options[selectedOptionIndex]);

  if (currentQuestion.answer === currentQuestion.options[selectedOptionIndex]) {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentSection.questions.length) {
      loadQuestion();
    } else {
      alert("Section completed!");
      currentSectionIndex++;
      if (currentSectionIndex < quizData.length) {
        currentQuestionIndex = 0;
        localStorage.setItem("currentSectionIndex", currentSectionIndex);
        localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
        loadQuestion();
      } else {
        alert("Quiz completed!");
        window.location.href = "./index.html";
      }
    }
  } else {
    alert("Incorrect, try again!");
  }
}

document.getElementById("next-button").onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[0].questions.length) {
    loadQuestion();
  } else {
    alert("Section completed!");
    currentSectionIndex++;
    if (currentSectionIndex < quizData.length) {
      currentQuestionIndex = 0;
      localStorage.setItem("currentSectionIndex", currentSectionIndex);
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
      loadQuestion();
    } else {
      alert("Quiz completed!");
      window.location.href = "./index.html";
    }
  }
};

window.onload = () => {
  const savedSectionIndex = localStorage.getItem("currentSectionIndex");
  const savedQuestionIndex = localStorage.getItem("currentQuestionIndex");

  if (savedSectionIndex !== null) {
    currentSectionIndex = parseInt(savedSectionIndex);
  }
  if (savedQuestionIndex !== null) {
    currentQuestionIndex = parseInt(savedQuestionIndex);
  }

  loadQuestion();
};
