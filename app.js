const gameboard = document.getElementsByTagName("td");
let snake = [gameboard[987], gameboard[988], gameboard[989], gameboard[990]];
const startingSnake = [
  gameboard[987],
  gameboard[988],
  gameboard[989],
  gameboard[990],
];
let apple = gameboard[312];
apple.className = "apple";

let scoreHistory = [0];

let playerName = "";

const easySpeed = 120;
const mediumSpeed = 90;
const hardSpeed = 60;
const superDuperHard = 40;
let speed = easySpeed;

document.getElementById("submitButton").onclick = function () {
  playerName = document.getElementById("enterName").value;
};

startingSnake[0].className = "snake";
startingSnake[1].className = "snake";
startingSnake[2].className = "snake";
startingSnake[3].className = "snake";

const left = -1;
const right = 1;
const up = -32;
const down = 32;

const startingSnakeHeadIndex = 987;
let x = startingSnakeHeadIndex;
let score = 0;
let direction = left;

function keyTrack(event) {
  if (event.key === "ArrowLeft") {
    if (direction !== right) {
      direction = left;
    }
  }
  if (event.key === "ArrowRight") {
    if (direction !== left) {
      direction = right;
    }
  }
  if (event.key === "ArrowUp") {
    if (direction !== down) {
      direction = up;
    }
  }
  if (event.key === "ArrowDown") {
    if (direction !== up) {
      direction = down;
    }
  }
}

let getApple = setInterval(randomApple, 50);

function randomApple() {
  if (apple.className !== "apple") {
    let a = Math.floor(Math.random() * gameboard.length);
    if (
      gameboard[a].className !== "border" &&
      gameboard[a].className !== "snake"
    ) {
      apple = gameboard[a];
      apple.className = "apple";
    }
  }
}

function gameReset() {
  for (i = 0; i < gameboard.length; i++) {
    if (
      gameboard[i].className === "snake" ||
      gameboard[i].className === "ouch" ||
      gameboard[i].className === "apple"
    )
      gameboard[i].className = "";
    apple = gameboard[312];
    snake = [gameboard[987], gameboard[988], gameboard[989], gameboard[990]];
    score = 0;
    scoreTracker.innerText = "Score: " + score;
    direction = left;
    apple.className = "apple";
    x = startingSnakeHeadIndex;
    startingSnake[0].className = "snake";
    startingSnake[1].className = "snake";
    startingSnake[2].className = "snake";
    startingSnake[3].className = "snake";
    message.innerText = "";
  }
}

let scoreTracker = document.getElementById("score");

let startButton = document.getElementById("start");
startButton.addEventListener("click", (event) => {
  gameStart();
});

function gameStart() {
  gameReset();
  const snakeMovement = setInterval(movingSnake, speed);
  function movingSnake() {
    document.addEventListener("keydown", (event) => {
      keyTrack(event);
    });
    x = x += direction;
    let nextCell = gameboard[x];
    if (nextCell.className !== "border" && nextCell.className !== "snake") {
      let newHead = nextCell;
      snake.unshift(newHead);
      if (newHead.className !== "apple") {
        newHead.className = "snake";
        let removeTail = snake[snake.length - 1];
        removeTail.className = "";
        removeTail = snake.splice(snake.length - 1, 1);
      } else {
        newHead.className = "snake";
        score = score += 1;
        scoreTracker.innerText = "Score: " + score;
      }
    } else {
      let hittingBorder = snake[0];
      hittingBorder.className = "ouch";
      clearInterval(snakeMovement);
      window.alert("You've hit a border! Start over buddy!");
      startButton.innerText = "Play Again";
      highScore = Math.max(...scoreHistory);
      scoreTracker.innerText = "Score: " + score;
      compareScores(score, highScore);
      scoreHistory.push(score);
      console.log(scoreHistory);
    }
  }
}

let message = document.getElementById("message");

function compareScores(playerScore, highestScore) {
  if (score > highScore) {
    message.innerText =
      playerName +
      "\n Your new score is " +
      score +
      ". \nYou've got the highest score!";
  } else if (score === highScore) {
    message.innerText =
      playerName +
      "\n Your current score is " +
      score +
      ". \n You have tied your highest score!";
  } else {
    message.innerText =
      playerName +
      "\n Your score is " +
      score +
      ". \nYour highest score is " +
      highScore;
  }
}

let selectSpeed = document.getElementById("difficultyLevel");

selectSpeed.addEventListener("change", (event) => {
  gameSpeed();
});

function gameSpeed() {
  if (selectSpeed.value === "easy") {
    speed = easySpeed;
  } else if (selectSpeed.value === "medium") {
    speed = mediumSpeed;
  } else if (selectSpeed.value === "hard") {
    speed = hardSpeed;
  } else if (selectSpeed.value === "superHard") {
    speed = superDuperHard;
  }
}
