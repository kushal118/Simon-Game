var userClickedPattern = [];
var buttonColors =["red","blue","green","yellow"];
var gamePattern =[];
var started = false;
var level = 0;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level"+ level);
    nextSequence();
    started = true;

  }

})
function nextSequence(){
  userClickedPattern =[];
  level++;
  $("#level-title").text("Level"+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);


})
function playSound(name){
  var audio = new Audio("sounds/" +name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100)
}
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence()
    },1000 )
    }

  } else {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var wrong = new Audio("sounds/wrong.mp3")
    wrong.play();
    $("h1").text("Game 0ver.Press any key to restart the game");
    startOver()

  }
}
function startOver(){
  gamePattern =[];
  started=false;
  level=0;
}
