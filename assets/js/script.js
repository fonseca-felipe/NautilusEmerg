//store question text, options and answers in an array
const questions = [
  {
    questionText: "Imagem do paciente: Peso 85kg; pescoço curto e com pouca mobilidade. História de roncos e apneia do sono. Monitoração: Ritmo sinusal; PA: 130x90; Fc: 100; SaTO2: 92%. QUÃO EMERGENCIAL PARECE SER ESSA SITUAÇÃO?",
    options: ["Muito emergencial", "Pouco emergencial"],
    answer: "Muito emergencial",
    
  },
  {
    questionText: "Imagem do paciente: Peso 85kg; pescoço curto e com pouca mobilidade. História de roncos e apneia do sono. Monitoração: Ritmo sinusal; PA: 130x90; Fc: 100; SaTO2: 92%. QUÃO DIFICIL PODE SER O MANUSEIO DA VIA AÉREA NESSE CASO?",
    options: [
      "Muito Difícil",
      "Moderadamente dificil",
      
      
    ],
    answer: "Muito Difícil",
  },
  {
    questionText:
      "Imagem do paciente: Peso 85kg; pescoço curto e com pouca mobilidade. História de roncos e apneia do sono. Monitoração: Ritmo sinusal; PA: 130x90; Fc: 100; SaTO2: 92%. QUAL A TÉCNICA DE SUA ESCOLHA PARA REALIZAR A IOT NESSE PACIENTE?",
    options: ["Sedação leve", "Sequencia rápida"],
    answer: "Sequencia rápida",
  },
  {
    questionText:
      "Imagem do paciente: Peso 85kg; pescoço curto e com pouca mobilidade. História de roncos e apneia do sono. Monitoração: Ritmo sinusal; PA: 130x90; Fc: 100; SaTO2: 92%. QUAL A IMPORTÂNCIA DA SISTEMATIZAÇÃO PARA O SUCESSO NO PROCESSO DE IOT?",
    options: [
      "Ganhar tempo hábil",
      "Evitar a hipóxia severa",
    
      
    ],
    answer: "Ganhar tempo hábil",
  },
  {
    questionText:
      "MONITORIZAÇÃO: Ritmo sinusal; PA: 150x100; Fc 120; SaTO2; 80%O paciente encontra-se mais dispneico, cansado, sudoreico e com cianose labial. A enfermeira sugere que realize a IOT e começa a preparar o material... PORQUE A ENFERMEIRA ESTÁ ESTRESSADA COM A REALIZAÇÃO DA IOT NESSE MOMENTO?",
    options: ["Por causa do cansaço excessivo", "Por causa da hipóxia progressiva"],
    answer: "Por causa da hipóxia progressiva",
  },
  {
    questionText:
      "MONITORIZAÇÃO: Ritmo sinusal; PA: 150x100; Fc 120; SaTO2; 80%O paciente encontra-se mais dispneico, cansado, sudoreico e com cianose labial. A enfermeira sugere que realize a IOT e começa a preparar o material... QUAL SERIA SUA ESCOLHA MEDICAMENTOSA PARA REALIZAR A IOT NESSE PACIENTE?",
    options: ["Hipnótico e relaxante neuromuscular", "Midazolam e fentanyl"],
    answer: "Hipnótico e relaxante neuromuscular",
  },
  {
    questionText:
      "ATENÇÃO! A primeira tentativa de IOT não foi bem sucedida.... MONITORIZAÇÃO:Ritmo sinusal; PA: 90x50 Fc 120; SaTO2; 60%O paciente encontra-se agônico, sudoreico e com cianose labial. QUÃO EMERGENCIAL É ESTA SITUAÇÃO NESSE MOMENTO?",
    options: ["Muito emergencial", "Pouco emergencial"],
    answer: "Muito emergencial",
  },
  {
    questionText:
      "ATENÇÃO! A primeira tentativa de IOT não foi bem sucedida.... MONITORIZAÇÃO:Ritmo sinusal; PA: 90x50 Fc 120; SaTO2; 60%O paciente encontra-se agônico, sudoreico e com cianose labial. COMO VOCÊ TENTARIA MELHORAR A HIPÓXIA?",
    options: ["Realizando nova IOT imediatamente", "Ventilando sob mascara facial"],
    answer: "Ventilando sob mascara facial",
  },
  {
    questionText:
      "ATENÇÃO! A primeira tentativa de IOT não foi bem sucedida.... MONITORIZAÇÃO:Ritmo sinusal; PA: 90x50 Fc 120; SaTO2; 60%O paciente encontra-se agônico, sudoreico e com cianose labial. QUE AÇÕES PODERIAM AJUDAR DURANTE A REALIZAÇÃO DE UMA NOVA TENTATIVA DE IOT?",
    options: ["Modificar o posicionamento do paciente", "Aguardar chegar alguma  ajuda"],
    answer: "Modificar o posicionamento do paciente",
  },
  {
    questionText:
      "Após a segunda tentativa de IOT... O paciente encontra-se sedado, no ventilador mecânico e estável hemodinamicamente. MONITORIZAÇÃO: RITMO SINUSAL; PA: 120X90; FC: 100; SATO2: 95%. RETROATIVAMENTE, COMO VOCÊ CARACTERIZARIA ESSA SITUAÇÃO?",
    options: ["Não intubo, mas ventilo", "Não intubo, não ventilo"],
    answer: "Não intubo, mas ventilo",
  },
  
 
];

//select each card div by id and assign to variables
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");

//hide all cards
function hideCards() {
  startCard.setAttribute("hidden", true);
  questionCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
  leaderboardCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

//hide result div
function hideResultText() {
  resultDiv.style.display = "none";
}

//these variables are required globally
var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
  //hide any visible cards, show the question card
  hideCards();
  questionCard.removeAttribute("hidden");

  //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
  currentQuestion = 0;
  displayQuestion();

  //set total time depending on number of questions
  time = 500;
  //executes function "countdown" every 1000ms to update time and display on page
  intervalID = setInterval(countdown, 1000);

  //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
  displayTime();
}

//reduce time by 1 and display new value, if time runs out then end quiz
function countdown() {
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}

//display time on page
const timeDisplay = document.querySelector("#time");
function displayTime() {
  timeDisplay.textContent = time;
}

//display the question and answer options for the current question
function displayQuestion() {
  let question = questions[currentQuestion];
  let options = question.options;

  let h2QuestionElement = document.querySelector("#question-text");
  h2QuestionElement.textContent = question.questionText;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let optionButton = document.querySelector("#option" + i);
    optionButton.textContent = option;
  }
}

//behaviour when an answer button is clicked: click event bubbles up to div with id "quiz-options"
//eventObject.target identifies the specific button element that was clicked on
document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  resultDiv.style.display = "block";
  if (optionIsCorrect(optionButton)) {
    resultText.textContent = "Favorável";
    setTimeout(hideResultText, 1000);
  } else {
    resultText.textContent = "Desfavorável";
    setTimeout(hideResultText, 1000);
    if (time >= 10) {
      time = time - 50;
      displayTime();
    } else {
      //if time is less than 10, display time as 0 and end quiz
      //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 10 seconds left on the timer
      time = 0;
      displayTime();
      endQuiz();
    }
  }

  //increment current question by 1
  currentQuestion++;
  //if we have not run out of questions then display next question, else end quiz
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

//display scorecard and hide other divs
const score = document.querySelector("#score");

//at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = time;
}

const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");

//store user initials and score when submit button is clicked
submitButton.addEventListener("click", storeScore);

function storeScore(event) {
  //prevent default behaviour of form submission
  event.preventDefault();

  //check for input
  if (!inputElement.value) {
    alert("Por favor escreva suas iniciais antes de apertar em enviar");
    return;
  }

  //store score and initials in an object
  let leaderboardItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredLeaderboard(leaderboardItem);

  //hide the question card, display the leaderboardcard
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  renderLeaderboard();
}

//updates the leaderboard stored in local storage
function updateStoredLeaderboard(leaderboardItem) {
  let leaderboardArray = getLeaderboard();
  //append new leaderboard item to leaderboard array
  leaderboardArray.push(leaderboardItem);
  localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

//get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderboard() {
  let storedLeaderboard = localStorage.getItem("leaderboardArray");
  if (storedLeaderboard !== null) {
    let leaderboardArray = JSON.parse(storedLeaderboard);
    return leaderboardArray;
  } else {
    leaderboardArray = [];
  }
  return leaderboardArray;
}

//display leaderboard on leaderboard card
function renderLeaderboard() {
  let sortedLeaderboardArray = sortLeaderboard();
  const highscoreList = document.querySelector("#highscore-list");
  highscoreList.innerHTML = "";
  for (let i = 0; i < sortedLeaderboardArray.length; i++) {
    let leaderboardEntry = sortedLeaderboardArray[i];
    let newListItem = document.createElement("li");
    newListItem.textContent =
      leaderboardEntry.initials + " - " + leaderboardEntry.score;
    highscoreList.append(newListItem);
  }
}

//sort leaderboard array from highest to lowest
function sortLeaderboard() {
  let leaderboardArray = getLeaderboard();
  if (!leaderboardArray) {
    return;
  }

  leaderboardArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return leaderboardArray;
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

//clear local storage and display empty leaderboard
function clearHighscores() {
  localStorage.clear();
  renderLeaderboard();
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

//Hide leaderboard card show start card
function returnToStart() {
  hideCards();
  startCard.removeAttribute("hidden");
}

//use link to view highscores from any point on the page
const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  //stop countdown
  clearInterval(intervalID);

  //assign undefined to time and display that, so that time does not appear on page
  time = undefined;
  displayTime();

  //display leaderboard on leaderboard card
  renderLeaderboard();
}
