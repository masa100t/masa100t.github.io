let score = 0;
let time = 30;
let timerId;
let moleTimer;

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const holesContainer = document.getElementById("holes");

// 6個の穴を生成
for (let i = 0; i < 6; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");

    const mole = document.createElement("img");
    mole.src = "mole.png";   // game/mole.png が必要！
    mole.classList.add("mole");

    hole.appendChild(mole);
    holesContainer.appendChild(hole);

    hole.addEventListener("click", () => {
        if (mole.style.display === "block") {
            score++;
            scoreEl.textContent = "Score: " + score;
            mole.style.display = "none";
        }
    });
}

// モグラをランダムに出す
function showMole() {
    const moles = document.querySelectorAll(".mole");
    moles.forEach(m => m.style.display = "none");

    const index = Math.floor(Math.random() * 6);
    moles[index].style.display = "block";
}

// タイマー開始
function startGame() {
    timerId = setInterval(() => {
        time--;
        timerEl.textContent = time;

        if (time <= 0) {
            clearInterval(timerId);
            clearInterval(moleTimer);
            alert("ゲーム終了！ スコア: " + score);
        }
    }, 1000);

    moleTimer = setInterval(showMole, 700);
}

startGame();
