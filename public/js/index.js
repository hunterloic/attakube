const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const nameInput = document.getElementById('nameInput');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);

let canvas, ctx;
let playerNumber;
let gameActive = false;

const socket = io();

socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('init', handleInit);
socket.on('gameStart', handleGameStart);

function newGame() {
  socket.emit('newGame');
}

function joinGame() {
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
}

function handleInit({ game, player }) {
  alert(JSON.stringify(game));

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

function handleGameCode(gameCode) {
  alert(gameCode);
}

function handleUnknownCode() {
  alert('Unknown Game Code')
}

function handleTooManyPlayers() {
  alert('This game is full');
}

function handleGameStart() {
  alert('game start!');
}