//CREATE A ARRAY

let row1 = new Array(3);
let row2 = new Array(3);
let row3 = new Array(3);
let gameBoard = [row1, row2, row3];
let gameBoardHistory = [];

var gameBoardUI = document.getElementById('game-board');
var cell = document.getElementsByClassName('cell');


//CREATE DOM ELEMENTS WITH DATA ATTRIBUTE AS INDEX [i] and [j]OF "gameBoard"
function createGameBoard() {
    for(const row of gameBoard) {
        for(let i = 0; i < row.length; i++) {
            let dataIndex = i;
            gameBoardUI.innerHTML += `<canvas data-row="${gameBoard.indexOf(row)}" data-index="${dataIndex}" class="cell"></canvas>`;
        } 
    }     
}

createGameBoard();


//START PLAYING FUNCTION. PLAYER1 STARTS.
import { player, playSetupContainer, xButton, oButton } from "./setup.mjs"
export default startPlaying;

let winner = false;
let tie = false;
let currentPlayer;


//CALLED ON "showBoard" function
function startPlaying() {
    gameBoardUI.addEventListener('click', currentPLayerMove);
    currentPlayer = player.currentSymbol;
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
        gameBoard[i][j] = currentPlayer;
        drawImage(e);
        checkWinner();
        isTie();
        setTimeout(showGameResult, 1000);
        // showGameResult();
        
        //change current player to opponent (vice versa)
        currentPlayer = currentPlayer == player.currentSymbol ? player.opponentSymbol : player.currentSymbol;     
    }   
}




//DRAW X or O on BOARD
const xImage = new Image ();
xImage.src = 'assets/x-png.png';

const oImage = new Image ();
oImage.src = 'assets/o-png.png';

let cellSize = 200;
let drawImageOriginY = 25;
let drawImageOriginX = 50;

function drawImage(e) {
    let canvas = e.target.getContext("2d");
    let img = currentPlayer === "x" ? xImage : oImage;
    canvas.drawImage(img, drawImageOriginX, drawImageOriginY, cellSize, 100);
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


    //filter the each element of combos and push the result to "filteredCombos"
    let filteredCombos = [];

    for (let combo of combos) {
        let filterResult = combo.filter((element) => {
            return element == currentPlayer;
        })
        
        filteredCombos.push(filterResult);
    }

    //check if any  of filteredCombos element has a length of 3 of the same symbol
    for (const filteredCombo of filteredCombos) {
        if(filteredCombo.length == 3) {
            // console.log(filteredCombos);
            // console.log(filteredCombos.indexOf(filteredCombo))
            winner = true;
        }
    }
}



//CHECK IF TIE - ALL ELEMENTS OF GAMEBOARD ARE FILLED AND THERE IS NO WINNER
function isTie() {

    let stringSymbol = "";
    
    //create a string of filled elements of gameBoard
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < 3; j++) {
            stringSymbol += `${gameBoard[i][j]}`;
            stringSymbol = stringSymbol.replace(/undefined/g, "")    
        }
    }
    
    if (stringSymbol.length == 9 && !winner) {
        console.log("It's a tie!")
        tie = true;
    }
}


function showGameResult() {
        
    var resultContainer = document.getElementById('result');
    var resultWinner = document.getElementById('result-message-winner');
    var resultTie = document.getElementById('result-message-tie');
    var resultWinnerSymbol = document.getElementById('winner').getContext("2d");


    if (winner) {
        gameBoardUI.classList.add('hide');
        resultContainer.classList.add('active-container');
        resultWinner.classList.add('active-result');

        let img = currentPlayer === "x" ? oImage : xImage;
        resultWinnerSymbol.drawImage(img, 80, 0, 150, 150)     
    }

    if (tie) {
        gameBoardUI.classList.add('hide')
        resultContainer.classList.add('active-container');
        resultTie.classList.add('active-result');
        ;
    }

    //RESTART GAME
    var restartButton = document.getElementById('restart-button');
    
    function restartGame() {
        resultContainer.classList.remove('active-container');
        resultWinner.classList.remove('active-result');
        resultTie.classList.remove('active-result');
        playSetupContainer.classList.remove('hide');
        xButton.classList.remove('selected');
        oButton.classList.remove('selected');
        location.reload()
    }

    restartButton.onclick = restartGame;
}