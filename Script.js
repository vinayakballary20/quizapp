const apiURL = "http://5d76bf96515d1a0014085cf9.mockapi.io/quiz";
$(() => {
  getQuizData();
});

const getQuizData = () => {
  $.get(apiURL, onSuccess).fail(onFailure);
};

const onSuccess = (data) => {
  stopLoader();
  console.log(data);
  setTimeout(() => {
    createQuiz(data);
  }, 500);
};

const onFailure = (error) => {
  console.log(error);
  stopLoader();
};

const startLoader = () => {
  $("#loader-container").fadeIn();
};

const stopLoader = () => {
  $("#loader-container").fadeOut();
};

const createQuiz = (quizData) => {
  if (Array.isArray(quizData)) {
    quizData.forEach((questionInfo, index) => {
      const questionTemplate = getQuestionTemplate(questionInfo, index);
      const questionElement = $(questionTemplate);

      $("#quiz-form").append(questionElement);
    });
  }
};
const getQuestionTemplate = (questionInfo, index) => {
  const { question, id, options = [] } = questionInfo || {};
  return `
  <div class="question-container">
  <p class="question-text">Q${index + 1}. ${question}</p>
  <div class="options-container">
  

  ${options
    .map(
      (option, ind) =>
        `<div class="option-container"> 
      <input name="question-${id}" type="radio" id="question-${id}-${ind}" />
      <label for="question-${id}-${ind}">${option}</label>
    </div>`
    )
    .join("")}
  </div><hr>
</div>
  `;
  
}
// async function renderQuiz() {
//   // const questions = await getQuestions();

//   questions.forEach((questionInfo, index) => {
//     const questionElement = createQuestionElement(questionInfo, index);
//     mainContainer.appendChild(questionElement);
//   });
// }
const submitBtn = document.getElementById("submit-btn");
let score = 0;
const renderQuiz = (quizData) => {
  if (Array.isArray(quizData)) {
    quizData.forEach((questionInfo, index) => {
      // const questionTemplate = getQuestionTemplate(questionInfo, index);
      // const questionElement = $(questionTemplate);
      const questionElement = createQuestionElement(questionInfo, index);
      quizResult.appendChild(questionElement);
      // $("#quiz-form").append(questionElement);
    });
  }
};

function calculateScore() {
  const inputs = mainContainer.getElementsByTagName("input");
  Array.from(inputs).forEach((input) => {
    if (input.checked) {
      const questionIndex = input.name.split("-")[1];
      const selectedOption = input.value;
      const question = quizData[questionIndex];
      if (selectedOption === question.answer) {
        score += 1;
      }
    }
  });
}

submitBtn.addEventListener("click", () => {
  calculateScore();
  alert(`Your score is ${score}`);
});

renderQuiz();