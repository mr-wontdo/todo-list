export { ProjectList };

class ProjectList {
    constructor() {
        this.activeProjectIndex = null;
        this.activeTaskIndex = null;
        this.projectList = [];
    }

    // Set active project and task index
    setActiveProjectIndex(activeProjectIndex) {
        this.activeProjectIndex = activeProjectIndex;
    }

    setActiveTaskIndex(activeTaskIndex) {
        this.activeTaskIndex = activeTaskIndex;
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