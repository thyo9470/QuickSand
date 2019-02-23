
/*
  Variables
*/
var maze = [];

var height = 11;
var width = 11;

/*
  Setup
*/
for(let y = 0; y < height; y++){
  let row = [];
  for(let x = 0; x < width; x++){
    row.push(0); 
  }
  maze.push(row);
}

function print_maze(){
  maze_out = [];
  for(let y = 0; y < height; y++){
    maze_out.push( maze[y].join(" ") );
  }
  console.log(maze_out.join("\n"));
}

print_maze();
