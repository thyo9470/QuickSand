
/*
  Variables
*/
var maze = [];

var depth = 3;
var height = 11;
var width = 11;

/*
  Setup
*/


/*
  Create new blank maze
*/
function blank_maze(){
  for(let z = 0; z < depth; z++){
    maze.push([]);
    for(let y = 0; y < height; y++){
      maze[z].push([]);
      for(let x = 0; x < width; x++){
        if(z%2 == 0){
          if( (x%2 == 0) && (y%2 == 0) ){
            maze[z][y].push(0); 
          }else{
            maze[z][y].push(1); 
          }
        }else{
          maze[z][y].push(1);
        }
      }
    }
  }
}

// gen random int given a max int
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// radnomize a given array
function shuffle(arr){
  for(let i = 0; i < arr.length; i++){
    let new_pos = getRandomInt(arr.length);

    let temp = arr[new_pos];
    arr[new_pos] = arr[i];
    arr[i] = temp;
  }
}

/*
  Creates a random 3d maze using randomized Kruskel's algorithm
*/
function setup_maze(maze){
  // variables to keep track of generation
  let walls = []; // all walls on board that seperate two empty places
  let cells = []; // list of connecting cells

  // setup variables
  for(let z = 0; z < maze.length; z++){
    for(let y = 0; y < maze[0].length; y++){
      for(let x = 0; x < maze[0][0].length; x++){
        cells.push([[x,y,z]]);
        // if even layer 
        if( ((x%2 == 1) && (y%2 == 0)) && (z%2 == 0) ){
          walls.push([x,y,z]);
        }

        if( ((x%2 == 0) && (y%2 == 1)) && (z%2 == 0) ){
          walls.push([x,y,z]);
        }

        // if odd layer
        if( (x%2 == 0) && (y%2 == 0) && (z%2 == 1) ){
          walls.push([x,y,z]);
        }
      }
    } 
  }

  shuffle(walls);

  // loop through walls and connect each side if not connected in some other place
  walls.forEach(function(coord){
    
    /* get cells the wall seperates */

    let cell1 = coord.slice();
    let cell2 = coord.slice();
    
    // cells to right/left
    if( coord[0]%2 == 1 ){
      cell1[0] -= 1; 
      cell2[0] += 1;
    }
    // cells to up/down
    else if( coord[1]%2 == 1 ){
      cell1[1] -= 1;
      cell2[1] += 1;
    }
    // cells to in/out
    else if( coord[2]%2 == 1){
      cell1[2] -= 1;
      cell2[2] += 1;
    }   

    // find the cell arrays each of the cells we just found are in
    let cell1_index = -1;
    let cell2_index = -1;

    // loop through cells to find cell[1/2]_index
    for(let i = 0; i < cells.length; i++){
      
      // check if cell[1/2] in currents cells array
      cells[i].forEach(function(cell){
        // check for cell1
        if( (cell[0] == cell1[0]) && (cell[1] == cell1[1]) && (cell[2] == cell1[2]) ){
          cell1_index = i; 
        }

        // check for cell2
        if( (cell[0] == cell2[0]) && (cell[1] == cell2[1]) && (cell[2] == cell2[2]) ){
          cell2_index = i;
        }
      });

    }

    // if cells not connected remove wall and connect
    if( cell1_index != cell2_index ){
      let temp = cells[cell2_index];
      temp.forEach(function(temp_cell){
        cells[cell1_index].push(temp_cell);
      })
      cells.splice(cell2_index, 1); 
      maze[coord[2]][coord[1]][coord[0]] = 0;
    }

  });  

}

/*
  print a given layer of the maze
*/
function print_layer(layer){
  let layer_out = [];
  for(let y = 0; y < layer.length; y++){
    let out_shtuff = layer[y].map(function(val){
      if(val < 1){
        return "_";
      }else{
        return "0";
      }
    });
    layer_out.push( out_shtuff.join(' ') );
  }
  console.log(layer_out.join("\n"));
}

// testing the maze
blank_maze(maze, width, height, depth);
setup_maze(maze);
print_layer(maze[0]);
print_layer(maze[1]);
print_layer(maze[2]);
