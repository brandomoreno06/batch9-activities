import { gameBoardUI, gameBoard, xImage, oImage } from "./game.mjs"
export { previousButton, nextButton, gameOverDisplay, showGameOver }



//SAVE HISTORY - CREATE A STORAGE FOR EACH INSTANCE OF "gameBoard" ARRAY;

let gameBoardHistory = [];
let index; //index of gameBoardHistory - call in showGameBoardHistory function

export const saveHistory =  function () {
    let copyOfGameBoard = JSON.parse(JSON.stringify(gameBoard)); // DEEP CLONE gameBoard;
    // let copyOfGameBoard = [];
    // for(let i = 0; i < rows; i++) {
    //     let newRowArray = gameBoard.slice(i, i + 1);
    //     copyOfGameBoard.push(newRowArray);
    // }
    gameBoardHistory.push(copyOfGameBoard);
    index = gameBoardHistory.length;
    console.log(gameBoardHistory);
}



var showGameOver = document.getElementById('show-game-history');
var previousButton = document.getElementById('previous');
var nextButton = document.getElementById('next');
var gameOverDisplay = document.getElementById('game-over-display');

showGameOver.onclick = showPreviousNextButtons;
previousButton.onclick = showPreviousMove;
nextButton.onclick = showNextMove;



function showPreviousNextButtons() {
    var restartButton = document.getElementById('restart-button');
    restartButton.classList.add('active-history');
    restartButton.innerHTML = "&#128472;";

    previousButton.classList.add('active-previous-next');
    nextButton.classList.add('active-previous-next', 'disabled');
    showGameOver.classList.add('hide');
}


function showPreviousMove() {
    nextButton.classList.remove('disabled');
    gameOverDisplay.classList.add('hide');

    if(index === 0) {
        return
    }

    index --;
    showGameBoardHistory();
    
}


function showNextMove() {
    if(index === (gameBoardHistory.length - 1)) {
        return
    }

    //get the next element in gameBoardHistory
    index ++; 
    showGameBoardHistory();
    
}



function showGameBoardHistory() {
    //show gameBoard UI
    gameBoardUI.classList.remove('hide');
    
    //clear all drawn image on each cell
    let cell = gameBoardUI.querySelectorAll(".cell");
    cell.forEach(element => {
        element.getContext("2d").clearRect(0, 0, 600, 600);
    });

    //draw image on each cell showing gamaBoard History Data
    let id = 0;
    for(let i = 0; i < gameBoard.length; i++) {
        for(let j = 0; j < gameBoard.length; j++) {
            let cellSize = 200;
            
            //draw an image if "x" or "o" is present in gamehistory array;
            if (gameBoardHistory[index][i][j]  === "x" || gameBoardHistory[index][i][j]  === "o") {
                let img = gameBoardHistory[index][i][j] === "x" ? xImage : oImage;
                cell[id].getContext("2d").drawImage(img, 50, 25, cellSize, cellSize / 2);
            }
            
            id++
        }
    }
}

