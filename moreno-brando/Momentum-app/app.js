//Display Time
var timeNow = document.getElementById('time');
var dateNow = document.getElementById('date');
var greeting; //(For greeting, morning, afternoon, evening);

function displayTime() {
    var currentTime = new Date();
    var hourNow = currentTime.getHours();
    var minuteNow = currentTime.getMinutes();
    var h = hourNow > 12 ? hourNow % 12 : hourNow;
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


function mainFocusFunction() {
    if (mainFocus.value.trim().length > 0) {
        mainFocusButton.style.display = 'block';
    }
    else {
        mainFocusButton.style.display = 'none';
    }
}

mainFocus.oninput = mainFocusFunction;
mainFocus.onfocus = mainFocusFunction;


mainFocusButton.onclick = function() {
    mainFocusLabel.innerHTML = '<h4>Main Focus Today</h4>';
    mainFocus.setAttribute('disabled', true);
    mainFocusButton.style.display = 'none';
}

editButton.onclick = function () {
    mainFocusLabel.innerHTML = '<h4>What is your main focus for today?</h4>';
    mainFocus.removeAttribute('disabled');
    mainFocus.focus();
}


mainFocus.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        if(mainFocus.value.trim(0).length > 0) {
             mainFocusButton.click();
         } 
     }
})
 