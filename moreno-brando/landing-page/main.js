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
