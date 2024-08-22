let tasks = [];

function addTask() {
  let input = document.getElementById('input');
  let task = input.value.trim();

  if (task !== "") {
    tasks.push(task);
    input.value = "";
    displayTasks();
  } else {
    alert("Please enter a task!");
  }
}

function displayTasks() {
  let showList = document.getElementById('showList');
  let ul = document.createElement('ul');

  tasks.forEach((task, index) => {
    let li = document.createElement('li');
    li.textContent = task;
    li.innerHTML += ` <button onclick="deleteTask(${index})">Delete</button>`;
    ul.appendChild(li);
  });

  showList.innerHTML = "";
  showList.appendChild(ul);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function clearAll() {
  tasks = [];
  displayTasks();
}
  


