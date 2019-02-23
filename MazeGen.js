
/*
  Variables
*/
var maze = [];

var depth = 2;
var height = 11;
var width = 11;

/*
  Setup
*/
for(let z = 0; z < depth; z++){
  let layer = []
  for(let y = 0; y < height; y++){
    let row = [];
    for(let x = 0; x < width; x++){
      row.push(0); 
    }
    layer.push(row);
  }
  maze.push(layer);
}

function print_layer(layer){
  layer_out = [];
  for(let y = 0; y < height; y++){
    layer_out.push( layer[y].join(" ") );
  }
  console.log(layer_out.join("\n"));
}

print_layer(maze[1])
