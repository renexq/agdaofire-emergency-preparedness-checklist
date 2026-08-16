/*

    1. Create a task Array
    2. displayTasks()  -> shows the list
    3. addTask()       -> adds a task
    4. removeTask(i)   -> removes a task
    5. clearAll()      -> clears all tasks
    6. saveTasks()     -> saves to localStorage
    7. loadTasks()     -> loads from localStorage
    8. loadTasks() + displayTasks() run once when the page loads

*/

// 1. Create a task Array
let tasks = [];

// starting checklist items, used only the very first time
// (before the user has saved anything to localStorage)
let defaultTasks = [
    { text: "Go-bag packed and by the main door", done: true },
    { text: "Two exit routes identified and walked", done: true },
    { text: "Household meeting point agreed", done: true },
    { text: "Wiring and outlets checked", done: true },
    { text: "Emergency numbers saved in every phone", done: false },
    { text: "Fire extinguisher is ready", done: false }
];

// 2. Function to Display tasks
function displayTasks() {
    let html = "";

    for (let i = 0; i < tasks.length; i++) {
        // a checkbox is added before the text so the item
        // can be marked as done 
        // class="..." attributes below are only there for the site's
    
        let checkedAttr = tasks[i].done ? "checked" : "";

        html += "<li class='checklist-item'>" +
            "<input type='checkbox' class='checklist-check' " + checkedAttr + " onchange='markDone(" + i + ")'> " +
            "<span>" + tasks[i].text + "</span>" +
            " <button class='remove-btn' onclick='removeTask(" + i + ")'>x</button></li>";
    }

    document.getElementById("list").innerHTML = html;

    // update the readiness bar every time the list changes
    updateScore();
}

// 3. Function to Add a task
function addTask() {
    let taskInput = document.getElementById("task");
    let text = taskInput.value;

    if (text === "") {
        alert("Please enter your checklist item.");
        return;
    }

    tasks.push({ text: text, done: false });
    taskInput.value = "";
    saveTasks();
    displayTasks();
}

// 4. Function to Remove a task
function removeTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    displayTasks();
}

// 5. Function to Clear all tasks
function clearAll() {
    tasks = [];
    saveTasks();
    displayTasks();
}

// 6. Function to Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 7. Function to Load tasks
function loadTasks() {
    let saved = localStorage.getItem("tasks");

    if (saved !== null) {
        tasks = JSON.parse(saved);
    } else {
        tasks = defaultTasks;
    }
}



//  flip a task's done state on/off
function markDone(i) {
    tasks[i].done = !tasks[i].done;
    saveTasks();
    updateScore();
}

// count how many tasks are done and update the % bar
function updateScore() {
    let done = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done) {
            done++;
        }
    }

    let pct = 0;
    if (tasks.length > 0) {
        pct = Math.round((done / tasks.length) * 100);
    }

    document.getElementById("pctLabel").innerHTML = pct + "%";
    document.getElementById("barFill").style.width = pct + "%";
}

// 8. Load and display tasks when the page loads
loadTasks();
displayTasks();
