// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function showForm(id) {
    $('#edit-form').css('display', 'flex');

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(task => task.id == id);

    if (task) {
        $('#task-name').text(task.name); 
        $('#task-name-input').val(task.name); 
        $('#task-index').val(id);
    } else {
        console.error(`Task with id ${id} not found`);
    }
}


$('#close-button').click(function () {
    $('#edit-form').hide();
});


function openMenu() {
    let $currentRow = $(this).closest('tr'); // Get the current row
    let $menus = $currentRow.find('.menus'); // Get the .menus in the current row
    let $goalText = $currentRow.find('.goal-text'); // Get the .goal-text in the current row
    let $timeLineText = $currentRow.find('.time-line-text'); // Get the .time-line-text in the current row
    let $menu = $currentRow.find('.menu'); // Get the .menu in the current row

    // Get the current open state for the row, default to false if not set
    let isOpen = $menus.data('open') || false;

    if (!isOpen) {
        // Open the menu for the current row
        $menus.css('width', '25%');
        $goalText.css('width', '45%');
        $timeLineText.css('width', '25%');
        $menu.css('left', '0');
        $menus.data('open', true); // Set the open state to true for this row
    } else {
        // Close the menu for the current row
        $goalText.css('width', '60%');
        $timeLineText.css('width', '30%');
        $menu.css('left', '220px');
        $menus.css('width', '5%');
        $menus.data('open', false); // Set the open state to false for this row
    }
}

$(document).on('click', '#three-dots', openMenu);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const taskList = document.getElementById("task-table");
    taskList.innerHTML = ''; // Clear the list

    tasks.forEach((task, index) => {
        let category = categories.filter(category => category.id == task.category);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="width:5%">
                <div class="checkbox-wrapper-13">
                    <input id="c1-13-${index}" type="checkbox" onchange="markAsDone(${index})" ${task.isComplete ? 'checked' : ''}>
                </div>
            </td>
            <td class="goal-text" style="width:60%">${task.name}</td>
            <td class="time-line-text" style="width:30%" align="right">
                <span class="due-date">
                    ${task.category !== null ? 
                        `<img class="cat-img" src="${category[0].image}" alt="${category[0].name}"> ${category[0].name}` 
                        : 
                        `<img class="cat-img" src="assets/images/icons/icons8-category-64.png" alt="Uncategorised"> Uncategorised`
                    }
                </span>
            </td>
            <td class="menus" style="width:5%" align="right">
                <ul>
                    <li><span class="menu info" id="edit" onclick="showForm('${task.id}')">Edit</span></li>
                    <li><span class="menu warning" onclick="deleteTask('${task.id}')">Delete</span></li>
                    <li><span id="three-dots" class="three-dot">&#x22EE;</span></li>
                </ul>
            </td>
        `;
        taskList.appendChild(tr);

    });
    countTasks()
}

function addTask() {
    const taskInput = document.getElementById("new-task-input");
    const task = taskInput.value;
    const category = $('#task-categories').val();

    if (task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let uid = (new Date().getTime()).toString(36) + new Date().getUTCMilliseconds();
        tasks.push({id: uid, name: task, category: category, isComplete: false});
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = ''; // Clear input field
        $("#task-categories option:first").attr('selected','selected');
        loadTasks(); // Reload the list
    } else {
        alert("Please enter a task.");
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(id, taskName) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the index of the task with the matching id
    const taskIndex = tasks.findIndex(task => task.id == id);

    if (taskIndex !== -1) { // Ensure the task exists
        // Update the task's properties
        tasks[taskIndex] = {
            id: tasks[taskIndex].id,
            name: taskName,
            category: tasks[taskIndex].category,
            isComplete: tasks[taskIndex].isComplete
        };

        // Save the updated tasks array back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Reload the tasks (assumed to refresh the UI)
        loadTasks(); 

        // Hide the edit form
        $('#edit-form').hide();
    } else {
        console.error(`Task with id ${id} not found`);
    }
}


function markAsDone(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[id] = {name: tasks[id].name, category: tasks[id].category, isComplete: tasks[id].isComplete ? false : true}
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(isComplete, category) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = [];

    if(isComplete && category == null) {
        filteredTasks = tasks.filter(task => task.isComplete === true);
    }else if(!isComplete && category === null){
        filteredTasks = tasks.filter(task => task.isComplete === false);
    }else if(isComplete == null && category !== null){
        filteredTasks = tasks.filter(task => task.category == category);
    }else{
        filteredTasks = tasks.filter(task => task.category === null || task.category === "null");
    }

    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const taskList = document.getElementById("task-table");
    taskList.innerHTML = ''; // Clear the list


    filteredTasks.forEach((task, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="width:5%">
                <div class="checkbox-wrapper-13">
                    <input id="c1-13-${index}" type="checkbox" onchange="markAsDone(${index})" ${task.isComplete ? 'checked' : ''}>
                </div>
            </td>
            <td class="goal-text" style="width:60%">${task.name}</td>
            <td class="time-line-text" style="width:30%" align="right">
                <span class="due-date">
                    ${categories[task.category] ? 
                        `<img class="cat-img" src="${categories[task.category].image}" alt="${categories[task.category].name}"> ${categories[task.category].name}` 
                        : 
                        `<img class="cat-img" src="assets/images/icons/icons8-category-64.png" alt="Uncategorised"> Uncategorised`
                    }
                </span>
            </td>
            <td class="menus" style="width:5%" align="right">
                <ul>
                    <li><span class="menu info" id="edit" onclick="showForm('${task.id}')">Edit</span></li>
                    <li><span class="menu warning" onclick="deleteTask('${task.id}')">Delete</span></li>
                    <li><span id="three-dots" class="three-dot">&#x22EE;</span></li>
                </ul>
            </td>
        `;
        taskList.appendChild(tr);
    });
    countTasks()
}

function countTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isComplete === true).length;
    const incompleteTasks = tasks.filter(task => task.isComplete === false).length;
    const uncategorisedTasks = tasks.filter(task => task.category === 'null').length;

    $('#all-task').text(totalTasks);
    $('#complete-task').text(completedTasks);
    $('#incomplete-task').text(incompleteTasks);
    $('#uncategorised-task').text(uncategorisedTasks);

}



