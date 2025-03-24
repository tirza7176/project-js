let board = Array(9).fill(null);


let currentPlayer = "X";
let round = 0;
let isGameActive = true;
let xWins = 0;
let oWins = 0;


const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");
const xWinsElement = document.getElementById("xWins");
const oWinsElement = document.getElementById("oWins");


function updateStatus() {
    if (isGameActive && round === 9) {
        statusElement.textContent = `It's a Tie!`;
    } else if (!isGameActive) {
        statusElement.textContent = `${currentPlayer} wins!`;
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            paintColorWinningArea(pattern);

            return true;
        }
    }
    return false;
}


function handleCellClick(event) {
    round++;
    const index = event.target.getAttribute("data");


    if (board[index] || !isGameActive) return;
    board[index] = currentPlayer;
    event.target.classList.add("players");


    currentPlayer === "X"
        ? (event.target.style.color = "blue")
        : (event.target.style.color = "red");

    event.target.textContent = currentPlayer;


    if (checkWinner()) {
        updateLeaderboard();
        updateStatus();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}


function paintColorWinningArea(pattern) {
    cells.forEach((cellElement) => {
        if (pattern.includes(+cellElement.getAttribute("data"))) {
            console.log("cell", cellElement.getAttribute("data"));
            cellElement.style.backgroundColor = "#ffff0752";
        }
    });
}

function updateLeaderboard() {
    if (currentPlayer === "X") {
        xWins++;
        xWinsElement.textContent = `X Wins: ${xWins}`;
    } else {
        oWins++;
        oWinsElement.textContent = `O Wins: ${oWins}`;
    }
}

function resetGame() {
    board = Array(9).fill(null);
    round = 0;
    currentPlayer = "X";
    isGameActive = true;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style = "unset";
    });
    updateStatus();
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

resetButton.addEventListener("click", resetGame);
