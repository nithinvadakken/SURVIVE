// asks user for name
nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");

if (nametag == null || nametag === "") {
    nametag = prompt("Please re-enter a valid name", "Wonjun");
}

else if (nametag.length > 10) {
    nametag = prompt("Name must be 10 or less characters :(");
}


// variables
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
var wid = canvas.width;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var prevKey = 'up';

var spd = 3;
var bSpd = 3;
var x = canvas.width/2;
var y = canvas.height/2;
var bx = x;
var by = y;
var ex = 100;
var ey = 100;

var mana = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// Checks if keys are pressed
function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
        prevKey = 'right';
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
        prevKey = 'left';
    }
    else if(e.keyCode === 38) {
        upPressed = true;
        prevKey = 'up';
    }
    else if(e.keyCode === 40) {
        downPressed = true;
        prevKey = 'down';
    }
    else if(e.keyCode === 32) {
        spacePressed = true;
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
    else if(e.keyCode === 32) {
        spacePressed = false;
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
            ctx.fillText(nametag, x + 50, y + 60);
        }
        else if (x + 50> wid) {
            ctx.fillText(nametag, x - 50, y + 60);
        }
        else if (x-10>0 && x+20<wid) {
            ctx.fillText(nametag, x + 15, y + 60);
        }

    }
    else if (x + 50> wid) {
        ctx.fillText(nametag, x - 50, y - 30);
    }
    else if (x - 10 < 0) {
        ctx.fillText(nametag, x -50, y - 30);
    }
    else{
        ctx.fillText(nametag, x + 15, y - 30);
    }

    ctx.fillStyle = rgba;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


// Causes a function to repeat x times
function repeat(func, times) {
    func();
    --times && repeat(func, times);
}


// creates the bullet
function Bullet() {
    if (prevKey === 'up') {
        if (by > 0) {
            by -= bSpd;
        }

    } else if (prevKey === 'down') {
        if (by + 40< canvas.height) {
            by += bSpd;
        }

    } else if (prevKey === 'right') {
        console.log(bx);
        if (bx + 40 < canvas.width) {
            console.log("In if");
            bx += bSpd;
        }

    } else if (prevKey === 'left') {
        if (bx > 0) {
            bx -= bSpd;
        }
    }

}


// makes enemies
function makeEnemy() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(ex, ey, 30, 30);
}

// draws game
function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.font = "20px Impact";
    ctx.fillText("MANA: " + mana, 50, 50);

    charDraw();
    makeEnemy();

    // Enemy movement
    ex += (x-ex)/100;
    ey += (y-ey)/100;

    // Move left
    if (leftPressed) {
        if (x - spd > 0) {
            x -= spd;
        }
    }

    // Move right
    if (rightPressed) {
        if (x + 30 + spd < canvas.width) {
            x += spd;
        }
    }

    // Move up
    if (upPressed) {
        if (y - spd > 0) {
            y -= spd;
        }
    }

    // Move down
    if (downPressed) {
        if (y + 30 + spd < canvas.height) {
            y += spd;
        }
    }

    // Bullet shoot
    if (spacePressed && mana > 0) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(bx, by, 40, 40);

        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bx + 10, by + 10, 20, 20);
        Bullet();

        --mana;
        ctx.font = "20px Impact";
        ctx.fillText("MANA: " + mana, 50, 50);
    }

    // Returns bullet to original position
    else {
        bx = x;
        by = y;

        }

}

// setInterval(charDraw, 1000);
setInterval(draw, 10);