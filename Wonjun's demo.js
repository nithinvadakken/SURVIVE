nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");
if (nametag === null || nametag === "") {
    nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");
}
var canvas;
var context;
var x = 0;
var y = 0;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

window.onload = function() {
    canvas = document.getElementByID("myCanvas");
    context = canvas.getContext("2d");

    drawImage('easy_maze.png', 5, 5);

    window.onkeydown = keyDownHandler;
};

// Checks if keys are pressed
function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
    else if(e.keyCode === 38) {
        upPressed = true;
    }
    else if(e.keyCode === 40) {
        downPressed = true;
    }
}

// Checks if keys were released
function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
    else if(e.keyCode === 38) {
        upPressed = false;
    }
    else if(e.keyCode === 40) {
        downPressed = false;
    }
}


// draws game
function draw(){
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.height);
    charDraw();


    // If left key pressed
    if(leftPressed) {
        if (x-3>0) {
            x -= .05;
        }

    }

    // If right key pressed
    if(rightPressed) {
        if(x+23<canvas.width) {
            x += .05;
        }
    }

    // If up key pressed
    if(upPressed) {
        if (y-3>0) {
            y -= .05;
        }

    }

    // If down key pressed
    if(downPressed) {
        if(y+23<canvas.height) {
            y += .05;
        }
    }
}

function Wall(){

}



setInterval(draw, 10);
var timer;

function drawImage(fileName, startingX, startingY) {
    //stop drawing image
    clearTimeout(timer);

    //draw maze
    var imgMaze = new Image();
    imgMaze.onload = function() {
        // resize the canvas to maze
        canvas.width = imgMaze.width;
        canvas.height = imgMaze.height;

        context.drawImage(imgMaze, 0.0);

        x = startingX;
        y = startingY;


// Draws character
        var char = context.rect(x, y, 5, 5);
        context.drawImage(char, x, y);
        context.stroke();

        // draw next frame by 10 millieseconds
        timer = setTimeout(drawFrame, 10)

    };
    imgMaze.src = fileName
}

