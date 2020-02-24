
// makeGrid function:
function makeGrid() {
    var height = 15;
    var width = 15;
    const table = document.getElementById("pixelCanvas");
    let grid = '';
        // Loop over each row. Creates row with class id row+i
    for (let i = 0; i < height; i++){
        grid += '<tr class="row-' + i + '">';
        // Inner loop for each cell. creates cell with class id RiCj
        for (let j = 0; j < width; j++){
            grid += '<td class="cell" id="r' + i + 'c' + j + '"></td>';
        };
        grid += '</tr>';
    };
    // Adds grid into table element (pixelCanvas):
    table.innerHTML = grid;
  
  };
  makeGrid();
  
  
  let snake = [r7c7, r7c6, r7c5]
  
  function paintSnakeSquare(i) {
    document.getElementById(snake[i]);
    snake[i].style.backgroundColor = 'green';
  }
  
  function paintSnake() {
    for (var i=0; i<snake.length; i++) {
        paintSnakeSquare(i);
    }
  }
  paintSnake()
  
  
  function moveSnake() {
    setInterval(function () {
      paintSnake();
      //change color of las square and eliminates it from array
      document.getElementById(snake[snake.length-1]);
      console.log(snake[snake.length-1]);
      snake[snake.length-1].style.backgroundColor = 'rgb(149, 180, 223)';
      snake.pop();
        //puts next square in array
          //first find id for next square
            // var coordenate = String(snake[0]);
            // var coordenateSplit = coordenate.split('c');
            // var presentColumn = (coordenateSplit[1]);
            // var newColumn = parseInt(presentColumn) + 1;
            // coordenateSplit[1] = newColumn;
            // var str = coordenateSplit[0] + "c" + coordenateSplit[1]
            // newHead = str;
            // snake.unshift(newHead);
            // paintSnake()
            // console.log(snake)
    },500)
  }
  
  moveSnake()