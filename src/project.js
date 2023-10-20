class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }

    setTitle(title) {
        this.title = title;
    }

    addTodo(title, description, dueDate, priority) {
        this.todoList.push(new Todo(title, description, dueDate, priority));
    }
}