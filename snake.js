var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;
var score = 0; // Initialize score

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10); // 100 milliseconds

    // Get start over button and add click event
    const startOverButton = document.getElementById("start-over-button");
    startOverButton.addEventListener("click", startOver);
}

function update() {
    if (gameOver) {
        displayGameOver();
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score++; // Increment score when food is eaten
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }
}

function displayGameOver() {
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText("Game Over", board.width / 2 - 70, board.height / 2 - 10);
    context.font = "20px Arial";
    context.fillText("Score: " + score, board.width / 2 - 50, board.height / 2 + 30);
    
    // Show start over button
    const startOverButton = document.getElementById("start-over-button");
    startOverButton.style.display = "block";
}

function startOver() {
    // Reset game variables
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0; // Reset score
    gameOver = false; // Reset game over state

    const startOverButton = document.getElementById("start-over-button");
    startOverButton.style.display = "none"; // Hide the start over button

    placeFood(); // Place food for new game
    update(); // Start the game loop again
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
