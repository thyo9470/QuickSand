

/*
  Variables
*/

var grid = document.getElementById("main");
//for nice looks. it may be unnecessary, but we need to declare main for the makeDisplay function
main = document.getElementById("main");
main.style.width = window.innerWidth;
main.style.height = window.innerHeight;
var numMainChildren = main.children.length;

//for maze display
var currentLayer = 0; //global counter for which maze we are displaying.

//for maze generation
var maze = [];
var depth = 5; //has to be odd
var height = 21;// based on the screen height+width
var width = 21;// based on the screen height+width

/*
  Setup
*/

class Player 
{
  constructor()
  {
    this.x = 1;
    this.y = 1;
    this.z = 0;
  }

  move(x, y, z)
  {
    if(this.can_move_to(this.x + x, this.y + y, this.z + z))
    {
      this.x += x;
      this.y += y;
      this.z += z;
      return true;
    }
    return false;
  }

  /**
   * Whether the position is valid
   */
  can_move_to(x, y, z)
  {
    if(x >= 0 && x < width && y >= 0 && y < height && z >= 0 && z < depth)
    {
      return maze[z][y][x] != 1;
    }
    return false;
  }
}


/*
  Create new blank maze
*/
function blank_maze(){
  for(let z = 0; z < depth; z++){
    maze.push([]);
    for(let y = 0; y < height; y++){
      maze[z].push([]);
      for(let x = 0; x < width; x++){
        if( (z%2 == 0) && ( x > 0 ) && ( y > 0) && (x < width-1) && ( y < height-1 )){
          if( (x%2 == 1) && (y%2 == 1) ){
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
    for(let y = 1; y < maze[0].length-1; y++){
      for(let x = 1; x < maze[0][0].length-1; x++){
        cells.push([[x,y,z]]);

        // if even layer 
        if( ((x%2 == 0) && (y%2 == 1)) && (z%2 == 0) ){
          walls.push([x,y,z]);
        }

        if( ((x%2 == 1) && (y%2 == 0)) && (z%2 == 0) ){
          walls.push([x,y,z]);
        }

        // if odd layer
        if( (x%2 == 1) && (y%2 == 1) && (z%2 == 1) ){
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
    if( coord[0]%2 == 0 ){
      cell1[0] -= 1; 
      cell2[0] += 1;
    }
    // cells to up/down
    else if( coord[1]%2 == 0 ){
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


// FOR DISPLAYING THE MAZE
function makeDisplay(layer, p){
	//make a grid in the element referenced.
	var env = maze[layer];
	console.log(env);
	cols = env[0].length;
	rows = env.length;
	
	//if previously a layer has been shown, remove it
	if(main.children.length > numMainChildren){
		main.removeChild(main.children[numMainChildren]);
	}

	grid = document.createElement("div");
	grid.className = "maze";
	grid.id = "displayGrid";
	grid.style.display = "Grid";
	


	var rowTemplate = "";
	var colTemplate = "";
	for(i = 0; i < rows; i+=1){
		rowTemplate += "1fr ";
		grid.style.gridTemplateRows = rowTemplate;

		for(j = 0; j < cols; j+=1){
			if(i == 0) {
				colTemplate += "1fr ";
				grid.style.gridTemplateColumns = colTemplate;
			}

			
			var box = document.createElement("div")

			//give the box the correct css.
			box.className = "box";
			box.id = "box" + i + j;
			

			if(p.x == j && p.y == i && p.z == layer){
				box.style.backgroundColor = "red";
			}else if(env[i][j] == 0){
				if(layer >= 2 && layer <= depth-2){
					if(maze[layer-1][i][j] != 1 && maze[layer+1][i][j] != 1){
						box.style.backgroundColor = "lightgreen";
						box.style.innerHTML = "^/v";
					}else if(maze[layer-1][i][j] != 1){
						//can only go up
						box.style.backgroundColor = "lightblue";
						box.style.innerHTML = "^";
					}else if(maze[layer+1][i][j] != 1){
						//can only go down
						box.style.backgroundColor = "darkblue";
						box.style.innerHTML = "v";
					}else{
						box.style.backgroundColor = "blue";
					}
				}else if(layer >= 1 && maze[layer-1][i][j] != 1){
						box.style.backgroundColor = "lightblue";
						box.style.innerHTML = "^";
				}else if(layer <= depth-2 && maze[layer+1][i][j] != 1){
						box.style.backgroundColor = "darkblue";
						box.style.innerHTML = "v";
				}else{
					box.style.backgroundColor = "blue";
					box.style.innerHTML = "-";
				}
			}else if(env[i][j] == 1){
				box.style.backgroundColor = "black";
				box.innerHTML = "Wall at (" + i + "," + j + ")";
			}
			grid.appendChild(box);
		}
	}
	main.appendChild(grid);
}

//GO DOWN THE MAZE ONE LAYER
function goDown(){
	//if you can go down here. This needs an additional check for if the player's current position can move up
	
	if(currentLayer < depth-2){
		currentLayer += 2;
		makeDisplay(currentLayer, player);
	}
}

//GO UP ONE LAYER
function goUp(){
	//check if you can go up. This needs an additional check for if the player's current position can move up
	if(currentLayer >= 2){
		currentLayer -= 2;
		makeDisplay(currentLayer, player);
	}
}


document.addEventListener('keydown', event => {
	document.getElementById("invalidMove").style.display = "none";
	switch(event.key)
	{
		case "ArrowDown":
		case "s":
			player.move(0, 1, 0);
			makeDisplay(currentLayer, player);
		break;
		case "ArrowUp":
		case "w":
			player.move(0, -1, 0);
			makeDisplay(currentLayer, player);
		break;
		case "ArrowLeft":
		case "a":
			player.move(-1, 0, 0);
			makeDisplay(currentLayer, player);
		break;
		case "ArrowRight":
		case "d":
			player.move(1, 0, 0);
			makeDisplay(currentLayer, player);
		break;
		case "q":
		if(!player.move(0, 0, -1)){
			document.getElementById("invalidMove").style.display = "block";
		}else{
			player.move(0, 0, -1); //implementing this so that we are able to check if it is actually a valid move (we do this above).
			goUp();
		}
		break;
		case "e":
		if(!player.move(0, 0, 1)){
			document.getElementById("invalidMove").style.display = "block";
		}else{
			player.move(0, 0, 1);
			goDown();
		}
		break;
	}
});


blank_maze();
setup_maze(maze);

player = new Player();
makeDisplay(currentLayer, player); //parameter: z-layer, player class

