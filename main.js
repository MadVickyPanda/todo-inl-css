//script for my todo list
const completedElement = document.querySelector("#completedNumber");
const inputTodo = document.querySelector("#input1") ;
const addToDoBtn = document.querySelector("#addTodoBtn");
const infoTextElement = document.querySelector("small");
const todoList = document.querySelector("#todoList");
let todoText = "";
let completed = 0;
const theTodos = [];



addToDoBtn.addEventListener("click", addTodo);


//function to  change the status on todotext and completed 
function changeStatus(todoText, completedStat) {
    let findIndex = theTodos.map(n => n.name).indexOf(todoText);
    theTodos[findIndex].completed = completedStat;
};


function addTodo() {
    // things that will happen when you click the button "Lägg till"
    infoTextElement.textContent = "";
    todoText = inputTodo.value;
    //Message that you need to write something and avoid empty li
    if (todoText.length == 0) {
        infoTextElement.textContent = "Input must not be empty"
        infoTextElement.id = "message";
        return;
    }
    

    //add the todo to the todo-array
    const todoObject = { name: todoText, completed: false };
    theTodos.push(todoObject);
    
    


    //create list
    const item = document.createElement("li");
    todoList.appendChild(item);


    //Add todo text as a span on the list
    const itemText = document.createElement("span");
    itemText.innerText = todoText;

    //add eventlistener to span with text
    itemText.addEventListener("click",
        function () {
            
            if (itemText.getAttribute("class") == "completed") {
                itemText.setAttribute("class", "");
                completed--;
                completedElement.textContent = completed + " Completed"
                changeStatus(itemText.innerText, false);
            }
            else {
                itemText.setAttribute("class", "completed" );
                completed++;
                completedElement.textContent = completed + " Completed"
                changeStatus(itemText.innerText, true);
            }
        }
    )

    item.appendChild(itemText);

    //add trashcan as a span on the list
    const trashcan = document.createElement("span");
    trashcan.innerHTML = "🗑️";
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan);

    //Trashcan that reduces amount of completed if they are marked completed and removes specific item from the array
    trashcan.addEventListener("click", function () {
        item.remove();
        let removeText = item.firstChild.firstChild.textContent
        let indexToRemove = theTodos.map(n => n.name).indexOf(removeText);
        theTodos.splice(indexToRemove, 1);
            if (itemText.getAttribute("class") == "completed") {
                itemText.setAttribute("class", "");
                completed--;
                completedElement.textContent = completed + " completed"
                

        
            }     
    }
    );

//empty input
    inputTodo.value = "";
}