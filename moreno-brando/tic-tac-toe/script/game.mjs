//CREATE GAMEBOARD ARRAY (DATA)
const rows = 3;
const cols = 3
export let gameBoard = [];

function createGameBoardArray () {
    for (let i = 0; i < rows; i++) {
        gameBoard[i] = new Array(cols);
    }
}
createGameBoardArray();



//CREATE DOM ELEMENTS WITH DATA ATTRIBUTE AS INDEX [i] and [j]OF "gameBoard"
export var gameBoardUI = document.getElementById('game-board');

function createGameBoardDOM() {
    for(const row of gameBoard) {
        for(let i = 0; i < row.length; i++) {
            gameBoardUI.innerHTML += `<canvas data-row="${gameBoard.indexOf(row)}" data-index="${i}" class="cell"></canvas>`;
        } 
    }     
}
createGameBoardDOM();



//START PLAYING FUNCTION. PLAYER1 STARTS.

import { player, playSetupContainer, xButton, oButton, player1Side, player2Side, player1Symbol, player2Symbol } from "./setup.mjs"
import { saveHistory } from "./gameHistory.mjs"
export default startPlaying;

let winner = false;
let tie = false;
let currentPlayer;


//CALLED ON "showBoard" function
function startPlaying() {
    gameBoardUI.addEventListener('click', currentPLayerMove);
    currentPlayer = player;
}


//GET THE DATA ATTRIBUTES' VALUE (This will be assigned as index of gameBoard cells)
function currentPLayerMove(e) {
    let i = e.target.getAttribute('data-row');  //date-row attribute
    let j = e.target.getAttribute('data-index'); //date-index attribute

    if(gameBoard[i][j] === "x" || gameBoard[i][j] === "o") {
        return; //return if cell is filled
    }

    if(winner) {
        return;
    }

    else {
        e.target.classList.add('marked');
        gameBoard[i][j] = currentPlayer;
        drawImage(e);
        checkWinner();
        isTie();
        showPlayerTurn(e);
        setTimeout(showGameResult, 500);
        saveHistory();
        
        //change current player to opponent (vice versa)
        currentPlayer = currentPlayer === "x" ? "o" : "x"; 
    }
}




//DRAW X or O on BOARD
let cellSize = 200;
let drawImageOriginY = 25;
let drawImageOriginX = 50;

export const xImage = new Image ();
xImage.src = 'assets/x-png.png';

export const oImage = new Image ();
oImage.src = 'assets/o-png.png';

function drawImage(e) {
    let canvas = e.target.getContext("2d");
    let img = currentPlayer === "x" ? xImage : oImage;
    canvas.drawImage(img, drawImageOriginX, drawImageOriginY, cellSize, cellSize / 2);
}




//CHECK IF CURRENT PLAYER IS WINNING 

function checkWinner() {
    let x = [...gameBoard]; //to shorthand typing of "gameboard"

    let combo1 = [x[0][0], x[0][1], x[0][2]] //Horizontal
    let combo2 = [x[1][0], x[1][1], x[1][2]] //Horizontal
    let combo3 = [x[2][0], x[2][1], x[2][2]] //Horizontal
    let combo4 = [x[0][0], x[1][0], x[2][0]] //Vertical
    let combo5 = [x[0][1], x[1][1], x[2][1]] //Vertical
    let combo6 = [x[0][2], x[1][2], x[2][2]] //Vertical
    let combo7 = [x[0][0], x[1][1], x[2][2]] //Diagonal
    let combo8 = [x[0][2], x[1][1], x[2][0]] //Diagonal

    let combos = [combo1, combo2, combo3, combo4, combo5, combo6, combo7, combo8]

    let filteredCombos = [];
    let filterResult;
    let indexOfCombo;


    //filter the each element of combos and push the result to "filteredCombos" - expected; length = combos.length;
    for (let combo of combos) {
        filterResult = combo.filter((element) => {
            return element == currentPlayer; //each instance of "x" or "o"
        })   
        filteredCombos.push(filterResult);
    }


    //check if any  of filteredCombos element has a length of 3 of the same symbol
    for (const filteredCombo of filteredCombos) {
        if(filteredCombo.length == rows) {
            indexOfCombo = filteredCombos.indexOf(filteredCombo);
            console.log(indexOfCombo);
            winner = true;
        }
    }
    console.log(filterResult)
    console.log(filteredCombos)
}



//CHECK IF TIE - ALL ELEMENTS OF GAMEBOARD ARE FILLED AND THERE IS NO WINNER
function isTie() {

    let stringSymbol = "";
    
    //create a string of filled elements of gameBoard
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < cols; j++) {
            stringSymbol += `${gameBoard[i][j]}`;
            stringSymbol = stringSymbol.replace(/undefined/g, "")    
        }
    }
    
    //check if string length is equal to number of cells
    if (stringSymbol.length == rows ** 2 && !winner) {
        tie = true;
    }
}



//SHOW GAME RESULT UPON WINNING OR TIE
import { gameOverDisplay, previousButton, nextButton, showGameOver, clearGameBoardHistory } from "./gameHistory.mjs"


function showGameResult() {
        
    var resultContainer = document.getElementById('result');
    var resultWinner = document.getElementById('result-message-winner');
    var resultTie = document.getElementById('result-message-tie');
    var resultWinnerSymbol = document.getElementById('winner').getContext("2d");

    //when player wins
    if (winner) {
        gameBoardUI.classList.add('hide');
        resultContainer.classList.add('active-container');
        resultWinner.classList.add('active-result');

        let img = currentPlayer === "x" ? oImage : xImage;
        resultWinnerSymbol.drawImage(img, 80, 0, 150, 150);
        
        //REMOVE PLAYER TURN CLASSLIST
        player1Side.classList.remove('player-turn');
        player2Side.classList.remove('player-turn');
    }

    //when tie
    if (tie) {
        gameBoardUI.classList.add('hide')
        resultContainer.classList.add('active-container');
        resultTie.classList.add('active-result');
        
        //REMOVE PLAYER TURN CLASSLIST
        player1Side.classList.remove('player-turn');
        player2Side.classList.remove('player-turn');
    }


    //RESTART GAME
    var restartButton = document.getElementById('restart-button');
    
    function restartGame() {
        winner = false;
        tie = false;

        //clear drawn image displayed on gameOver
        resultWinnerSymbol.clearRect(80, 0, 150, 150);

        //hide/modify display of elements in result containers
        resultContainer.classList.remove('active-container');
        resultWinner.classList.remove('active-result');
        resultTie.classList.remove('active-result');
        previousButton.classList.remove('active-previous-next');
        nextButton.classList.remove('active-previous-next', 'disabled');
        restartButton.classList.remove('active-history');
        restartButton.innerHTML = "Restart";
        showGameOver.classList.remove('hide');

        //modify display on setup container
        playSetupContainer.classList.remove('hide');
        gameOverDisplay.classList.remove('hide');
        xButton.classList.remove('selected');
        oButton.classList.remove('selected');
        player1Symbol.textContent = "" ;
        player2Symbol.textContent = "" ;

        //clear gameboard current status, and history array; create gameboard UI;
        clearGameBoardHistory();
        gameBoardUI.classList.add('hide')
        gameBoardUI.innerHTML = "";
        gameBoard = [];
        createGameBoardArray();
        createGameBoardDOM();
        startPlaying();

        // location.reload();
    }

    restartButton.onclick = restartGame;

}

//Highlight whose turn is it
function showPlayerTurn() {
    player1Side.classList.toggle('player-turn');
    player2Side.classList.toggle('player-turn');
}
