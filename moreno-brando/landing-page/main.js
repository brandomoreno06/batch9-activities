//play video
var playVideo = document.getElementById('play-video');
var video = document.getElementById('video');

playVideo.onclick = function () {
    if (playVideo.innerHTML == 'Play Video') {
    video.play();
    playVideo.innerHTML = 'Pause Video';
    }

    else {
        video.pause();
        playVideo.innerHTML = 'Play Video';
    }
}

video.onplaying = function() {
    playVideo.innerHTML = 'Pause Video';
}

video.onpause = function() {
    playVideo.innerHTML = 'Play Video';
}





var getItForFreeLink = document.getElementById("getItForFree");
var myModalForm = document.getElementById("modal-form");
var closeButton = document.getElementsByClassName("close");

//Open modal-from when link is clicked
getItForFreeLink.onclick = function () {
    myModalForm.style.display = "block";
}

var getItForFreeLink2 = document.getElementById("getItForFree2");
getItForFreeLink2.onclick = function () {
    myModalForm.style.display = "block";
}

//Close modal-form when close button is clicked
closeButton[0].onclick = function () {
    myModalForm.style.display = "none";
}

closeButton[1].onclick = function () {
    myModalForm.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == myModalForm) {
    myModalForm.style.display = "none";
    }
}





//toggle submitbutton disabled when checkbox is checked/unchecked
var submitButton = document.querySelector('#submit'); //submit button
var checkBox = document.querySelector('#agree');

checkBox.addEventListener('change', function() {
    submitButton.toggleAttribute('disabled');
})







//for media screen MENU bar

var menu = document.getElementById('menu');
var navigationBar = document.getElementById('nav-bar');
var closeNavigationBar = document.getElementById('close-nav-bar');

menu.onclick = function () {
    if (navigationBar.style.display == 'block') {
        navigationBar.style.display = 'none';
    }

    else {
        navigationBar.style.display = 'block';
        closeNavigationBar.style.display = 'block';
    }

}

closeNavigationBar.onclick = function () {
    navigationBar.style.display = 'none';
}



//dark mode

var darkmodeCheckbox = document.getElementById('darkmode-checkbox');
var mainBody = document.getElementsByTagName('body');
var header = document.getElementById('header');

darkmodeCheckbox.addEventListener ('change', function() {
    mainBody[0].classList.toggle('white-mode');
})




//adding coding challenge - counter application 

var reviewTitle = document.getElementById('review-title');
reviewTitle.innerHTML = '<h2>Please leave a review<h2>';


var counterApplication = document.createElement('div');
var body = document.getElementsByTagName('body');
body[0].appendChild(counterApplication);

var counterApplicationContent = document.createElement('div');
counterApplication.appendChild(counterApplicationContent);
counterApplicationContent.innerHTML = '<h4>Enjoyed this page? Hit heart button.<h4><br><span id="heart-button">&#128420;</span><br><span id="heart-count"></span>';

var heartButton = document.getElementById('heart-button');
heartButton.style.fontSize = '30px';
heartButton.style.cursor = 'pointer';

var heartCount = document.getElementById('heart-count');

heartButton.onclick = function() {
    counter += 1;
    heartCount.innerText = counter; //update the content for every click
    localStorage.setItem("counter", counter); //store the last counter locally
}



window.onload = function() {
     counter = parseInt(localStorage.getItem("counter")); //get thelast stored counter

    if(counter > 0) {
        heartCount.innerText = counter;
    }

    else {
        counter = 0;
        heartCount.innerText = counter;
    }
}

