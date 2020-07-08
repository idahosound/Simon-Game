var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var intervalTime = 700;
// var userClickCount = -1;
var timer = null;
var newRound = null;

// Check for keydown to start the game
$('body').keydown(function() {
  if (level === 0) {
    nextSequence();
  }
});

// Listens for a button click. Counts the user's clicks and
// grabs the color name from the button ID. Passes these values to
// the checkAnswer function
$(".btn").click(function() {
  userClickCount++;
  var userChosenColor = this.id;
  clearTimeout(timer);  // stops the timer since the user clicked
  checkAnswer(userClickCount, userChosenColor);
});

// Compares the chosen color and it's place in the sequence to the gamePattern
function checkAnswer(clickCount, chosenColor) {
  if (gamePattern[clickCount -1] == chosenColor) { // if the selection is correct
    isCorrect(chosenColor);
    startTimer();  // restarts the timer
    if (gamePattern.length == clickCount) { // if it's the end of the sequence
      clearTimeout(timer); // stops the timer
      newRound = setTimeout(function() { // starts the next sequence after a 2 sec delay
        nextSequence();
      }, 2000);
    };
  } else if (clickCount > gamePattern.length) { // if there is an extra selection
    isWrong(chosenColor);
    clearTimeout(newRound); // stops the nextSequence from running
  } else { // if the selection is incorrect
    isWrong(chosenColor);
  }
}

// appends one random iteration to the game pattern
function nextSequence() {
  userClickCount = 0 //resets user input count
  level++; //advances level
  intervalTimeSubtract = level * 20;
  $('h1').text('Level ' + level); // Updates header text
  var randomNumber = Math.floor(Math.random() * 4); // Random number from 1-4
  var randomChosenColor = buttonColors[randomNumber]; // Gets color name from array
  gamePattern.push(randomChosenColor); // Adds color name to game pattern
  for (let i = 0; i < gamePattern.length; i++) { // Use Let to limit scope of i to this block
    let playbackColor = gamePattern[i];
    if (i == 0) {
      isCorrect(playbackColor); // the first button plays back without delay
    } else {
      setTimeout(function() {
        // setTimeout passes the function to Web API, taking it out of the call stack.
        // This necessitates the use of Let, so variable values are retained
        // instead of overwritten. Otherwise, the loop finishes instantly and
        // when the timeouts execute they all return the same (global) value
        isCorrect(playbackColor);
      }, (i * intervalTime) - intervalTimeSubtract); // makes it go faster each level
      // Since all timeouts are sent to the queue at the same time,
      // multiplying by i produces regular intervals
    }
  };
  setTimeout(function () {
    startTimer();
  }, (i*intervalTime) - intervalTimeSubtract); // starts the timer running, with a delay to account for playback time
}

function isCorrect(thisColor) {
  buttonAnimation(thisColor);
  playSound(thisColor);
}

function isWrong(thisColor) {
  clearTimeout(timer);
  buttonAnimation(thisColor);
  playSoundWrong(thisColor);
  $('body').addClass('game-over');
  setTimeout (function () {
    $('body').removeClass('game-over');
    level = 0;
    $('h1').text('Press A Key to Start');
    gamePattern = [];
  }, 2000);

}

function buttonAnimation(activeColor) {
  $("#" + activeColor).addClass("pressed");
  setTimeout(function() {
    $("#" + activeColor).removeClass("pressed");
  }, 100);
}

function playSound(activeColor) {
  var sound = new Audio("sounds/" + activeColor + ".mp3");
  sound.play();
}

function playSoundWrong() {
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
}

// Not that timer needs to be set outside the function so it can be accessed
// by other functions
function startTimer() {
  timer = setTimeout(function() {
    isWrong(gamePattern[level - 1]);
  }, 5000);
}
