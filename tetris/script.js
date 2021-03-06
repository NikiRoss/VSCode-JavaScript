const grid = document.querySelector(".grid");
const width = 10;
const ScoreDisplay = document.getElementById("score");
let squares = Array.from(document.querySelectorAll(".grid div"));
let nextRandom = 0;

// tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  oTetromino,
  iTetromino,
  tTetromino,
];

let random = Math.floor(Math.random() * theTetrominoes.length);
let currentPosition = 4;
let currentRotation = 0;
let current = theTetrominoes[random][currentRotation];

// draw the tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

// undraw tetromino
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

// assign functions to keycodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener("keyup", control);

// making the tetromino move down every sec
let timerId = setInterval(moveDown, 600);

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// freeze function instructs shape when to stop
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    //start new falling shape
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}

//move tetromino left unless it is at the edge or there is a block
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );

  if (!isAtLeftEdge) currentPosition -= 1;

  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
}

// move tetromino to the right
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === -1
  );

  if (!isAtRightEdge) currentPosition += 1;

  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

// rotate tetromino
function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

//show 'up next' tetromino in mini-grid
const displaySquares = document.querySelectorAll(".mini-grid div");
const displayWidth = 4;
let displayIndex = 0;

const upNextTetrominos = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2][
    (0, displayWidth, displayWidth + 1, displayWidth * 2 + 1)
  ],
  [1, displayWidth, displayWidth + 1, displayWidth + 2],
  [0, 1, displayWidth, displayWidth + 1],
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
];

// display the shape in mini-grid
function displayShape() {
  //remove previous tetromino from grid
  displaySquares.forEach((square) => {
    square.classList.remove("tetromino");
  });
  upNextTetrominos[nextRandom].forEach((index) => {
    displaySquares[displayIndex + index].classList.add("tetromino");
  });
}
