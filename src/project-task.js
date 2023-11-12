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

    // Get tasks
    getTaskTitle(projectIndex, taskIndex) {
        return this.projectList[projectIndex].taskList[taskIndex].title;
    }

    getTaskDescription(projectIndex, taskIndex) {
        return this.projectList[projectIndex].taskList[taskIndex].description;
    }

    getTaskDueDate(projectIndex, taskIndex) {
        return this.projectList[projectIndex].taskList[taskIndex].dueDate;
    }

    getTaskPriority(projectIndex, taskIndex) {
        return this.projectList[projectIndex].taskList[taskIndex].priority;
    }

    // Set projects and tasks
    setTaskTitle(title) {
        this.projectList[this.activeProjectIndex].taskList[this.activeTaskIndex].title = title;
    }

    setTaskDescription(description) {
        this.projectList[this.activeProjectIndex].taskList[this.activeTaskIndex].description = description;
    }

    setTaskDueDate(dueDate) {
        this.projectList[this.activeProjectIndex].taskList[this.activeTaskIndex].dueDate = dueDate;
    }
    
    setTaskPriority(priority) {
        this.projectList[this.activeProjectIndex].taskList[this.activeTaskIndex].priority = priority;
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