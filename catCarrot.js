/*******************************************************/
//12COMP Game project:
//Written by Lucas Nguyen
//
//
/*******************************************************/
let scoreSent = false; // Prevents spamming Firebase inside the draw loop

function preload() {
    catImg = loadImage("images/cat.png")
    carrotImg = loadImage("images/carrot.png")
    bunnyImg = loadImage("images/bunny.png")
    foodImg = loadImage("images/food.png")
    bigBunnyImg = loadImage("images/gameOver.png")
    bigCarrotImg = loadImage("images/bigCarrot.png")
    bigFoodImg = loadImage("images/bigFood.png")
    bigCatImg = loadImage("images/bigCat.png")
}

let gameState = 'start'
let score = 0
let timeLeft = 30
let runningTime = 0

/*******************************************************/
//Setup
//
//
/*******************************************************/
function setup(){
    canvas = new Canvas(900,900)

//show time and score
    infoBox = new Sprite(70, 50, 120, 50, 'k')
    infoBox.collider = "none"
    infoBox.color = "#fff"


//walls
    wallLH  = new Sprite(0, height/2, 15, height, 'k')
    wallLH.color = "#ff8080"
	wallRH  = new Sprite(900, height/2, 15, height, 'k')
    wallRH.color = "#ff8080"
	wallTop = new Sprite(windowWidth/2, height, windowWidth, 15, 'k')
    wallTop.color = "#ff8080"
	wallBot = new Sprite(windowWidth/2, 0, windowWidth, 15, 'k')
    wallBot.color = "#ff8080"


//groups
    bulletGroup = new Group()
    collectibleGroup = new Group()

//start button
    startButton = new Sprite(width/2,height/2,150,50);
    startButton.color = "#fff"
    startButton.text = "Click anywhere to start"
    startButton.collider = "none"


//continue button
    continueButton = new Sprite(width/2,height/2,150,50);
    continueButton.color = "#fff"
    continueButton.text = "Click anywhere to continue"
    continueButton.visible = false
    continueButton.collider = "none"


//instruction box
    instructionBox = new Sprite(width/2, height/2 - 120, 500, 200)
    instructionBox.color = "#fff"
    instructionBox.text = "W,A,S,D to move. Collect the food while avoid getting hit by the carrots"
    instructionBox.visible = false
    instructionBox.collider = "none"


//Game Over Box
    gameOver = new Sprite(width/2, height/2 - 120, 500, 200)
    bigBunny = new Sprite(width/2, height/2 - 200, 100)
    bigCarrot = new Sprite(width/2 + 30, height/2 - 220, 80)
    bigBunny.image = (bigBunnyImg)
    bigCarrot.image = (bigCarrotImg)
    gameOver.color = "#fff"
    gameOver.visible = false
    gameOver.collider = "none"
    bigBunny.collider = "none"
    bigCarrot.collider = "none"
    bigBunny.visible = false
    bigCarrot.visible = false


//timeout screen
    timeoutBox = new Sprite(width/2, height/2 - 120, 500, 200)
    bigCat = new Sprite(width/2 - 10, height/2 - 230, 100)
    bigFood = new Sprite(width/2 + 60, height/2 - 220, 80)
    bigCat.image = (bigCatImg)
    bigFood.image = (bigFoodImg)
    timeoutBox.color = "#fff"
    timeoutBox.visible = false
    bigCat.collider = "none"
    bigFood.collider = "none"
    timeoutBox.collider = "none"
    bigCat.visible = false
    bigFood.visible = false

//player
    player = new Sprite(width/2, 850, 24)
    player.visible = false
    player.image = (catImg)

//bunny
    bunny = new Sprite(width/2, 30, 32)
    bunny.visible = false
    bunny.collider = 'none'
    bunny.image = (bunnyImg)
}


/*******************************************************/
//drawStartScreen()
//Mouse presses --> startButton is hidden
//and gameState will be changed to 'instruction'
//
//
/*******************************************************/



function drawStartScreen() {
    infoBox.visible = false
    if (mouse.presses()) {
        gameState = 'instruction'
        startButton.visible = false
    } 
};


/*******************************************************/
//drawInstructionScreen()
//enable visibility of continueButton and continueBox
//If mouse presses --> gameState change to 'gamePlay'
//endBox being hidden is for when restarting the game,
//endBox will stay hidden
//
//
/*******************************************************/
function drawInstructionScreen() {
    bigBunny.visible = false
    bigCarrot.visible = false
    infoBox.visible = false
    bigCat.visible = false
    bigFood.visible = false
    infoBox.visible = false
    timeLeft = 30
    score = 0
    player.x = width/2
    player.y = 850    
    player.vel.x = 0
    player.vel.y = 0
    gameOver.visible = false
    timeoutBox.visible = false
    continueButton.visible = true
    instructionBox.visible = true

    if (mouse.presses()) {       
     gameState = 'gameplay'  
    }
}

/*******************************************************/
//drawGameplayScreen()
//enable player's visibility
//instructionBox and continueButton --> hidden
//include player's movement so player could move around
//
//
/*******************************************************/
function drawGameplayScreen() {

    player.visible = true
    bunny.visible = true
    infoBox.visible = true
    collectibleGroup.visible = true
    instructionBox.visible = false
    continueButton.visible = false

//player's movements
    if (kb.pressing('A')) {
        player.vel.x = -5
    } else if (kb.pressing('D')){
        player.vel.x = +5
    }
        if (kb.released('A')) {
        player.vel.x = 0
    } else if (kb.released('D')){
        player.vel.x = 0
    }
        if (kb.pressing('W')) {
        player.vel.y = -5
    } else if (kb.pressing('S')){
        player.vel.y = +5
    }
        if (kb.released('W')) {
        player.vel.y = 0
    } else if (kb.released('S')){
        player.vel.y = 0
    }


//how frequently the bullets and collectibles will spawn
    if (millis() - lastFire > 500) {
        bulletRain()
        lastFire = millis()
    }
    if (millis() - lastSpawn > 2000) {
        spawnCollectibles();
        lastSpawn = millis()
    } 
    
    if (millis() - runningTime > 1000) {
       timeLeft--
       runningTime = millis()
    }
}


/*******************************************************/
//bulletRain()
//Spawn bullets in a rain-like pattern
//
//
/*******************************************************/
let lastFire = 0
let lastSpawn = 0
function playerHit() {
    fb_writeScore();
    gameState = 'gameover'
}

function bulletRain() {
    let x = random(10, 890)
    bullet = new Sprite(x, 1, 8)
    bullet.color = ("#0278ff")
    bullet.vel.y = 7
    bullet.image = (carrotImg)
    bulletGroup.add(bullet)
    bulletGroup.collides(player, playerHit)
    bullet.collider = "true"
}



//spawn collectibles
function spawnCollectibles() {
    let x = random(10, 880)
    let y = random(10, 850)
    collectible = new Sprite(x, y, 25, 25, 'k')
    collectible.color = "#8ea50c"
    collectible.life = 300;
    collectible.image = (foodImg)
    collectibleGroup.add(collectible)
    collectibleGroup.collides(player, gainScore)
}
//Gain score by collecting collectibles
function gainScore(collectible, player) {
    score++
    timeLeft++
    collectible.remove()
}


/*******************************************************/
//drawEndScreen()
//player is hidden, bullets are also hidden
//enable endBox visibility
//mouse presses --> change gameState to 'instruction'
//
//
/*******************************************************/
function drawGameOverScreen() {

    timeLeft = 30
    player.visible = false
    bunny.visible = false
    bigBunny.visible = true
    bigCarrot.visible = true
    infoBox.visible = false
    gameOver.visible = true
    collectibleGroup.removeAll()
    bulletGroup.removeAll()
//It supposes to spawn a line of carrots across the page, it's intended (decoration)
    for (i = 0; i < 1; i++) {
        floatingCarrot = new Sprite(1,450, 8, "none")
        floatingCarrot.image = (carrotImg)
        floatingCarrot.life = 45
        floatingCarrot.vel.x = 20
    }
    if (mouse.presses()) {
        gameState = 'instruction'
    }
}

//similar to drawEndScreen but with different text
function drawTimeoutScreen() {

    timeLeft = 30;
    bigCat.visible = true
    bigFood.visible = true
    player.visible = false
    bunny.visible = false
    infoBox.visible = false
    timeoutBox.visible = true
    collectibleGroup.removeAll()
    bulletGroup.removeAll()
//It supposes to spawn a line of food across the page, it's intended (decoration)
    for (i = 0; i < 1; i++) {
        floatingFood = new Sprite(1,450, 8, "none")
        floatingFood.image = (foodImg)
        floatingFood.life = 28
        floatingFood.vel.x = 32
    }
    if (mouse.presses()) {
        gameState = 'instruction'
    }
}


function draw() {
//timer
    infoBox.text = "time: " + timeLeft + "  score:" + score
    gameOver.text = "Click anywhere to restart. Score: " + score
    timeoutBox.text = "You escaped the bunny! You've collected " + score + " cans of tuna!! Click anywhere to restart"

    if (timeLeft <= 0) {
       fb_writeScore();
       gameState = 'timeout'
    }


    background('#87CEEB')
    if (gameState === 'start') {
        drawStartScreen();
    } else if (gameState === 'instruction') {
        drawInstructionScreen();
    } else if (gameState === 'gameplay') {
        drawGameplayScreen();
    } else if (gameState === 'gameover') {
        drawGameOverScreen();
    } else if (gameState === 'timeout') {
        drawTimeoutScreen();
    }
}