import { gameBoardUI, gameBoard, xImage, oImage } from "./game.mjs"


//SAVE HISTORY - CREATE A STORAGE FOR EACH INSTANCE OF "gameBoard" ARRAY;

let gameBoardHistory = [];
let index; //index of gameBoardHistory - call in showGameBoardHistory function


//clear gameBoardHistoryHistory on Restart
const clearGameBoardHistory = function() {
    gameBoardHistory = [];
}

//save the gameBoard Array for each move
const saveHistory =  function () {
    let copyOfGameBoard = JSON.parse(JSON.stringify(gameBoard)); // DEEP CLONE gameBoard;
    gameBoardHistory.push(copyOfGameBoard);
    index = gameBoardHistory.length;
    console.log(gameBoardHistory)
}



var showGameOver = document.getElementById('show-game-history');
var previousButton = document.getElementById('previous');
var nextButton = document.getElementById('next');
var gameOverDisplay = document.getElementById('game-over-display');


//Buttons event listeners
showGameOver.onclick = showPreviousNextButtons;
previousButton.onclick = showPreviousMove;
nextButton.onclick = showNextMove;


//show the previous and next buttons when game is over, and "history button is clicked"
function showPreviousNextButtons() {
    var restartButton = document.getElementById('restart-button');
    restartButton.classList.add('active-history');
    restartButton.innerHTML = "&#128472;";

    previousButton.classList.remove('disabled');
    previousButton.classList.add('active-previous-next');
    nextButton.classList.add('active-previous-next', 'disabled');
    showGameOver.classList.add('hide');
}


//show on board the corresponding "x" or "o" image of each respective gameBoard data with the specific index on the saved history array
function showPreviousMove() {
    nextButton.classList.remove('disabled');
    gameOverDisplay.classList.add('hide');
    previousButton.classList.remove('disabled');

    if(index === 0) {
        previousButton.classList.add('disabled');
        return
    }

    //get the previous element in gameBoardHistory
    index --;
    showGameBoardHistory();
    
}

//show on board the corresponding "x" or "o" image of each respective gameBoard data with the specific index on the saved history array
function showNextMove() {
    if(index === (gameBoardHistory.length - 1)) {
        gameOverDisplay.classList.remove('hide');
        gameBoardUI.classList.add('hide');
        nextButton.classList.add('disabled');
        previousButton.classList.remove('disabled');
        index = gameBoardHistory.length;
        return;
    }
    if (index === gameBoardHistory.length) return;

    //get the next element in gameBoardHistory
    index ++; 
    showGameBoardHistory();
    
}


//Draw the actual image ("x" or "o" on the board)
function showGameBoardHistory() {
    gameBoardUI.classList.remove('hide');  //show gameBoard UI
    
    let cell = gameBoardUI.querySelectorAll(".cell");
    let id = 0; //id of cell (canvas)

    cell.forEach(element => {
        element.getContext("2d").clearRect(0, 0, 600, 600);
        element.classList.add('marked');
    }); //clear all drawn image on each cell

    
    //draw image on each cell showing gamaBoard History Data
    for(let i = 0; i < gameBoard.length; i++) {
        for(let j = 0; j < gameBoard.length; j++) {
            let cellSize = 200;
            
            //draw an image if "x" or "o" is present in gamehistory array;
            if (gameBoardHistory[index][i][j]  === "x" || gameBoardHistory[index][i][j]  === "o") {
                let img = gameBoardHistory[index][i][j] === "x" ? xImage : oImage;
                cell[id].getContext("2d").drawImage(img, 50, 25, cellSize, cellSize / 2);
            }
            
            id++;
        }
    }
}



export { previousButton, nextButton, gameOverDisplay, showGameOver, clearGameBoardHistory, gameBoardHistory, saveHistory }

