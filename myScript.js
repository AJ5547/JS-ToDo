"use strict";

//Brings up a small form
function addTask() {
  const newTask = document.getElementById("newTask");
  newTask.innerHTML =
    '<input type="text" id="task" placeholder="list name" required> <button class="text-white px-2" onclick="list()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button> ';
  var input = document.getElementById("task");
  input.setAttribute("required", "");
}
function cancel() {
  newTask.innerHTML = "";
}

//Uses the button above to create form name
function list() {
  const info = document.getElementById("task").value;
  const taskItems = document.getElementById("todoLists");
  const listHead = document.getElementById("header");
  taskItems.innerHTML += `<div class="flex items-center justify-between h-5 bg-gray-400 w-full">
  <h3 class="p-1"> ${info} </h3>
  <button onclick=""><i class="fa-solid fa-trash-can mr-2" style="color: #fe0717;"></i> </button>
</div>`;
  document.getElementById("task").value = "";
  document.getElementById("newTask").innerHTML = "";
  listHead.innerHTML = `<h2> ${info} </h2> <button onclick="newItem()"> <i class="fa-solid fa-plus bg-zinc-900 p-2"></i></button>`

}
function listItem(){
  const newItem = document.getElementById("items");
}

