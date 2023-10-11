// Define initial data
let lists = localStorage.getItem("lists")
  ? JSON.parse(localStorage.getItem("lists"))
  : [
      {
        name: "Shopping list",
        todos: [
          { text: "bananas", completed: false },
          { text: "1 lbs ground turkey", completed: false },
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
// Function to add a new task input field
function addTask() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML = `<div class="flex  items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit">
    <input type="text" id="newList" placeholder="list name" required>
    <button class="text-white px-2" onclick="render(); newList()"> Add </button>
    <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button>
    </div>`;
  newTask.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      newList();
    }
  });
}
// Function to create a new list
function newList() {
  const info = document.getElementById("newList").value;
  // Create a new list object
  const newListObject = {
    name: info,
    todos: [],
  };
  // Add the new list to the lists array
  lists.push(newListObject);
  // Set it as the current list
  currentListIndex = lists.length - 1;
  currentList = {
    name: lists[currentListIndex].name,
    todos: lists[currentListIndex].todos,
  };
  // Update the UI
  render();
  // Clear the input field
  document.getElementById("newList").value = "";
  // Save the updated lists array to localStorage
  localStorage.setItem("lists", JSON.stringify(lists));
}
// Function to switch to a different list
function switchToList(index) {
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
  // Create a new input field
  const newTaskInput = document.createElement("input");
  newTaskInput.type = "text";
  newTaskInput.id = "taskItem";
  newTaskInput.placeholder = "task";
  itemInput.append(newTaskInput);
  // Add a keydown event listener to the new input field
  newTaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      createTask(newTaskInput);
      newTaskInput.value = "";
      checkIfChecked();
    }
  });
}
// Function to create a new task
function createTask(newTaskInput) {
  const newItem = document.getElementById("tasks");
  const text = newTaskInput.value;
  if (text) {
    // Access the current list's todos array
    const currentListTodos = lists[currentListIndex].todos;
    // Push the new task to the current list's todos array
    currentListTodos.push({
      text: text,
      completed: false,
    });
    const taskDiv = document.createElement("div");
    taskDiv.className = "todo-item w-1/2";
    newItem.append(taskDiv);
    taskDiv.innerHTML = `<span class="left"><input class="taskCheckbox" name="taskCheckbox" type="checkbox" aria-label="task Checkbox"> </input>
      <p class="mb-0">${text}</p></span>
      <button onclick="edit()" class="right"><i class="fa-solid fa-pen-to-square" style="color: #3f3f46;"></i></div>
        </button>`;
    itemInput.innerHTML = "";
  }
  // Save the updated lists array to localStorage
  localStorage.setItem("lists", JSON.stringify(lists));
  checkIfChecked();
  render();
}

//Function to edit the task
function edit(event) {

  const puteditAreaHere = document.getElementById("editAreaHere");
  const editArea = document.createElement("input");
  editArea.type = "text";
  editArea.placeholder = "Edit Task";
  editArea.classList.add = "w-full";
  puteditAreaHere.appendChild(editArea);
  //when enter is pressed, updates the task user wanted to edit.
  editArea.addEventListener("keydown", (e) => {
    if (e.key == "Enter") { 
       const container = document.querySelector(".todo-item");
  // Get the parent div of the clicked button
  const parentDiv = event.target.parentElement;
      console.log(editArea.value);
      const leftDiv = document.querySelector(".left");
      const paragraph = leftDiv.querySelector("p");

      // Example modification
      if (paragraph) {
        paragraph.textConent = `${editArea.value}`;
      }
    }
  });
  // Find and modify the paragraph element within the same div
}

//TODO edit individual tasks

// Function to render the UI
function render() {
  // const storedLists = localStorage.getItem("lists");

  // if (storedLists) {
  //   // Parse the stored JSON string back to an object
  //   lists = JSON.parse(storedLists);
  // }

  let listNames = "";
  const newItem = document.getElementById("tasks");

  lists.forEach((list, index) => {
    listNames += `<div class="listName h-10 bg-gray-400"><button onclick="switchToList(${index})">`;
    listNames += `<h3 class="p-1 h-full w-1/5 overflow-hidden"> ${list.name} </h3>`;
    listNames += `<button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></button>`;
    listNames += "</button></div>";
    //TODO change stylizating on this, make it so that theres a space between the list name, and the two buttons needed
    document.getElementById(
      "listHeader"
    ).innerHTML = `<h2> ${currentList.name} </h2> <br /> 
    <button onclick="taskItem()" alt="new task button"> 
    <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

    // Iterate over the todos in the current list
    const taskDivs = currentList.todos.map((todo) => {
      return `
        <div class="todo-item w-1/2">
          <div class="left">
            <input class="taskCheckbox" type="checkbox" aria-label="task done checkbox"></input>
            <p class="mb-0">${todo.text}</p>
          </div>
          <button onclick="edit()" class="right"><i class="fa-solid fa-pen-to-square" style="color: #3f3f46;"></i></div>
        </button>
      `;
    });

    // Append the task items for the current list
    const taskListElement = document.getElementById("listNames");
    taskListElement.innerHTML = listNames;
    newItem.innerHTML = taskDivs.join("");
  });
  checkIfChecked();
}

// Initial rendering when the page loads
render();

//TODO:   3. Clear and Edit Tasks 4.delete tasks and lists witout completing 5. animated
