var button_colors = ["red", "blue", "green", "yellow"];

var game_pattern = [];
var user_clicked_pattern = [];

var game_started = false;
var level = 0;

$(document).keydown(function() {
  if(!game_started) {
    $("#level-title").html("Level " + level);
    next_sequence();
    game_started = true;
  }
});

$(".btn").click(function() {
  if(game_started){
    var user_chosen_color = $(this).attr("id");
    user_clicked_pattern.push(user_chosen_color);

    animate_press(user_chosen_color);
    play_sound(user_chosen_color);

    check_answer(user_clicked_pattern.length);
}
});

function next_sequence() {
  user_clicked_pattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var random_number = Math.floor(Math.random() * 4);
  var random_chosen_color = button_colors[random_number];

  game_pattern.push(random_chosen_color);
  $("#" + random_chosen_color).fadeIn(100).fadeOut(100).fadeIn(100);

  play_sound(random_chosen_color);
}

function play_sound(sound_name) {
  var audio = new Audio("sounds/" + sound_name + ".mp3");
  audio.play();
}

function animate_press(button_color) {
  var button_class = "." + button_color;
  $(button_class).addClass("pressed");
  setTimeout(function() {
    $(button_class).removeClass("pressed");
  }, 100);
}

function check_answer(current_lvl) {
  if (user_clicked_pattern[current_lvl-1] === game_pattern[current_lvl-1]) {
    if (user_clicked_pattern.length === game_pattern.length) {
      setTimeout(function() {
        next_sequence();
      }, 1000);
    }
  } else {
    play_sound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Restart.");

    setTimeout(function() {
      $("body").removeClass("game-over");;
    }, 300);

    reset_game();

  }
}

function reset_game() {
  level = 0;
  game_pattern = [];
  game_started = false;
}
