const robot = document.querySelector('.robot')

// Challenge: Make Eve move when you click its body.



// var newMargin = 150;

// function moveRobot() {
//     newMargin += 20;
//     robot.style.marginLeft = newMargin + 'px';
//     return newMargin;
    
// }
// robot.addEventListener('click', moveRobot)





var robotComputedStyle = window.getComputedStyle(robot); //get the computed value (rendered CSS)
var robotmMarginLeft = robotComputedStyle.getPropertyValue('margin-left'); //get the propery value: initial = 150px;
var newMargin = 0;

function moveRobot() {
    newMargin += 20;
    robot.style.marginLeft = `calc(${robotmMarginLeft} + ${newMargin}px)`;
    // robot.style.marginLeft = parseInt(robotComputedStyle.marginLeft) + newMargin + 'px';
}                       
robot.addEventListener('click', moveRobot)