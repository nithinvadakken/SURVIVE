// asks user for name
nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");

if (nametag == null || nametag === "") {
    nametag = prompt("Please re-enter a valid name", "Wonjun");
}

if (nametag.length > 10) {
    nametag = prompt("Name must be 10 or less characters :(");
}



// variables
var level = 1;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
var score = 0;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var prevKey = 'up';
var HP = 100;
var spd = 3;
var bSpd = 3;
var x = canvas.width/2;
var y = canvas.height/2;
var bx = x;
var by = y;
// random placement of zombies
var ex = Math.random() * (innerWidth - x * 2) + x;
var ey = Math.random() * (innerHeight - y * 2) + y;

var ex1 = Math.random() * (innerWidth - x * 2) + x;
var ey1= Math.random() * (innerHeight - y * 2) + y;

var ex2 = Math.random() * (innerWidth - x * 2) + x;
var ey2 = Math.random() * (innerHeight - y * 2) + y;

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
function makeEnemy(ab, i) {
        if (ab < -2 && i < -2) {
            ab = Math.floor((Math.random() * canvas.width) + 1);
            // do {
            //     this.enx = Math.floor((Math.random() * canvas.height) + 1);
            // } while(this.enx > canvas.height / 2 + 50 && this.enx < canvas.height / 2 - 50);

            i = Math.floor((Math.random() * canvas.height) + 1);
            // do {
            //     this.eny = Math.floor((Math.random() * canvas.width) + 1);
            // } while (this.eny > canvas.width / 2 + 50 && this.eny < canvas.width / 2 - 50);
            ctx.beginPath();
            ctx.fillRect(ab,i, 30, 30);

        }
        ctx.beginPath();
        ctx.fillRect(ab, i, 30, 30);
        if (ab < x) {
            ab += 1;
            ctx.beginPath();
            ctx.fillRect(ab,i, 30, 30);
        }
        if (ab > x) {
            ab -= 1;
            ctx.beginPath();
            ctx.fillRect(ab, i, 30, 30);
        }
        if (i < y) {
            i += 1;
            ctx.beginPath();
            ctx.fillRect(ab, i, 30, 30);
        }
        if (i > y) {
            i -= 1;
            ctx.beginPath();
            ctx.fillRect(ab,i, 30, 30);
        }

        ctx.font = "20px Impact";
        ctx.fillText("Health: " + HP, 50, 100);
        if (ab > x - 60 && ab < x + 60) {
            HP -= .1;
            ctx.font = "20px Impact";
            ctx.fillText("Health: " + HP, 50, 100);
        }
        if (i < y - 60 && i > y + 60) {
            HP -= .1;
            ctx.font = "20px Impact";
            ctx.fillText("Health: " + HP, 50, 100);
        }
        my_dic[1] = ab;
        my_dic2[1]= i;



}
// my_list = [a, b, c, d, e, f, h, j];
// my_list2 = [a1, b1, c1, d1, e1, f1, h1, j1];
// for (i = 0; i < level; i++) {
//     my_dic[i] = -10;
//     my_dic2[i] = -10;

//}
function EnemyMain() {

    setInterval(makeEnemy(my_dic[1], my_dic2[1]), 100);

}
// creates the bullet
// function Bullet() {
//     if (prevKey === 'up') {
//         if (by > 0) {
//             by -= bSpd;
//         }
//
//     } else if (prevKey === 'down') {
//         if (by + 40< canvas.height) {
//             by += bSpd;
//         }
//
//     } else if (prevKey === 'right') {
//         console.log(bx);
//         if (bx + 40 < canvas.width) {
//             console.log("In if");
//             bx += bSpd;
//         }
//
//     } else if (prevKey === 'left') {
//         if (bx > 0) {
//             bx -= bSpd;
//         }
//     }
//
// }


// makes enemies

// function makeEnemy(color) {
//     r1 = Math.floor(Math.random() * 256);
//     g1 = Math.floor(Math.random() * 256);
//     ctx.beginPath();
//     ctx.fillStyle = color;
//     ctx.fillRect(ex, ey, 30, 30);
//     ctx.fillRect(ex1 , ey1 , 30, 30);
//     ctx.fillRect(ex2, ey2, 30, 30);
//     enemy = {x: ex, y: ey, w: 30, h: 30};
//     enemy1 = {x: ex1, y: ey1, w: 30, h: 30};
//     enemy2 = {x: ex2, y: ey2, w: 30, h: 30};


//}


//adds mana
// function addMana() {
//     mana += 2;
// }

// draws game
    function draw() {

        ctx.clearRect(0, 0, innerWidth, innerHeight);

        ctx.font = "20px Impact";
        ctx.fillStyle = 'blue';
        ctx.fillText("MANA: " + mana, 50, 50);
        ctx.fillText("Score: " + score, 50, 70);
        score++;

        charDraw();



        // Enemy movement
        // ex += (x-ex)/100;
        // ey += (y-ey)/100;
        //
        // ex1 += (x-ex1)/100;
        // ey1 += (y-ey1)/100;
        //
        // ex2 += (x-ex2)/100;
        // ey2 += (y-ey2)/100;


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
            checkForCollision();
            checkForCollision1();
            checkForCollision2();
        }
        else {
            bx = x;
            by = y;
        }

    }


// function checkForCollision(){
//     if (enemy.x < bx + 40 &&
//         enemy.x + 30 > bx &&
//         enemy.y < by + 40 &&
//         30 + enemy.y > by) {
//
//         makeEnemy("purple");
//
//     } else {
//         makeEnemy("green");
//     }


// }
// function checkForCollision1(){
//     if (enemy1.x < bx + 40 &&
//         enemy1.x + 30 > bx &&
//         enemy1.y < by + 40 &&
//         30 + enemy1.y > by) {
//
//         makeEnemy("purple");
//
//     } else {
//         makeEnemy("green");
//     }
//
//
// }function checkForCollision2(){
//     if (enemy2.x < bx + 40 &&
//         enemy2.x + 30 > bx &&
//         enemy2.y < by + 40 &&
//         30 + enemy2.y > by) {
//
//         makeEnemy("purple");
//
//     } else {
//         makeEnemy("green");
//     }



// setInterval(charDraw, 1000);
EnemyMain();
setInterval(draw, 10);
setInterval(addMana, 1000);
