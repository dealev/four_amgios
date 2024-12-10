const wheelCanvas = document.getElementById("wheel");
const ctx = wheelCanvas.getContext("2d");

const wheelWidth = wheelCanvas.width;
const wheelHeight = wheelCanvas.height;

const numSections = 12;

const sectionAngle = 360 / numSections;

const sections = [
  {
    label: "Rat",
    question: "Rat question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#88cfef", //blue and black
  },
  {
    label: "Ox",
    question: "Ox question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#fbfc94", // yellow
  },
  {
    label: "Tiger",
    question: "Tiger question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#f85e54", //red and green
  },
  {
    label: "Rabbit",
    question: "Rabbit question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#b4ddb1", //green
  },
  {
    label: "Dragon",
    question: "dragon  question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#ffe960", //yellow
  },
  {
    label: "Snake",
    question: "Snake question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#c2b0e0", //purple
  },
  {
    label: "Horse",
    question: "Horse question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#aecad5", //blue
  },
  {
    label: "Goat",
    question: "Goat question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#adeab1", //blue and green
  },
  {
    label: "Monkey",
    question: "Monkey question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#c4cbd1", //grey and purple
  },
  {
    label: "Rooster",
    question: "Rooster question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#9cc9e0", //blue and white
  },
  {
    label: "Dog",
    question: "Dog question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#ffffff", //black and white
  },
  {
    label: "Pig",
    question: "Pig question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#c4a384", //brown
  },
];

const sectionMessages = {
  Rat: "rat",
  Ox: "ox",
  Tiger: "tiger",
  Rabbit: "rabbit",
  Dragon: "dragon",
  Snake: "snake",
  Horse: "horse",
  Goat: "goat",
  Monkey: "monkey",
  Rooster: "rooster",
  Dog: "dog",
  Pig: "pig",
};

function drawWheel() {
  ctx.clearRect(0, 0, wheelWidth, wheelHeight);
  for (let i = 0; i < numSections; i++) {
    ctx.beginPath();
    ctx.moveTo(wheelWidth / 2, wheelHeight / 2);
    ctx.arc(
      wheelWidth / 2,
      wheelHeight / 2,
      wheelWidth / 2 - 20,
      (i * sectionAngle * Math.PI) / 180,
      ((i + 1) * sectionAngle * Math.PI) / 180
    );
    ctx.fillStyle = sections[i].color;
    ctx.fill();
    ctx.font = "13px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(
      sections[i].label,
      wheelWidth / 2 +
        (wheelWidth / 2 - 40) *
          Math.cos(((i * sectionAngle + sectionAngle / 2) * Math.PI) / 180),
      wheelHeight / 2 +
        (wheelWidth / 2 - 40) *
          Math.sin(((i * sectionAngle + sectionAngle / 2) * Math.PI) / 180)
    );
  }
}

let spinAngle = 0;
let spinSpeed = 10;
let isSpinning = false;

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  spinAngle = Math.random() * 360;
  spinSpeed = 10;

  function animate() {
    drawWheel();
    ctx.save();
    ctx.translate(wheelWidth / 2, wheelHeight / 2);
    ctx.rotate((spinAngle * Math.PI) / 180);
    ctx.translate(-wheelWidth / 2, -wheelHeight / 2);
    drawWheel();
    ctx.restore();

    spinAngle += spinSpeed;
    spinSpeed -= 0.1;

    if (spinSpeed > 0) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      const section = Math.floor(
        ((spinAngle % 360) / sectionAngle) % numSections
      );
      setTimeout(() => {
        showQuizAlert(section);
      }, 2000);
    }
  }

  animate();
}

function showQuizAlert(section) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.style.display = "flex";
  const alert = document.createElement("div");
  alert.className = "alert";

  const message = sectionMessages[sections[section].label] || "section";

  alert.innerHTML = `    
  <h2>${message}</h2>    
  <button id="go-to-quiz-button">Go to Quiz</button>    
  `;

  alertContainer.appendChild(alert);
  document.getElementById("go-to-quiz-button").addEventListener("click", () => {
    showQuestionAlert(section);
  });
}

function showQuestionAlert(section) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = "";
  const alert = document.createElement("div");
  alert.className = "alert";
  alert.innerHTML = `    
   <h2>${sections[section].question}</h2>    
   <button id="answer-0-button">${sections[section].answers[0]}</button>    
   <button id="answer-1-button">${sections[section].answers[1]}</button>    
  `;
  alertContainer.appendChild(alert);
  document.getElementById("answer-0-button").addEventListener("click", () => {
    showResultAlert(section, 0);
  });
  document.getElementById("answer-1-button").addEventListener("click", () => {
    showResultAlert(section, 1);
  });
}

function showResultAlert(section, answer) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = "";
  const alert = document.createElement("div");
  alert.className = "alert";
  if (answer === sections[section].correctAnswer) {
    alert.innerHTML = `    
    <h2>Correct!</h2>    
    <button id="spin-again-button">Spin Again</button>    
   `;
  } else {
    alert.innerHTML = `    
    <h2>Wrong, try again</h2>    
    <button id="try-again-button">Try Again</button>    
   `;
  }
  alertContainer.appendChild(alert);
  if (alert.innerHTML.includes("Correct")) {
    document
      .getElementById("spin-again-button")
      .addEventListener("click", () => {
        alertContainer.style.display = "none";
        spinWheel();
      });
  } else {
    document
      .getElementById("try-again-button")
      .addEventListener("click", () => {
        showQuestionAlert(section);
      });
  }
}

document.getElementById("spin-button").addEventListener("click", spinWheel);

drawWheel();
