// Define initial data
let lists = localStorage.getItem("lists")
  ? JSON.parse(localStorage.getItem("lists"))
  : [
      {
        name: "Shopping list",
        todos: [
          { text: "bananas", completed: false, id: "2433778436343" },
          {
            text: "1 lbs ground turkey",
            completed: false,
            id: "2812763437414",
          },
        ],
      },
    ];

// Save the initial data to localStorage
localStorage.setItem("lists", JSON.stringify(lists));
let currentListIndex = 0;
let currentList = {
  name: lists[currentListIndex].name,
  todos: lists[currentListIndex].todos,
};
// Function to add a new list
function addList() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML = `
    <div class="flex items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit">
      <input type="text" id="newList" placeholder="list name" required>
      <button class="text-white px-2" onclick="render(); newList()"> Add </button>
      <button class="w-8 px-2" onclick="cancelListCreation()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button>
    </div>
  `;
  newTask.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      newList();
      newTask.innerHTML = " ";
    }
  });
}

// Function to remove a list
function removeList() {
  lists.splice(currentListIndex, 1);
  localStorage.setItem("lists", JSON.stringify(lists));
  render();

  location.reload();
}
//Cancel list Creation
function cancelListCreation() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML = " ";
}
// Function to create a new list
function newList() {
  const info = document.getElementById("newList").value;
  const newListObject = {
    name: info,
    todos: [],
  };
  lists.push(newListObject);
  currentListIndex = lists.length - 1;
  currentList = {
    name: lists[currentListIndex].name,
    todos: lists[currentListIndex].todos,
  };
  render();
  document.getElementById("newList").value = "";
  localStorage.setItem("lists", JSON.stringify(lists));
}

// Function to switch to a different list
function switchToList(index) {
  const itemInput = document.getElementById("itemInput");
  itemInput.innerHTML = " ";
  currentListIndex = index;
  currentList = {
    name: lists[currentListIndex].name,
    todos: lists[currentListIndex].todos,
  };

  render();
}


// Function to handle creating task items
function taskItem() {
  const itemInput = document.getElementById("itemInput");
  const newTaskInput = document.createElement("input");
  newTaskInput.type = "text";
  newTaskInput.id = "taskItem";
  newTaskInput.placeholder = "task";
  itemInput.append(newTaskInput);
  newTaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      createTask(newTaskInput);
      newTaskInput.value = "";

      itemInput.innerHTML = " ";
    }
  });
}

// Function to create a new task
function createTask(newTaskInput) {
  const newItem = document.getElementById("tasks");
  const text = newTaskInput.value;

  const uniqueId = new Date().getTime().toString();
  console.log(uniqueId);
  if ((text, uniqueId)) {
    const currentListTodos = lists[currentListIndex].todos;
    currentListTodos.push({
      text: text,
      completed: false,
      id: uniqueId,
    });

    const taskDiv = document.createElement("div");
    taskDiv.className = "todo-item w-1/2";
    taskDiv.innerHTML = `
      <div class="left">
        <input id='${uniqueId}' class="taskCheckbox" name="taskCheckbox" type="checkbox" aria-label="task Checkbox">
        <p class="mb-0">${text}</p>
      </div>
      <button onclick="edit()" class="right"><i class="fa-solid fa-pen-to-square" style="color: #3f3f46;"></i></button>
    `;

    newItem.appendChild(taskDiv);
    newTaskInput.value = ""; // Clear the input field correctly

    // Save the changes to local storage and render
    localStorage.setItem("lists", JSON.stringify(lists));
    render();
  }
}

// Function to edit a task
function edit(taskId) {
  const itemInput = document.getElementById("itemInput");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.placeholder = "edit Task";
  itemInput.append(editInput);
  editInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      const newText = editInput.value;
      const taskToEdit = lists[currentListIndex].todos.find(
        (todo) => todo.id === taskId
      );

      if (taskToEdit) {
        taskToEdit.text = newText;
        localStorage.setItem("lists", JSON.stringify(lists));
        render();
      }

      console.log(editInput.value);
      editInput.value = "";
      itemInput.innerHTML = " ";
    }
  });
}

//Marks a Task as completed when cliocking on the checkbox, and then disables the checkbox
function markTaskCompleted(taskId,uniqueId) {
  let checkBox = document.getElementById(uniqueId);
  let checkId;
  const markComplete = lists[currentListIndex].todos.find((todo, index) => {
    checkId = index;
    return todo.id === taskId;
  });
  if (markComplete) {
    let listInputCheck = document.getElementById(taskId);
    listInputCheck.classList.add("crossed-out");
    console.log(taskId + " toggle");
    lists[currentListIndex].todos[checkId].completed = true;
    console.log(lists[currentListIndex].todos[checkId]);
    localStorage.setItem("lists", JSON.stringify(lists));  
    console.log(checkBox);
  }
}

//Deletes all tasks marked as completed
function deleteCompletedTask() {
  const currentListCompleted = lists[currentListIndex].todos;
  const incompleted = currentListCompleted.filter((todo) => !todo.completed);
}

//Deletes only the task that you press the trash can button on, then renders it
function deleteSelectedTask(taskId) {
  let checkIndex;
  const deleteSelected = lists[currentListIndex].todos.find((todo, index) => {
    checkIndex = index;
    return todo.id === taskId;
  });
  if (deleteSelected) {
    //Delete the task selected
    console.log("delete: " + taskId + " " + checkIndex);
    lists[currentListIndex].todos.splice(checkIndex, 1);
    console.log(currentList.todos);

    localStorage.setItem("lists", JSON.stringify(lists));
    render();
  }
}
// Function to render the UI
function render() {
  let listNames = "";
  const newItem = document.getElementById("tasks");

  lists.forEach((list, index) => {
    listNames += `
      <div class="listName h-10 bg-gray-400  d-none d-md-flex justify-content-between">
        <button class="w-5/6" onclick="switchToList(${index})">
          <h3 class="p-1 h-full w-full overflow-hidden"> ${list.name} </h3></button>
          <button title="Delete Task" class="w-1/6" onclick="removeList()"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></button>
        
      </div>
      <div class="listName h-10 bg-gray-400 w-max d-block d-md-none">
      <button onclick="switchToList(${index})">
     <h4 class="p-1 h-full w-1/5 overflow-hidden"> ${list.name} </h4> </button>
      </div> 
       `;
  });

  document.getElementById(
    "listHeader"
  ).innerHTML = `<h2> ${currentList.name} </h2> <br /> 
  <div class="buttons">
  <button title="Delete Completed Tasks" onclick="deleteCompletedTask()">
  <i class="fa-solid fa-list-check text-green-500 p-2"></i></button>
    <button title="Add New Task" onclick="taskItem()" alt="new task button"> 
    <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>
    </div>`;

  const taskDivs = currentList.todos.map((todo) => {
    return `
        <div id="${todo.id}" class="todo-item w-13/4">
          <div class="left">
            <input title="Completion Checkbox" onclick="markTaskCompleted('${todo.id}')" id="taskCheckbox" type="checkbox" aria-label="task done checkbox">
            <p class="mb-0">${todo.text}</p>
          </div>
          <div class="buttons">
           <button title="Delete Task" class="w-1/6" onclick="deleteSelectedTask('${todo.id}')"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></button>
            <button title="Edit Task" onclick="edit('${todo.id}')" class="right"><i class="fa-solid fa-pen-to-square" style="color: #3f3f46;"></i></button>
          </div>        
         </div>`;
  });

  const taskListElement = document.getElementById("listNames");
  taskListElement.innerHTML = listNames;
  newItem.innerHTML = taskDivs.join("");
}

// Initial rendering when the page loads
render();

//TODO: 2) Clear Completed Tasks 4) Delete Tasks + Clear Completed
