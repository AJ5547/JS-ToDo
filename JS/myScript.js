let listNames = ["Test List"];
let tasks = [];
//Brings up a small form
listNames.forEach(function (element, index) {
  if (index == listNames.length) {
    index++;
  }
});
function addTask() {
  const newTask = document.getElementById("newTask");

  newTask.innerHTML = `<div class="flex ${listNames.element} items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit"><input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="newList()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button></div>`;

  newTask.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      newList();
    }
  });
}
function cancel() {
  newTask.innerHTML = "";
}

//Uses the button above to create form name
function newList() {
  const taskItems = document.getElementById("listNames");
  const info = document.getElementById("newList").value;
  const listHead = document.getElementById("listHeader");
  listNames.push(info);
  console.log(listNames);
  taskItems.innerHTML += `<div class="flex items-center justify-between h-5 bg-gray-400 w-full">
  <h3 class="p-1"> ${info} </h3>
  <button onclick="deleteList()"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i> </button>
</div>`;

  document.getElementById("newList").value = "";
  document.getElementById("newTask").innerHTML = "";
  listHead.innerHTML = `<h2> ${info} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus bg-zinc-900 p-2"></i></button>`;
}
function deleteList() {
  listNames.index;
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
      const taskContent = newTaskInput.value;
      const taskDiv = document.createElement("div");
      taskDiv.className = "flex w-1/2 border border-solid border-gray-400";
      taskDiv.innerHTML = `<input type="checkbox" name="" class="listCheckbox"> <p>${taskContent}</p>`;
      newItem.appendChild(taskDiv);

      // Clear the input field
      newTaskInput.value = "";
    }
  });

  // Clear the itemInput and add the new input field
  itemInput.innerHTML = "";
  itemInput.appendChild(newTaskInput);
}
