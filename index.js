'use strict'

const QUIZ = {
  state: 0,
  score: 0,
  questions: [
    {
      question: "When you turn 65, how many times your annual income do you need in savings to retire comfortably?",
      choices: ["4 times income", "7 times income", "12 times income", "15 times income"],
      answer: "12 times income"
    },
    {
      question: "Starting at age 25, what percent of your annual income should you save each year to retire comfortably at 65?",
      choices: ["0 to 3 percent", "4 to 7 percent", "8 to 11 percent", "12 to 15 percent"],
      answer: "12 to 15 percent"
    },
    {
      question: "What should your average debt to income ratio be to retire comfortably at 65",
      choices: ["0 to 1 percent", "2 to 3 percent", "5 to 7 percent", "10 to 12 percent"],
      answer: "2 to 3 percent"
    },
    {
      question: "What is the maximum education debt you should have as a percent of your income to retire by 65?",
      choices: [".45 percent", ".85 percent", "2.5 percent", "5 percent"],
      answer: ".85 percent"
    },
    {
      question: "On average, what % of your annual income should you spend on disability insurance?",
      choices: [".5 percent", "1 percent", "3 percent", "5 percent"],
      answer: "3 percent"
    },
    {
      question: "On average, what % of your annual income should you spend on life insurance?",
      choices: ["2 percent", "6 percent", "9 percent", "11 percent"],
      answer: "6 percent"
    },
    {
      question: "As you near middle age, how much of your retirement investments should be in stocks vs bonds",
      choices: ["60% stocks, 40% bonds", "20% stocks, 80% bonds" , "80% stocks, 20% bonds", "50% stocks, 50% bonds"],
      answer: "50% stocks, 50% bonds"
    }
  ]
}

const scoreContainer = $('.score')
const stateContainer = $('.state')
const formContainer = $('form')

$(attachEventHandlers)

function attachEventHandlers() {
  formContainer.on('click','.start-button, .next-button, .restart-button', function(e) {
    e.preventDefault();
    renderQuestion();
  })
  formContainer.on('click','.choice-button', function(e) {
    e.preventDefault();
    renderAnswer(e); 
  })
  formContainer.on('click', '.end-button', function(e) {
    e.preventDefault();
    renderOutro();
  })
}

function renderQuestion() {
  scoreContainer.text(`Score: ${QUIZ.score}`)
  stateContainer.text(`Question: ${QUIZ.state+1}/${QUIZ.questions.length}`)
  formContainer.html(
    `
      <h1><strong>${QUIZ.questions[QUIZ.state].question}</strong></h1>
      <div class="control">
        <button class="choice-button">${QUIZ.questions[QUIZ.state].choices[0]}</button>
      </div>
      <div class="control">
        <button class="choice-button">${QUIZ.questions[QUIZ.state].choices[1]}</button>
      </div>
      <div class="control">
        <button class="choice-button">${QUIZ.questions[QUIZ.state].choices[2]}</button>
      </div>
      <div class="control">
        <button class="choice-button">${QUIZ.questions[QUIZ.state].choices[3]}</button>
      </div>
    `
  )
}

function renderAnswer(e) {

  let button = e.target;
  let userAnswer = e.target.textContent; //What is wrong here????
  const isCorrect = QUIZ.questions[QUIZ.state].answer === userAnswer;

  if (isCorrect) {
    QUIZ.score++
  }

  scoreContainer.text(`Score: ${QUIZ.score}`)
  formContainer.html(
    `
      <h1><strong>${isCorrect?'Correct!':'Incorrect.'}</strong></h1>
      <h2><strong>${isCorrect?'':`Correct Answer: ${QUIZ.questions[QUIZ.state].answer}`}</strong></h2>
      <div class="control"> 
      </div>
    `
  );
  if(QUIZ.state === QUIZ.questions.length-1) {
    formContainer.find('.control').html(`<button class="end-button">End Quiz</button>`)
  }
  else {
    formContainer.find('.control').html(`<button class="next-button">Next Question</button>`)
  }
  QUIZ.state++;
}

function renderOutro () {
  stateContainer.text(`Question: ${QUIZ.state}/${QUIZ.questions.length}`)
  formContainer.html(
    `
    <h1><strong>Congratulations!</strong></h1>
    <h2><strong>You got ${QUIZ.score} out of ${QUIZ.questions.length}</strong></h2>
    <div class="control">
      <button class="restart-button">Restart Quiz</button> 
    </div>
    `
  )
  QUIZ.score = 0;
  QUIZ.state = 0;
}






