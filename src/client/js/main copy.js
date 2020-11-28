/*
const getBoard = (canvas) => {
  const ctx = canvas.getContext('2d');

  const drawGrid = () => {
    const height = $("#gameScreen").height();
    const width = (height) * (9/16);
  
    canvas.height = height;
    canvas.width = width;

    drawCell();
  
    ctx.fillStyle =  '#231f20';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  const drawCell = (image) => {
    if(!image) {
      let image = new Image();
      image.src = './img/cell.png';
      drawCell(image);
      return;
    }

    if(!image.complete) {
      setTimeout( () => {
        drawCell(image);
      }, 50)
      return;
    }
    ctx.drawImage(image, 20, 20, 50, 50);
  }

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderBoard = (board = []) => {
  };

  const reset = (board) => {
    clear();
    drawGrid();
    renderBoard(board)
  };
  
  return { reset };
}

*/
import * as THREE from '/build/three.module.js';

function init() {
 
    const gameScreen = document.getElementById('gameScreen');

    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
 
    const scene = new THREE.Scene();
 
    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();
 
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
 
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    gameScreen.appendChild( renderer.domElement );
 
}

(() => {


    //const canvas = document.getElementById('canvas');
    const newGameBtn = document.getElementById('newGameButton');
    const joinGameBtn = document.getElementById('joinGameButton');
    const gameCodeInput = document.getElementById('gameCodeInput');
    //const board = getBoard(canvas);
    
    const socket = io();
  
    socket.on('gameCode', handleGameCode);
    socket.on('unknownCode', handleUnknownCode);
    socket.on('tooManyPlayers', handleTooManyPlayers);
    socket.on('gameStart', handleGameStart);
    socket.on('displayBoard', handleDisplayBoard);
    socket.on('initGame', handleInitGame);
  
    newGameBtn.addEventListener('click', () => socket.emit('newGame'));
    joinGameBtn.addEventListener('click', () => { socket.emit('joinGame', gameCodeInput.value) });
  
    newGameBtn.click();

    function handleInitGame({ game, player }) {
      //alert(JSON.stringify(game));
  
      const initialScreen = document.getElementById('initialScreen');
      const gameScreen = document.getElementById('gameScreen');
  
      initialScreen.style.display = "none";
      gameScreen.style.display = "block";

      init();
  
      //board.reset();
    }
  
    function handleDisplayBoard({ game, player }) {
      //board.reset();
    }
  
    function handleGameCode(gameCode) {
      //alert(gameCode);
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

})();