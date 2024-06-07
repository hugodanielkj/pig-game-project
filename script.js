'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Default interface
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Setting variables
let scores = [0, 0];
let currentScore = 0;
let activePlayerStatus = 0; // Varies between 0 and 1
let playing = true;

// Switch to the next player:
const switchPlayer = function () {
  // Setting 0 score to the player that rolled 1
  document.getElementById(`current--${activePlayerStatus}`).textContent = 0;

  // Changing current player
  activePlayerStatus = activePlayerStatus === 0 ? 1 : 0;
  currentScore = 0;

  // Setting visual effect on current player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll Dice Funcionality
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    // Generate a random number to dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-images/dice-${diceNumber}.png`;

    // Checking if rolled is 1
    if (diceNumber !== 1) {
      // Add score to current player
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayerStatus}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Functionality
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    //Return the current score to the total score
    scores[activePlayerStatus] += currentScore;
    document.querySelector(`#score--${activePlayerStatus}`).textContent =
      scores[activePlayerStatus];

    //Check if someone won
    if (scores[activePlayerStatus] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayerStatus}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayerStatus}`)
        .classList.remove('player--active');
    } else {
      //Current score becomes 0 and switch to the next player
      switchPlayer();
    }
  }
});

//New Game Functionality
document.querySelector('.btn--new').addEventListener('click', function() {
  document
  .querySelector('#current--0')
  .textContent = 0;
  document
  .querySelector('#current--1')
  .textContent = 0;
  document
  .querySelector(`.player--${activePlayerStatus}`)
  .classList.remove('player--winner');
  document
  .querySelector(`.player--0`)
  .classList.add('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayerStatus = 0; // Varies between 0 and 1
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
})