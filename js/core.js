let timerInterval;
let totalTime;
let isTimerRunning = false;
let remainingTime = 0;

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("minutes");

  const maxMinutes = 60;
  const minMinutes = 5;

  for (let i = minMinutes; i <= maxMinutes; i += 5) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + " minutos";
    select.appendChild(option);
  }
});

function startTimer() {
  let inputMinutes = document.getElementById("minutes").value;
  let timerDisplay = document.getElementById("timer");
  let audio = document.getElementById("audio");
  let bell_message = document.getElementById("bell");
  let select = document.getElementById("minutes");

  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;

    remainingTime = totalTime;

    document.title = "Temporizador detenido";
    bell_message.textContent = "Temporizador detenido";
    document.getElementById("startStopButton").textContent =
      "Reanudar Temporizador";
  } else {
    if (remainingTime === 0) {
      totalTime = inputMinutes * 60;
    } else {
      totalTime = remainingTime; 
    }

    if (inputMinutes > 60 || inputMinutes < 5 || inputMinutes % 5 != 0) {
      alert("Error");
    } else {
      bell_message.textContent =
        "Tiempo establecido en " + inputMinutes + " minutos";

      timerInterval = setInterval(() => {
        window.addEventListener("beforeunload", function (e) {
          e.preventDefault();
          e.returnValue = "";
          return "";
        });

        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        document.title = timerDisplay.textContent = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (totalTime <= 0) {
          clearInterval(timerInterval);
          document.title = "¡El tiempo ha finalizado!";
          audio.play();
          bell_message.textContent = "El tiempo ha finalizado";
          document.getElementById("startStopButton").textContent =
            "Iniciar Temporizador";

          select.style.display = "";
        } else {
          totalTime--;
          select.style.display = "none";
        }
      }, 1000);

      isTimerRunning = true;
      document.getElementById("startStopButton").textContent =
        "Detener Temporizador";
    }
  }
}
