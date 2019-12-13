//?Game Coding starts
var scores, roundScore, activePlayer, gamePlay; // to keep track of most important things of the game
init(); //game initialization function is below to avoid repeating our code. //!DRY principle

// This function has no name and it cannot be reuesed to another places //!Anonymous Function
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlay) {
    //Find Random number
    var diceRand = Math.floor(Math.random() * 6) + 1; //calculating random number and putting it into a variable called diceRand.

    //Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + diceRand + ".png";
    console.log(diceDOM);

    //Update the round score if its Not 1
    if (diceRand !== 1) {
      //add to round score
      roundScore += diceRand;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
  }
});
console.log(gamePlay);

//Now work on the hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlay) {
    //Add CURRENT score to the GLOBAL score
    scores[activePlayer] += roundScore;
    //Update the user interface
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlay = false;

      //disable buttons
      // document.querySelector('.btn-roll').disabled = 'true';
      // document.querySelector('.btn-hold').disabled = 'true';
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
  document.querySelector(".dice").style.display = "none";

  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");
}

document.querySelector(".btn-new").addEventListener("click", init); //!callback function 'init'

function init() {
  scores = [0, 0]; // we could use two separate scores but to make it simple we used this approach.
  roundScore = 0; // one round score at a time
  activePlayer = 0; // who is the current active player--> 0 == firstPlayer, 1== secondPlayer
  gamePlay = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0"; // another method to call by id.
  document.getElementById("score-1").textContent = "0"; // faster than query selector.
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  // document.querySelector('.btn-roll').disabled = 'false';
  // document.querySelector('.btn-hold').disabled = 'false';
}

/*=========== PRACTICE SECTION=========== */
//document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML ="<em>" + dice + "</em>";
//var x = document.querySelector("#score-0").textContent;

//?CALL BACK FUNCTION Example
/* function btn() {
  //do something
}
//btn();
document.querySelector(".btn-roll").addEventListener("click", btn); //this btn call is used as callback function */

/*
/*====================== GAME RULES: ====================== 
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
