document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function createBoard() {
        board.innerHTML = '';
        gameBoard.forEach((_, index) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = index;
            square.addEventListener('click', handleClick);
            board.appendChild(square);
        });
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] || !gameActive) return;
        
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell)) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    createBoard();
});
