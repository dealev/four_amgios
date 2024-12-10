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
  },
  {
    label: "Ox",
    question: "Ox question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
  },
  {
    label: "Tiger",
    question: "Tiger question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
  },
  {
    label: "Rabbit",
    question: "Rabbit question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
  },
  {
    label: "Dragon",
    question: "dragon  question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
  },
  {
    label: "Snake",
    question: "Snake question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
  },
  {
    label: "Horse",
    question: "Horse question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
  },
  {
    label: "Goat",
    question: "Goat question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
  },
  {
    label: "Monkey",
    question: "Monkey question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
  },
  {
    label: "Rooster",
    question: "Rooster question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
  },
  {
    label: "Dog",
    question: "Dog question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
  },
  {
    label: "Pig",
    question: "Pig question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
  },
];

const sectionMessages = {
  Rat: "Rat",
  Ox: "Ox",
  Tiger: "Tiger",
  Rabbit: "Rabbit",
  Dragon: "Dragon",
  Snake: "Snake",
  Horse: "Horse",
  Goat: "Goat",
  Monkey: "Monkey",
  Rooster: "Rooster",
  Dog: "Dog",
  Pig: "Pig",
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
    ctx.fillStyle = `hsl(${i * 30}, 100%, 50%)`;
    ctx.fill();
    ctx.font = "24px Arial";
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

function spinWheel() {
  const spinAngle = Math.random() * 360;
  const section = Math.floor(spinAngle / sectionAngle);
  drawWheel();
  ctx.save();
  ctx.translate(wheelWidth / 2, wheelHeight / 2);
  ctx.rotate((spinAngle * Math.PI) / 180);
  ctx.translate(-wheelWidth / 2, -wheelHeight / 2);
  drawWheel();
  ctx.restore();
  setTimeout(() => {
    showQuizAlert(section);
  }, 2000);
}

function showQuizAlert(section) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.style.display = "flex";
  const alert = document.createElement("div");
  alert.className = "alert";

  const message = sectionMessages[sections[section].label] || "quiz";

  alert.innerHTML = `   
   <h2>You landed on ${sections[section].label}! ${message}</h2>   
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
      <h2>Correct</h2>   
      <button id="spin-again-button">Spin Again</button>   
    `;
  } else {
    alert.innerHTML = `   
      <h2>Wrong, try again?</h2>   
      <button id="try-again-button">Try Again</button>   
    `;
  }
  alertContainer.appendChild(alert);
  if (alert.innerHTML.includes("Correct")) {
    document
      .getElementById("spin-again-button")
      .addEventListener("click", () => {
        alertContainer.style.display = "none";
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
