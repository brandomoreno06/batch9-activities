
var xButton = document.getElementById('x-button');
var oButton = document.getElementById('o-button');
var player1Symbol = document.getElementById('symbol-1');
var player2Symbol = document.getElementById('symbol-2');
var playSetupContainer = document.getElementById('play-setup-container');

var playButton = document.getElementById('play-button');
var gameBoardUI = document.getElementById('game-board');
var player1Side = document.getElementById('player1');
var player2Side = document.getElementById('player2')

var selectInstruction = document.getElementById('instruction-select');

//DECLARE A "PLAYER" OBJECT
let player = {};


//PLAYER 1 TO SELECT SYMBOL
function selectSymbolX() {
    player1Symbol.textContent = "x";
    player2Symbol.textContent = "o"
    xButton.classList.add('selected');
    oButton.classList.remove('selected')
    //remove classlist
    xButton.classList.remove('none-selected');
    oButton.classList.remove('none-selected');
    player.currentSymbol = "x";
    player.opponentSymbol = "o";
    
    
}

function selectSymbolO() {
    player1Symbol.textContent = "o";
    player2Symbol.textContent = "x"
    oButton.classList.add('selected');
    xButton.classList.remove('selected')
    //remove classlist
    xButton.classList.remove('none-selected');
    oButton.classList.remove('none-selected');

    player.currentSymbol = "o";
    player.opponentSymbol = "x";
}

xButton.onclick = selectSymbolX;
oButton.onclick = selectSymbolO;



//START PLAYING - DISPLAY THE GAMEBOARD

import startPLaying from "./game.mjs"

function showBoard() {
    if (player1Symbol.textContent === "" || player2Symbol.textContent === "") {
        xButton.classList.add('none-selected');
        oButton.classList.add('none-selected');
        selectInstruction.classList.add('none-selected');
        return;
    }

    else {
    playSetupContainer.classList.add('hide');
    gameBoardUI.classList.remove('hide');
    xButton.classList.remove('none-selected');
    oButton.classList.remove('none-selected');
    player1Side.classList.add('active-game-player1');
    player2Side.classList.add('active-game-player2');

    startPLaying();
    }
}

playButton.onclick = showBoard;

export { player, playSetupContainer, xButton, oButton }


