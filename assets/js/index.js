const input = document.getElementById('input');
const hint = document.getElementById('hint');
const counter = document.getElementById('counter');
const retry = document.getElementById('retry');
const highscoreOutput = document.getElementById('highscore');
const highscore = localStorage.getItem('highscore');
const usedNumbers = [];
const maxAnswer = 100;
let answer;
let tries = 0;
let writable = true;

if (highscore) {
  highscoreOutput.innerHTML = `din highscore: ${highscore}`;
}

function startGame() {
  answer = Math.floor(Math.random() * maxAnswer);
  tries = 0;
  counter.innerHTML = `forsøk: ${tries}`;
  input.value = ``;
  retry.innerHTML = ``;
  input.style.color = getComputedStyle(input).getPropertyValue('--text-color');
  hint.innerHTML = `trykk enter`;
  writable = true;
}

function checkAnswer() {
  if (usedNumbers.includes(input.value)) {
    input.style.color = getComputedStyle(input).getPropertyValue('--text-warning');
    hint.innerHTML = `tallet er allerede brukt`;
  } else {
    tries++;
    counter.innerHTML = `forsøk: ${tries}`;
    usedNumbers.push(input.value);
    if (input.value > answer) {
      hint.innerHTML = `lavere`;
    } else if (input.value < answer) {
      hint.innerHTML = `høyere`;
    } else if (input.value == answer) {
      hint.innerHTML = `riktig`;
      input.style.color = getComputedStyle(input).getPropertyValue('--text-success');
      usedNumbers.length = 0;
      retry.innerHTML = `prøv igjen?`;
      writable = false;
      if (localStorage.getItem('highscore') > tries) {
        localStorage.setItem('highscore', tries);
        highscoreOutput.innerHTML = `din highscore: ${tries}`;
      }
    }
  }
}

document.querySelector('#input').addEventListener('keydown', function (e) {
  if (writable) {
    if (e.key === 'Enter') {
      checkAnswer();
    } else if (input.value != '0') {
      if (isFinite(e.key) || e.key === 'Backspace' || e.key === 'Enter') {
        input.style.color = getComputedStyle(input).getPropertyValue('--text-color');
        if (`${input.value}` + `${e.key}` > maxAnswer) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    } else if (e.key != 'Backspace') {
      e.preventDefault();
    }
  } else {
    e.preventDefault();
  }
});

document.querySelector('#retry').addEventListener('click', function (e) {
  startGame();
});

startGame();
