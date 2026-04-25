function renderHome(projects) {
    const body = document.querySelector('body');
    const section = document.createElement('section');
    for (project of projects) {
        const div = document.createElement('div');
        const pName = document.createElement('p');
        const numTodos = document.createElement('p');

        div.classList.add('project-card');
        pName.textContent = project.name;
        numTodos.textContent = project.todos.length;

        div.append(pName, numTodos);
        section.appendChild(div);
    }
    body.appendChild(section);
}

function renderProject(project) {
    const body = document.querySelector('body');
    const section = document.createElement('section');              
    const todos = project.todos;

    for(todo of todos) {
        const todoItem = document.createElement('div');
        const pTitle = document.createElement('p');
        const pDate = document.createElement('p');
        const pPriority = document.createElement('p');

        pTitle.textContent = todo.title;
        pDate.textContent = todo.dueDate;
        pPriority.textContent = todo.priority;

        todoItem.classList.add('todo-card');
        todoItem.append(pTitle, pDate, pPriority);
        section.appendChild(todoItem);
    }
    section.appendChild(section);
}