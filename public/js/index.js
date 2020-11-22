
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);

let canvas, ctx;
let playerNumber;
let gameActive = false;

const socket = io();

function newGame() {
  socket.emit('newGame');
  init();
}

function joinGame() {
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  init();
}

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  height = $("#gameScreen").height();
  width = (height) * (9/16);

  canvas.height = height;
  canvas.width = width;

  ctx.fillStyle =  '#231f20';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  gameActive = true;
}


socket.on("message", (message) => {
  alert("message:" + message);
});