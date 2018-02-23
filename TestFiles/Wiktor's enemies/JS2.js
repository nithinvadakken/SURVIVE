// asks user for name
nametag = prompt("What is the name of your fellow explorer?", "Wonjun Lee");

if (nametag == null || nametag === "") {
    nametag = prompt("Please re-enter a valid name", "Wonjun");
}

if (nametag.length > 10) {
    nametag = prompt("Name must be 10 or less characters :(");
}

var timer = 0;

// variables
level = 5;
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
var bulletx = x;
var bullety = y;
// random placement of zombies
my_xlist = [];
my_ylist = [];
var please_work = 0;
while(please_work < level){
    // random placement of zombies
    my_xlist.push(Math.random() * (innerWidth - x * 2) + x);
    my_ylist.push(Math.random() * (innerHeight - y * 2) + y);
    please_work +=1;
}
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
    if (e.keyCode === 191){
        slashPressed = true;
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
    if (e.keyCode === 191){
        slashPressed = false;
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

function imma_try_to_make_bullets() {

    abx = x;
    aby = y;
    if (slashPressed && prevKey === 'left') {
        while(abx+20 >0){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            abx -= 1
        }
    }
    else if (slashPressed && prevKey === 'right') {
        while(abx-20 < canvas.width){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            abx += 3
        }
    }
    else if (slashPressed && prevKey === 'up') {
        while(aby+20 >0){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            aby -= 3
        }
    }
    else if (slashPressed && prevKey === 'down') {
        while(aby-20 < canvas.height){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            aby += 3
        }
    }

}


function makeEnemy(aa, ab, list_number) {
    enx = aa;
    eny = ab;



    ctx.beginPath();
    ctx.fillRect(enx, eny, 30, 30);
    if (enx < x) {
        enx += 1;
        ctx.beginPath();
        ctx.fillRect(enx, eny, 30, 30);
    }
    if (enx > x) {
        enx -= 1;
        ctx.beginPath();
        ctx.fillRect(enx, eny, 30, 30);
    }
    if (eny < y) {
        eny += 1;
        ctx.beginPath();
        ctx.fillRect(enx, eny, 30, 30);
    }
    if (eny > y) {
        eny -= 1;
        ctx.beginPath();
        ctx.fillRect(enx, eny, 30, 30);
    }

    // ctx.font = "20px Impact";
    // ctx.fillText("Health: " + HP, 50, 100);
    // if (enx +15 > x-15  && enx -15 < x +15 && eny +15 > y-15  && eny -15 < y +15) {
    //     HP -= 1;
    //     ctx.font = "20px Impact";
    //     ctx.fillText("Health: " + HP, 50, 100);
    //     ctx.beginPath();
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(enx, eny, 30, 30);
    //
    // }
    // else if (eny +15 > y-15  && eny -15 < y +15) {
    //     HP -= 1;
    //     ctx.font = "20px Impact";
    //     ctx.fillText("Health: " + HP, 50, 100);
    //     ctx.beginPath();
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(enx, eny, 30, 30);
    // }

    my_xlist[list_number] = enx;
    my_ylist[list_number] = eny;

    ctx.font = "20px Impact";
    ctx.fillText("Health: " + HP, 50, 100);
    ctx.font = "20px Impact";
    ctx.fillText("Health: " + HP, 50, 100);
    if (enx +15 > x-15  && enx -15 < x +15 && eny +15 > y-15  && eny -15 < y +15) {
        HP -= 1;
        ctx.font = "20px Impact";
        ctx.fillText("Health: " + HP, 50, 100);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(my_xlist[list_number], my_ylist[list_number], 30, 30);
    }
    else{
        ctx.font = "20px Impact";
        ctx.fillText("Health: " + HP, 50, 100);
        ctx.beginPath();
        ctx.fillStyle = rgba;
        ctx.fillRect(my_xlist[list_number], my_ylist[list_number], 30, 30);
    }

    //NoOverLap(list_number);



}
// function checkHP(numberofenemies) {
//     ctx.font = "20px Impact";
//     ctx.fillText("Health: " + HP, 50, 100);
//     for (q = 0; g<numberofenemies; q++){
//         ctx.font = "20px Impact";
//          ctx.fillText("Health: " + HP, 50, 100);
//          if (my_xlist[numberofenemies] +15 > x-15  && enx -15 < x +15 && eny +15 > y-15  && eny -15 < y +15) {
//              HP -= 1;
//              ctx.font = "20px Impact";
//              ctx.fillText("Health: " + HP, 50, 100);
//              ctx.beginPath();
//              ctx.fillStyle = "red";
//            ctx.fillRect(enx, eny, 30, 30);
//     }
// }
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


//MAKE BULLETS


//adds mana
function addMana() {
    mana += 2;
}

// draws game


// function NoOverLap(checkNumber) {
//
//      for (w = 0; i<length(my_xlist);w++) {
//          if (w !== checkNumber) {
//              if (my_xlist[w] > my_xlist[checkNumber] - 30 && my_xlist[w] < my_xlist[checkNumber] + 30) {
//                  if (my_xlist[checkNumber] - x > 0) {
//                      if (my_xlist[w] > my_xlist[checkNumber]) {
//                          my_xlist[w] += 1;
//                      }
//                      else if (my_xlist[w] < my_xlist[checkNumber]) {
//                          my_xlist[checkNumber] += 1;
//                      }
//
//                  }
//                  else if (my_xlist[checkNumber] - x < 0) {
//                      if (my_xlist[w] < my_xlist[checkNumber]) {
//                          my_xlist[w] -= 1;
//                      }
//                      else if (my_xlist[w] > my_xlist[checkNumber]) {
//                          my_xlist[checkNumber] -= 1;
//                      }
//
//                  }
//              }
//
//
//              if (my_ylist[w] > my_ylist[checkNumber] - 30 && my_ylistlist[w] < my_ylist[checkNumber] + 30) {
//                  if (my_ylist[checkNumber] - y > 0) {
//                      if (my_ylist[w] > my_ylist[checkNumber]) {
//                          my_ylist[w] += 1;
//                      }
//                      else if (my_ylist[w] < my_ylist[checkNumber]) {
//                          my_ylist[checkNumber] += 1;
//                      }
//
//                  }
//                  else if (my_ylist[checkNumber] - y < 0) {
//                      if (my_ylist[w] < my_ylist[checkNumber]) {
//                          my_ylist[w] -= 1;
//                      }
//                      else if (my_ylist[w] > my_ylist[checkNumber]) {
//                          my_ylist[checkNumber] -= 1;
//                      }
//
//                  }
//              }
//          }
//      }
//
//
//
//
//
//
//
// }





function draw() {



    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.font = "20px Impact";
    ctx.fillStyle = 'blue';
    ctx.fillText("MANA: " + mana, 50, 50);
    ctx.fillText("Score: " + score, 50, 70);



    score++;

    charDraw();




    for (ab = 0; ab < level; ab++){
        makeEnemy(my_xlist[ab],my_ylist[ab],ab)
    }
    //checkHP(2);





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
        //checkForCollision();
        //checkForCollision1();
        //checkForCollision2();
    }
    else {
        bx = x;
        by = y;
    }

    if (slashPressed && timer % 2 === 0){
        imma_try_to_make_bullets()
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

function maketime() {
    timer +=1;
}
setInterval(draw, 10);
setInterval(addMana, 1000);
setInterval(maketime,1000);
