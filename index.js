
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

var timerId;
// 0=up, 1=right; 2=down; 3=left
var direction = 0;
function move() {
  timerId = setInterval(function () {
    switch (direction) {
      case 0: snake.y--; break;
      case 1: snake.x++; break;
      case 2: snake.y++; break;
      case 3: snake.x--; break;
    }
    clearGrid();
    paintSnakeSquare();
  }, 500);
}
move();

// function moveSnake() {
//   setInterval(function () {
//     paintSnake();
//     //change color of las square and eliminates it from array
//     document.getElementById(snake[snake.length - 1]);
//     console.log(snake[snake.length - 1]);
//     snake[snake.length - 1].style.backgroundColor = 'rgb(149, 180, 223)';
//     snake.pop();
//     //puts next square in array
//     //first find id for next square
//     // var coordenate = String(snake[0]);
//     // var coordenateSplit = coordenate.split('c');
//     // var presentColumn = (coordenateSplit[1]);
//     // var newColumn = parseInt(presentColumn) + 1;
//     // coordenateSplit[1] = newColumn;
//     // var str = coordenateSplit[0] + "c" + coordenateSplit[1]
//     // newHead = str;
//     // snake.unshift(newHead);
//     // paintSnake()
//     // console.log(snake)
//   }, 500)
// }

// moveSnake()