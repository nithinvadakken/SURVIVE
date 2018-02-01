// asks user for name
nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");

if (nametag == null || nametag === "") {
    nametag = prompt("Please re-enter a valid name", "Wonjun Lee");
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
var x = canvas.width/2;
var y = canvas.height/2;
var bx = x;
var by = y;
var dog = 250;

// features
var mana = 600;
var health = 40;

// spawn
var enemies = [];
var enemies_temp = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//color array for enemies

var colorArray = [
    '#838CFF',
    '#4A33E8',
    '#4479FF',
    '#33B0E8',
    '#46FCFF'
];

//color array for bomb
var bombColor = [
    "#BD2404",
    "#750401",
    "#F26105",
    "#F59018",
    "#F5BC0C"
];

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
}

// Draws character
function charDraw() {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.fillRect(x, y, 30, 30);

    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(nametag, x + 15, y - 30);

}

// Random number generator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


//adds mana
function addMana() {
    mana += 40;
    if (mana > 600){
        mana = 600;
    }
}

// enemy class
class Enemy {
    constructor(ex, ey) {
        this.x = ex;
        this.y = ey;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    }

    makeEnemy() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 30);

        this.x += (x-this.x)/dog;
        this.y += (y-this.y)/dog;
    }
}


//waves of enemies
function summonWaves() {
    var wave = getRandomInt(3, 5);
    for (var j = 0; j < wave+1; j ++) {
        var ex = getRandomInt(0, canvas.width);
        var ey = getRandomInt(0, canvas.height);
        enemies.push(new Enemy(ex, ey));
        enemies_temp.push(new Enemy(ex, ey));
    }
}


// update enemy position
function enemyUpdate(){
    for (k=0; k<enemies.length; k++) {
        enemies[k].makeEnemy();
    }
}


// remove stackers
function deleteThee() {
    for (q=0; q<11; q++) {enemies.shift();}
}


// health bar
function HealthBar() {
    if (health>0) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(x-5, y+40, health, 10);
    }
}


// Kill da doods
function EnemyKillRemove() {
    enemies_temp = enemies;
    for (g=0; g<enemies_temp.length; g++) {
        if ((Math.abs(enemies[g].x - bx) < 30) && (Math.abs(enemies[g].y - by) < 30)) {
            enemies.splice(g, 1);
        }
    }
    enemies_temp = enemies;
}

// creates the bomb
function Bomb() {
    ctx.beginPath();
    ctx.fillStyle = bombColor[Math.floor(Math.random() * colorArray.length)];
    ctx.fillRect(bx, by, 40, 40);

    ctx.beginPath();
    ctx.fillStyle = bombColor[Math.floor(Math.random() * colorArray.length)];
    ctx.fillRect(bx + 10, by + 10, 20, 20);
}

// draws game
function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.font = "20px Impact";
    ctx.fillStyle = 'blue';
    ctx.fillText("Mana: " + mana, 50, 50);
    ctx.fillText("Score: " + score, 50, 70);
    score++;

    charDraw();
    enemyUpdate();
    HealthBar();
    EnemyKillRemove();

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

    // bomb drop
    if (firePressed && mana > 0) {
        Bomb();
        mana -= 1;
        }

    // Returns bullet to original position
    else {
        bx = x;
        by = y;
    }

    // Collision
    for (z=0; z < enemies.length; z++) {
        if ((Math.abs(enemies[z].x - x) < 30) && (Math.abs(enemies[z].y - y) < 30)) {
            health = health - 0.5;
        }
        if (health <= 0) {
            window.location.reload();
        }
    }

    // Reload when dead
    if (health <= 0) {window.location.reload();}
}

setInterval(draw, 10);
setInterval(addMana, 2000);
setInterval(summonWaves, 500);
setInterval(deleteThee, 3000);