let direction = { x: 0, y: 0 };
const foodSound = new Audio("../assets/music/eatSound.mp3");
const moveSound = new Audio("../assets/music/move.mp3");
const gameOverSound = new Audio("../assets/music/gameover.mp3");
const musicSound = new Audio("../assets/music/music.mp3");
let speed = 2;
let lastrenderTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = {
  x: 6,
  y: 7,
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

const gameEngine = () => {
  // part 1: update the snake array and food position
  //part 2: diplay the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snakeBody ");
    }
    board.appendChild(snakeElement);
  });
  // display the food
  foodElement = document.createElement("div");
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
