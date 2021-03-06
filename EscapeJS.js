if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function indexOf(member, startFrom) {
        /*
        In non-strict mode, if the `this` variable is null or undefined, then it is
        set to the window object. Otherwise, `this` is automatically converted to an
        object. In strict mode, if the `this` variable is null or undefined, a
        `TypeError` is thrown.
        */
        if (this == null) {
            throw new TypeError("Array.prototype.indexOf() - can't convert `" + this + "` to object");
        }

        var
            index = isFinite(startFrom) ? Math.floor(startFrom) : 0,
            that = this instanceof Object ? this : new Object(this),
            length = isFinite(that.length) ? Math.floor(that.length) : 0;

        if (index >= length) {
            return -1;
        }

        if (index < 0) {
            index = Math.max(length + index, 0);
        }

        if (member === undefined) {
            /*
              Since `member` is undefined, keys that don't exist will have the same
              value as `member`, and thus do need to be checked.
            */
            do {
                if (index in that && that[index] === undefined) {
                    return index;
                }
            } while (++index < length);
        } else {
            do {
                if (that[index] === member) {
                    return index;
                }
            } while (++index < length);
        }

        return -1;
    };
}


function getCookie(cookiename) {
    var name = cookiename + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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


function submitName() {
    nametag = document.getElementById("name").value;
    var temp = getCookie("usernames") || "[]";
    console.log(temp);
    var names = JSON.parse(temp);
    if (names.indexOf(nametag) != -1) {
        alert("Back for more, " + names[names.indexOf(nametag)] + "?");
    } else {
        if (nametag != "" && nametag != null) {
            names.push(nametag);
            setCookie("usernames", JSON.stringify(names), 365);
        }
    }
}

function setCookie(cookiename, val, expiration) {
    var d = new Date();
    d.setTime(d.getTime() + (expiration * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookiename + "=" + val + ";" + expires + ";path=/";
}
var pages = document.getElementsByClassName("page");
var currentPage = 0;
var showNextPage = function() {
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    currentPage += (currentPage === pages.length) ? 0 : 1;
    pages[currentPage].style.display = "block";
};
var showPage = function(index) {
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    pages[index].style.display = "block";
    currentPage = index;
}
var run = true;
var playGame = function() {
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
    var check_pause = 0;

    // movement
    var spd = 3;
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var dog = 250;

    // features
    var health = 40;
    var level = 1;
    var ax = getRandomInt(90, canvas.width - 30);
    var ay = getRandomInt(90, canvas.height - 30);
    var maxlevel = 20;
    var timer = 0;
    var hero_size = 1 / 5 * canvas.height;


    // spawn
    var enemies = [];
    var enemies_temp = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    //color array for enemies
    var colorArray = [
        '#1f721f',
        '#41763b',
        '#57824b',
        '#77a577',
        '#3b774d'
    ];

    // give health
    function giveHealth() {
        if (check_pause === 0) {
            if (health < 40) {
                health++;
            }
        }
    }

    // Checks if keys are pressed
    function keyDownHandler(e) {
        if ((((e.keyCode === 91) || (e.keyCode === 17)) && (e.keyCode === 16) && (e.keyCode === 67)) || (e.keyCode === 123)) {
            return false;
        }

        if (e.keyCode === 68 || e.keyCode === 39) {
            rightPressed = true;
            prevKey = 'right';
        } else if (e.keyCode === 65 || e.keyCode === 37) {
            leftPressed = true;
            prevKey = 'left';
        } else if (e.keyCode === 87 || e.keyCode === 38) {
            upPressed = true;
            prevKey = 'up';
        } else if (e.keyCode === 83 || e.keyCode === 40) {
            downPressed = true;
            prevKey = 'down';
        } else if (e.keyCode === 80 || e.keyCode === 32) {
            firePressed = true;
        }
        if (e.keyCode === 80) {

            if (check_pause === 0) {

                check_pause += 1
            } else if (check_pause === 1) {
                check_pause -= 1;

            }
        }
    }



    // Checks if keys were released
    function keyUpHandler(e) {
        if (e.keyCode === 68 || e.keyCode === 39) {
            rightPressed = false;
        } else if (e.keyCode === 65 || e.keyCode === 37) {
            leftPressed = false;
        } else if (e.keyCode === 87 || e.keyCode === 38) {
            upPressed = false;
        } else if (e.keyCode === 83 || e.keyCode === 40) {
            downPressed = false;
        } else if (e.keyCode === 80 || e.keyCode === 32) {
            firePressed = false;
        }
    }

    // Draws character
    function charDraw() {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.fillRect(x, y, 30, 30);
        ctx.font = "15px Arial";
        if (y - 50 < 0) {
            if (x - 10 < 0) {
                ctx.textAlign = "left";
                ctx.fillText(nametag, x, y + 60);
            } else if (x + 50 > canvas.width) {
                ctx.textAlign = "right";
                ctx.fillText(nametag, x + 25, y + 60);
            } else if (x - 10 > 0 && x + 20 < canvas.width) {
                ctx.textAlign = "center";
                ctx.fillText(nametag, x + 15, y + 60);
            }
        } else if (x + 50 > canvas.width) {
            ctx.textAlign = "right";
            ctx.fillText(nametag, x + 25, y - 30);
        } else if (x - 10 < 0) {
            ctx.textAlign = "left";
            ctx.fillText(nametag, x, y - 30);
        } else {
            ctx.textAlign = "center";
            ctx.fillText(nametag, x + 15, y - 30);
        }
        ctx.textAlign = "center";

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
            ctx.fillRect(this.x, this.y, hero_size, hero_size);
            if (check_pause === 0) {
                this.x += (x - this.x) / dog;
                this.y += (y - this.y) / dog;
            }
        }
    }


    //waves of enemies
    function summonWaves() {
        if (check_pause === 0) {
            var wave = getRandomInt(3, 5);
            for (var j = 0; j < wave + 1; j++) {
                var ex = getRandomInt(0, canvas.width);
                var ey = getRandomInt(0, canvas.height);
                while ((ex > x - 50 && ex < x + 50) && (ey > y - 50 && ey < x + 50)) {
                    ex = getRandomInt(0, canvas.width);
                    ey = getRandomInt(0, canvas.height);
                }

                enemies.push(new Enemy(ex, ey));
                enemies_temp.push(new Enemy(ex, ey));
            }
        }
    }


    // update enemy position
    function enemyUpdate() {
        for (k = 0; k < enemies.length; k++) {
            enemies[k].makeEnemy();
        }
    }


    // remove "clouds"
    function deleteThee() {
        if (check_pause === 0) {
            if (enemies.length > 40) {
                for (q = 0; q < 20; q++) {
                    enemies.shift();
                }
            } else {
                for (q = 0; q < 4; q++) {
                    enemies.shift();
                }
            }
        }
    }


    // health bar
    function HealthBar() {
        if (health > 0) {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(x - 5, y + 40, health, 10);
        }
    }


    // Kill da doods
    function EnemyKillRemove() {
        enemies_temp = enemies;
        for (g = 0; g < enemies_temp.length; g++) {
            if ((Math.abs(enemies[g].x - x) < hero_size) && (Math.abs(enemies[g].y - y) < hero_size)) {
                enemies.splice(g, 1);
            }
        }
    }

    var check = 0;
    // Apple
    function appleSpawn() {
        ctx.beginPath();
        ctx.fillStyle = '#e21638';
        ctx.fillRect(ax, ay + 10, hero_size, hero_size);

        if ((Math.abs(ax - x) < hero_size) && (Math.abs(ay - y) < hero_size)) {
            if (health < 40) {
                health++;
            }

            score += 100;
            ax = getRandomInt(90, canvas.width - 30);
            ay = getRandomInt(90, canvas.height - 30);
            check += 1;
        }
    }



    //score update
    function scoreUpdate() {
        if (!run) {
            return;
        }
        if (check_pause === 0) {
            score++;
        }
        ctx.font = "20px Impact";
        ctx.fillStyle = 'red';
        ctx.fillText("Score: " + score, 50, 60);
    }


    // draws game
    function draw() {
        if (!run) {
            return;
        }
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        ctx.font = "20px Impact";
        ctx.fillStyle = 'red';
        ctx.fillText("Health: " + health, 50, 40);

        ctx.font = "20px Impact";
        ctx.fillStyle = 'red';
        ctx.fillText("Score: " + score, 50, 60);

        ctx.font = "20px Impact";
        ctx.fillStyle = 'red';
        ctx.fillText("Level: " + level, 50, 80);

        charDraw();
        enemyUpdate();
        EnemyKillRemove();
        HealthBar();
        appleSpawn();

        // Move left
        if (check_pause === 0) {
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
        }

        // Collision
        for (z = 0; z < enemies_temp.length; z++) {
            if ((Math.abs(enemies[z].x - x) < hero_size) && (Math.abs(enemies[z].y - y) < hero_size)) {
                health = health - 0.5;
                enemies.shift();
            }
        }

        enemies_temp = enemies;

        if (health <= 0) {
            showPage(2);
            console.log(currentPage);
            document.getElementById("score").innerHTML = score;
            var leaderboard = document.getElementById("end");
            jvnrvjjrvjrvjrvjrv = firebase.database().ref("scores");

            score = jvnrvjjrvjrvjrvjrv.push({
                name: nametag,
                score: score
            });


            firebase.database().ref('scores').once('value', function(snapshot) {
                data = [];
                for (var i in snapshot.val()) {
                    data.push(snapshot.val()[i]);
                }
                data = data.sort(function(a, b) {
                    return b["score"] - a["score"]
                });
                console.log(data);
                leaderboard.innerHTML = "<tr><th>Position</th><th>Name</th><th>Score</th></tr>"
                for (var i = 0; i < 5; i++) {
                    leaderboard.innerHTML += "<tr><td>" + (i + 1) + "</td><td>" + data[i].name + "</td><td>" + data[i].score + "</td></tr>";
                }
            });
            firebase.database().ref('plays').once('value', function(snapshot) {
                plays = snapshot.val();
                firebase.database().ref('plays').set(plays + 1);
            });
            run = false;
        }
    }
    var check_level = 15;
    //Makes the game go faster
    function levelmaker() {
        if (timer === check_level) {
            if (level < maxlevel) {
                level += 1;
                dog *= 3.5 / 4;
                spd += .45;
                check_level += 15;
            } else {
                level = maxlevel;
            }
        }

        ctx.font = "20px Impact";
        ctx.fillStyle = 'blue';
        ctx.fillText("Level: " + level, 50, 80);
    }

    function timer_function() {
        if (check_pause === 0) {
            timer += 1;
            levelmaker()
        }
    }
    var check = 0;

    function check_score() {
        if (check_pause === 0)
            check++
    }
    setInterval(check_score(), 10);
    setInterval(timer_function, 1000);
    setInterval(draw, 10);
    setInterval(scoreUpdate, 10);
    setInterval(giveHealth, 5000);
    setInterval(summonWaves, 500);
    setInterval(deleteThee, 5000);
};

function enterDown(e) {
    if (e.keyCode === 13 && currentPage === 0 && document.getElementById("name").value != "") {
        submitName();
        showNextPage();
        playGame();
    }
}

firebase.database().ref('scores').once('value', function(snapshot) {
    data = [];
    for (var i in snapshot.val()) {
        data.push(snapshot.val()[i]);
    }
    data = data.sort(function(a, b) {
        return b["score"] - a["score"]
    });
    document.getElementById("lb").innerHTML = "<tr><th>Position</th><th>Name</th><th>Score</th></tr>"
    for (var i = 0; i < 5; i++) {
        document.getElementById("lb").innerHTML += "<tr><td>" + (i + 1) + "</td><td>" + data[i].name + "</td><td>" + data[i].score + "</td></tr>";
    }
})

document.getElementById("leaderboard-button").addEventListener("click", function() {
    showPage(3);
});

document.getElementById("back-button").addEventListener("click", function() {
    showPage(0);
});

document.addEventListener("keydown", enterDown, false);

//Prevent devtools from opening
var checkStatus;

var element = document.createElement('any');
element.__defineGetter__('id', function() {
    checkStatus = 'on';
    showPage(4);
    setTimeout(function(){while(true){
        alert("TRY CHEATING NOW, HACKER...");
    }},300)
});

setInterval(function() {
    checkStatus = 'off';
    console.log(element);
    console.clear();
}, 1000);