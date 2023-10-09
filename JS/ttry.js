// Define initial data
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

let currentListIndex = 0;
let currentList = {
  name: lists[currentListIndex].name,
  todos: lists[currentListIndex].todos,
};

// Function to add a new task input field
function addTask() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML = `<div class="flex  items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit"><input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="render(); newList()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button></div>`;
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
  const newItem = document.getElementById("tasks");
  const itemInput = document.getElementById("itemInput");

  // Create a new input field
  const newTaskInput = document.createElement("input");

  newTaskInput.type = "text";
  newTaskInput.id = "taskItem";
  newTaskInput.placeholder = "task";
  itemInput.appendChild(newTaskInput);

  // Add a keydown event listener to the new input field
  newTaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      createTask(newTaskInput);
    }
  });
}

// Function to create a new task
function createTask(newTaskInput) {
  const newItem = document.getElementById("tasks");
  const text = newTaskInput.value;

  if (text) {
    currentList.todos.push({
      text: text,
      completed: false,
    });

    const taskDiv = document.createElement("div");
    taskDiv.className = "todo-item w-1/2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", checkIfChecked);

    taskDiv.appendChild(checkbox);
    newItem.append(taskDiv);

    taskDiv.innerHTML = `
      <p class="mb-0">${text}</p>
      <div class="right"><i class="fa-solid fa-pen-to-square" style="color: #8c888c;"></i></div>`;

    // Clear the input field
    newTaskInput.value = "";
    newTaskInput.innerHTML = "";
    itemInput.innerHTML = "";
  }
}

// Function to handle task completion
function checkIfChecked(event) {
  const checkbox = event.target;
  const taskDiv = checkbox.parentElement;

  if (checkbox.checked) {
    taskDiv.classList.add("crossed-out");
  } else {
    taskDiv.classList.remove("crossed-out");
  }
}

// Function to delete checked tasks
function deleteCheckedTasks(event) {
  // Implementation for deleting checked tasks
}

// Function to render the UI
function render() {
  const storedLists = localStorage.getItem("lists");

  if (storedLists) {
    // Parse the stored JSON string back to an object
    lists = JSON.parse(storedLists);
  }

  let listNames = "";
  const newItem = document.getElementById("tasks");

  lists.forEach((list, index) => {
    listNames += `<div class="listName h-10 bg-gray-400"><button onclick="switchToList(${index})">`;
    listNames += `<h3 class="p-1 h-full w-1/5 overflow-hidden"> ${list.name} </h3>`;
    listNames += `<button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i></button>`;
    listNames += "</button></div>";
    document.getElementById("listHeader").innerHTML = `<h2> ${currentList.name} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

    // Iterate over the todos in the current list
    const taskDivs = currentList.todos.map((todo) => {
      return `
        <div class="todo-item w-1/2">
          <div class="left">
            <input type="checkbox"></input>
            <p class="mb-0">${todo.text}</p>
          </div>
          <div class="right"><i class="fa-solid fa-pen-to-square" style="color: #8c888c;"></i></div>
        </div>
      `;
    });

    // Append the task items for the current list
    const taskListElement = document.getElementById("listNames");
    taskListElement.innerHTML = listNames;
    newItem.innerHTML = taskDivs.join("");
  });
}

// Initial rendering when the page loads
render();


//TODO:  2. Be able to push my tasks to the current list 3. Clear and Edit Tasks 4.delete tasks and lists witout completing 5. animated
//TODO: Pushing Task Items: Ive tried doing different things, and im not sure how to use a currentlist object to be able to push to the main array list. i cannot push something set to list[i](or any number)
