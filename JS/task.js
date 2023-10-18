
// Function to handle creating task items
function taskItem() {
    const itemInput = document.getElementById("itemInput");
    const newTaskInput = document.createElement("input");
    newTaskInput.type = "text";
    newTaskInput.id = "taskItem";
    newTaskInput.placeholder = "task";
    itemInput.append(newTaskInput);
    newTaskInput.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        createTask(newTaskInput);
        newTaskInput.value = "";
  
        itemInput.innerHTML = " ";
      }
    });
  }
  
  // Function to create a new task
  function createTask(newTaskInput) {
    const newItem = document.getElementById("tasks");
    const text = newTaskInput.value;
  
    const uniqueId = new Date().getTime().toString();
    console.log(uniqueId);
    if ((text, uniqueId)) {
      const currentListTodos = lists[currentListIndex].todos;
      currentListTodos.push({
        text: text,
        completed: false,
        id: uniqueId,
      });
  
      const taskDiv = document.createElement("div");
      taskDiv.className = "todo-item w-1/2";
      taskDiv.innerHTML = `
        <div class="left">
          <input id='${uniqueId}' class="taskCheckbox" name="taskCheckbox" type="checkbox" aria-label="task Checkbox">
          <p class="mb-0">${text}</p>
        </div>
        <button onclick="edit()" class="right"><i class="fa-solid fa-pen-to-square" style="color: #3f3f46;"></i></button>
      `;
  
      newItem.appendChild(taskDiv);
      newTaskInput.value = ""; // Clear the input field correctly
  
      // Save the changes to local storage and render
      localStorage.setItem("lists", JSON.stringify(lists));
      render();
    }
  }
  
  // Function to edit a task
  function edit(taskId) {
    const itemInput = document.getElementById("itemInput");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.placeholder = "edit Task";
    itemInput.append(editInput);
    editInput.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        const newText = editInput.value;
        const taskToEdit = lists[currentListIndex].todos.find(
          (todo) => todo.id === taskId
        );
  
        if (taskToEdit) {
          taskToEdit.text = newText;
          localStorage.setItem("lists", JSON.stringify(lists));
          render();
        }
  
        console.log(editInput.value);
        editInput.value = "";
        itemInput.innerHTML = " ";
      }
    });
  }
  
  //Marks a Task as completed when cliocking on the checkbox, and then disables the checkbox
  function markTaskCompleted(taskId,uniqueId) {
    let checkBox = document.getElementById(uniqueId);
    let checkId;
    const markComplete = lists[currentListIndex].todos.find((todo, index) => {
      checkId = index;
      return todo.id === taskId;
    });
    if (markComplete) {
      let listInputCheck = document.getElementById(taskId);
      listInputCheck.classList.add("crossed-out");
      console.log(taskId + " toggle");
      lists[currentListIndex].todos[checkId].completed = true;
      console.log(lists[currentListIndex].todos[checkId]);
      localStorage.setItem("lists", JSON.stringify(lists));  
      console.log(checkBox);
    }
  }

  //Deletes all tasks marked as completed
  function deleteCompletedTask() {
    const currentListCompleted = lists[currentListIndex].todos;
    const incompleted = currentListCompleted.filter((todo) => !todo.completed);
  }
  
  //Deletes only the task that you press the trash can button on, then renders it
  function deleteSelectedTask(taskId) {
    let checkIndex;
    const deleteSelected = lists[currentListIndex].todos.find((todo, index) => {
      checkIndex = index;
      return todo.id === taskId;
    });
    if (deleteSelected) {
      //Delete the task selected
      console.log("delete: " + taskId + " " + checkIndex);
      lists[currentListIndex].todos.splice(checkIndex, 1);
      console.log(currentList.todos);
  
      localStorage.setItem("lists", JSON.stringify(lists));
      render();
    }
  }