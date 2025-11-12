const BOARD_SIZE = 15;
const WIN_LENGTH = 5;
const BLACK = 'black';
const WHITE = 'white';
const EMPTY = null;

let board = [];
let currentPlayer = BLACK;
let gameOver = false;

function initializeBoard() {
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY));
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
            cell.addEventListener('click', () => makeMove(row, col));
            boardElement.appendChild(cell);
        }
    }
}

function makeMove(row, col) {
    if (gameOver || board[row][col] !== EMPTY) {
        return;
    }

    board[row][col] = currentPlayer;

    if (checkWin(row, col, currentPlayer)) {
        document.getElementById('status').textContent = `${currentPlayer.toUpperCase()} wins!`;
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
    document.getElementById('currentPlayer').textContent = currentPlayer === BLACK ? 'Black' : 'White';
    renderBoard();
}

function checkWin(row, col, player) {
    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal
        [1, -1]   // anti-diagonal
    ];

    for (const [dx, dy] of directions) {
        let count = 1;

        // Check in positive direction
        let r = row + dx;
        let c = col + dy;
        while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
            count++;
            r += dx;
            c += dy;
        }

        // Check in negative direction
        r = row - dx;
        c = col - dy;
        while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
            count++;
            r -= dx;
            c -= dy;
        }

        if (count >= WIN_LENGTH) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    initializeBoard();
    currentPlayer = BLACK;
    gameOver = false;
    document.getElementById('currentPlayer').textContent = 'Black';
    document.getElementById('status').textContent = 'Game Started';
    renderBoard();
}

// Event listeners
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Initialize game
initializeBoard();
renderBoard();
