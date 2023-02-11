let snake = [0, 1, 2];
const size = 10;
const box = document.getElementById('snake-box');
const playButton = document.getElementById('play-button');
const downButton = document.getElementById('down-button');
const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const score = document.getElementById('snake-score');
const interval = 500;
let acumulator = 1;
let divs;
let idInterval;
let foodIndex;
let scoreCount = 0;

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            up();
            break;
        case 'ArrowDown':
            down();
            break;
        case 'ArrowLeft':
            left();
            break;
        case 'ArrowRight':
            right();
            break;
    }
});

playButton.addEventListener('click', () => {
    startGame();
});

upButton.addEventListener('click', () => {
    up();
});

downButton.addEventListener('click', () => {
    down();
});

leftButton.addEventListener('click', () => {
    left();
});

rightButton.addEventListener('click', () => {
    right();
});

function createBox() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const div = document.createElement('div');
            box.appendChild(div);
        }
    }
}

function drawSnake() {
    divs = document.querySelectorAll('.box div');
    snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake() {
    const tail = snake.shift(); // elimina el primer elemento del array
    divs[tail].classList.remove('snake'); //elimina la clase snake del DOM
    const head = snake[snake.length - 1] + acumulator;
    if (isCollision(head)) {
        alert('game over');
        clearGame();
        return;
    }

    snake.push(head);
    divs[head].classList.add('snake');

    //food
    eatFood(tail);
}

function eatFood(tail) {
    if (snake[snake.length - 1] === foodIndex) {
        divs[foodIndex].classList.remove('food');
        snake.unshift(tail);
        divs[tail].classList.add('snake');
        score.innerText = ++scoreCount;
        randomFood();
    }
}
function isCollision(index) {
    console.log(index % size);
    if (
        index >= size * size
        || index < 0
        || (acumulator === 1 && index % size === 0)
        || (acumulator === -1 && (index + 1) % size === 0)
        ) {
        return true;
    }
    return false;
}

function startGame() {
    clearGame();
    idInterval = setInterval(() => {
        moveSnake();
    }, interval);
}

function clearGame() {
    snake = [0, 1, 2];
    box.innerHTML = '';
    acumulator = 1;
    scoreCount = 0;
    score.innerText = scoreCount;
    clearInterval(idInterval);
    createBox();
    drawSnake();
    randomFood();
}

function up() {
    acumulator = -size;
}

function down() {
    acumulator = size;
}

function left() {
    acumulator = -1;
}

function right() {
    acumulator = 1;
}

function randomFood() {
    foodIndex = Math.floor(Math.random() * divs.length);
    while (snake.includes(foodIndex)) {
        foodIndex = Math.floor(Math.random() * divs.length);
    }
    divs[foodIndex].classList.add('food');
}

clearGame();