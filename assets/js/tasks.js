// Load tasks from local storage on page load
$(document).ready(function () {
    loadTasks();
    loadCategory();
})

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
                    <input id="c1-13-${index}" type="checkbox" onchange="markAsDone('${task.id}')" ${task.isComplete ? 'checked' : ''}>
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
    addActiveClass();
}

function addTask() {
    const taskInput = document.getElementById("new-task-input");
    const task = taskInput.value;
    const category = $('#task-categories').val();
    if (task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let uid = (new Date().getTime()).toString(36) + new Date().getUTCMilliseconds();
        tasks.push({ id: uid, name: task, category: category, isComplete: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = ''; // Clear input field
        $("#task-categories option:first").attr('selected', 'selected');
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
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            id: tasks[taskIndex].id,
            name: taskName,
            category: tasks[taskIndex].category,
            isComplete: tasks[taskIndex].isComplete
        };

        localStorage.setItem("tasks", JSON.stringify(tasks));

        loadTasks();

        $('#edit-form').hide();
    } else {
        console.error(`Task with id ${id} not found`);
    }
}

function markAsDone(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.id == id);
    console.log(tasks[taskIndex])
    if (taskIndex !== -1) {
        if (tasks[taskIndex].isComplete == true) {
            tasks[taskIndex] = {
                id: tasks[taskIndex].id,
                name: tasks[taskIndex].name,
                category: tasks[taskIndex].category,
                isComplete: false
            };
        } else {
            tasks[taskIndex] = {
                id: tasks[taskIndex].id,
                name: tasks[taskIndex].name,
                category: tasks[taskIndex].category,
                isComplete: true
            };
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        $('#edit-form').hide();
    } else {
        console.error(`Task with id ${id} not found`);
    }
}

function filterTasks(isComplete, category) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = [];

    if (isComplete && category == null) {
        filteredTasks = tasks.filter(task => task.isComplete === true);
    } else if (!isComplete && category === null) {
        filteredTasks = tasks.filter(task => task.isComplete === false);
    } else if (isComplete == null && category !== null) {
        filteredTasks = tasks.filter(task => task.category == category);
    } else {
        filteredTasks = tasks.filter(task => task.category === null || task.category === "null");
    }

    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const taskList = document.getElementById("task-table");
    taskList.innerHTML = ''; // Clear the list


    filteredTasks.forEach((task, index) => {
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
                    ${category ?
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
    addActiveClass()
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


$('#add-new-task').keypress(function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
})

$('#task-name-input').keypress(function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let index = $('#task-index').val()
        let task = $('#task-name-input').val()
        editTask(index, task)
    }
})

$('#input-tirgger').click(function () {
    $('#category-img').click();
})

let imageUrl = '';

document.getElementById('category-img').addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
        imageUrl = reader.result;
    })
    reader.readAsDataURL(this.files[0]);
});

$('#newCategory').keypress(function (e) {

    let category = $('#newCategory').val();
    let uid = (new Date().getTime()).toString(36) + new Date().getUTCMilliseconds();

    if (e.key === 'Enter') {
        if (category) {
            let categories = JSON.parse(localStorage.getItem("categories")) || [];
            categories.push({ id: uid, name: category, image: imageUrl });
            localStorage.setItem("categories", JSON.stringify(categories));
            loadCategory();
        }
    }
})

function loadCategory() {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let categoryList = $('#category-list');
    let taskCategories = $('#task-categories');
    $('#newCategory').val(null);
    $('li.custom-category').remove();
    taskCategories.find('option:not(:first)').remove()
    categories.forEach((category, index) => {
        let newCategory = $(`
            <li class="custom-category" onclick="filterTasks(null, '${category.id}')">
                <span class="icon-img"><img src="${category.image}" alt="">
                    <p>${category.name}</p>
                </span>

                <span onclick="deleteCategory('${category.id}')" class="task-counter"><img src="assets/images/icons/icons8-trash-48.png"></span>
            </li>
        `)
        categoryList.find('li:last').before(newCategory);

        let option = $(`<option value="${category.id}">${category.name}</option>`);

        taskCategories.find('option:first').after(option);
    });
}

function deleteCategory(id) {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories = categories.filter(category => category.id !== id);
    localStorage.setItem("categories", JSON.stringify(categories));
    loadCategory();
}


