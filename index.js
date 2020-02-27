const HEIGHT = 20;
const WIDTH = 20;

let apple = {
  x: 0,
  y: 0,
  appleCounter: 0,
  random: function () {
    do {
      var randomX = Math.floor(Math.random() * WIDTH);
      var randomY = Math.floor(Math.random() * HEIGHT);
    } while (randomX == snake.x && randomY == snake.y);
    this.x = randomX;
    this.y = randomY;
  },
  paint: function () {
    // avoids painting apple on top of snake
    var snakeTrail = [];
    for (var i = 0; i < snakeTrail.length; i++) {
      if (snake.snakeTrail[i].x == apple.x && snake.snakeTrail[i].y == apple.y) {
        apple.random();
      }
    }
    // paints apple
    document.getElementById(`r${this.y}c${this.x}`).classList.add('apple');
    this.appleCounter++;
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
        };
        break;
      case 2: // DOWN
        if (this.y >= HEIGHT - 1) {game.endGame()}
        if (this.y < HEIGHT - 1) {
          this.snakeTrail.push({ x: this.x, y: this.y })
          this.snakeTrail.shift();
          this.y++
        };
        break;
      case 3: // LEFT
        if (this.x <= 0) {game.endGame()}
        if (this.x > 0) {
          this.snakeTrail.push({ x: this.x, y: this.y })
          this.snakeTrail.shift();
          this.x--
        };
    };
    for (var i = 0; i < this.snakeTrail.length; i++) {
      if (this.snakeTrail[i].x == this.x && this.snakeTrail[i].y == this.y) {
        game.endGame();
      };
    };
    if (game.score > 4 && (this.x == 4 && this.y == 4)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 4 && this.y == 15)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 15 && this.y == 4)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 15 && this.y == 15)) 
    {game.endGame()}
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
  musicBackground: new Audio('./sound/ambiente2.ogg'),
  musicEat: new Audio('./sound/comer.mp3'),
  musicDead: new Audio('./sound/chocar.mp3'),
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
    this.musicBackground.loop = true;
    this.musicBackground.volume = 0.07;
    this.musicBackground.play();
    timerId = setInterval(function () {
      this.yourScore.innerText = `SCORE: ${this.score}\n HIGHSCORE: ${this.highScore}`;

      snake.move();
      // if snake eats apple
      if (snake.x == apple.x && snake.y == apple.y) {
        this.score++;
        this.musicEat.play();
        this.musicEat.volume = 0.9;
        snake.grow(); // Make snake longer
        apple.clear();
        apple.random();
        apple.paint();
        if (this.score % 2 ===0) {
          this.speed -=15;
          clearInterval(timerId);
          this.play();
        }
        if (this.score > 4) {
          this.obstacle();
        } 
      }
      game.clearGrid();
      snake.paint();
    }.bind(this), this.speed);
  },

  obstacle: function () {
    document.getElementById(`r4c4`).classList.add('obstacle');
    document.getElementById(`r4c15`).classList.add('obstacle');
    document.getElementById(`r15c4`).classList.add('obstacle');
    document.getElementById(`r15c15`).classList.add('obstacle');
  },

  endGame: function () {
    document.getElementById('youLose').style.display = "inline-block";
    clearInterval(timerId);
    this.musicDead.play();
    this.musicDead.volume = 0.9;
    this.musicBackground.pause();
    document.addEventListener('keypress', game.resetGame);
  },   

  resetGame: function (e) {
    if (e.key === 'Enter') {
      document.getElementById('youLose').style.display = "none";
      if (game.score > game.highScore) {
        game.highScore = game.score};
      game.score = 0;
      apple.appleCounter = 0;
      game.speed = 200;
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

