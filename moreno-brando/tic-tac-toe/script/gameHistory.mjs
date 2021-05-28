import { gameBoardHistory} from "./game.mjs"

var showHistory = document.getElementById('show-game-history');
var previousButton = document.getElementById('previous');
var nextButton = document.getElementById('next');
var gameOverContainer = document.getElementById('result');

showHistory.onclick = showPreviousNextButtons;

function showPreviousNextButtons() {
    previousButton.classList.add('active-previous-next');
    nextButton.classList.add('active-previous-next', 'disabled');
}