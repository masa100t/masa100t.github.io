let score = 0;
let time = 30;
let timerId = null;
let moleInterval = null;

const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const highscoreSpan = document.getElementById("highscore");

const holes = document.querySelectorAll(".hole");
const startBtn = document.getElementById("startBtn");

// 保存されたハイスコアを表示
let highscore = localStorage.getItem("mole_highscore") || 0;
highscoreSpan.textContent = highscore;

function showMole() {
  holes.forEach(h => h.classList.remove("active"));

  const index = Math.floor(Math.random() * holes.length);
  holes[index].classList.add("active");
}

holes.forEach(hole => {
  hole.addEventListener("click", () => {
    if (hole.classList.contains("active")) {
      score++;
      scoreSpan.textContent = score;
      hole.classList.remove("active");
    }
  });
});

function startGame() {
  score = 0;
  time = 30;
  scoreSpan.textContent = 0;
  timeSpan.textContent = 30;

  startBtn.disabled = true;

  // モグラを1秒ごとに出す
  moleInterval = setInterval(showMole, 700);

  // 1秒ごとにタイマーを減らす
  timerId = setInterval(() => {
    time--;
    timeSpan.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  clearInterval(moleInterval);

  holes.forEach(h => h.classList.remove("active"));

  startBtn.disabled = false;

  // ハイスコア更新
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("mole_highscore", highscore);
    highscoreSpan.textContent = highscore;
  }

  alert(`ゲーム終了！スコア：${score}`);
}

startBtn.addEventListener("click", startGame);