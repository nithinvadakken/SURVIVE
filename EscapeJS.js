nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");

if (nametag == null || nametag === "") {
    nametag = prompt("Please re-enter a valid name", "Wonjun");
}

else if (nametag.length > 10) {
    nametag = prompt("Name must be 10 or less characters :(");
}


var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height/2;
var wid = canvas.width;

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
//random color for rect


r = Math.floor(Math.random() * 256);
g = Math.floor(Math.random() * 256);
rgba = 'rgba('+r+','+g+',0, 0.9)';

// Draws character
function charDraw() {
    ctx.beginPath();
    ctx.fillStyle = rgba;
    ctx.fillRect(x, y, 30, 30);

    ctx.font = "15px Arial";
    ctx.textAlign = "center";

    if (y-50 < 0) {
        if (x - 10 < 0) {
            ctx.fillText(nametag, x + 300, y + 60);
        }
        if (x + 20 > wid) {
            ctx.fillText(nametag, x - 300, y + 60);
        }
        if (x-10>0 && x+20<wid)
        ctx.fillText(nametag, x + 15, y + 60);

    }
    else{
        ctx.fillText(nametag, x + 15, y - 30);
   }
    ctx.fillStyle = rgba;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();


}

// walls
function wall() {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(700, 400, 50, 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

}

// draws game


function draw(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    charDraw();
    wall();


    // If left key pressed
    if(leftPressed) {

        if (x-spd>0) {
            x -= spd;

        }
    }

    // If right key pressed
    if(rightPressed) {

        if(x+30+spd<canvas.width) {
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

        if(y+30+spd<canvas.height) {
            y += spd;
        }

    }

}
setInterval(charDraw, 1000);
setInterval(draw, 10);

new Wall(x, y);