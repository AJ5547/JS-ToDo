"use strict";

//Brings up a small form
function addTask(){
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = '<input type="text" id="task" placeholder="list name" required /> <button class="text-white" onclick="list()"> Add </button> ';
}
//Uses the button above to create form name
function list() {
  const info = document.getElementById("task").value;
  const taskItems = document.getElementById("todoLists");
  taskItems.innerHTML +=`<div class="flex items-center justify-between bg-gray-400 w-full">
  <h3 class="p-1"> ${info} </h3>
  <i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i>
</div>`;
  document.getElementById("task").value = "";
  document.getElementById("newTask").innerHTML = "";
}
