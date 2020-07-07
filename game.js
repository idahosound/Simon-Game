var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var intervalTime = 700;
var userClickCount = -1;

$('body').keydown(function() {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").click(function() {
  userClickCount++;
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickCount,userChosenColor);
});

function checkAnswer (clickCount, chosenColor) {
  if (gamePattern[clickCount] == chosenColor) {
    buttonAnimation(chosenColor);
    playSound(chosenColor);
  } else if (clickCount > gamePattern.length ) {
    buttonAnimation (chosenColor);
    playSoundWrong(); //need a function to end the game here
  } else {
    buttonAnimation(chosenColor);
    playSoundWrong(); //need a function to end the game here
  }
}

function nextSequence() {
  userClickCount = -1 //resets user input count
  level++; //advances level
  intervalTimeSubtract = level * 20;
  $('h1').text('Level ' + level); // Updates header text
  var randomNumber = Math.floor(Math.random() * 4); // Random number from 1-4
  var randomChosenColor = buttonColors[randomNumber]; // Gets color name from array
  gamePattern.push(randomChosenColor); // Adds color name to game pattern
  for (let i = 0; i < gamePattern.length; i++) { // Use Let to limit scope of i to this block
    let playbackColor = gamePattern[i]; // Use Let to limit scope of playbackColor to this block
    if (i == 0) {
      buttonAnimation(playbackColor);
      playSound(playbackColor);
    } else {
      setTimeout(function() {
        // setTimeout passes the function to Web API, taking it out of the call stack.
        // This necessitates the use of Let, so variable values are retained
        // instead of overwritten. Otherwise, the loop finishes instantly and
        // when the timeouts execute they all return the same (global) value
        buttonAnimation(playbackColor);
        playSound(playbackColor);
      }, (i * intervalTime) - intervalTimeSubtract); // makes it go faster each level
      // Since all timeouts are sent to the queue at the same time,
      // multiplying by i produces regular intervals
    }
  }
}

function buttonAnimation(activeColor) {
  $("#" + activeColor).addClass("pressed");
  setTimeout(function() {
    $("#" + activeColor).removeClass("pressed");
  }, 100);
}

function playSound (activeColor) {
  var sound = new Audio("sounds/" + activeColor + ".mp3");
  sound.play();
}

function playSoundWrong() {
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
}
