const HEIGHT = 25;
const WIDTH = 25;

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
  snakeLength: 1,
  snakeTrail: [],
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
      case 0: // UP
      if (this.y <= 0) {game.endGame()}
      if (this.y > 0) {
          this.snakeTrail.push({ x: this.x, y: this.y })
          this.snakeTrail.shift();
          this.y--;
        };
        break;
      case 1: // RIGHT
        if (this.x >= WIDTH - 1) {game.endGame()}
        if (this.x < WIDTH - 1) {
          this.snakeTrail.push({ x: this.x, y: this.y })
          this.snakeTrail.shift();
          this.x++
        }
        break;
      case 2: // DOWN
        if (this.y >= HEIGHT - 1) {game.endGame()}
        if (this.y < HEIGHT - 1) {
          this.snakeTrail.push({ x: this.x, y: this.y })
          this.snakeTrail.shift();
          this.y++
        }
        break;
      case 3: // LEFT
        if (this.x <= 0) {game.endGame()}
        if (this.x > 0) {
          this.snakeTrail.push({ x: this.x, y: this.y })
          this.snakeTrail.shift();
          this.x--
        }
    }

  },
  grow: function () {
    this.snakeTrail.push({ x: this.x, y: this.y })
  },
  paint: function () {
    document.getElementById(`r${this.y}c${this.x}`).classList.add('snake');
    this.snakeTrail.forEach(function (tail) {
      document.getElementById(`r${tail.y}c${tail.x}`).classList.add('snake-tail');
    })
  },
  resetSnake: function () {
    this.x = 12;
    this.y = 12;
    this.snakeLength = 1;
    this.snakeTrail = [];
    this.direction = 0; 
  },
};

let game = {
  timerId: null,
  score: 0,
  highScore: 0,
  speed: 200,  
  yourScore: document.getElementById("yourScore"),
  music: new Audio('./sound/ambiente2.ogg'),
  init: function () {
    let TABLE = document.getElementById("pixelCanvas");
    TABLE.innerHTML = '';
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
        cell.classList.remove('snake-tail')
      };
    };
  },

  play: function () {
    this.music.loop = true;
    this.music.play();
    timerId = setInterval(function () {
      this.yourScore.innerText = `SCORE: ${this.score}\n HIGHSCORE: ${this.highScore}`;

      snake.move();
      if (snake.x == apple.x && snake.y == apple.y) {
        this.score++;
        snake.grow(); // Make snake longer
        apple.clear();
        apple.random();
        apple.paint();
        }
      game.clearGrid();
      snake.paint();
    }.bind(this), this.speed);
  },

  endGame: function () {
    document.getElementById('youLose').style.display = "inline-block";
    clearInterval(timerId);
    document.addEventListener('keypress', game.resetGame);
  },   

  resetGame: function (e) {
    if (e.key === 'Enter') {
      document.getElementById('youLose').style.display = "none";
      game.highScore = game.score;
      game.score = 0;
      snake.resetSnake();
      game.init();
      game.play();
    }
  }
}

game.init();
function start() {
  game.play();
  document.getElementsByTagName('body')[0].removeEventListener("keydown", start)
}
document.getElementsByTagName('body')[0].addEventListener("keydown",start)
// algun cambio
