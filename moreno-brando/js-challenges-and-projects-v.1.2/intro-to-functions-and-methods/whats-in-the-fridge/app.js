const downButton = document.querySelector('#down')
const upButton = document.querySelector('#up')
const buyListDisplay = document.querySelector('#first-list')
const fridgeListDisplay = document.querySelector('#second-list')

const buyList = ['chicharon', 'buko pie', 'mango', 'bacon' ]
const fridge = []

//Challenge: Please fill the fridge array with 5 items of your choice. 

fridge[0] = 'ice';
fridge[1] = 'fish';
fridge[2] = 'carrots';
fridge[3] = 'lettuce';
fridge[4] = 'milk';


//Challenge 2: You have bought some chicharon.
//Please remove it from the buyList and add it to the items in fridge.

let chicharon = buyList.shift();
fridge.push(chicharon);

//Challenge 3: Write a function that will remove an item from the fridge,
//and put it in the buyList, on the press of the moveUp button.

function moveUp(){
    //your code 
    if (fridge.length > 0) {
        let removeFromFridge = fridge.pop();
        buyList.push(removeFromFridge);
        buyListDisplay.innerHTML = buyList;
        fridgeListDisplay.innerHTML = fridge;

        if(fridge.length === 0) {
            fridgeListDisplay.innerHTML = '(empty)';
            fridgeListDisplay.style.color = 'lightgray';
        }

        if(buyList.length > 0) {
            buyListDisplay.style.color = 'inherit';
            buyListDisplay.style.border = 'inherit';
        }



    }

    else {
        fridgeListDisplay.innerHTML = 'Sorry, nothing left!';
        fridgeListDisplay.style.color = 'red';
        fridgeListDisplay.style.border = '1px solid red';
    }
}

upButton.addEventListener('click', moveUp)

//Challenge 4: Write a function that will remove the last item in the buyList, 
//and put it in the fridge.

function moveDown(){
    //your code
    if (buyList.length > 0) {
        let removeFromBuyList = buyList.pop();
        fridge.push(removeFromBuyList);

        buyListDisplay.innerHTML = buyList;
        fridgeListDisplay.innerHTML = fridge;

        if(buyList.length === 0) {
            buyListDisplay.innerHTML = '(empty)';
            buyListDisplay.style.color = 'lightgray';
        }


        if (fridge.length > 0) {
            fridgeListDisplay.style.color = 'inherit';
            fridgeListDisplay.style.border = 'inherit';
        }

    }

    else {
        buyListDisplay.innerHTML = 'Sorry, nothing left!';
        buyListDisplay.style.color = 'red';
        buyListDisplay.style.border = '1px solid red';
    }
   
}

downButton.addEventListener('click', moveDown)

buyListDisplay.innerHTML = buyList
fridgeListDisplay.innerHTML = fridge
