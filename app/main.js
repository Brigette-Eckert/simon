"use strict";

// Configuration
var count = 20;
var simonMoves = [];
var playerMoves = [];
var strict = false;
var currentTurn = void 0;
var playBack = void 0;
var winTurn = 3;
var board = ["green", "red", "yellow", "blue"];
var audio = [new Audio("/sounds/simonSound1.mp3"), new Audio("/sounds/simonSound2.mp3"), new Audio("/sounds/simonSound3.mp3"), new Audio("/sounds/simonSound4.mp3"), new Audio("/sounds/buzzer.mp3"), new Audio("/sounds/victory.mp3")];

var flash = function flash(color) {
  audio[board.indexOf(color)].play();
  $("#" + color).toggleClass('lightup');
  setTimeout(function () {
    $("#" + color).toggleClass('lightup');
  }, 1000);
};

var initialize = function initialize() {
  count = 0;
  simonMoves = [];
  playerMoves = [];
  currentTurn = "Simon";
  clearInterval(playBack);
  $(".count").html(count);
  console.log("game reset");
};

var start = function start() {
  initialize();
  turn();
};

var toggleStrict = function toggleStrict() {
  if (strict) strict = false;else strict = true;
  console.log("Strict Mode: " + strict);
  start();
};

var turn = function turn() {
  count++;
  $(".count").html(count);
  var simonColor = board[Math.floor(Math.random() * 4)];
  simonMoves.push(simonColor);
  simonPlay();
};

var simonPlay = function simonPlay() {
  playerMoves = [];
  currentTurn = "Simon";
  // Make a copy so it doesn't mutate
  var colors = simonMoves.slice();
  //takes a color from the front of the array and flashes it.
  playBack = setInterval(function () {
    var color = colors.shift();
    flash(color);
    if (colors.length === 0) {
      clearInterval(playBack);
      currentTurn = "Player";
    }
  }, 1200);
};

var playerPlay = function playerPlay(color) {
  playerMoves.push(color);
  flash(color);
  // Check for matches
  var match = color === simonMoves[playerMoves.length - 1];
  if (!match) {
    audio[4].play();
    if (!strict) return simonPlay();
    if (strict) return start();
  } else if (playerMoves.length === simonMoves.length) {
    if (playerMoves.length == winTurn) return win();
    turn();
  }
};

var win = function win() {
  $("#victory").html("Congratulations, You Win!");
  audio[5].play();
  StartConfetti();
  setTimeout(function () {
    $("#victory").html("");
    StopConfetti();
    start();
  }, 4500);
};

$('#game').on('click', '.game-btn', function (e) {
  if (currentTurn != "Player") return;
  var color = e.target.getAttribute("id");
  playerPlay(color);
});

$(".slider").click(function () {
  toggleStrict();
});

$("#start-btn").click(function () {
  start();
});

$("#reset-btn").click(function () {
  initialize();
});