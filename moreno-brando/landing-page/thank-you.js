
var body = document.getElementsByTagName('body');

//click on body (not thank-you form) to return to homepage
window.onclick = function (event) {
    if (event.target == body[0]) {
    window.history.back();
    }
}


// window.onload = function () {
//     const parameters = new URLSearchParams(window.location.search); //instantiate a new object (window.location.search - return the query string)
    
//     const email = parameters.get('email');

//     document.getElementById('email-address').innerHTML = email;
// }


window.onload = function () {
    const parameters = new URLSearchParams(window.location.search); //instantiate a new object (window.location.search - return the query string)
    
    const email = parameters.get('email');
    const ratingValue = parameters.get('rating');

    const displayConfirmationEmail = document.getElementById('confirmation-email');
    const displayRatingSection = document.getElementById('rating-section');


    if (email != null) {
        displayConfirmationEmail.style.display = 'block';
        document.getElementById('email-address').innerHTML = email;
        displayRatingSection.style.display = 'none';
    }

    else {
        displayConfirmationEmail.style.display = 'none';
        displayRatingSection.style.display = 'block';
        document.getElementById('rating-value').innerHTML = ratingValue;
    }

}