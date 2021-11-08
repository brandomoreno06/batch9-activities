var todoContainer = document.getElementById('todo-container');
var newToDo = document.getElementById('newtodo');
var addToDoButton = document.getElementById('plus-button');
var toDoList = document.getElementById('todo-list');
var openTodo = document.getElementById('todo-button');
var closeToDo = document.getElementById("close-todo");



//Show/Hide Todo Container
openTodo.onclick = function () {
    todoContainer.classList.toggle('active-container');
}

closeToDo.onclick = function() {
    todoContainer.classList.toggle('active-container');
}

window.addEventListener("keyup", function(e) {
    if (e.key == "Escape") {
        //for the todo App
        if (todoContainer.classList.contains('active-container'))
        todoContainer.classList.toggle('active-container');
    }
})


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

    toDoList.prepend(ToDoItemContainer);
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

   
//Save pr get todoArray to/from local storage;
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

//Display Todo items Onload
function displayToDoInitial() {
    getTodo(); //Get values form local storage

    for (let i = 0; i < todoArray.length; i++) {
        showToDo(todoArray[i]);
    }
}
displayToDoInitial();
