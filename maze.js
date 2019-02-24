mainer = document.getElementById("main");

mainer.style.width = window.innerWidth;
mainer.style.height = window.innerHeight;

var map = [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]]

function get2D()

function makeGrid(main, env){
	//make a grid in the element referenced.
	cols = env[0].length;
	rows = env.length;

	var grid = document.createElement("div");
	grid.className = "maze";
	
	grid.style.display = "Grid";
	var rowTemplate = "";
	var colTemplate = "";
	// grid.style.gridTemplateColumns = "1fr 1fr 1fr";
	// grid.style.gridTemplateRows = "1fr 1fr 1fr";
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
			// box.style.gridRow = i/i;
			// box.style.gridColumn = j;
			if(env[i][j] == 0){
				box.style.backgroundColor = "lightblue";
			}else if(env[i][j] == 1){
				box.style.backgroundColor = "black";
				box.innerHTML = "Wall at (" + i + "," + j + ")";
			}
			grid.appendChild(box);
		}
	}
	main.appendChild(grid);
}

makeGrid(mainer, map);


// var goal = document.getElementById("goal");
// var player = document.getElementById("player");

// var timer = document.getElementById("timer");
// var score = document.getElementById("score");
// var all = document.getElementById("all");
// var resetBounds = document.getElementById("resetBounds");

// var ob1 = document.getElementById("box1");
// var ob2 = document.getElementById("box2");
// var ob3 = document.getElementById("box3");
// var ob4 = document.getElementById("box4");
// var ob5 = document.getElementById("box5");
// var ob6 = document.getElementById("box6");
// var ob7 = document.getElementById("box7");
// var ob8 = document.getElementById("box8");
// var ob9 = document.getElementById("box9");
// var ob10 = document.getElementById("box10");
// var ob11 = document.getElementById("box11");
// var ob12 = document.getElementById("box12");
// var ob13 = document.getElementById("box13");
// var ob14 = document.getElementById("box14");
// var ob15 = document.getElementById("box15");

// var resetting = false;
// var won = false;
// //Bool for checking if all the boxes have been placed once
// var setUp = false;
// //Increments for games lost
// var losses = 0;
// //Increments for games won
// var wins = 0;

// var width,height;
// window.onresize = window.onload = function() {
//     width = this.innerWidth;
//     height = this.innerHeight;
//     //console.log(width + 'x' + height)
//     goal.style.top = (height-200 + "px");
//     goal.style.left = (width-200 + "px");
//     //score.style.top = (height-80 + "px");
//     //score.style.left = (width-150 + "px");
//     if (!resetting){
//         resetBounds.style.display = "none";
//         checkWinOverlap();
//     }
//     if (width > 1100 && height > 600 ){
//         resetBounds.style.display = "none";
//         resetting = false;
//         won = false;
//         if (!setUp){
//             console.log("Creating new level...");
//             for (i = 0; i < 15; i++){
//                 var boxNames = ["ob1", "ob2", "ob3", "ob4", "ob5", "ob6", "ob7", "ob8", "ob9", "ob10", "ob11", "ob12", "ob13", "ob14", "ob15"]; 
//                 newBox(boxNames[i]);
//             }
//             console.log("Done!");
//             setUp = true;
//         }
//     }
//     if (resetting){
//         resetBounds.style.display = "block"; 
//         if (width < 1100 && height < 600){
//             timer.innerHTML = "Make the window <h1>bigger</h1>...";
//         }else if (width < 1100 && height > 600){
//             timer.innerHTML = "Make the window <h1>wider</h1>...";
//         }else if (width > 1100 && height < 600){
//             timer.innerHTML = "Make the window <h1>taller</h1>...";
//         }
//     }
// }

// //Make box takes the name of one of the box divs, generates a random position for it until it doesn't
// //overlap the player or goal, then exits. This function is looped through for all the box elements.
// function newBox(theBox) {
//     var valid = false;
//     while (!valid) {
//         //Pick random values to place the box at
//         window[theBox].style.top = getRandomX()+"px";
//         window[theBox].style.left = getRandomX()+"px";
        
//         //Create variables to test if the box is valid
//         var boxTest = window[theBox].getBoundingClientRect();
//         var playerTest = player.getBoundingClientRect();
//         var goalTest = goal.getBoundingClientRect();

//         //Booleans that need to be false for the box to be valid.
//         var overlapOnPlayer = !(playerTest.right < boxTest.left || playerTest.left > boxTest.right || playerTest.bottom < boxTest.top || playerTest.top > boxTest.bottom);
//         var overlapOnGoal = !(goalTest.right < boxTest.left || goalTest.left > boxTest.right || goalTest.bottom < boxTest.top || goalTest.top > boxTest.bottom);

//         //Testing if it needs to loop again
//         if (!overlapOnGoal && !overlapOnPlayer){
//             valid = true;
//         }else {
//             valid = false;
//         }
//     }

// }
// //Random X based off broswer window size
// function getRandomX() {
//     var random = Math.random()*1400;
//     return random;
// }
// //Random Y based off browser window size
// function getRandomY() {
//     var random = Math.random()*900;
//     return random;
// }
// //The win sound
// function PlaySound() {
//     var sound = document.getElementById("good");
//     sound.play();
// }
// //The lose sound
// function PlayBadSound(){
//     var meh = document.getElementById("bad");
//     meh.play();
// }

// //The real content for the game. This function detects wins and losses based off overlap.
// function checkWinOverlap() {
//     var ob1box = ob1.getBoundingClientRect(goal);
//     var ob2box = ob2.getBoundingClientRect(goal);
//     var ob3box = ob3.getBoundingClientRect(goal);
//     var ob4box = ob4.getBoundingClientRect(goal);
//     var ob5box = ob5.getBoundingClientRect(goal);
//     var ob6box = ob6.getBoundingClientRect(goal);
//     var ob7box = ob7.getBoundingClientRect(goal);
//     var ob8box = ob8.getBoundingClientRect(goal);
//     var ob9box = ob9.getBoundingClientRect(goal);
//     var ob10box = ob10.getBoundingClientRect(goal);
//     var ob11box = ob11.getBoundingClientRect(goal);
//     var ob12box = ob12.getBoundingClientRect(goal);
//     var ob13box = ob13.getBoundingClientRect(goal);
//     var ob14box = ob14.getBoundingClientRect(goal);
//     var ob15box = ob15.getBoundingClientRect(goal);
    
    
//     var goalBox = goal.getBoundingClientRect(goal);
//     var playerBox = player.getBoundingClientRect(player);
    
//     var lose = !(goalBox.right < ob1box.left || goalBox.left > ob1box.right || goalBox.bottom < ob1box.top || goalBox.top > ob1box.bottom) || !(goalBox.right < ob2box.left || goalBox.left > ob2box.right || goalBox.bottom < ob2box.top || goalBox.top > ob2box.bottom) || !(goalBox.right < ob3box.left || goalBox.left > ob3box.right || goalBox.bottom < ob3box.top || goalBox.top > ob3box.bottom) || !(goalBox.right < ob4box.left || goalBox.left > ob4box.right || goalBox.bottom < ob4box.top || goalBox.top > ob4box.bottom) || !(goalBox.right < ob5box.left || goalBox.left > ob5box.right || goalBox.bottom < ob5box.top || goalBox.top > ob5box.bottom) || !(goalBox.right < ob6box.left || goalBox.left > ob6box.right || goalBox.bottom < ob6box.top || goalBox.top > ob6box.bottom) || !(goalBox.right < ob7box.left || goalBox.left > ob7box.right || goalBox.bottom < ob7box.top || goalBox.top > ob7box.bottom) || !(goalBox.right < ob8box.left || goalBox.left > ob8box.right || goalBox.bottom < ob8box.top || goalBox.top > ob8box.bottom) || !(goalBox.right < ob9box.left || goalBox.left > ob9box.right || goalBox.bottom < ob9box.top || goalBox.top > ob9box.bottom) || !(goalBox.right < ob10box.left || goalBox.left > ob10box.right || goalBox.bottom < ob10box.top || goalBox.top > ob10box.bottom) || !(goalBox.right < ob11box.left || goalBox.left > ob11box.right || goalBox.bottom < ob11box.top || goalBox.top > ob11box.bottom) || !(goalBox.right < ob12box.left || goalBox.left > ob12box.right || goalBox.bottom < ob12box.top || goalBox.top > ob12box.bottom) || !(goalBox.right < ob13box.left || goalBox.left > ob13box.right || goalBox.bottom < ob13box.top || goalBox.top > ob13box.bottom) || !(goalBox.right < ob14box.left || goalBox.left > ob14box.right || goalBox.bottom < ob14box.top || goalBox.top > ob14box.bottom) || !(goalBox.right < ob15box.left || goalBox.left > ob15box.right || goalBox.bottom < ob15box.top || goalBox.top > ob15box.bottom);
    
//     //winOverlap is true if the play and goal intersect
//     var winOverlap = !(goalBox.right < playerBox.left || goalBox.left > playerBox.right || goalBox.bottom < playerBox.top || goalBox.top > playerBox.bottom);
    
//     if (winOverlap || lose) {
//         if (winOverlap){
//             PlaySound();
//             wins++;
//             score.innerHTML = wins + " / " +  losses;
//             player.innerHTML = "&#9745;"; //&#9746;
//             all.style.backgroundColor = "rgb(0,50,0)";
//             won = true;
//             setUp = false;

//         }else if (lose) {
//             PlayBadSound();
//             losses++;
//             score.innerHTML = wins + " / " +  losses;
//             player.innerHTML = "&#9746";
//             all.style.backgroundColor = "rgb(50,0,0)";
//             setUp = false;
//         }
//         resetting = true;
//     }else if (!winOverlap) {
//         player.innerHTML = "";
//         all.style.backgroundColor = "rgb(0,0,0)";
//         timer.innerHTML = "Get to the <p>goal</p>!";
//         won = false;
//     }
// }

