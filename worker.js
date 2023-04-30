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
    const rowStart = Math.max(row - 1, 0);
    const colStart = Math.max(col - 1, 0);
    const rowEnd = Math.min(row + 1, board.length - 1);
    const colEnd = Math.min(col + 1, board[0].length - 1);
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            if (i === row && j === col) {
                continue;
            }
            if (board[i][j]) {
                count++;
            }
        }
    }
    return count;
}
