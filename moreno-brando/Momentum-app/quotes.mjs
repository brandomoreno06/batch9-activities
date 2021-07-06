//Quote Modal - Open and Close

var quoteCloseButton = document.getElementById('close-button');
var quoteModal = document.getElementById("add-quote-modal");
var plusButtonQuote = document.getElementById('plus-quote')
var inputContainerModal = document.getElementById('add-quote-container');


//Open or Close Quotes Modal
function closeQuoteModal() {
    quoteModal.classList.remove('active');
}

function openQuoteModal() {
    quoteModal.classList.add('active');
}

//Event listeners for quote modal
quoteCloseButton.onclick = closeQuoteModal;
plusButtonQuote.onclick = openQuoteModal;
window.onclick =  function(e){
    if (quoteModal.classList.contains('active')){
        if(e.target == quoteModal) {
            quoteModal.classList.remove('active')
        }
    }
}
window.addEventListener('keyup', function(e) {
    if(e.key === "Escape") {
        if (quoteModal.classList.contains('active')) {
            quoteModal.classList.remove('active')
        }
    }      
})



//Add New Quote Container (Modal)

const quote1 = "One way to keep momentum going is to have constantly greater goals.";
const quote2 = "Your chances of success are directly proportional to the degree of pleasure you desire from what you do. If you are in a job you hate, face the fact squarely and get out.";
const quote3 = "Success isn't measured by money or power or social rank. Success is measured by your discipline and inner peace.";


var addButton = document.getElementById('add-button');
var clearButton = document.getElementById('clear-button');
var inputQuote = document.getElementById('input-quote');
var displayedQuoteContainer = document.getElementById('quotes-display-container');
var addedNotification = document.getElementById('added-notification');
var quotesListContainer = document.getElementById('quotes-list');


//Show Added Quotes (method to display input quote)
function showQuote(quoteContent) {
    var newQuoteList = document.createElement('div');

    var newQuote = document.createElement('span');
    newQuote.textContent = quoteContent;
    newQuote.classList.add('quote-item');

    var removeQuote = document.createElement('span');
    removeQuote.innerHTML = '&times';
    removeQuote.classList.add('remove');

    var editQuote = document.createElement('span');
    editQuote.innerHTML = '&#9998;';
    editQuote.classList.add('edit-quote');

    quotesListContainer.appendChild(newQuoteList);
    newQuoteList.appendChild(newQuote);
    newQuoteList.appendChild(editQuote);
    newQuoteList.appendChild(removeQuote);

    inputQuote.value = "";


    //add event listener for each quote - REMOVE FUNCTION
    removeQuote.addEventListener('click', function() {
        this.parentElement.classList.add('deleted-quote-div');
        var deletedQuote  = document.querySelector(".deleted-quote-div .quote-item"); //find the child textContent/quote of the "deleted-quote-div" parent.
        let i = quotes.indexOf(deletedQuote.textContent); //find index of deletedQuote on the exisiting quote array;
        quotes.splice(i, 1); //remove the quote from array
        saveQuotes();
        this.parentElement.remove(); //remove from DOM
    })


    //add event listener for each quote - EDIT FUNCTION
    editQuote.addEventListener('click', function() {
        //remove "edited class" for non-selected edit buttons (other items in the list)
        var editedClassAll = document.querySelectorAll('.edited');
        editedClassAll.forEach(function(element) {
            element.classList.remove('edited');
        })

        // add "edited class to current on click element"
        var textSpan = this.previousElementSibling;
        textSpan.classList.add('edited');
        inputQuote.value = textSpan.textContent;
        addButton.disabled = true;

        //index of the quote from the stored array of quotes
        let i = quotes.indexOf(textSpan.textContent);
        
        function editQuote(e) {
            if(e.key === "Enter" && textSpan.classList.contains('edited')) {
                quotes[i] =  inputQuote.value.trim(); //reassign value
                saveQuotes();
                textSpan.textContent = inputQuote.value;
                textSpan.classList.remove('edited');
                inputQuote.value = "";
                addButton.disabled = false;

            }
        }

        inputQuote.addEventListener("keyup", editQuote)
    })


}


//Save and get new Quotes list to/from the local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes))
}

function getQuotes() {
    quotes = JSON.parse(localStorage.getItem("quotes"));

    if (!quotes || quotes.length < 3) {
        quotes = [quote1, quote2, quote3];
    }
}


//Add new quote, display on interface, and push to quotes array
let quotes = [quote1, quote2, quote3];
function addNewQuote() {
    if(inputQuote.value.trim().length > 0 ) {
        quotes.push(inputQuote.value); //push to existing  array
        showQuote(inputQuote.value); //display on DOM
        saveQuotes(); //save to local storage the mutated quote array
    }

    addedNotification.classList.toggle('active-notification');
    //show notification when added new quote
    setTimeout(function() { 
        addedNotification.classList.remove('active-notification');
    }, 2000)
}


//show saved quotes from the local storage to the interface upon windows' load
function displayQuotesInitial() {
    getQuotes(); //get value if any quotes are stored
    for(let i = 0; i < quotes.length; i++) {
        showQuote(quotes[i]);
    }
}
displayQuotesInitial();  //display saved quotes onload


//Event listeners for (Input quote)
function clearInput() {
    inputQuote.value = "";
}

clearButton.onclick = clearInput;
addButton.onclick = addNewQuote;
inputQuote.addEventListener('keyup', function(e) {
    if(e.key === "Enter") {
        addButton.click();
    }
})


//Display random quote
function randomQuote() {
    let iRandom;
    iRandom = Math.floor((quotes.length * Math.random()));
    displayedQuoteContainer.innerHTML = '" ' + quotes[iRandom] + ' "';
}

randomQuote();
setInterval(randomQuote, 10000);