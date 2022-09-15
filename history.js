const histories = document.getElementById("histories");

function addHistory(questionText, timeTaken, errorCount, wpm, accuracy) {
  const newRow = document.createElement("div");
  newRow.classList.add("card");

  newRow.innerHTML = `
  <div class="col col-text"><h3>${questionText}</h3></div>

  <div class="col ">
  <p>You took: <span class="bold">${timeTaken}</span> seconds</p>
  </div>

  <div class="col">
  <p>You made <span class="bold red">${errorCount}</span> mistakes</p>
  </div>

  <div class="col">
  <p>Typing speed <span class="bold yellow">${wpm}</span> WPM</p>
  </div>

  <div class="col">
  <p>Typing accuracy <span class="bold yellow">${accuracy}</span>%</p>
  </div>

  `;

  histories.appendChild(newRow);

  let previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];
  previousTests.push({ questionText, timeTaken, errorCount, wpm,accuracy });
  localStorage.setItem("testHistory", JSON.stringify(previousTests));

  displayHistory();
}

function displayHistory() {
  histories.innerHTML = "";
  const previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];

  previousTests.forEach((test) => {
    const newRow = document.createElement("div");
    newRow.classList.add("card");

    newRow.innerHTML = `
    <div class="col col-text"><h3>${test.questionText}</h3></div>

    <div class="col">
    <p>You took: <span class="bold">${test.timeTaken}</span> seconds</p>
    </div>

    <div class="col">
    <p>You made <span class="bold red">${test.errorCount}</span> mistakes</p>
    </div>

    <div class="col">
    <p>Typing speed <span class="bold yellow">${test.wpm}</span> WPM</p>
    </div>

    
  <div class="col">
  <p>Typing accuracy <span class="bold yellow">${test.accuracy}</span>%</p>
  </div>

  `;

    histories.appendChild(newRow);
  });
}
