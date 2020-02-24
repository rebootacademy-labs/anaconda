const HEIGHT = 15;
const WIDTH = 15;
var score = 0;

let apple = {
  x: 0,
  y: 0,
  random: function () {
    do {
      var randomX = Math.floor(Math.random() * WIDTH);
      var randomY = Math.floor(Math.random() * HEIGHT);
    } while (randomX == snake.x && randomY == snake.y);
    this.x = randomX;
    this.y = randomY;
  },
  paint: function () {
    document.getElementById(`r${this.y}c${this.x}`).classList.add('apple');
  },
  clear: function () {
    document.getElementById(`r${this.y}c${this.x}`).classList.remove('apple');
  }
}

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

let game = {
  timerId: null,
  init: function () {

    let TABLE = document.getElementById("pixelCanvas")
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

    document.getElementsByTagName('body')[0].addEventListener("keydown", snake.changeDirection.bind(snake));

    apple.random();
    apple.paint();
  },
  
  clearGrid: function () {
    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        let cell = document.getElementById(`r${row}c${col}`);
        cell.classList.remove('snake')
      };
    };
  },
  play: function () {
    timerId = setInterval(function () {
      snake.move();
      if (snake.x == apple.x && snake.y == apple.y) {
        score = score + 1;
        apple.clear();
        apple.random();
        apple.paint();
        console.log(score);
      }
      game.clearGrid();
      snake.paint();
    }, 200);
  }
  
}




game.init();
game.play();
