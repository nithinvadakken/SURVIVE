nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");
while (nametag === null){
    prompt( "Plase re-enter a valid name", "Wonjun Lee");
}
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var spd = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

// Draws character
function charDraw() {
    ctx.beginPath();
    ctx.rect(x, y, 20, 20);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();

}


// draws game
function draw(){
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.height);
    charDraw();


    // If left key pressed
    if(leftPressed) {
        if (x-spd>0) {
            x -= spd;
        }
    }

    // If right key pressed
    if(rightPressed) {
        if(x+20+spd<canvas.width) {
            x += spd;
        }
    }

    // If up key pressed
    if(upPressed) {
        if (y-spd>0) {
            y -= spd;
        }

    }

    // If down key pressed
    if(downPressed) {
        if(y+20+spd<canvas.height) {
            y += spd;
        }
    }
}

//function Wall(){

//}


setInterval(draw, 10);
