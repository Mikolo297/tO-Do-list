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

    // XSS vulnerability - user input directly into innerHTML
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

// Missing saveTasks() call - deletions won't persist
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// Missing saveTasks() call - clearing won't persist
function clearAll() {
  tasks = [];
  displayTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// No try/catch - crashes if localStorage data is corrupted
window.onload = function() {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks = JSON.parse(saved);
  displayTasks();
}

// Duplicate function - silently overwrites the one above
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Duplicate window.onload - silently overwrites the one above
window.onload = function() {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks = JSON.parse(saved);
  displayTasks();
}

// Duplicate addTask - overwrites original but still missing saveTasks
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

// Duplicate deleteTask - overwrites original
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  saveTasks();
}