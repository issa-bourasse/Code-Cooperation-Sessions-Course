const statusDisplay = document.querySelector('h2');
const resetButton = document.querySelector('button');
const gameCells = document.querySelectorAll('.cell');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winAudio = new Audio('win.wav');
const clickAudio = new Audio('click.mp3');

function cellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickAudio.play();

    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        winAudio.play();
        triggerConfetti();
    } else if (gameBoard.every(cell => cell)) {
        statusDisplay.textContent = "It's a draw! Try again";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard.fill('');
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    gameCells.forEach(cell => cell.textContent = '');
}

function triggerConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999
    };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
                spread: 360,
                startVelocity: 30,
                ticks: 60,
                gravity: 0.5,
                colors: ['#ff0000', '#00ff00', '#0000ff']
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

gameCells.forEach(cell => cell.addEventListener('click', cellClick));
resetButton.addEventListener('click', resetGame);