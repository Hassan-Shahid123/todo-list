// function renderHome(projects) {
//     const body = document.querySelector('body');
//     const section = document.createElement('section');
//     for (project of projects) {
//         const div = document.createElement('div');
//         const pName = document.createElement('p');
//         const numTodos = document.createElement('p');

//         div.classList.add('project-card');
//         pName.textContent = project.name;
//         numTodos.textContent = project.todos.length;

//         div.append(pName, numTodos);
//         section.appendChild(div);
//     }
//     body.appendChild(section);
// }
import { projects } from './model.js';

function renderProjects() {
    const projectContainer = document.querySelector('#project-container');
    for (const project of projects.list) {
        const container = document.createElement('div');
        const pProject = document.createElement('p');
        pProject.textContent = project.name;
        container.classList.add('project-item');
        container.appendChild(pProject);
        projectContainer.appendChild(container);
    }
}

function renderProject(project) {
    const main = document.querySelector('main');
    const todoContainer = document.querySelector('#todo-container');
    todoContainer.innerHTML = "";

    const todos = project.todos;
    console.log(todos);

    const todoColor = ['wheat', 'rgb(255, 145, 0)', 'rgb(255, 41, 41)'];

    const projectBtn = document.querySelector('#project-btn');
    const projectHead = document.querySelector('#project-heading');
    projectHead.dataset.id = project.id;
    console.log(projectHead.dataset.id);
    projectHead.textContent = project.name;
    projectHead.style.display = "block";
    projectBtn.style.display = "block";

    if(!todos) return;
    for (const todo of todos) {
        const todoItem = document.createElement('div');
        todoItem.dataset.id = todo.id;

        const pTitle = document.createElement('p');
        const expandBtn = document.createElement('button');
        const pDate = document.createElement('p');
        const pPriority = document.createElement('p');

        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('expand-btn-wrapper');

        pTitle.textContent = todo.title;
        expandBtn.textContent = 'Expand';
        pDate.textContent = todo.dueDate;
        pPriority.textContent = todo.priority;

        todoItem.classList.add('todo-card');
        expandBtn.classList.add('expand-btn');

        btnWrapper.append(pTitle, expandBtn);
        todoItem.append(btnWrapper, pDate, pPriority);
        todoContainer.appendChild(todoItem);

        if(todo.priority === "low") todoItem.style.backgroundColor = todoColor[0];
        else if(todo.priority === "medium") todoItem.style.backgroundColor = todoColor[1];
        else todoItem.style.backgroundColor = todoColor[2];
    }
    main.appendChild(todoContainer);
}

// function renderTodo(todo) {
//     const main = document.querySelector('main');
//     const todoContainer = document.createElement('div');

// }

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