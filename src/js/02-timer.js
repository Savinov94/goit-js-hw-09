import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;

function updateTimer(endTime) {
  const currentTime = new Date().getTime();
  const timeLeft = endTime - currentTime;

  if (timeLeft <= 0) {
    clearInterval(countdownIntervalId);
    alert('Time is up!');
    startButton.disabled = false;
    datetimePicker.disabled = false;
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  daysValue.textContent = days.toString().padStart(2, '0');
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');
}

function validateDate(selectedDate) {
  const currentDate = new Date().getTime();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future.');
    return false;
  }

  return true;
}

function onDateSelected(selectedDates) {
  const selectedDate = new Date(selectedDates[0]);
  if (validateDate(selectedDate)) {
    startButton.disabled = false;
  }
}

function onStartButtonClick() {
  const selectedDate = new Date(datetimePicker.value);
  if (validateDate(selectedDate)) {
    startButton.disabled = true;
    datetimePicker.disabled = true;

    const endTime = selectedDate.getTime();
    countdownIntervalId = setInterval(() => {
      updateTimer(endTime);
    }, 1000);
  }
}

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDateSelected,
});

startButton.addEventListener('click', onStartButtonClick);