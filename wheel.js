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
    color: "#f85e54", //blue and black
  },
  {
    label: "Ox",
    question: "Ox question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#ffe960", // yellow
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
    color: "#ffe960", //green
  },
  {
    label: "Dragon",
    question: "dragon  question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#f85e54", //yellow
  },
  {
    label: "Snake",
    question: "Snake question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#ffe960", //purple
  },
  {
    label: "Horse",
    question: "Horse question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#f85e54", //blue
  },
  {
    label: "Goat",
    question: "Goat question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#ffe960", //blue and green
  },
  {
    label: "Monkey",
    question: "Monkey question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#f85e54", //grey and purple
  },
  {
    label: "Rooster",
    question: "Rooster question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#ffe960", //blue and white
  },
  {
    label: "Dog",
    question: "Dog question (true)",
    answers: ["True", "False"],
    correctAnswer: 0,
    color: "#f85e54", //black and white
  },
  {
    label: "Pig",
    question: "Pig question (false)",
    answers: ["True", "False"],
    correctAnswer: 1,
    color: "#ffe960", //brown
  },
];

const sectionMessages = {
  Rat: "The rat! the years 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, and 2020 are considered to be the year of the rat. The rat is the 1st animal on the calender because it tricked the ox into carrying it across the river. It jumped off last second, making it first. People born on the year of the rat are said to be kind, quick-witted, versatile, and resourceful.",
  Ox: "The ox! the years 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, and 2021 are considered to be the year of the ox. The ox is the 2nd animal on the calender because the rat tricked it into carrying it across the river. The rat jumped off and finished first, leaving the ox second. People born on the year of the ox are said to be diligent, dependable, strong, and determined.",
  Tiger:
    "The tiger! the years 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, and 2022 are considered to be the year of the tiger. The tiger is the 3rd animal on the calender because the strong current on the river set it off course. People born on the year of the tiger are said to be brave, confident, and competitive.",
  Rabbit:
    "The rabbit! the years 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, and 2023 are considered to be the year of the rabbit. The rabbit is the 4th animal on the calender because it was tired of the race and instead of swimming, it hopped across stones and floated on a log to the other side. People born on the year of the rabbit are said to be quiet, elegant, compassionate, and responsible.",
  Dragon:
    "The dragon! the years 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, and 2024 are considered to be the year of the dragon. The dragon is the 5th animal on the calender because it stopped along the way to help some of the animals. People born on the year of the dragon are said to be  confident, intelligent, and enthusiastic.",
  Snake:
    "The snake! the years 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, and 2025 are considered to be the year of the snake. The snake is the 6th animal on the calender because it slithered under horse, scaring it, letting snake cross the finish line at 6th place. People born on the year of the snake are said to be enigmatic, clever, and wise.",
  Horse:
    "The horse! the years 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, and 2026 are considered to be the year of the horse. The horse is the 7th animal on the calender because before it could finish is 6th, the snake slithered under it's hooves, scaring and delaying it from crossing the finish line. People born on the year of the horse are said to be animated, active, and hyper.",
  Goat: "The goat! the years 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, and 2027 are considered to be the year of the goat. The goat is the 8th animal in line because the Jade emperor declared it so after it created a raft to float across the river with monkey and rooster. People born on the year of the goat are said to be calm, gentle, and sympathetic.",
  Monkey:
    "The monkey! the years 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, and 2028 are considered to be the year of the monkey. The monkey is the 9th animal on the calender because the Jade emperor declared it so after it created a raft to float across the river with goat and rooster. People born on the year of the monkey are said to be sharp, cheerful, and curious.",
  Rooster:
    "The rooster! the years 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, and 2029 are considered to be the year of the rooster. The rooster is the 10th animal on the calender because the Jade emperor declared it so after it created a raft to float across the river with goat and monkey. People born on the year of the rooster are said to be observant, hardworking, and courageous.",
  Dog: "The dog! the years 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, and 2030 are considered to be the year of the dog. The dog is the 11th animal on the calender because the river was so refreshing, he decided to take a bath. People born on the year of the dog are said to be loving, honest, and prudent.",
  Pig: "The pig! the years 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, and 2031 are considered to be the year of the pig. The pig is the 12th animal on the calender because he stopped to eat and then took a nap afterwards. People born on the year of the pig are said to be charitable, generous, and attentive.",
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
