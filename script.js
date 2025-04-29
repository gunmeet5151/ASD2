const answers = ["12", "29", "74", "45", "73", "NA"];
let userAnswers = [];
let currentPlate = 0;
let startTime, endTime, totalTime = 0, questionCount = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "964ab1bc-56a3-4620-8982-ef5388cb673f.png";

img.onload = () => drawPlate();

function drawPlate() {
  startTime = Date.now();
  const cols = 2;
  const rows = 3;
  const plateWidth = img.width / cols;
  const plateHeight = img.height / rows;

  const sx = (currentPlate % cols) * plateWidth;
  const sy = Math.floor(currentPlate / cols) * plateHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, plateWidth, plateHeight, 0, 0, canvas.width, canvas.height);
}

function nextPlate() {
  const input = document.getElementById("userAnswer").value.trim().toUpperCase();
  const feedback = document.getElementById("feedback");

  if (!input) {
    feedback.textContent = "Please enter a number or 'NA'.";
    feedback.style.color = "orange";
    return;
  }

  endTime = Date.now();
  totalTime += (endTime - startTime);
  questionCount++;

  userAnswers.push(input);
  document.getElementById("userAnswer").value = "";
  feedback.textContent = "";

  currentPlate++;
  if (currentPlate < answers.length) {
    drawPlate();
  } else {
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
      if (userAnswers[i] === answers[i]) correct++;
    }
    canvas.style.display = "none";
    document.getElementById("userAnswer").style.display = "none";
    document.querySelector(".note").style.display = "none";
    document.querySelector("button").style.display = "none";
    feedback.innerHTML = `✅ Test completed!<br>You identified <strong>${correct}</strong> of <strong>${answers.length}</strong> plates correctly.`;
    feedback.style.color = "green";
    const avgTime = (totalTime / questionCount / 1000).toFixed(2);
    document.getElementById("average-time-plate").innerText = `Average Response Time: ${avgTime} seconds`;
  }
}
