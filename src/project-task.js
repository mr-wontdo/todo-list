export { projects };

const projects = new ProjectList();

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

    addTask(title, description, dueDate, priority, complete) {
        this.projectList[this.activeProjectIndex].taskList.push(new Task(title, description, dueDate, priority, complete));
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

    getTaskComplete(projectIndex, taskIndex) {
        return this.projectList[projectIndex].taskList[taskIndex].complete;
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

    setTaskComplete(complete) {
        this.projectList[this.activeProjectIndex].taskList[this.activeTaskIndex].complete = complete;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.taskList = [];
    }
}

class Task {
    constructor(title, description, dueDate, priority, complete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
    }
}

projects.addProject('Project One');
projects.addProject('Project Two');
projects.addProject('Project Three');
projects.addProject('Project Four');

projects.setActiveProjectIndex(0);
projects.addTask('Item One', 'Description of Item One', '2023-01-01', 'high', true);
projects.addTask('Item Two', 'Description of Item Two', '2023-01-01', 'high', true);

projects.setActiveProjectIndex(1);
projects.addTask('Item Three', 'Description of Item Three', '2023-01-01', 'high', true);
projects.addTask('Item Four', 'Description of Item Four', '2023-01-01', 'high', true);

projects.setActiveProjectIndex(2);
projects.addTask('Item Five', 'Description of Item Five', '2023-01-01', 'high', true);
projects.addTask('Item Six', 'Description of Item Six', '2023-01-01', 'high', true);

projects.setActiveProjectIndex(3);
projects.addTask('Item Seven', 'Description of Item Seven', '2023-01-01', 'high', true);
projects.addTask('Item Eight', 'Description of Item Eight', '2023-01-01', 'high', true);

projects.setActiveProjectIndex(null);