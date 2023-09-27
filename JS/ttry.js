let lists = [
    {
      name: "Shopping list",
      todos: [
        {
          text: 'bananas',
          completed: false
        },
        {
          text: '1 lbs ground turkey',
          completed: false
        }
      ]
    },
]
   const currentList = lists[0];

   
   function addTask() {
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = `<div class="flex  items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit"><input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="render(); newList()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button></div>`;
    newTask.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
       newList();
      }
    });
  };

  function newList() {
    const taskItems = document.getElementById("listNames");
    const info = document.getElementById("newList").value;
    const listHead = document.getElementById("listHeader");
    taskItems.innerHTML += `<div class="flex items-center m-0 p-0 my-2 h-10 w-full justify-between bg-gray-400">
    <h3 class="p-1 h-full w-1/5 overflow-hidden"> ${info} </h3>
    <button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></button>
  </div>`;
    document.getElementById("newList").value = "";
    document.getElementById("newTask").innerHTML = "";
    listHead.innerHTML = `<h2> ${info} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;
  };

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
      const taskContent = newTaskInput.value;
      const taskDiv = document.createElement("div");
      taskDiv.className =
        "flex w-1/2 border items-center align-middle border-solid border-gray-400 overflow-y-scroll";
      taskDiv.innerHTML = `<input type="checkbox" name="" class="listCheckbox"> <p class="mb-0">${todos.text}</p>`;
      newItem.appendChild(taskDiv);
      tasks.push(currentList.todos.text);
      // Clear the input field
      taskContent= "";
      newTaskInput.innerHTML ='';
    }
  });

  // Clear the itemInput and add the new input field
  itemInput.innerHTML = "";
  itemInput.appendChild(newTaskInput);
}

  function render() {
    let taskItems = '<div>';
    lists.forEach((list) => {
        taskItems += `<div class="m-0 p-0 my-2 h-10 w-full justify-between bg-gray-400"><h3 class="p-1 h-full w-1/5 overflow-hidden"> ${list.name} </h3>
        <button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></div>`;
    });
    taskItems += '</div>';
    document.getElementById('listNames').innerHTML = taskItems;

    // Print out the name of the current list
    document.getElementById('listHeader').innerHTML = `<h2> ${currentList.name} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

    // Iterate over the todos in the current list
    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="list-group-item">${todo.text}</li>`;
    });
    // Print out the todos
    document.getElementById('tasks').innerHTML = todosHtml;
}

// Initial rendering when the page loads
render();