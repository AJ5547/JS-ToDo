// Function to add a new list
function addList() {
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = `
      <div class="flex items-center m-0 p-0 h-5 justify-between bg-gray-400 w-fit">
        <input type="text" id="newList" placeholder="list name" required>
        <button class="text-white px-2" onclick="render(); newList()"> Add </button>
        <button class="w-8 px-2" onclick="cancelListCreation()"> <i class="fa-solid fa-x" style="color: #ea2427;"></i> </button>
      </div>
    `;
    newTask.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        newList();
        newTask.innerHTML = " ";
      }
    });
  }
  
  // Function to remove a list
  function removeList() {
    lists.splice(currentListIndex, 1);
    localStorage.setItem("lists", JSON.stringify(lists));
    render();
  
    location.reload();
  }
  //Cancel list Creation
  function cancelListCreation() {
    const newTask = document.getElementById("newTask");
    newTask.innerHTML = " ";
  }
  // Function to create a new list
  function newList() {
    const info = document.getElementById("newList").value;
    const newListObject = {
      name: info,
      todos: [],
    };
    lists.push(newListObject);
    currentListIndex = lists.length - 1;
    currentList = {
      name: lists[currentListIndex].name,
      todos: lists[currentListIndex].todos,
    };
    render();
    document.getElementById("newList").value = "";
    localStorage.setItem("lists", JSON.stringify(lists));
  }
  
  // Function to switch to a different list
  function switchToList(index) {
    const itemInput = document.getElementById("itemInput");
    itemInput.innerHTML = " ";
    currentListIndex = index;
    currentList = {
      name: lists[currentListIndex].name,
      todos: lists[currentListIndex].todos,
    };
  
    render();
  }
  
  