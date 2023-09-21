let listNames = [];
//Brings up a small form
function addTask() {
  const newTask = document.getElementById("newTask");

  newTask.innerHTML =
    '<input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="newList()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button> ';
  const info = document.getElementById("newList").value;
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
  listNames.forEach(function (element, index) {
    taskItems.innerHTML += `<div class="flex items-center justify-between h-5 bg-gray-400 w-full">
  <h3 class="p-1"> ${listNames} </h3>
  <button onclick="deleteList()"><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i> </button>
</div>`;
  });

  document.getElementById("newList").value = "";
  document.getElementById("newTask").innerHTML = "";
  listHead.innerHTML = `<h2> ${info} </h2> <button onclick="taskItem()"> <i class="fa-solid fa-plus bg-zinc-900 p-2"></i></button>`;
}
function deleteList() {
  listNames[index];
}
// Trying to get new task done
function taskItem() {
  const newItem = document.getElementById("tasks");
  newItem.innerHTML =
    '<input type="text" id="taskItem" placeholder="task" required>';
  let newTaskInput = document.getElementById("taskItem");
  newItem.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      console.log(newTaskInput.value);
      newItem.innerHTML += `<div class="flex w-1/2 border border-solid border-gray-400"><input type"checkbox" id="listCheck" /> <p> ${newTaskInput.value} </p></div>`;
    }
  });
}
