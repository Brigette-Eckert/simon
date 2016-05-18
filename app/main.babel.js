// Configuration
let count = 0;
let simonMoves = []; 
let playerMoves = [];
let strict = false;
let currentTurn;
let playBack;
const winTurn = 20;
const board = ["green", "red", "yellow", "blue"];
const audio = [ 
  new Audio("/sounds/simonSound1.mp3"), 
  new Audio("/sounds/simonSound2.mp3"), 
  new Audio("/sounds/simonSound3.mp3"), 
  new Audio("/sounds/simonSound4.mp3"), 
  new Audio("/sounds/buzzer.mp3"), 
  new Audio("/sounds/victory.mp3")
];


let flash = (color) => {
  audio[board.indexOf(color)].play();
  $("#" + color).toggleClass('lightup');
  setTimeout(function(){
    $("#" + color).toggleClass('lightup');
  }, 1000);
}

let initialize = () => {
  count = 0; 
  simonMoves = [];
  playerMoves = [];
  currentTurn = "Simon";
  clearInterval(playBack);
  $(".count").html(count);
  console.log("game reset");
};

let start = () => {
  initialize();
  turn();
};


let toggleStrict =() => {
  if(strict) strict = false;
  else strict = true;
  console.log("Strict Mode: " + strict);
  start();
};

let turn = () => {
  count ++;
  $(".count").html(count);
  let simonColor = board[Math.floor(Math.random() * 4)];
  simonMoves.push(simonColor);
  simonPlay();
};

let simonPlay = () => {
  playerMoves = [];
  currentTurn = "Simon";
  // Make a copy so it doesn't mutate
  let colors = simonMoves.slice();
  //takes a color from the front of the array and flashes it.
  playBack = setInterval(function(){
    let color = colors.shift();
    flash(color);
    if(colors.length === 0) {
      clearInterval(playBack);
      currentTurn = "Player";
    }
  }, 1200);
}

let playerPlay = (color) => {
  playerMoves.push(color);
  flash(color);
  // Check for matches
  let match = color === simonMoves[playerMoves.length - 1];
  if(!match) {
    audio[4].play();
    if(!strict) return simonPlay();
    if(strict) return start();
  } else if(playerMoves.length === simonMoves.length) {
    if(playerMoves.length == winTurn) return win();
    turn();
  }
}

let win = () => {
  $("#victory").html("Congratulations, You Win!");
  audio[5].play();
  StartConfetti();
  setTimeout(function(){
    $("#victory").html("");
    StopConfetti();
    start();
  }, 4500);
};

$('#game').on('click', '.game-btn', function(e) {
  if(currentTurn != "Player") return;
  let color = e.target.getAttribute("id");
  playerPlay(color);
});

$(".slider").click(function(){
    toggleStrict();
});

$("#start-btn").click(function() {
  start();
});

$("#reset-btn").click(function() {
  initialize();
});
