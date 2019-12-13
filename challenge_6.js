//?Game Coding starts
var scores, roundScore, activePlayer, gamePlay;
init();
var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlay) {
    //1.Find Random number
    var diceRand1 = Math.floor(Math.random() * 6) + 1;
    var diceRand2 = Math.floor(Math.random() * 6) + 1;

    //2.Display the result
    // var diceDOM = document.querySelector(".dice");
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + diceRand1 + ".png";
    document.getElementById("dice-2").src = "dice-" + diceRand2 + ".png";
    // console.log(diceDOM);

    //3.Update the round score if its Not 1
    /* if (diceRand === 6 && lastDice === 6) {
      //!Problem ase
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (diceRand !== 1) {
      //add to round score
      roundScore += diceRand;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
    lastDice = diceRand; */
    if (diceRand1 !== 1 && diceRand2 !== 1) {
      roundScore += diceRand1 + diceRand2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

//Now work on the hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlay) {
    //Add CURRENT score to the GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the user interface
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Take input from user to set limit
    var input = document.querySelector(".final-score").value;
    //!Problem ase
    var winningScore;
    //Undefined, 0, null or "" are COERCED to false
    //All other values are COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 30;
    }

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      hideDice();
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlay = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  hideDice();
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlay = true;

  hideDice();
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
function hideDice() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}
