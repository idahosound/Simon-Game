var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function playSound(thisColor) {
  var sound = new Audio ("sounds/"+thisColor+".mp3");
  sound.play();
}
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(50).fadeIn(50);

}
