// Variables globales
let timerInterval;
let totalTime;
let isTimerRunning = false;
let remainingTime = 0;

// Elementos del DOM
const resetButton = document.getElementById("resetButton");
const select = document.getElementById("minutes");
const timerDisplay = document.getElementById("timer");
const audio = document.getElementById("audio");
const bellMessage = document.getElementById("bell");
const seleccionaMinutos = document.getElementById("selecciona_minutos");

// Ocultar el botón de reinicio al inicio
resetButton.style.display = "none";
timerDisplay.innerHTML = "00:00"

// Función para iniciar o detener el temporizador
function startTimer() {
  const inputMinutes = parseInt(document.getElementById("minutes").value);

  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;

    remainingTime = totalTime;

    // Detener el temporizador
    handleTimerStop();
  } else {
    // Iniciar o reanudar el temporizador
    handleTimerStart(inputMinutes);
  }
}

// Función para manejar el inicio o la reanudación del temporizador
function handleTimerStart(inputMinutes) {
  if (remainingTime === 0) {
    totalTime = inputMinutes * 60;
  } else {
    totalTime = remainingTime;
  }

  if (isNaN(inputMinutes) || inputMinutes === "") {
    alert("Por favor ingresa el tiempo");
  } else {
    if (inputMinutes >= 60) {
      inputMinutes = inputMinutes / 60;
      bellMessage.textContent = `Tiempo establecido en ${inputMinutes} hora(s)`;
    } else {
      inputMinutes = inputMinutes;
      bellMessage.textContent = `Tiempo establecido en ${inputMinutes} minutos`;
    }

    select.style.display = "none";
    seleccionaMinutos.style.display = "none";
    resetButton.style.display = "";

    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    document.getElementById("startStopButton").textContent =
      "Detener Temporizador";
  }
}

// Función para manejar la actualización del temporizador cada segundo
function updateTimer() {
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  });

  let hours = Math.floor(totalTime / 3600);
  let minutes = Math.floor((totalTime % 3600) / 60);
  let seconds = totalTime % 60;

  // Actualizar el temporizador en la interfaz
  updateTimerDisplay(hours, minutes, seconds);

  // Verificar si el tiempo ha finalizado
  if (totalTime <= 0) {
    handleTimerFinish();
  } else {
    totalTime--;
  }
}

// Función para detener el temporizador y mostrar el mensaje de finalización
function handleTimerStop() {
  document.title = "Temporizador detenido";
  bellMessage.textContent = "Temporizador detenido";
  document.getElementById("startStopButton").textContent =
    "Reanudar Temporizador";
}

// Función para actualizar el temporizador en la interfaz
function updateTimerDisplay(hours, minutes, seconds) {
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
}

// Función para manejar el final del temporizador
function handleTimerFinish() {
  clearInterval(timerInterval);
  document.title = "¡El tiempo ha finalizado!";
  audio.play();
  bellMessage.textContent = "El tiempo ha finalizado";
  document.getElementById("startStopButton").textContent =
    "Iniciar Temporizador";

  select.style.display = "";
  seleccionaMinutos.style.display = "";
  resetButton.style.display = "none";
}

// Función para reiniciar el temporizador
function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  remainingTime = 0;

  document.title = "Temporizador reiniciado";
  document.getElementById("startStopButton").textContent =
    "Iniciar Temporizador";
  timerDisplay.textContent = "00:00";
  document.getElementById("minutes").value = "";

  bellMessage.textContent = "Temporizador reiniciado";
  select.style.display = "";
  seleccionaMinutos.style.display = "";
  resetButton.style.display = "none";
}

//Función para convertir de horas a minutos
function convertTime() {
  let hoursToConvert = document.getElementById("hoursToConvert").value;
  let minutesConvert = document.getElementById("minutesConvert");
  let resultMinutes = hoursToConvert * 60;
  if (isNaN(hoursToConvert) || hoursToConvert === "") {
    alert("Ingresa un valor válido a convertir");
  } else {
    minutesConvert.innerHTML = resultMinutes + " minutos";
  }
}
