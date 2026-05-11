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
    console.log(project);
    currProjectId = project.id;
    renderProject(project);
    setEditListener();
});

let editedTodo;
const editDialog = document.querySelector('#edit-dialog');
function setEditListener() {
    const expandBtnList = document.querySelectorAll('.expand-btn');
    const expandBtns = Array.from(expandBtnList);

    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const todoElem = e.target.closest('.todo-card');
            const project = projects.list.find(proj => proj.id === currProjectId);
            const todo = project.todos.find(todo => todo.id === todoElem.dataset.id);
            editedTodo = todo;

            console.log('Here');
            fillDialog(todo);
            editDialog.showModal();
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
    renderProject(project);
    setEditListener();
})

const editCancelBtn = document.querySelector('#edit-cancel-btn');
editCancelBtn.addEventListener('click', (e) => {
    editDialog.close();
})

// for filling dialog
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
const projectBtn = document.querySelector('.project-btn');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const dialog = document.querySelector('#todo-dialog');
const form = document.querySelector('#todo-form');
const projectHead = document.querySelector('#project-heading');

cancelBtn.addEventListener('click', () => {
    dialog.close();
});
projectBtn.addEventListener('click', () => {
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
    renderProject(project);
    setEditListener();
});

renderProjects();