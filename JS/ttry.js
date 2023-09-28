let lists = [
  {
    name: "Shopping list",
    todos: [
      {
        text: "bananas",
        completed: false,
      },
      {
        text: "1 lbs ground turkey",
        completed: false,
      },
    ],
  },
];
for (let i = 0; i < lists.length; i++) {
  console.log(lists[i]);
}

const currentList = lists[0];

function addTask() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML = `<div class="flex  items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit"><input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="render(); newList()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button></div>`;
  newTask.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      newList();
    }
  });
}

function newList() {
  const taskItems = document.getElementById("listNames");
  const info = document.getElementById("newList").value;
  const listHead = document.getElementById("listHeader");
  taskItems.innerHTML += `<div class=" listName h-10 bg-gray-400">
    <h3 class="p-1 h-full w-1/5 overflow-hidden"> ${info} </h3>
    <button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></button>
  </div>`;
  document.getElementById("newList").value = "";
  document.getElementById("newTask").innerHTML = "";
  listHead.innerHTML = `<h2> ${info} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

  document.getElementById("tasks").innerHTML = "";

  const newListObject = {
    name: info,
    todos: [],
  };

  lists.push(newListObject);
}

function taskItem() {
  const newItem = document.getElementById("tasks");
  const itemInput = document.getElementById("itemInput");

  // Create a new input field
  const newTaskInput = document.createElement("input");
  newTaskInput.type = "text";
  newTaskInput.id = "taskItem";
  newTaskInput.placeholder = "task";

  // Add a keydown event listener to the new input field
  newTaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      const text = newTaskInput.value;
      const taskDiv = document.createElement("div");
      taskDiv.className =
        "todo-item w-1/2";
      taskDiv.innerHTML = ` <p class="mb-0">${text}</p>`;
    
      taskDiv.classList.add("todo-item");
      taskDiv.addEventListener('click', checkIfChecked);
      
      newItem.append(taskDiv)
      if (text) {
        currentList.todos.push({
          text: text,
          completed: false,
        });
      }
      // Clear the input field
      newTaskInput.value = "";
      newTaskInput.innerHTML = "";
      taskDiv.addEventListener("click",checkIfChecked)
    }
  });

  // Clear the itemInput and add the new input field
  itemInput.innerHTML = "";
  itemInput.appendChild(newTaskInput);
};


//When clikcing on a task item, gets crossed out
function checkIfChecked(event){
  const taskDiv = event.target;
  taskDiv.classList.add('crossed-out');
  }


function deleteCheckedTasks(){
  // if( class"crossed-out"){ remove from page on the click of a button}
};
function render() {
  let taskItems = `<div class="listName h-10 bg-gray-400">`;
  lists.forEach((list) => {
    taskItems += `<h3 class="p-1 h-full w-1/5 overflow-hidden"> ${list.name} </h3>
        <button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i>`;
  });
  taskItems += "</div>";
  document.getElementById("listNames").innerHTML = taskItems;

  // Print out the name of the current list
  document.getElementById(
    "listHeader"
  ).innerHTML = `<h2> ${currentList.name} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

  // Iterate over the todos in the current list
  const newItem = document.getElementById("tasks");
  const taskDivs = currentList.todos.map((todo) => {
    return `
      <div class=" todo-item w-1/2">
        <p class="mb-0">${todo.text}</p>
      </div>
    `;
  });
  // Print out the todos
  newItem.innerHTML = taskDivs.join("");
}

// Initial rendering when the page loads
render();
