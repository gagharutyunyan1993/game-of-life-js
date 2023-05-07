const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;
const ROWS = 100;
const COLS = 100;

let gameBoard = createBoard();

let isRunning = false;
let animationId = null;
let pendingChanges = [];

const worker = new Worker("worker.js");

document.getElementById("startBtn").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        worker.postMessage({gameBoard});
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
    gameBoard = event.data;

    pendingChanges.forEach(change => {
        gameBoard[change.row][change.col] = !gameBoard[change.row][change.col];
    });
    pendingChanges = [];

    drawBoard();
    if (isRunning) {
        animationId = requestAnimationFrame(() => worker.postMessage({gameBoard}));
    }
});

function createBoard(random = false) {
    const board = new Array(ROWS + 2);
    for (let i = 0; i < ROWS + 2; i++) {
        board[i] = new Array(COLS + 2);
        for (let j = 0; j < COLS + 2; j++) {
            if (random) {
                board[i][j] = Math.random() < 0.5;
            } else {
                board[i][j] = false;
            }
        }
    }

    // TODO: I left this part of the code to show how the "Glider" figure goes beyond one edge of the field and appears from the other
    board[0][1] = true;
    board[1][2] = true;
    board[2][0] = true;
    board[2][1] = true;
    board[2][2] = true;

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
    if (!isRunning) {
        gameBoard[row][col] = !gameBoard[row][col];
        drawBoard();
    } else {
        pendingChanges.push({row, col});
    }
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