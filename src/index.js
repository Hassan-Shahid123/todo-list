import './styles.css';
import { Todo, Project, projects } from './model.js';
import { renderProjects, renderProject, expandTodo } from './view.js';

// state for managing app data
let currProjectId = null;

// for opening projects
const projectContainer = document.querySelector('#project-container');
projectContainer.addEventListener('click', function (e) {
    const projectName = e.target.textContent;
    const project = projects.list.find(proj => proj.name === projectName);
    if (!project) {
        return;
    }
    currProjectId = project.id;
    setProjDelListener();
    renderProject(project);
    openProject(project);
});

// helper for deleting projects
function deleteProject(e) {
    const projElem = e.target.closest('.project-item');
    const proj = projects.list.find(proj => proj.id === projElem.dataset.id);
    console.log(proj);
    projects.removeProject(proj.id);
    displayProjectList();
}

function setProjDelListener() {
    const delBtnList = document.querySelectorAll('.proj-del-btn');
    const delBtnArr = Array.from(delBtnList);

    delBtnArr.forEach(btn => {
        btn.addEventListener('click', deleteProject);
    });
}

function openProject(project) {
    renderProject(project);
    setEditListener();
    setDeleteListener();
    setCheckbox();
}

// helper for checking todos
function checkHandler(e) {
    const todoElem = e.target.closest('.todo-card');
    const project = projects.list.find(proj => proj.id === currProjectId);
    const todo = project.todos.find(todo => todo.id === todoElem.dataset.id);
    if (todo.status === 'pending') {
        todo.status = 'done';
    }
    else {
        todo.status = 'pending';
    }
    openProject(project);
}

function setCheckbox() {
    const checkboxList = document.querySelectorAll('.checkbox');
    const checkboxArray = Array.from(checkboxList);

    checkboxArray.forEach(checkbox => {
        checkbox.addEventListener('change', checkHandler);
    });
}

let editedTodo;
const editDialog = document.querySelector('#edit-dialog');
function setEditListener() {
    const editBtnList = document.querySelectorAll('.edit-btn');
    const editBtns = Array.from(editBtnList);

    editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoElem = e.target.closest('.todo-card');
            const project = projects.list.find(proj => proj.id === currProjectId);
            const todo = project.todos.find(todo => todo.id === todoElem.dataset.id);
            editedTodo = todo;

            fillDialog(todo);
            editDialog.showModal();
        });
    });
}

function setDeleteListener() {
    const deleteBtnList = document.querySelectorAll('.delete-btn');
    const deleteBtns = Array.from(deleteBtnList);
    console.log(deleteBtns);
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoElem = e.target.closest('.todo-card');
            const project = projects.list.find(proj => proj.id === currProjectId);
            const todo = project.todos.find(todo => todo.id === todoElem.dataset.id);
            project.removeTodo(todo.id);
            console.log('working?');
            openProject(project);
        });
    });
}

const editForm = document.querySelector('#edit-form');
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!editForm.checkValidity()) {
        editForm.reportValidity();
        return;
    }

    editDialog.close();

    editTodo(editedTodo);

    const project = projects.list.find(proj => proj.id === currProjectId);
    console.log(project);
    openProject(project);
})

const editCancelBtn = document.querySelector('#edit-cancel-btn');
editCancelBtn.addEventListener('click', (e) => {
    editDialog.close();
})

// for filling dialog with todo data
function fillDialog(todo) {
    const editForm = document.querySelector('#edit-form');
    editForm.reset();

    const title = document.querySelector('#edit-title');
    const desc = document.querySelector('#edit-desc');
    const dueDate = document.querySelector('#edit-date');
    const priority = document.querySelector('#edit-priority');
    const notes = document.querySelector('#edit-notes');

    title.value = todo.title;
    desc.value = todo.description;
    dueDate.value = todo.dueDate;
    priority.value = todo.priority;
    notes.value = todo.notes;
}

function editTodo(todo) {
    const formEntries = new FormData(editForm);
    const formData = Object.fromEntries(formEntries);
    if (!formData.description) formData.description = "";
    if (!formData.notes) formData.notes = "";

    todo.setTitle(formData.title);
    todo.setDescription(formData.description);
    todo.setDueDate(formData.dueDate);
    todo.setPriority(formData.priority);
    todo.setNotes(formData.notes);
}

// for creating todos
const todoButton = document.querySelector('.todo-btn');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const dialog = document.querySelector('#todo-dialog');
const form = document.querySelector('#todo-form');
const projectHead = document.querySelector('#project-heading');

cancelBtn.addEventListener('click', () => {
    dialog.close();
});
todoButton.addEventListener('click', () => {
    form.reset();
    dialog.showModal();
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    dialog.close();

    const formEntries = new FormData(form);
    const formData = Object.fromEntries(formEntries);
    if (!formData.description) formData.description = "";
    if (!formData.notes) formData.notes = "";

    const todo = new Todo(formData.title, formData.description, formData.dueDate, formData.priority, formData.notes);

    const projectId = projectHead.dataset.id;
    console.log(projectId);
    const project = projects.list.find(proj => proj.id === projectId);
    if (!project) {
        console.log('No project to add todo!');
        return;
    }
    project.addTodo(todo);
    openProject(project);
});


// event listeners for adding projects
const addProjectBtn = document.querySelector('#add-project-btn');
const addProjectForm = document.querySelector('#add-project-form');
const addProjCancelBtn = document.querySelector('#add-project-cancel-btn');

addProjCancelBtn.addEventListener('click', () => {
    addProjectForm.reset();
    addProjectForm.style.display = 'none';
    addProjectBtn.style.display = 'block';
});

addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!addProjectForm.checkValidity()) {
        addProjectForm.reportValidity();
        return;
    }

    const projectName = document.querySelector('#project-name-input').value;
    const project = new Project(projectName);
    projects.addProject(project);

    addProjectForm.reset();
    addProjectForm.style.display = 'none';
    addProjectBtn.style.display = 'block';

    displayProjectList();
});

addProjectBtn.addEventListener('click', (e) => {
    addProjectForm.style.display = 'block';
    addProjectBtn.style.display = 'none';
});


function displayProjectList() {
    renderProjects();
    setProjDelListener();
}

displayProjectList();
