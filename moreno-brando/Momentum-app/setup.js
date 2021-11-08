//dispayTime()
var timeNow = document.getElementById('time');
var dateNow = document.getElementById('date');
var greeting;

//continueSetUpName()
var inputName = document.getElementById('name');
var inputButton = document.getElementById('input-button');
var homePage = document.getElementById('main-container');
var setUpPage = document.getElementById('set-up-page');
var greetings = document.getElementById('greetings');
var displayName;

//displayMainFocus() , showMainFocusButton()
var mainFocus = document.getElementById('mainfocus');
var mainFocusLabel = document.getElementById('main-focus-label');
var mainFocusButton = document.getElementById('button-main-focus');
var editButton = document.getElementById('edit-button');
var mainFocusContainer = document.getElementById('main-focus-container');

//Reset default
var resetDefault = document.getElementById("reset-button");
var resetConfirmation = document.getElementById("reset-confirmation");
var yesReset = document.getElementById("yes-reset");
var noReset = document.getElementById("no-reset");





//Display on Homepage the... Time and (Welcome Greeting & Main Focus) if there are saved values
function displayDefault() {
    displayTime();
    getName(); //get value if any is saved in local storage
    getMainFocus(); //get value if any is saved in local storage

    if (displayName) {
        displayGreeting();
    }

    if (mainFocus.value) {
       displayMainFocus();
    }
}


//Display current Time, show Am or Pm, and show greeting if "Morning", "Afternoon", or " Evening"
function displayTime() {
    var currentTime = new Date();
    var hourNow = currentTime.getHours();
    var minuteNow = currentTime.getMinutes();
    var h = hourNow > 12 ? hourNow % 12 : hourNow;
    var h = hourNow == 0 ? 12 : h //Added to correct 0:00+
    var m = minuteNow >= 10 ? minuteNow : "0" + minuteNow;
    var amPm = hourNow >= 12 ? ' PM' : ' AM'
    timeNow.innerHTML = h + ':' + m + amPm;
    return greeting = hourNow < 12 ? "Good Morning" : hourNow >= 12 && hourNow < 18 ? "Good Afternoon": "Good Evening"; 
}

window.onload = displayDefault();
setInterval(displayDefault, 60000);





// I. SETUP USERNAME

//Show or Hide "Continue" button while entering name;
inputName.oninput = function () {
    inputButton.style.display = (inputName.checkValidity() || inputName.value.trim() !== "") ? "block" : "none";
}

//upon clicking continue after entering name, show Greetings and mainFocus
function continueSetUpName() {
    displayName = inputName.value;
    localStorage.setItem("username", displayName); //save name in local storage
    displayGreeting();

    if (mainFocus.value.length > 0) {
        displayMainFocus();
    }
}

//Event listeners on setUpName in setUpPage
inputButton.addEventListener('click', continueSetUpName);
inputName.addEventListener('keyup', e => {
   if (e.key === "Enter") {
       if(inputName.checkValidity() && inputName.value.trim(0).length > 0) {
            inputButton.click();
        } 
    }
})

//get saved userName from local storage
function getName() {
    displayName = localStorage.getItem("username");
}

//Display greeting messsage after entering name
function displayGreeting() {
    homePage.style.display = 'grid';
    setUpPage.style.display = 'none';
    timeNow.className += ' time-transition';
    greetings.innerHTML = greeting + ", " + displayName + "<span id='edit-name'>&#9998;</span>"; 

    //edit name displayed on greeting
    var editName = document.getElementById('edit-name');
        editName.addEventListener('click', function() {
        localStorage.removeItem("username");
        location.reload();
    })
}






//II. "What is your Main Focus" -  SECTION

mainFocus.oninput = showMainFocusButton;
mainFocus.onfocus = showMainFocusButton; //show ok button after clicking edit;
mainFocusButton.onclick = displayMainFocus;
mainFocus.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        if(mainFocus.value.trim(0).length > 0) {
             mainFocusButton.click();
         } 
     }
})


function showMainFocusButton() {
    mainFocusButton.style.display = mainFocus.value.trim().length > 0 ? "block" : "none" ;
}

//Display "Main Focus Today" after entering value
function displayMainFocus() {
    if(mainFocus.value) {
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


//style background on hover, show edit button if there is mainFocus value
mainFocusContainer.onmouseover = function () {
    mainFocusContainer.classList.add('active-background');
    editButton.style.display = mainFocus.disabled ? "block" : "none" ;
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





//III. RESET VALUES TO DEFAULT

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
