
const HEIGHT = 15;
const WIDTH = 15;
const TABLE = document.getElementById("pixelCanvas");

// makeGrid function:
function makeGrid() {
  let grid = '';

  for (let row = 0; row < HEIGHT; row++) {
    grid += '<tr class="row-' + row + '">';
    // Each cell class: id RiCj; ie. R1C2
    for (let col = 0; col < WIDTH; col++) {
      grid += '<td class="cell" id="r' + row + 'c' + col + '"></td>';
    };
    grid += '</tr>';
  };
  TABLE.innerHTML = grid;
};

makeGrid();

let snake = { x: 5, y: 7 };

function paintSnakeSquare() {
  let pos = `r${snake.y}c${snake.x}`;
  let cell = document.getElementById(pos);
  cell.classList.add('snake');
}

function clearGrid() {
  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      let cell = document.getElementById(`r${row}c${col}`);
      cell.classList.remove('snake')
    };
  };
}

document.getElementsByTagName('body')[0].addEventListener("keydown", keyDownEvent(e));

var timerId;
// 0=up, 1=right; 2=down; 3=left
var keyCode = 38;
function move() {
  timerId = setInterval(function keyDownEvent(e) {
    switch (e.keyCode) {
      case 38: snake.y--; break;
      case 39: snake.x++; break;
      case 40: snake.y++; break;
      case 37: snake.x--; break;
    }
    clearGrid();
    paintSnakeSquare();
  }, 500);
}
move();
