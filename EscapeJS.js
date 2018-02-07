//asks for username
nametag = prompt("Please enter an appropriate user name:");

while (nametag == null || nametag == "" || nametag.length < 1 || nametag.length > 10){
    nametag = prompt("Please enter a valid username that is no more than 10 characters:");
}

function getCookie(cookiename) {
    var name = cookiename + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var name = getCookie("username");
    if (name === nametag) {
        alert("Back for more, " + nametag + "?");
    } else {
        if (nametag != "" && nametag != null) {
            setCookie("username", nametag, 365);
        }
    }
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
var health = 40;
var level = 1;
var ax = getRandomInt(90, canvas.width-30);
var ay = getRandomInt(90, canvas.height-30);
var maxlevel = 10;


// spawn
var enemies = [];
var enemies_temp = [];
var bombs =[];
var bombs_temp = [];

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

function setCookie(cookiename, val, expiration) {
    var d = new Date();
    d.setTime(d.getTime() + (expiration*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookiename + "=" + val + ";" + expiration + ";path=/";
}

// give health
function giveHealth() {
    health++;
}

// Checks if keys are pressed
function keyDownHandler(e) {
    if(e.keyCode === 68 || e.keyCode === 39) {
        rightPressed = true;
        prevKey = 'right';
    }
    else if(e.keyCode === 65 || e.keyCode === 37) {
        leftPressed = true;
        prevKey = 'left';
    }
    else if(e.keyCode === 87 || e.keyCode === 38) {
        upPressed = true;
        prevKey = 'up';
    }
    else if(e.keyCode === 83 || e.keyCode === 40) {
        downPressed = true;
        prevKey = 'down';
    }
    else if (e.keyCode === 80 || e.keyCode === 32) {
        firePressed = true;
    }
}


// Checks if keys were released
function keyUpHandler(e) {
    if(e.keyCode === 68 || e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 65 || e.keyCode === 37) {
        leftPressed = false;
    }
    else if(e.keyCode === 87 || e.keyCode === 38) {
        upPressed = false;
    }
    else if(e.keyCode === 83 || e.keyCode === 40) {
        downPressed = false;
    }
    else if (e.keyCode === 80 || e.keyCode === 32) {
        firePressed = false;
    }
}

// Draws character
function charDraw() {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.fillRect(x, y, 30, 30);

    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    if (y - 50 < 0) {
        if (x - 10 < 0) {
            ctx.fillText(nametag, x + 50, y + 60);
        }
        else if (x + 50 > canvas.width) {
            ctx.fillText(nametag, x - 50, y + 60);
        }
        else if (x - 10 > 0 && x + 20 < canvas.width) {
            ctx.fillText(nametag, x + 15, y + 60);
        }
    }
    else if (x + 50 > canvas.width) {
        ctx.fillText(nametag, x - 50, y - 30);
    }
    else if (x - 10 < 0) {
        ctx.fillText(nametag, x + 50, y - 30);
    }
    else {
        ctx.fillText(nametag, x + 15, y - 30);
    }

}

// Random number generator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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


// remove "clouds"
function deleteThee() {
    if (enemies.length > 80) {
        for (q=0; q<20; q++) {enemies.shift();}
    } else {for (q=0; q<4; q++) {enemies.shift();}}
}


// health bar
function HealthBar() {
    if (health>0) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(x-5, y+40, health, 10);
    }
}


// bomb class
class Bomb {
    constructor(bx, by) {
        this.x = bx;
        this.y = by;
        this.color = bombColor[Math.floor(Math.random() * colorArray.length)];
    }

    makeBomb() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 10, this.y + 10, 20, 20);
    }
}


// Kill da doods
function EnemyKillRemove() {
    enemies_temp = enemies;
    for (g=0; g<enemies_temp.length; g++) {
        if ((Math.abs(enemies[g].x - x) < 30) && (Math.abs(enemies[g].y - y) < 30)) {
            enemies.splice(g, 1);
        }
    }

    for (cow=0; cow<enemies.length; cow++) {
        if ((Math.abs(enemies[cow].x - bx) < 30) && (Math.abs(enemies[cow].y - by) < 30)) {
            for (woc=0; woc<enemies.length; woc++) {
                if ((Math.abs(enemies[woc].x - bx) < 80) && (Math.abs(enemies[woc].y - by) < 80)) {
                    enemies.splice(woc, 1);
                }
            }
        }
    }
}


// Apple
function appleSpawn() {
    ctx.beginPath();
    ctx.fillStyle = '#e21638';
    ctx.fillRect(ax, ay + 10, 30, 30);

    if ((Math.abs(ax-x) < 30) && (Math.abs(ay-y) < 30)) {
        if (health < 40) {
            health ++;
            score += 100;
        }
        ax = getRandomInt(90, canvas.width-30);
        ay = getRandomInt(90, canvas.height-30);
    }
}


// summon bombs
function summonBomb(bx, by) {
    setTimeout(function timerDelay() {
        if (bombs.length < 3) {
            bombs.push(new Bomb(bx, by));
            bombs_temp.push(new Bomb(bx, by));
        }
    }, 5000);
}


// bomb update
function bombUpdate() {
    setTimeout(function Useless() {
        for (u = 0; u < bombs.length; u++) {
            bombs[u].makeBomb();
        }
    }, 5000);
}


// draws game
function draw() {

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.font = "20px Impact";
    ctx.fillStyle = 'blue';
    ctx.fillText("Health: " + health, 50, 40);

    ctx.font = "20px Impact";
    ctx.fillStyle = 'red';
    ctx.fillText("Score: " + score, 50, 60);

    ctx.font = "20px Impact";
    ctx.fillStyle = 'blue';
    ctx.fillText("Level: " + level, 50, 80);

    charDraw();
    enemyUpdate();
    HealthBar();
    EnemyKillRemove();
    //bombUpdate();
    appleSpawn();

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
    /*
    if (firePressed) {
        bx = x;
        by = y;
        console.log("Yup");
        setTimeout(summonBomb(bx, by), 3000);
    }
    */

    // Collision
    for (z=0; z < enemies_temp.length; z++) {
        if ((Math.abs(enemies[z].x - x) < 30) && (Math.abs(enemies[z].y - y) < 30)) {
            health = health - 0.5;
            enemies.shift();
        }
    }
    enemies_temp = enemies;

    if (health <= 0) {
        confirm("Your score was "+ score, "GLHF");
        health = 40;
        window.location.reload();
    }
}

//Makes the game go faster
function levelmaker() {
    level++;
    if (level > maxlevel){
        level = maxlevel;
    }
    dog *= 3.5/4;
    spd += .45;
    ctx.font = "20px Impact";
    ctx.fillStyle = 'blue';
    ctx.fillText("Level: " + level, 50, 80);
}

setInterval(levelmaker,15000);
setInterval(draw, 10);
setInterval(giveHealth, 5000);
setInterval(summonWaves, 500);
setInterval(deleteThee, 5000);


/*

+---------------------+
|  DEV LEADERBOARD:   |
+---------------------+
1. Nithin- 28200
2. Wiktor- 25000
3. Marvin - 19796
4.

 */

