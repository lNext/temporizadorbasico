let timerInterval;
let totalTime;
let isTimerRunning = false;
let remainingTime = 0;

function startTimer() {
  let inputMinutes = parseInt(document.getElementById("minutes").value);
  let timerDisplay = document.getElementById("timer");
  let audio = document.getElementById("audio");
  let bell_message = document.getElementById("bell");
  let select = document.getElementById("minutes");
  let selecciona_minutos = document.getElementById("selecciona_minutos");

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

    if (isNaN(inputMinutes) || inputMinutes === "") {
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

        let hours = Math.floor(totalTime / 3600);
        let minutes = Math.floor((totalTime % 3600) / 60);
        let seconds = totalTime % 60;

        if (hours > 0) {
          document.title = timerDisplay.textContent = `${hours
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        } else {
          document.title = timerDisplay.textContent = `${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }

        if (totalTime <= 0) {
          clearInterval(timerInterval);
          document.title = "¡El tiempo ha finalizado!";
          audio.play();
          bell_message.textContent = "El tiempo ha finalizado";
          document.getElementById("startStopButton").textContent =
            "Iniciar Temporizador";

          select.style.display = "";
          selecciona_minutos.style.display = "";
        } else {
          totalTime--;
          select.style.display = "none";
          selecciona_minutos.style.display = "none";
        }
      }, 1000);

      isTimerRunning = true;
      document.getElementById("startStopButton").textContent =
        "Detener Temporizador";
    }
  }
}
