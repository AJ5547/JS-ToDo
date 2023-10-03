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
  newListObject = lists[i];
}

function addTask() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML = `<div class="flex  items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit"><input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="render(); newList()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button></div>`;
  newTask.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      newList();
    }
  });
}

//code for creating a new list
function newList() {
  const taskItems = document.getElementById("listNames");
  const info = document.getElementById("newList").value;
  const listHead = document.getElementById("listHeader");

  //start of code
  taskItems.innerHTML += `<div class="listName h-10 bg-gray-400"> <h2> ${info} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button></div>`;
  document.getElementById("newList").value = "";
  document.getElementById("newTask").innerHTML = "";
  listHead.innerHTML = `<h2> ${info} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

  document.getElementById("tasks").innerHTML = "";
  const newListObject = {
    name: "",
    todos: [],
  };
  if (info) {
    newListObject.name = info;
  }

  console.log(lists);

  lists.push(newListObject);
  // Save the updated lists array to localStorage
  localStorage.setItem("lists", JSON.stringify(lists));
}

function taskItem() {
  const newItem = document.getElementById("tasks");
  const itemInput = document.getElementById("itemInput");

  // Create a new input field
  const newTaskInput = document.createElement("input");

  //start of code
  newTaskInput.type = "text";
  newTaskInput.id = "taskItem";
  newTaskInput.placeholder = "task";
  itemInput.appendChild(newTaskInput);
  // Add a keydown event listener to the new input field
  newTaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      const text = newTaskInput.value;
      const taskDiv = document.createElement("div");
      taskDiv.className = "todo-item w-1/2";
      taskDiv.innerHTML = ` <p class="mb-0">${text}</p>`;

      taskDiv.classList.add("todo-item");
      taskDiv.addEventListener("click", checkIfChecked);

      newItem.append(taskDiv);
      if (text) {
        newListObject.todos.push({
          text: text,
          completed: false,
        });
      }

      // Clear the input field
      newTaskInput.value = "";
      newTaskInput.innerHTML = "";
      itemInput.innerHTML = "";
    }
  });
}

//When clikcing on a task item, gets crossed out, anc made true on its boolean
function checkIfChecked(event) {
  const taskDiv = event.target;
  taskDiv.classList.add("crossed-out");
}

function deleteCheckedTasks(event) {
  // if( class"crossed-out"){ remove from page on the click of a button}
  if (taskDiv.classList.contains("crossed-out")) {
    //remove from newItem
  }
}
function render() {
  // const storedLists = localStorage.getItem('lists');

  // if (storedLists) {
  //   // Parse the stored JSON string back to an object
  //    lists = JSON.parse(storedLists);
  //  }

  let taskItems = `<div class="listName h-10 bg-gray-400">`;
  const newItem = document.getElementById("tasks");

  lists.forEach((list) => {
    taskItems += `<h3 class="p-1 h-full w-1/5 overflow-hidden"> ${list.name} </h3>
        <button class="w-1/2 overflow-hidden"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i>`;

    // Print out the name of the current list
    taskItems += "</div>";
    document.getElementById("listNames").innerHTML = taskItems;
    document.getElementById(
      "listHeader"
    ).innerHTML = `<h2> ${list.name} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus text-zinc-700 p-2"></i></button>`;

    // Iterate over the todos in the current list

    const taskDivs = list.todos.map((todo) => {
      return `
      <div>
        <p class="mb-0">${todo.text}</p>
      </div>
    `;
    });
    // Print out the todos
    newItem.innerHTML = taskDivs.join("");
  });
}
// Initial rendering when the page loads
render();

//TODO: 1. Switch between list items 2. Be able to push my tasks to the current list 3. Clear and Edit Tasks 4.delete tasks and lists witout completing 5. animated
//TODO: Pushing Task Items: Ive tried doing different things, and im not sure how to use a currentlist object to be able to push to the main array list. i cannot push something set to list[i](or any number)
