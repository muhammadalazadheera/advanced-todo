$(document).ready(function () {

    $('#add-new-task').keypress(function(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            addTask();
        }
    })

    $('#task-name-input').keypress(function(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            let index = $('#task-index').val()
            let task = $('#task-name-input').val()
            editTask(index, task)
        }
    })

    $('#input-tirgger').click(function(){
        $('#category-img').click();
    })

})

let imageUrl = '';

document.getElementById('category-img').addEventListener('change', function(){
    const reader = new FileReader();
    reader.addEventListener('load', function(){
        imageUrl = reader.result;
    })
    reader.readAsDataURL(this.files[0]);
});

$('#newCategory').keypress(function(e){
    let category = $('#newCategory').val();
    let uid = (new Date().getTime()).toString(36) + new Date().getUTCMilliseconds();

    if(e.key === 'Enter'){
        if(category) {
            let categories = JSON.parse(localStorage.getItem("categories")) || [];
            categories.push({id: uid,name: category, image: imageUrl});
            localStorage.setItem("categories", JSON.stringify(categories));
            loadCategory();
        }
    }
})

document.addEventListener("DOMContentLoaded", loadCategory);

function loadCategory(){
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let categoryList = $('#category-list');
    let taskCategories = $('#task-categories');
    $('#newCategory').val(null);
    $('li.custom-category').remove();
    taskCategories.find('option:not(:first)').remove()
    categories.forEach((category, index) => {
        let newCategory = $(`
            <li class="custom-category" onclick="filterTasks(null, ${index})">
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
