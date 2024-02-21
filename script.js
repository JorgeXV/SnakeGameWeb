//define html elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const highScoreText = document.getElementById('highScore');
const score = document.getElementById('score');
const logo = document.getElementById('logo');


//Define variables 

const gridSize = 20;
let snake = [{x: 10, y: 10 }];
let food = generateFood();
let direction = 'left';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

//Draw game map, snake and food
function draw () {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}


//Draw Snake

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement ('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}


//Create snake or food 

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//Set position of snake or food

function setPosition(element, position)  {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//Testing draw fucntion

//draw();

//Generate Food
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}


function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return{x, y};
}

//Move the snake

function move() {
    const head = {...snake[0]};
    switch (direction) {
        case 'up':
            head.y--;
            break;
    
    
        case 'down':
            head.y++;
            break;
    
    
        case 'right':
            head.x++;
            break;
    
    
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval  );
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);      
    }  
    else {
        snake.pop();
    }
}


//test moving

//setInterval(() => {
 //   move();
 //   draw();
// }, 200);

//Start game!

function startGame() {
    gameStarted = true; //keep track of running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
        
    }, gameSpeedDelay);
}

// Keypress event, Spacebar to begin!

function handleKeyPress(event) {
    if ( 
        ( !gameStarted && event.code === 'Space' ) ||
     ( !gameStarted && event.key === '' ) 
     )
     {
        startGame();
    } 
        else{
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    console.log();
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    }
    else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    }
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    }
    else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}


//Collision

function checkCollision () {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}


//End game after colliding
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');

}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';

}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
        highScoreText.style.display = 'block';
        
}

