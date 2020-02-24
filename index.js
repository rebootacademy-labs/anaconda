
const HEIGHT = 15;
const WIDTH = 15;
const TABLE = document.getElementById("pixelCanvas");

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

let snake = {
  x: 12,
  y: 12,
  // 0=up, 1=right; 2=down; 3=left
  direction: 0,
  changeDirection: function (event) {
    switch (event.code) {
      case "ArrowUp": this.direction = 0; break;
      case "ArrowDown": this.direction = 2; break;
      case "ArrowRight": this.direction = 1; break;
      case "ArrowLeft": this.direction = 3; break;
    }
  },
  move: function () {
    switch (this.direction) {
      case 0: if (this.y > 0) { this.y-- }; break;
      case 1: if (this.x < WIDTH - 1) { this.x++ }; break;
      case 2: if (this.y < HEIGHT - 1) { this.y++ }; break;
      case 3: if (this.x > 0) { this.x-- }; break;
    }
  },
  paint: function () {
    document.getElementById(`r${this.y}c${this.x}`).classList.add('snake');
  }
};


function clearGrid() {
  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      let cell = document.getElementById(`r${row}c${col}`);
      cell.classList.remove('snake')
    };
  };
}

document.getElementsByTagName('body')[0].addEventListener("keydown", snake.changeDirection.bind(snake));

var timerId;
function play() {
  timerId = setInterval(function () {
    snake.move();
    clearGrid();
    snake.paint();
  }, 200);
}
play();
