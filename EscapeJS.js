// asks user for name
nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");

if (nametag == null || nametag === "") {
    nametag = prompt("Please re-enter a valid name", "Wonjun");
}

if (nametag.length > 10) {
    nametag = prompt("Name must be 10 or less characters :(");
}


// canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
var score = 0;

//key pressed
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var firePressed = false;
var prevKey = 'up';

// movement
var spd = 3;
var bSpd = 3;
var x = canvas.width/2;
var y = canvas.height/2;
var bx = x;
var by = y;
var enemies = [];
var sx = 0;
var sy = 0;

// features
var mana = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// Checks if keys are pressed
function keyDownHandler(e) {
    if(e.keyCode === 68) {
        rightPressed = true;
        prevKey = 'right';
    }
    else if(e.keyCode === 65) {
        leftPressed = true;
        prevKey = 'left';
    }
    else if(e.keyCode === 87) {
        upPressed = true;
        prevKey = 'up';
    }
    else if(e.keyCode === 83) {
        downPressed = true;
        prevKey = 'down';
    }
    else if(e.keyCode === 32) {
        spacePressed = true;
    }
    else if (e.keyCode === 80) {
        firePressed = true;
    }
}


// Checks if keys were released
function keyUpHandler(e) {
    if(e.keyCode === 68) {
        rightPressed = false;
    }
    else if(e.keyCode === 65) {
        leftPressed = false;
    }
    else if(e.keyCode === 87) {
        upPressed = false;
    }
    else if(e.keyCode === 83) {
        downPressed = false;
    }
    else if(e.keyCode === 32) {
        spacePressed = false;
    }
    else if (e.keyCode === 80) {
        firePressed = false;
    }
}


//random color for rect
r = Math.floor(Math.random() * 256);
g = Math.floor(Math.random() * 256);
rgba = 'rgba('+r+','+g+',0, 0.9)';
var r1 = Math.floor(Math.random() * 256);
var g1 = Math.floor(Math.random() * 256);


// Draws character
function charDraw() {
    ctx.beginPath();
    ctx.fillStyle = rgba;
    ctx.fillRect(x, y, 30, 30);

    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(nametag, x + 15, y - 30);
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
        if (bx + 40 < canvas.width) {
            bx += bSpd;
        }

    } else if (prevKey === 'left') {
        if (bx > 0) {
            bx -= bSpd;
        }
    }
}


// Random number generator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


//adds mana
function addMana() {
    mana += 2;
}


// makes sword
function makeSword() {
    ctx.beginPath();
    ctx.fillStyle = 'gray';

    if (prevKey === 'left') {
        sx = x-30;
        sy = y+30;
        ctx.fillRect(sx, sy, 30, 10);
    }

    else if (prevKey === 'right') {
        sx = x+30;
        sy = y-10;
        ctx.fillRect(sx, sy, 30, 10)
    }

    else if (prevKey === 'up') {
        sx = x-10;
        sy = y-30;
        ctx.fillRect(sx, sy, 10, 30)
    }

    else if (prevKey === 'down') {
        sx = x+30;
        sy = y+30;
        ctx.fillRect(sx, sy, 10, 30)
    }
}


// enemy class
class Enemy {
    constructor(ex, ey) {
        this.x = ex;
        this.y = ey;
    }

    makeEnemy() {
        this.rg = 'rgba('+r1+','+g1+',0, 0.9)';
        ctx.beginPath();
        ctx.fillStyle = this.rg;
        ctx.fillRect(this.x, this.y, 30, 30);

        this.x += (x-this.x)/100;
        this.y += (y-this.y)/100;
    }
}


//waves of enemies
function summonWaves() {
    var wave = getRandomInt(1, 2);
    for (var j = 0; j < wave+1; j ++) {
        var ex = getRandomInt(0, canvas.width);
        var ey = getRandomInt(0, canvas.height);
        enemies.push(new Enemy(ex, ey));
    }
}


// makes enemies
function enemyCharge() {
    summonWaves();
}


// update enemy position
function enemyUpdate(){
    for (k=0; k<enemies.length; k++) {enemies[k].makeEnemy()}
}


// draws game
function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.font = "20px Impact";
    ctx.fillStyle = 'blue';
    ctx.fillText("MANA: " + mana, 50, 50);
    ctx.fillText("Score: " + score, 50, 70);
    score++;

    charDraw();
    enemyUpdate();

    // Sword
    if (spacePressed) {makeSword()}

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
    if (firePressed && mana > 0) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(bx, by, 40, 40);

        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bx + 10, by + 10, 20, 20);
        Bullet();
        --mana;
        ctx.font = "20px Impact";
        ctx.fillStyle = 'red';
        ctx.fillText("MANA: " + mana, 50, 50);
    }

    // Returns bullet to original position
    else {
        bx = x;
        by = y;
    }
}

setInterval(draw, 10);
setInterval(addMana, 1000);
setInterval(enemyCharge, 1000);


