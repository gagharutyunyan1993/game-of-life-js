self.addEventListener("message", (event) => {
    const gameBoard = event.data.gameBoard;
    const newBoard = new Array(gameBoard.length).fill(null).map(() => new Array(gameBoard[0].length).fill(false));

    for (let row = 0; row < gameBoard.length; row++) {
        for (let col = 0; col < gameBoard[0].length; col++) {
            const neighbors = countNeighbors(gameBoard, row, col);
            if (gameBoard[row][col]) {
                if (neighbors === 2 || neighbors === 3) {
                    newBoard[row][col] = true;
                }
            } else {
                if (neighbors === 3) {
                    newBoard[row][col] = true;
                }
            }
        }
    }

    self.postMessage(newBoard);
});

function countNeighbors(board, row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const r = (row + i + board.length) % board.length;
            const c = (col + j + board[0].length) % board[0].length;
            if (board[r][c]) {
                count++;
            }
        }
    }
    return count;
}