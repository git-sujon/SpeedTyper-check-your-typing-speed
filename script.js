const display = document.getElementById("display");
const question = document.getElementById("question");
const startBtn = document.getElementById("start");
const countdownOverlay = document.getElementById("countdown");
const resultModal = document.getElementById("result");
const modalBackground = document.getElementById("modal-background");

// variables
let userText = "";
let errorCount = 0;
let startTime;
let questionText = "";

// Load and display question
fetch("./texts.json")
  .then((res) => res.json())
  .then((data) => {
    questionText = data[Math.floor(Math.random() * data.length)];
    question.innerHTML = questionText;
    
    // console.log(questionText.length)
  });

// checks the user typed character and displays accordingly
const typeController = (e) => {
  const newLetter = e.key;

  // Handle backspace press
  if (newLetter == "Backspace") {
    userText = userText.slice(0, userText.length - 1);
    return display.removeChild(display.lastChild);
  }

  // these are the valid character we are allowing to type
  const validLetters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!@#$%^&*()_+-={}[]'\".,?";

  // if it is not a valid character like Control/Alt then skip displaying anything
  if (!validLetters.includes(newLetter)) {
    return;
  }

  userText += newLetter;

  const newLetterCorrect = validate(newLetter);

  if (newLetterCorrect) {
    display.innerHTML += `<span class="green">${newLetter === " " ? "▪" : newLetter}</span>`;
  } 
  else {
    display.innerHTML += `<span class="red">${newLetter === " " ? "▪" : newLetter}</span>`;
    // bug 8 : fix the error count 
    errorCount++;
  }

  // check if given question text is equal to user typed text
  if (questionText === userText) {
    gameOver();
  }

};

const validate = (key) => {
  if (key === questionText[userText.length - 1]) {
    return true;
  }
  return false;
};

// FINISHED TYPING
const gameOver = () => {
  document.removeEventListener("keydown", typeController);
  // the current time is the finish time
  // so total time taken is current time - start time
  const finishTime = new Date().getTime();
  // bug -7 fix secound count on Modal 
  const timeTaken = parseInt((finishTime - startTime) / 1000);

  // show result modal
  resultModal.innerHTML = "";
  resultModal.classList.toggle("hidden");
  modalBackground.classList.toggle("hidden");
  // clear user text
  display.innerHTML = "";
  // make it inactive
  display.classList.add("inactive");

  // show result
  resultModal.innerHTML += `
    <h1>Finished!</h1>
    <p>You took: <span class="bold">${timeTaken}</span> seconds</p>
    <p>You made <span class="bold red">${errorCount}</span> mistakes</p>
    <button onclick="closeModal()">Close</button>
  `;
// bug 4 display history
//Calculating Word per minute
const questionLenght= questionText.length
const wpm= parseInt((questionLenght/5 ) / (timeTaken/60))
// console.log(wpm)
const accuracy= parseInt(((questionLenght-errorCount)/ questionLenght) * 100)
// console.log(accuracy) 

addHistory(questionText, timeTaken, errorCount, wpm, accuracy);


  
  // restart everything
  startTime = null;
  errorCount = 0;
  userText = "";
  display.classList.add("inactive");
};

const closeModal = () => {
  modalBackground.classList.toggle("hidden");
  resultModal.classList.toggle("hidden");
};

const start = () => {
  // If already started, do not start again
  if (startTime) return;

  let count = 3;
  countdownOverlay.style.display = "flex";

  const startCountdown = setInterval(() => {
// bug 2
    countdownOverlay.innerHTML = `<h1>${count}</h1>`;

    // finished timer
    if (count == 0) {
      // -------------- START TYPING -----------------
      document.addEventListener("keydown", typeController);
      // bug 3  d-flex before
      countdownOverlay.style.display = "none";
      display.classList.remove("inactive");

      clearInterval(startCountdown);
      startTime = new Date().getTime();
    }
    count--;
  }, 1000);
};

// START Countdown
startBtn.addEventListener("click", start);

// If history exists, show it
displayHistory();

// Show typing time spent
setInterval(() => {
  const currentTime = new Date().getTime();
  // bug 6 fix secound count on display 
  const timeSpent = parseInt((currentTime - startTime) / 1000);


  document.getElementById("show-time").innerHTML = `${startTime ? timeSpent : 0} seconds`;
}, 1000);
