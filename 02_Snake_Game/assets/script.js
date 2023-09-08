let inputDirection = { x: 0, y: 0 };
const board = document.getElementById("board");
const scoreElement = document.getElementById("score");
const foodSound = new Audio("./music/eatSound.mp3");
const moveSound = new Audio("./music/move.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const musicSound = new Audio("./music/music.mp3");
const playPauseBtn = document.getElementById("play-pause-btn");
let speed = 2;
let score = 0;
let lastrenderTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = {
  x: 6,
  y: 7,
};

let count = 0;
const playPauseMusic = () => {
  if (count === 0) {
    count = 1;
    musicSound.play();
    playPauseBtn.innerHTML = "Pause Music <i class='fas fa-pause'></i>";
  } else {
    count = 0;
    musicSound.pause();
    playPauseBtn.innerHTML = "Play Music <i class='fas fa-play'></i>";
  }
};
// functions
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  // console.log(currentTime);
  if ((currentTime - lastrenderTime) / 1000 < 1 / speed) {
    return;
  }
  lastrenderTime = currentTime;
  gameEngine();
};
const isCollide = (snakearr) => {
  // if you bump into yourself
  for (let i = 1; i < snakearr.length; i++) {
    if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
      return true;
    }
  }
  if (
    snakearr[0].x >= 18 ||
    snakearr[0].x <= 0 ||
    snakearr[0].y >= 18 ||
    snakearr[0].y <= 0
  ) {
    return true;
  }
};

const gameEngine = () => {
  // part 1: update the snake array and food position
  if (isCollide(snakeArray)) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over! Press any key to play again!");
    snakeArray = [{ x: 13, y: 15 }];
    score = 0;
    speed = 2;
  }

  // if you have eaten the food, increment the score and regenerate the food
  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    foodSound.play();
    score += 1;
    scoreElement.innerHTML = score;
    speed += 0.1;
    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputDirection.x;
  snakeArray[0].y += inputDirection.y;

  //part 2: diplay the snake and food
  //display the snake
  board.innerHTML = ""; // Update the snake array and food position
  snakeArray.forEach((e, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });
  // display the food
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;

    default:
      break;
  }
});
