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
  let totalTime = inputMinutes * 60;

  if (inputMinutes > 60) {
    alert("Error");
  } else {
    bell_message.textContent =
      "La campana sonará en " + inputMinutes + " minutos";
    let timerInterval = setInterval(() => {
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
        document.title = "¡El tiempo ha finalizado";
        audio.play();
        bell_message.textContent = "El tiempo ha finalizado";

        if (Notification.permission === "granted") {
          new Notification("¡El tiempo ha finalizado!", {
            body: "Tu temporizador ha llegado a cero.",
            icon: "../img/clock.png", 
          });
        }
      } else {
        totalTime--;
      }
    }, 1000);
  }
}
