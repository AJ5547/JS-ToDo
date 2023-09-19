function addTask(){
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = '<input type="text" id="task" placeholder="list name" required /> <button onclick="addList()"> Add </button> ';
}
function addList() {
  const info = document.getElementById("task").value;
  const taskItems = document.getElementById("todoLists");
  taskItems.innerHTML +=`<h3 class="bg-gray-500 p-1"> ${info} </h3>`;
  document.getElementById("task").value = "";
  document.getElementById("newTask").innerHTML = "";
}
