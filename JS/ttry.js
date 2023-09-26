let lists = {
    1: {
      name: "Shopping list",
      todos: [
        {
          text: 'bananas',
          completed: false
        },
        {
          text: '1 lbs ground turkey',
          completed: false
        }
      ]
    },
   }
   const currentList = lists[1];

   
   function addTask() {
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = `<div class="flex  items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit"><input type="text" id="newList" placeholder="list name" required> <button class="text-white px-2" onclick="render()"> Add </button> <button class="w-8 px-2" onclick="cancel()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button></div>`;
    newTask.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        render();
      }
    });
  }function render() {
 // this will hold the html that will be displayed in the sidebar
 let listsHtml = '<ul class="list-group">';
 // iterate through the lists to get their names
 lists.forEach((list) => {
   listsHtml += `<li class="list-group-item">${list.name}</li>`;
 });
 listsHtml += '</ul>';
 // print out the lists
 document.getElementById('lists').innerHTML = listsHtml;

 // print out the name of the current list
 document.getElementById('current-list-name').innerText = currentList.name;

 // iterate over the todos in the current list
 let todosHtml = '<ul class="list-group-flush">';
 currentList.todos.forEach((list) => {
   todosHtml += `<li class="list-group-item">${todo.text}</li>`;
 });
 // print out the todos
 document.getElementById('current-list-todos').innerHTML = todosHtml;
}

