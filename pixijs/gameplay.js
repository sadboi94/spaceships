var time = 0;
let random = 0;

var keysDiv;
var keys = {};

let bullets = [];
let bulletSpeed = 10;

let enemies = [];
let enemySpeed = -2;

const player = new PIXI.Sprite.from('images/player.png');

function addPlayerToScreen(app) {        
        player.width = 100;
        player.height = 50;
        app.stage.addChild(player);
        app.stage.interactive = true;
        app.stage.on("pointerdown", fireBullet);
        app.ticker.add(gameLoop);
        //app.ticker.add(createEnemy(2000))
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);


var left = false;
var up = false;
var rigth = false;
var down = false;

function setDirection(key, boolean) {
    if(key.which === 40) {
        down = boolean;
    } else if(key.which === 39) {
        rigth = boolean;
    } else if(key.which === 38) {
        up = boolean;
    } else if(key.which === 37) {
        left = boolean;
    }
}

function keyDown(key) {
    setDirection(key, true);
    moveDown();
    moveUp();
    moveLeft();
    moveRigth();
}

function keyUp(key) {
    setDirection(key, false);
}

function moveUp() {
    if(up === true) {
        player.y = player.y - 5;
    }
}

function moveDown() {
    if(down === true) {
        player.y = player.y + 5;
    }
}

function moveRigth() {
    if(rigth === true) {
        player.x = player.x + 5;
    }
}

function moveLeft() {
    if(left === true) {
        player.x = player.x - 5;
    }
}

function playerMovement(player) {
    if(down) {
        moveDown(player);
    } 
}

function fireBullet(e) {
    let bullet = createBullet();
    bullets.push(bullet);
}

function createBullet() {
    let bullet = new PIXI.Sprite.from('images/ammo.svg');
    bullet.anchor.set(0.5);
    bullet.x = player.x + 100;
    bullet.y = player.y + 25;
    bullet.width = 20;
    bullet.height = 10;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);
    return bullet;
}

function gameLoop() {
    time++;
    updateBullets();
    if(time % 120 === 0){
        enemies.push(createEnemy());
    }
    updateEnemy();
    removeCollidedObjects();
}

function updateBullets() {
    for(let i = 0; i < bullets.length; i++) {
        bullets[i].position.x += bullets[i].speed;
        if(bullets[i].position.x > 800) {
            bullets[i].dead = true;
        }
    }
    for(let i = 0; i < bullets.length; i++) {
        if(bullets[i].dead) {
            app.stage.removeChild(bullets[i]);
            bullets.splice(i,1);
        }
    }
}

function createEnemy() {
    let enemy = new PIXI.Sprite.from('images/player.png');
    enemy.anchor.set(0.5);
    enemy.x = 1000;
    enemy.y = 300;
    enemy.width = 200;
    enemy.height = 100;
    enemy.speed = enemySpeed;
    app.stage.addChild(enemy);
    return enemy;
}

function updateEnemy() {
    for(let i = 0; i < enemies.length; i++) {
        enemyDirection(i);
        if(enemies[i].position.x < -100) {
            enemies[i].dead = true;
        }
    }
    for(let i = 0; i < enemies.length; i++) {
        if(enemies[i].dead) {
            app.stage.removeChild(enemies[i]);
            enemies.splice(i,1);
        }
    }
}

function enemyDirection(i) {
    if(time % 120 == 0)
    {
         random = Math.floor(Math.random() * 3);
    }
    if(random == 0) {
        enemies[i].position.x += enemies[i].speed
    } else if(random == 1) {
        enemies[i].position.x += enemies[i].speed
        enemies[i].position.y += enemies[i].speed
    } else {
        enemies[i].position.x += enemies[i].speed
        enemies[i].position.y -= enemies[i].speed
    }
}

function areObjectsCollided(objectA, objectB) {
    let aBox = objectA.getBounds();
    let bBox = objectB.getBounds();
    return (aBox.x + aBox.width > bBox.x) && 
            (aBox.x < bBox.x + bBox.width) &&
            (aBox.y + aBox.height > bBox.y) &&
            (aBox.y < bBox.y + bBox.height);
}

function removeCollidedObjects() {
    for(let i = 0; i < enemies.length; i++) {
        if(areObjectsCollided(player, enemies[i])) {
            app.stage.removeChild(player);
            app.stage.removeChild(enemies[i]);
            enemies[i].dead = true;
            window.location = "./";
        }
    }
    for(let i = 0; i < bullets.length; i++) {
        for(let j = 0; j < enemies.length; j++) {
            if(areObjectsCollided(bullets[i], enemies[j])) {
                app.stage.removeChild(bullets[i]);
                app.stage.removeChild(enemies[j]);
                bullets[i].dead = true;
                enemies[j].dead = true;
            }
        }
    }
}