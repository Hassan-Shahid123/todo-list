import { projects } from './model.js';
import trashIcon from '../icons/trash.svg';
import penIcon from '../icons/pen.svg';

function renderProjects() {
    const projectContainer = document.querySelector('#project-container');
    projectContainer.replaceChildren();
    for (const project of projects.list) {
        const container = document.createElement('div');
        const pProject = document.createElement('p');
        const delProjBtn = document.createElement('button');
        addIcon(delProjBtn, trashIcon, "proj-del-icon");
        delProjBtn.className = 'proj-del-btn';

        pProject.textContent = project.name;
        container.classList.add('project-item');
        container.append(pProject, delProjBtn);
        container.dataset.id = project.id;
        projectContainer.appendChild(container);
    }
}

function renderProject(project) {
    const main = document.querySelector('main');
    const todoContainer = document.querySelector('#todo-container');
    todoContainer.innerHTML = "";

    const todos = project.todos;
    console.log(todos);

    const todoColor = ['rgb(0, 167, 3)', 'rgb(255, 145, 0)', 'rgb(255, 41, 41)'];

    const projectBtn = document.querySelector('#project-btn');
    const projectHead = document.querySelector('#project-heading');
    projectHead.dataset.id = project.id;
    console.log(projectHead.dataset.id);
    projectHead.textContent = project.name;
    projectHead.style.display = "block";
    projectBtn.style.display = "block";

    if(!todos) return;
    for (const todo of todos) {
        console.log(todo);
        const todoItem = document.createElement('div');
        todoItem.dataset.id = todo.id;

        const pTitle = document.createElement('p');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const pDate = document.createElement('p');
        const pPriority = document.createElement('p');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'check-wrapper';

        checkbox.className = 'checkbox';

        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('todo-btns-wrapper');

        pTitle.textContent = todo.title;
        pDate.textContent = '📅 ' + todo.dueDate;
        pPriority.textContent = todo.priority;
        addIcon(editBtn, penIcon, "icon");
        addIcon(deleteBtn, trashIcon, "icon");

        pTitle.classList.add('todo-title');
        pDate.classList.add('todo-date');
        todoItem.classList.add('todo-card');
        editBtn.classList.add('edit-btn');
        deleteBtn.classList.add('delete-btn');

        checkboxContainer.append(pTitle, checkbox);
        btnWrapper.append(editBtn, deleteBtn);
        todoItem.append(checkboxContainer, btnWrapper, pDate, pPriority, btnWrapper);
        todoContainer.appendChild(todoItem);

        if(todo.priority === "low") todoItem.style.backgroundColor = todoColor[0];
        else if(todo.priority === "medium") todoItem.style.backgroundColor = todoColor[1];
        else todoItem.style.backgroundColor = todoColor[2];

        editBtn.style.backgroundColor = todoItem.style.backgroundColor;
        deleteBtn.style.backgroundColor = todoItem.style.backgroundColor;
        console.log(todo.status);
        if(todo.status === 'done') {
            todoItem.classList.add('crossed-out');
            checkbox.checked = true;
        }
    }
    main.appendChild(todoContainer);
}

function addIcon(button, icon, iconClass) {
    const img = document.createElement('img');
    img.src = icon;
    img.className = iconClass;
    button.appendChild(img);
}

function expandTodo(todoElem, todo) {
    if(todo.description) {
        const p = document.createElement('p');
        p.textContent = 'Description: ' + todo.description;
        todoElem.append(p);
    }

    if(todo.notes) {
        const p = document.createElement('p');
        p.textContent = 'Notes: ' + todo.notes;
        todoElem.append(p);
    }
    console.log(todoElem);
}

export { renderProjects, renderProject, expandTodo };