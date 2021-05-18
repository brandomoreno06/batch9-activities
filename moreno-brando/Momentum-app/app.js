//Display Time
var timeNow = document.getElementById('time');
var dateNow = document.getElementById('date');
var greeting; //(For greeting, morning, afternoon, evening);

function displayTime() {
    var currentTime = new Date();
    var hourNow = currentTime.getHours();
    var minuteNow = currentTime.getMinutes();
    var h = hourNow > 12 ? hourNow % 12 : hourNow;
    var h = hourNow == 0 ? 12 : h //Added to correct 0:00+
    var m = minuteNow >= 10 ? minuteNow : "0" + minuteNow;
    var amPm = hourNow >= 12 ? ' PM' : ' AM'
    timeNow.innerHTML = h + ':' + m + amPm;

    return function amPmWhich() {
        if (hourNow < 12) {
            greeting = "Good Morning";
        }
        else if (hourNow > 12 && hourNow < 18) {
            greeting = "Good Afternoon";
        }
        else {
            greeting = "Good Evening"
        }

        
    }
}

window.onload = displayTime();
setInterval(displayTime, 60000);



// Upon entering name

var inputName = document.getElementById('name');
var inputButton = document.getElementById('input-button');

inputName.oninput = function () {
    if (inputName.checkValidity()) {
        inputButton.style.display = 'block';
        
        if(inputName.value == "") {
            inputButton.style.display = 'none';
        }
    }
}


//upon clicking continue after entering name
var homePage = document.getElementById('main-container');
var setUpPage = document.getElementById('set-up-page');
var greetings = document.getElementById('greetings');

function showMainContent() {
    homePage.style.display = 'grid';
    setUpPage.style.display = 'none';
    timeNow.className += ' time-transition';
    greetings.innerHTML = greeting + ", " + inputName.value //display entered name
    mainFocusContainer.classList.add('active-background');
}

inputButton.addEventListener('click', showMainContent);

inputName.addEventListener('keyup', e => {
   if (e.key === "Enter") {
       if(inputName.checkValidity() && inputName.value.trim(0).length > 0) {
            inputButton.click();
        } 
    }
})




//Main focus for today
var mainFocus = document.getElementById('mainfocus');
var mainFocusLabel = document.getElementById('main-focus-label');
var mainFocusButton = document.getElementById('button-main-focus');
var editButton = document.getElementById('edit-button');
var mainFocusContainer = document.getElementById('main-focus-container');
mainFocusContainer.classList.add('active-background'); //... to remove once input name is displayed.


function mainFocusFunction() {
    if (mainFocus.value.trim().length > 0) {
        mainFocusButton.style.display = 'block';
    }
    else {
        mainFocusButton.style.display = 'none';
    }
}

mainFocus.oninput = mainFocusFunction;
mainFocus.onfocus = mainFocusFunction; //show ok button after clicking edit;



mainFocusButton.onclick = function() {
    mainFocusLabel.innerHTML = '<h4>Main Focus Today</h4>';
    mainFocus.setAttribute('disabled', true);
    mainFocusButton.style.display = 'none';
    editButton.style.display = 'block';
}

mainFocus.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        if(mainFocus.value.trim(0).length > 0) {
             mainFocusButton.click();
         } 
     }
})



mainFocusContainer.onmouseover = function () {
    mainFocusContainer.classList.add('active-background');

    if (mainFocus.disabled === true) {
        editButton.style.display = 'block';
    }
    else {
        editButton.style.display = 'none'; 
    }
}

mainFocusContainer.onmouseout = function () {
    editButton.style.display = 'none';
    mainFocusContainer.classList.remove('active-background');
}



editButton.onclick = function () {
    mainFocusLabel.innerHTML = '<h4>What is your main focus for today?</h4>';
    mainFocus.removeAttribute('disabled');
    mainFocus.focus();
}


//Quote Modal - Open and Close

var quoteCloseButton = document.getElementById('close-button');
var quoteModal = document.getElementById("add-quote-modal");
var plusButtonQuote = document.getElementById('plus-quote')
var inputContainerModal = document.getElementById('add-quote-container');


function closeQuoteModal() {
    quoteModal.classList.remove('active');
}

function openQuoteModal() {
    quoteModal.classList.add('active');
}

quoteCloseButton.onclick = closeQuoteModal;
plusButtonQuote.onclick = openQuoteModal;

window.onclick =  function(e){
    if (quoteModal.classList.contains('active')){
        if(e.target == quoteModal) {
            quoteModal.classList.remove('active')
        }
    }
}

quoteModal.addEventListener('keyup', function(e) {
    if(e.key === "esc") {
        quoteCloseButton.click();
    }
})

//Add New Quote Container

const quote1 = "One way to keep momentum going is to have constantly greater goals.";

const quote2 = "Your chances of success are directly proportional to the degree of pleasure you desire from what you do. If you are in a job you hate, face the fact squarely and get out.";

const quote3 = "Success isn't measured by money or power or social rank. Success is measured by your discipline and inner peace.";

let quotes = [quote1, quote2, quote3];

var addButton = document.getElementById('add-button');
var clearButton = document.getElementById('clear-button');
var inputQuote = document.getElementById('input-quote');
var displayedQuoteContainer = document.getElementById('quotes-display-container');
var addedNotification = document.getElementById('added-notification');


function addQuote() {
    if (inputQuote.value.trim().length > 0) {
    quotes.push(inputQuote.value);
    var newAddedQuote = document.createElement('div');
    newAddedQuote.innerHTML = inputQuote.value;
    quotesList.appendChild(newAddedQuote);
    inputQuote.value = "";

    addedNotification.classList.add('active-notification');
    setTimeout(function(){ 
        addedNotification.classList.remove('active-notification')
    },2000)
    }
    else {
        return;
    }
}

function clearInput() {
    inputQuote.value = "";
}

inputQuote.addEventListener('keyup', function(e) {
    if(e.key === "Enter") {
        addButton.click();
    }
})


clearButton.onclick = clearInput;
addButton.onclick = addQuote;



//Quotes' list
var quotesList = document.getElementById('quotes-list');

function addQuoteInList() {
for (let i = 0; i < quotes.length; i++) {
    var newQuote = document.createElement('div');
    newQuote.innerHTML = quotes[i] + "<span class=remove>&times</span>";
    quotesList.appendChild(newQuote);
}}
addQuoteInList();



//Display random quote


function randomQuote() {
    let iRandom;
    iRandom = Math.floor((quotes.length * Math.random()));
    displayedQuoteContainer.innerHTML = '" ' + quotes[iRandom] + ' "';
}
randomQuote();
setInterval(randomQuote, 10000);

