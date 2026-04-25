class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.status = 'pending';
    }

    setTitle(title) {
        this.title = title;
    }
    setDescription(desc) {
        this.description = desc;
    }
    setDueDate(date) {
        this.dueDate = date;
    }
    setPriority(priority) {
        this.priority = priority;
    }
    setNotes(notes) {
        this.notes = notes;
    }
    setStatus(status) {
        this.status = status;
    }
}

class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    setName(name) {
        this.name = name;
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    removeTodo(todoId) {
        this.todos.filter((todo) => todo.id !== todoId);
    }
}

const projects = {
    list: [],
    addProject(project) {
        this.list.push(project);
    },

    removeProject(id) {
        this.list.filter((project) => project.id !== id);
    }
}

export { Todo, Project, projects };