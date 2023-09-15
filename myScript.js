function addTask(){
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = '<input id="task" /> <button onclick="add()"> Add </button> ';

}
function add() {
  const info = document.getElementById("task").value;
  const taskItems = document.getElementById("list");
  taskItems.innerHTML +=`<div class="flex"> <input type="checkbox" /> <p> ${info} </p> </div>`;
  document.getElementById("task").value = "";
}
