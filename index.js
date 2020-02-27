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
// FROM HERE DOWN SNAKE
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
    if (game.score > 4 && (this.x == 5 && this.y == 5)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 5 && this.y == 14)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 14 && this.y == 5)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 14 && this.y == 14)) 
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

// FROM HERE DOWN SNAKE2
let snake2 = {
  x: 5,
  y: 5,
  snake2Length: 1,
  snake2Trail: [],
  // 0=up, 1=right; 2=down; 3=left
  direction: 2,
  changeDirection: function (event) {
    switch (event.code) {
      case "KeyW": this.direction = 0; break;
      case "KeyS": this.direction = 2; break;
      case "KeyD": this.direction = 1; break;
      case "KeyA": this.direction = 3; break;
    }
  },
  move: function () {
    switch (this.direction) {
      case 0: // UP
      if (this.y <= 0) {game.endGame()}
      if (this.y > 0) {
          this.snake2Trail.push({ x: this.x, y: this.y })
          this.snake2Trail.shift();
          this.y--;
        };
        break;
      case 1: // RIGHT
        if (this.x >= WIDTH - 1) {game.endGame()}
        if (this.x < WIDTH - 1) {
          this.snake2Trail.push({ x: this.x, y: this.y })
          this.snake2Trail.shift();
          this.x++
        };
        break;
      case 2: // DOWN
        if (this.y >= HEIGHT - 1) {game.endGame()}
        if (this.y < HEIGHT - 1) {
          this.snake2Trail.push({ x: this.x, y: this.y })
          this.snake2Trail.shift();
          this.y++
        };
        break;
      case 3: // LEFT
        if (this.x <= 0) {game.endGame()}
        if (this.x > 0) {
          this.snake2Trail.push({ x: this.x, y: this.y })
          this.snake2Trail.shift();
          this.x--
        };
    };
    for (var i = 0; i < this.snake2Trail.length; i++) {
      if (this.snake2Trail[i].x == this.x && this.snake2Trail[i].y == this.y) {
        game.endGame();
      };
    };
    if (game.score > 4 && (this.x == 5 && this.y == 5)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 5 && this.y == 14)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 14 && this.y == 5)) 
    {game.endGame()}
    else if (game.score > 4 && (this.x == 14 && this.y == 14)) 
    {game.endGame()}
  },
  grow: function () {
    this.snake2Trail.push({ x: this.x, y: this.y })
  },
  paint: function () {
    document.getElementById(`r${this.y}c${this.x}`).classList.add('snake2');
    this.snake2Trail.forEach(function (tail) {
      document.getElementById(`r${tail.y}c${tail.x}`).classList.add('snake2-tail');
    })
  },
  resetSnake2: function () {
    this.x = 5;
    this.y = 5;
    this.snake2Length = 1;
    this.snake2Trail = [];
    this.direction = 2; 
  },
};

let game = {
  timerId: null,
  score: 0,
  score2: 0,
  highScore: 0,
  highScore2: 0,
  speed: 300,  
  yourScore: document.getElementById("yourScore"),
  yourScore2: document.getElementById("yourScore2"),
  musicBackground: new Audio('./sound/ambiente2.ogg'),
  musicEat: new Audio('./sound/comer.mp3'),
  musicDead: new Audio('./sound/chocar.mp3'),
  started: false,
  players: 1,

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
    document.getElementsByTagName('body')[0].addEventListener("keydown", snake2.changeDirection.bind(snake2));

    apple.random();
    apple.paint();
  },

  clearGrid: function () {
    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        let cell = document.getElementById(`r${row}c${col}`);
        cell.classList.remove('snake')
        cell.classList.remove('snake-tail')
        cell.classList.remove('snake2')
        cell.classList.remove('snake2-tail')

      };
    };
  },

  play: function () {
    this.musicBackground.loop = true;
    this.musicBackground.volume = 0.07;
    this.musicBackground.play();

    timerId = setInterval(function () {
      this.yourScore.innerText = `GREEN SCORE: ${this.score} HIGHSCORE: ${this.highScore}`;

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
          this.speed -=10;
          clearInterval(timerId);
          this.play();
        }
        if (this.score > 4) {
          this.obstacle();
        } 
      }

      if (this.players == 2) {
        this.yourScore2.innerText = `BLUE SCORE: ${this.score2} HIGHSCORE: ${this.highScore2}`;
        snake2.move();
        // if snake2 eats apple
        if (snake2.x == apple.x && snake2.y == apple.y) {
          this.score2++;
          this.musicEat.play();
          this.musicEat.volume = 0.9;
          snake2.grow(); // Make snake longer
          apple.clear();
          apple.random();
          apple.paint();
          if (this.score % 2 ===0) {
            this.speed -=10;
            clearInterval(timerId);
            this.play();
          }
          if (this.score2 > 4) {
            this.obstacle();
          } 
        }
      }
      game.clearGrid();
      snake.paint();
      if (this.players == 2) {
        snake2.paint();
      }
    }.bind(this), this.speed);
  },

  obstacle: function () {
    document.getElementById(`r5c5`).classList.add('obstacle');
    document.getElementById(`r5c14`).classList.add('obstacle');
    document.getElementById(`r14c5`).classList.add('obstacle');
    document.getElementById(`r14c14`).classList.add('obstacle');
  },

  endGame: function () {
    document.getElementById('youLose').style.display = "inline-block";
    clearInterval(timerId);
    this.musicDead.play();
    this.musicDead.volume = 0.9;
    this.musicBackground.pause();
  },   

  resetGame: function () {
      document.getElementById('youLose').style.display = "none";
      if (game.score > game.highScore) {
        game.highScore = game.score};
      if (game.score2 > game.highScore2) {
        game.highScore2 = game.score2};
      game.players = 1;
      game.score = 0;
      game.score2 = 0;
      apple.appleCounter = 0;
      game.speed = 300;
      snake.resetSnake();
      snake2.resetSnake2();
  }
}
  game.init();

document.getElementById('start1').addEventListener("click", function() {
  game.resetGame();
  game.init();
  game.play();
})

document.getElementById('start2').addEventListener("click", function() {
  game.resetGame();
  game.players = 2;
  game.init();
  game.play();
})