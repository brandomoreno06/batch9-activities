//CREATE A ARRAY

let row1 = new Array(3);
let row2 = new Array(3);
let row3 = new Array(3);
let gameBoard = [row1, row2, row3];
let gameBoardHistory = [];

var gameBoardUI = document.getElementById('game-board');
var cell = document.getElementsByClassName('cell');



//CREATE DOM ELEMENTS WITH DATA ATTRIBUTE AS INDEX [i] and [j]OF "gameBoard"
for(const row of gameBoard) {
    for(let i = 0; i < row.length; i++) {
        let dataIndex = i;
        gameBoardUI.innerHTML += `<canvas data-row="${gameBoard.indexOf(row)}" data-index="${dataIndex}" class="cell"></canvas>`;
    }      
}



//START PLAYING FUNCTION. PLAYER1 STARTS.
import { player } from "./setup.mjs"
export default startPlaying;

function startPlaying() {

    gameBoardUI.addEventListener('click', currentPLayerMove);

    let currentPlayer = player.currentSymbol;

    //find the data attributes' value.(This will be assigned as index of gameBoard cells)
    function currentPLayerMove(e) {
        let i = e.target.attributes[0].value;  //date-row attribute
        let j = e.target.attributes[1].value; //date-index attribute

        if(gameBoard[i][j] === "x" || gameBoard[i][j] === "o") {
            return; //return if cell is filled
        }

        else {
            gameBoard[i][j] = currentPlayer;
            drawImage(e, currentPlayer);
            checkWinnerOrTie(currentPlayer);
         
            //change current player to opponent (vice versa)
            currentPlayer = currentPlayer == player.currentSymbol ? player.opponentSymbol : player.currentSymbol; 
            
        }   
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

function drawImage(e, currentPlayer) {
    let canvas = e.target.getContext("2d");
    let img = currentPlayer === "x" ? xImage : oImage;
    canvas.drawImage(img, drawImageOriginX, drawImageOriginY, cellSize, 100);
}




//CHECK IF CURRENT PLAYER IS WINNING 

function checkWinnerOrTie(currentSymbol) {
    let winningCombination = false;

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
            return element == currentSymbol;
        })
        
        filteredCombos.push(filterResult);
    }

    //check if any  of filteredCombos element has a length of 3 of the same symbol
    for (const filteredCombo of filteredCombos) {
        if(filteredCombo.length == 3) {
            console.log("There's a winner!")
            console.log(filteredCombos);
            console.log(filteredCombos.indexOf(filteredCombo))
            winningCombination = true;
        }
    }

    isTie(winningCombination);

}



//CHECK IF TIE - ALL ELEMENTS OF GAMEBOARD ARE FILLED AND THERE IS NO WINNER
function isTie(winningCombination) {
    let stringSymbol = "";
    
    //create a string of filled elements of gameBoard
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < 3; j++) {
            stringSymbol += `${gameBoard[i][j]}`;
            stringSymbol = stringSymbol.replace(/undefined/g, "")    
        }
    }
    
    if (stringSymbol.length == 9 && winningCombination == false) {
        console.log("It's a tie!")
    }
}

