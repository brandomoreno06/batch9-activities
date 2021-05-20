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
        else if (hourNow >= 12 && hourNow < 18) {
            greeting = "Good Afternoon";
        }
        else {
            greeting = "Good Evening"
        }       
        
        if (displayName != null) {
            displayGreeting();
        }

        if (mainFocus.value.length > 0) {
            displayMainFocus();
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
var displayName;



function setUpName() {
    displayName = inputName.value;
    localStorage.setItem("username", displayName); //save name in local storage
    displayGreeting();
    if (mainFocus.value.length > 0)
    displayMainFocus();

}


//Event listeners on setUpName in setUpPage
inputButton.addEventListener('click', setUpName);

inputName.addEventListener('keyup', e => {
   if (e.key === "Enter") {
       if(inputName.checkValidity() && inputName.value.trim(0).length > 0) {
            inputButton.click();
        } 
    }
})


function getName() {
    displayName = localStorage.getItem("username");
}
getName();


function displayGreeting() {
    homePage.style.display = 'grid';
    setUpPage.style.display = 'none';
    timeNow.className += ' time-transition';
    greetings.innerHTML = greeting + ", " + displayName + "<span id='edit-name'>&#9998;</span>"; 

    var editName = document.getElementById('edit-name');
        editName.addEventListener('click', function() {
        localStorage.removeItem("username");
        location.reload();
    })
}


//"Main focus for today" -  SECTION
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



//Display mainfocus with entered input
function displayMainFocus() {
    if(mainFocus.value !== null || mainFocus.value !== "") {
        mainFocusLabel.innerHTML = '<h4>Main Focus Today</h4>';
        mainFocus.setAttribute('disabled', true);
        mainFocusButton.style.display = 'none';
        mainFocusContainer.classList.remove('active-background');
        localStorage.setItem("mainfocus", mainFocus.value);//store value in local storage
    }
}

//get value from local storage
function getMainFocus() {
    mainFocus.value = localStorage.getItem("mainfocus");
}
getMainFocus(); //call to get saved mainFocus.value on load;

//onclick of OK button after entering input
mainFocusButton.onclick = displayMainFocus;

mainFocus.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        if(mainFocus.value.trim(0).length > 0) {
             mainFocusButton.click();
         } 
     }
})




//style background on hover
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


//onclick of edit button
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


//How Added Quotes (method to display input quote)
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

    addedNotification.classList.toggle('active-notification');

    //show notification when added new quote
    setTimeout(function() { 
        addedNotification.classList.remove('active-notification');
    }, 2000)

    //add event listener for each quote
    removeQuote.addEventListener('click', function() {
        this.parentElement.classList.add('deleted-quote-div');
        var deletedQuote  = document.querySelector(".deleted-quote-div .quote-item"); //find the child textContent/quote of the "deleted-quote-div" parent.
        let i = quotes.indexOf(deletedQuote.textContent); //find index of deletedQuote onm the exisiting quote array;

        quotes.splice(i, 1); //remove the quote from array
        saveQuotes();
        this.parentElement.remove();
       
    })


}


function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes))
}

function getQuotes() {
    quotes = JSON.parse(localStorage.getItem("quotes"));

    if (!quotes || quotes.length < 3) {
        quotes = [quote1, quote2, quote3];
    }
}

function clearInput() {
    inputQuote.value = "";
}

let quotes = [quote1, quote2, quote3];


//Add new quote 
function addNewQuote() {
    if(inputQuote.value.trim().length > 0 ) {
        quotes.push(inputQuote.value); //push to existing  array
        showQuote(inputQuote.value); //display on DOM
        saveQuotes(); //save to local storage the mutated quote array
    }
}


function displayQuotesInitial() {
    getQuotes(); //get value if any quotes are stored

    for(let i = 0; i < quotes.length; i++) {
        showQuote(quotes[i]);
    }
}
displayQuotesInitial();  //display saved quotes onload


//Event listeners for (Input quote)
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




//Todo App

var todoContainer = document.getElementById('todo-container');
var newToDo = document.getElementById('newtodo');
var addToDoButton = document.getElementById('plus-button');
var toDoList = document.getElementById('todo-list');
var openTodo = document.getElementById('todo-button');
var closeToDo = document.getElementById("close-todo");

//Show todo Container
openTodo.onclick = function () {
    todoContainer.classList.toggle('active-container');
}

closeToDo.onclick = function() {
    todoContainer.classList.toggle('active-container');
}




//create a function to show todo items
function showToDo (toDoItemTextContent) {
    let ToDoItemContainer = document.createElement('div');
    ToDoItemContainer.className = "todo-item";

    let removeButton = document.createElement('span');
    removeButton.className = "remove-todo";
    removeButton.innerHTML = "&times;";

    let todoCheckBox = document.createElement('input');
    todoCheckBox.type = "checkbox";
    todoCheckBox.className = "todo-checkbox";

    let todoItem = document.createElement('span');
    todoItem.className = "text-content";
    todoItem.textContent = toDoItemTextContent;

    toDoList.appendChild(ToDoItemContainer);
    ToDoItemContainer.appendChild(todoCheckBox);
    ToDoItemContainer.appendChild(todoItem);
    ToDoItemContainer.appendChild(removeButton);

    newToDo.value = "";


    //modify items on click and change event
    
    todoCheckBox.addEventListener('change', function(){
        if(this.checked) {
            this.parentElement.classList.add('completed');
        }
        else {
            this.parentElement.classList.remove('completed');
        }
    })


    //remove item on array
    removeButton.addEventListener('click', function() {
        this.parentElement.classList.add('deleted');  //Add classlist to parent of removeButton
        var deleted = document.querySelector(".deleted .text-content"); //get the element with selected query
        var deletedValue = deleted.textContent;
        let i = todoArray.indexOf(deletedValue); //find the index of the textContent
        todoArray.splice(i, 1);
        this.parentElement.remove(); //remove the parent element on DOM/HTML;
        saveTodo(); //save spliced todoArray
    })
        
}



let todoArray = [];

function addToDo() {
    if (newToDo.value.trim().length > 0) {
        todoArray.push(newToDo.value);
        showToDo(newToDo.value);    
        saveTodo();
    }


}

addToDoButton.onclick = addToDo;

newToDo.addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        addToDoButton.click();
    }
})

   
//Save todoArray in local storage;
function saveTodo() {
    var todoArrayStr = JSON.stringify(todoArray);
    localStorage.setItem("todoArray", todoArrayStr);
    
}

function getTodo() {
    var todoArrayStr = localStorage.getItem("todoArray")
    todoArray = JSON.parse(todoArrayStr);
    
    if(!todoArray) {
        todoArray = [];
    }
}

//Display Todo Onload
function displayToDoInitial() {
    getTodo(); //Get values form local storage

    for (let i = 0; i < todoArray.length; i++) {
        showToDo(todoArray[i]);
    }
}
displayToDoInitial();



//add even listeners to close modals on escape
window.addEventListener("keyup", function(e) {
    if (e.key == "Escape") {
        //for the todo App
        if (todoContainer.classList.contains('active-container'))
        todoContainer.classList.toggle('active-container');

        //for the quotes modal
        if (quoteModal.classList.contains('active')) {
            quoteModal.classList.remove('active')
        }
    }
})


var resetDefault = document.getElementById("reset-button");
var resetConfirmation = document.getElementById("reset-confirmation");
var yesReset = document.getElementById("yes-reset");
var noReset = document.getElementById("no-reset");

resetDefault.onclick = function() {
    resetConfirmation.classList.toggle("active-reset-confirmation");
}

yesReset.onclick = function() {
    localStorage.clear();
    location.reload();
}

noReset.onclick = function() {
    resetConfirmation.classList.toggle("active-reset-confirmation");
}
