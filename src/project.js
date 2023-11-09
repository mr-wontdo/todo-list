export { ProjectList };

class ProjectList {
    constructor() {
        this.activeProjectIndex = null;
        this.projectList = [];
    }

    setActiveProjectIndex(newActiveProjectIndex) {
        this.activeProjectIndex = newActiveProjectIndex;
    }

    // Add and delete projects and tasks
    addProject(title) {
        this.projectList.push(new Project(title));
    }

    addTask(title, description, dueDate, priority) {
        this.projectList[this.activeProjectIndex].taskList.push(new Task(title, description, dueDate, priority));
    }

    deleteProject(projectIndex) {
        this.projectList.splice(projectIndex, 1);
    }

    deleteTask(projectIndex, taskIndex) {
        this.projectList[projectIndex].taskList.splice(taskIndex, 1);
    }

    // Set projects and tasks
    setProjectTitle(title, projectIndex) {
        this.projectList[projectIndex].title = title;
    }

    setTaskTitle(title, taskIndex) {
        this.projectList[this.activeProjectIndex].taskList[taskIndex].title = title;
    }

    setTaskDescription(description, taskIndex) {
        this.projectList[this.activeProjectIndex].taskList[taskIndex].description = description;
    }

    setTaskDueDate(dueDate, taskIndex) {
        this.projectList[this.activeProjectIndex].taskList[taskIndex].dueDate = dueDate;
    }
    
    setTaskPriority(priority, taskIndex) {
        this.projectList[this.activeProjectIndex].taskList[taskIndex].priority = priority;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.taskList = [];
    }
}

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}





















// export { projectList, addProject, deleteProject };
// import { Todo } from './todo.js';

// let projectList = [];

// class Project {
//     constructor(title) {
//         this.title = title;
//         this.todoList = [];
//     }

//     setTitle(title) {
//         this.title = title;
//     }

//     addTodo(title, description, dueDate, priority) {
//         this.todoList.push(new Todo(title, description, dueDate, priority));
//     }

//     deleteTodo(todoIndex) {
//         delete this.todoList.splice(todoIndex, 1);
//     }

// }

// function addProject(title) {
//     projectList.push(new Project(title));
// }

// function deleteProject(projectIndex) {
//     projectList.splice(projectIndex, 1);
// }