const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const ROWS = 1000;
const COLS = 1000;

let gameBoard = createBoard();

let isRunning = false;
let animationId = null;

const worker = new Worker("worker.js");

document.getElementById("startBtn").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        worker.postMessage({gameBoard}); // send current game board to worker
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationId);
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationId);
    }
    gameBoard = createBoard();
    drawBoard();
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
    gameBoard = createBoard(true);
    drawBoard();
});

worker.addEventListener("message", (event) => {
    gameBoard = event.data; // receive new game board from worker
    drawBoard();
    if (isRunning) {
        animationId = requestAnimationFrame(() => worker.postMessage({gameBoard})); // send current game board to worker again
    }
});

function createBoard(random = false) {
    const board = new Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
        board[i] = new Array(COLS);
        for (let j = 0; j < COLS; j++) {
            board[i][j] = random ? Math.random() < 0.5 : false;
        }
    }
    return board;
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (gameBoard[row][col]) {
                ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function toggleCell(row, col) {
    gameBoard[row][col] = !gameBoard[row][col];
    drawBoard();
}

canvas.addEventListener("click", (event) => {
    const boundingRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;
    const canvasX = (event.clientX - boundingRect.left) * scaleX;
    const canvasY = (event.clientY - boundingRect.top) * scaleY;
    const cellRow = Math.min(Math.floor(canvasY / CELL_SIZE), ROWS - 1);
    const cellCol = Math.min(Math.floor(canvasX / CELL_SIZE), COLS - 1);
    toggleCell(cellRow, cellCol);
});
