let tasks = [];

function addTask() {
  const input = document.getElementById('input');
  const task = input.value.trim();

  if (task !== "") {
    tasks.push({ text: task, completed: false });
    input.value = "";
    displayTasks();
  } else {
    alert("Please enter a task!");
  }
}

function displayTasks() {
  const showList = document.getElementById('showList');
  const ul = document.createElement('ul');

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    ul.appendChild(li);
  });

  showList.innerHTML = "";
  showList.appendChild(ul);
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function clearAll() {
  tasks = [];
  displayTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks on page load
window.onload = function() {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks = JSON.parse(saved);
  displayTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks when page opens
window.onload = function() {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks = JSON.parse(saved);
  displayTasks();
}

// Auto save whenever tasks change
function addTask() {
  const input = document.getElementById('input');
  const task = input.value.trim();
  if (task !== "") {
    tasks.push({ text: task, completed: false });
    input.value = "";
    displayTasks();
    saveTasks();
  } else {
    alert("Please enter a task!");
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  saveTasks();
}