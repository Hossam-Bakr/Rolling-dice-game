'use strict';

// players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

// dice element
const diceEl = document.querySelector('.dice');

// buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// current labels
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//helpers
let activePlayer, currentScore, scores, continuePlaying;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  continuePlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');

  player0El.classList.remove('player--winner');

  player1El.classList.remove('player--winner');
};

init(); 

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (continuePlaying) {
    // 1. generate a number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      // update current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the second player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (continuePlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      continuePlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
