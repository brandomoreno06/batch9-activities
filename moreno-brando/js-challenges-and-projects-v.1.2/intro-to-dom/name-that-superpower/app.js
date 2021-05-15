var justiceLeague = [
    {name: "Superman", superpower: "Super strength"}, 
    {name: "Batman", superpower: "Super rich"},
    {name: "Wonder Woman", superpower: "Super lasso"}, 
    {name: "The Flash", superpower: "Super speed"}, 
    {name: "Green Lantern", superpower: "Super ring"}
]


var heroes = document.getElementById('league');

// for (let i = 0; i < justiceLeague.length; i++) {
//     var hero = document.createElement('li');
//     hero.innerText = justiceLeague[i].name + ", " + justiceLeague[i].superpower;
//     heroes.appendChild(hero);
// }

heroes.addEventListener('click', function() {
    console.log('Aray!!!');
})

window.addEventListener('keypress', function(event) {
    console.log("Bakit mo ko pinindot?" )
    console.log(event.which)
})  