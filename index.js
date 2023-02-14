var gamePattern = [];
var buttonColours = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$("body").keypress(function() {
    if(!started) {
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $("#level-title").text("Level " + level);

    animateClick(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var numberOfRandom = Math.floor(Math.random() * 4);
  var randomColour = buttonColours[numberOfRandom];
  gamePattern.push(randomColour);
  
  $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name +  ".mp3");
    audio.play();
}

function animateClick(clickButton) {
    $("#" + clickButton).addClass("pressed");
    setTimeout(() => {
       $("#" + clickButton).removeClass("pressed"); 
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Start");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}