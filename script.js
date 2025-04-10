const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskType = document.getElementById("task-type");
const dailyTasksList = document.getElementById("daily-tasks");
const weeklyTasksList = document.getElementById("weekly-tasks");
const clearDaily = document.getElementById("clear-daily");
const clearWeekly = document.getElementById("clear-weekly");

let tasks = {
  daily: [],
  weekly: []
};

// Load from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("scheduleTasks");
  if (saved) tasks = JSON.parse(saved);
  renderTasks();
});

// Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const type = taskType.value;
  if (text) {
    tasks[type].push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

function renderTasks(e) {
    e.preventDefault();
  dailyTasksList.innerHTML = "";
  weeklyTasksList.innerHTML = "";

  tasks.daily.forEach((task, index) =>
    dailyTasksList.appendChild(createTaskItem(task, "daily", index))
  );
  tasks.weekly.forEach((task, index) =>
    weeklyTasksList.appendChild(createTaskItem(task, "weekly", index))
  );
}

function createTaskItem(e,task, type, index) {
    e.preventDefault();
    
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task.text;

  const actions = document.createElement("span");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔️";
  doneBtn.onclick = () => {
    tasks[type][index].completed = !tasks[type][index].completed;
    saveTasks();
    renderTasks();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => {
    tasks[type].splice(index, 1);
    saveTasks();
    renderTasks();
  };

  actions.appendChild(doneBtn);
  actions.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function saveTasks(e) {
    e.preventDefault();
  localStorage.setItem("scheduleTasks", JSON.stringify(tasks));
}

// Clear buttons
clearDaily.addEventListener("click", () => {
  if (confirm("Clear all daily tasks?")) {
    tasks.daily = [];
    saveTasks();
    renderTasks();
  }
});

clearWeekly.addEventListener("click", () => {
  if (confirm("Clear all weekly tasks?")) {
    tasks.weekly = [];
    saveTasks();
    renderTasks();
  }
});
