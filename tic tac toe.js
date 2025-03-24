let board = Array(9).fill(null);

// נתוני משחק בסיסיים: שחקן נוכחי, סיבוב, האם המשחק אקטיבי, ציוני נצחונות לשחקן
let currentPlayer = "X";
let round = 0;
let isGameActive = true;
let xWins = 0;
let oWins = 0;

// הצהרה על משתנים html
const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");
const xWinsElement = document.getElementById("xWins");
const oWinsElement = document.getElementById("oWins");

// עדכון סטטוס המשחק: ניצחון או תיקו
function updateStatus() {
    if (isGameActive && round === 9) {
        statusElement.textContent = `It's a Tie!`;
    } else if (!isGameActive) {
        statusElement.textContent = `${currentPlayer} wins!`;
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// בדיקה בכל סיבוב האם יש ניצחון לשחקן
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
    // בדיקה בלולאה על כל תבנית ניצחון אפשרית אם שווה לערכים שבלוח המשחק
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

// אירוע הקליק על ריבוע
function handleCellClick(event) {
    round++;
    const index = event.target.getAttribute("data");

    // הפסקת פעולת הפונקציה במידה והלוח מלא או שהתא תפוס
    if (board[index] || !isGameActive) return; //שורה זו כדי לדלג על שאר הפעולות במצב שהתא מלא כבר או אם המשחק נגמר

    board[index] = currentPlayer;
    event.target.classList.add("players");

    // צביעת שחקן איקס בכחול ועיגול באדום
    currentPlayer === "X"
        ? (event.target.style.color = "blue")
        : (event.target.style.color = "red");

    event.target.textContent = currentPlayer;

    // בדיקה האם יש ניצחון, עדכון לוח הניצחון ועדכון סטטוס
    if (checkWinner()) {
        updateLeaderboard();
        updateStatus();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

// צביעת שורת הניצחון
function paintColorWinningArea(pattern) {
    cells.forEach((cellElement) => {
        if (pattern.includes(+cellElement.getAttribute("data"))) {
            console.log("cell", cellElement.getAttribute("data"));
            cellElement.style.backgroundColor = "#ffff0752";
        }
    });
}

// עדכון לוח הנצחונות
function updateLeaderboard() {
    if (currentPlayer === "X") {
        xWins++;
        xWinsElement.textContent = `X Wins: ${xWins}`;
    } else {
        oWins++;
        oWinsElement.textContent = `O Wins: ${oWins}`;
    }
}

// איפוס משחק
function resetGame() {
    board = Array(9).fill(null);
    round = 0;
    currentPlayer = "X";
    isGameActive = true;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style = "unset"; // איפוס עיצוב של תא בודד
    });
    updateStatus();
}

// הוספת addEventListener שמבצע לולאה על כל תא
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// הוספת addEventListener לאיפוס משחק
resetButton.addEventListener("click", resetGame);
