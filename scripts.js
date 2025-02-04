const statusDisplay = document.querySelector('h2');
const resetButton = document.querySelector('button');
const gameCells = document.querySelectorAll('.game div[data-cell-index]');

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
let gameBoard = Array.from(Array(9).fill(''));
let gameActive = true;

console.log(gameBoard);

if (gameCells.length > 0) {
    gameCells.forEach(cell => cell.addEventListener('click', cellClick));
}

function cellClick(event){
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if(gameBoard[cellIndex] !== '' || !gameActive){
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.innerHTML = currentPlayer;

    checkWinner();
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winningConditions.length; i++){
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if(a === '' || b === '' || c === ''){
            continue;
        }

        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusDisplay.innerHTML = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if(roundDraw){
        statusDisplay.innerHTML = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', resetGame);

function resetGame(){
    currentPlayer = 'X';
    gameBoard = Array.from(Array(9).fill(''));
    gameActive = true;
    statusDisplay.innerHTML = `${currentPlayer}'s turn`;
    gameCells.forEach(cell => cell.innerHTML = '');
}


