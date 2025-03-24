
const board = document.getElementById("board");
const originalImages = ["images/cat.webp", "images/bear.jpg",
    "images/chick.webp", "images/chicken.webp", "images/cow.webp", "images/dog.webp", "images/elephant.webp", "images/lion.jpg", "images/snake.png", "images/tiger.webp", "images/cat.webp", "images/bear.jpg", "images/chick.webp", "images/chicken.webp", "images/cow.webp", "images/dog.webp", "images/elephant.webp", "images/lion.jpg", "images/snake.png", "images/tiger.webp"];
function startGame() {
    board.innerHTML = "";


    const images = structuredClone(originalImages);

    let remaining = images.length / 2;

    let tempSelection = null;
    let scores = { a: 0, b: 0 };
    let inProgress = false;
    let currentPlayer = "a";
    const eScorea = document.getElementById("eScorea");
    const eScoreb = document.getElementById("eScoreb");
    eScorea.textContent = scores.a;
    eScoreb.textContent = scores.b;

    const eTurn = document.getElementById("eTurn");
    const btnr = document.getElementById("reset")
    while (images.length > 0) {
        const rand = Math.trunc(Math.random() * images.length)
        const card = document.createElement("div");
        card.classList.add("card");


        const newImage = document.createElement("img");
        newImage.src = images.splice(rand, 1);;
        card.appendChild(newImage);
        newImage.classList.add("hide");

        btnr.addEventListener("click", resetboard);
        card.addEventListener('click', (e) => {
            if (!inProgress) {
                e.target.classList.remove("hide")
                if (tempSelection) {

                    inProgress = true
                    if (tempSelection.src === e.target.src) {
                        scores[currentPlayer]++;
                        eScorea.textContent = scores.a;
                        eScoreb.textContent = scores.b;
                        remaining--;
                        tempSelection = null;
                        inProgress = false;
                    } else {
                        setTimeout(() => {
                            e.target.classList.add("hide")
                            tempSelection.classList.add("hide")
                            tempSelection = null;
                            inProgress = false;
                            setTimeout(() => switchTurn(), 1000);

                        }, 1500)

                    }

                } else {
                    tempSelection = e.target;
                }
            }
            if (remaining === 0) {
                setTimeout(() => winning()
                    , 1500)
            }
        });
        board.appendChild(card);
    }
    function switchTurn() {
        currentPlayer = currentPlayer === "a" ? "b" : "a";

        if (currentPlayer === "a") {
            eTurn.textContent = "שחקן א ";
            eTurn.style.color = "green"
        } else {
            eTurn.innerText = "שחקן ב";
            eTurn.style.color = "blue"
        }
    }
    function winning() {
        if (scores.a > scores.b) {
            eScorea.textContent = "ניצחת"
        } else if (scores.a < scores.b) {
            eScoreb.textContent = "ניצחת"
        } else {
            eScoreb.textContent = "תיקו";
            eScorea.textContent = "תיקו"
        }

    }
}


function resetboard() {
    startGame();


}
startGame();

document.getElementById("instructions-game").addEventListener("click", function () {
    let box = document.getElementById("instructions-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
});


