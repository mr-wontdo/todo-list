export { loadHomepage };
import { projects } from './project-task.js';
import Storage from './storage.js';

// Initial load
function loadHomepage() {
    Storage.retrieveStorage();
    renderScreen();
}

// Render screen
function renderScreen() {
    console.log(projects);
    appendProjectDOM();
    appendTaskDOM();
}

// Add projects to navbar
function appendProjectDOM() {
    const navBar = document.querySelector('.project-list');
    navBar.textContent = '';

    for (let i = 0; i < projects.projectList.length; i++) {
        const project = document.createElement('div');

        // Create project button
        const projectTitle = document.createElement('button');
        projectTitle.textContent = projects.projectList[i].title;
        projectTitle.addEventListener('click', () => {
            setDefaultProjectsInactive();
            projects.setActiveProjectIndex(i);
            renderScreen();
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            projects.deleteProject(i);
            updateActiveProjectIndex(i);
            Storage.populateStorage();
            renderScreen();
        });

        // Append DOM
        navBar.appendChild(project);
        project.appendChild(projectTitle);
        project.appendChild(deleteButton);
    }

    // Create add project button
    createAddProjectButton();
}

// Add tasks to content
function appendTaskDOM() {
    const content = document.querySelector('.content');
    content.textContent = '';
    if (projects.activeProjectIndex === null) return;

    // Create project title
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = projects.projectList[projects.activeProjectIndex].title;
    content.appendChild(projectTitle);

    for (let i = 0; i < projects.projectList[projects.activeProjectIndex].taskList.length; i++) {
        const task = document.createElement('div');
        const taskElements = document.createElement('div');
        const taskActions = document.createElement('div');

        // Create task elements
        const taskTitle = document.createElement('p');
        taskTitle.textContent = projects.getTaskTitle(projects.activeProjectIndex, i);
        const taskDescription = document.createElement('p');
        taskDescription.textContent = projects.getTaskDescription(projects.activeProjectIndex, i);
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = projects.getTaskDueDate(projects.activeProjectIndex, i);
        const taskPriority = document.createElement('p');
        taskPriority.textContent = projects.getTaskPriority(projects.activeProjectIndex, i);

        // Create task actions
        const editButton = document.createElement('button');
        editButton.textContent = '✎';
        editButton.addEventListener('click', () => {
            projects.setActiveTaskIndex(i);
            populateEditTask();
            document.querySelector('.edit-task').showModal();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            projects.deleteTask(projects.activeProjectIndex, i);
            Storage.populateStorage();
            renderScreen();
        });

        // Append DOM
        content.appendChild(task);
        task.appendChild(taskElements);
        task.appendChild(taskActions);
        taskElements.appendChild(taskTitle);
        taskElements.appendChild(taskDescription);
        taskElements.appendChild(taskDueDate);
        taskElements.appendChild(taskPriority);
        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);
    }

    // Create add task button
    createAddTaskButton();
}

// Add project and task buttons
function createAddProjectButton() {
    const navBar = document.querySelector('.project-list');
    const addButton = document.createElement('button');
    addButton.textContent = '+ Add Project';
    addButton.addEventListener('click', () => {
        document.querySelector('.add-project').showModal();
    });
    navBar.appendChild(addButton);
}

function createAddTaskButton() {
    const content = document.querySelector('.content');
    const addButton = document.createElement('button');
    addButton.textContent = '+ Add Task';
    addButton.addEventListener('click', () => {
        document.querySelector('.add-task').showModal();
    });
    content.appendChild(addButton);
}

// Update active project index when deleting projects
function updateActiveProjectIndex(deletedIndex) {
    if (projects.activeProjectIndex < deletedIndex) {
        return;
    } else if (projects.activeProjectIndex > deletedIndex) {
        projects.activeProjectIndex -= 1;
    } else if (projects.activeProjectIndex === deletedIndex) {
        projects.activeProjectIndex = null;
    } 
}

// Form submission
(function addProjectEventListener() {
    const addProjectDialog = document.querySelector('.add-project'); 
    const addProjectForm = document.querySelector('.add-project form');
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        projects.addProject(document.querySelector('.add-project input#title').value);
        Storage.populateStorage();
        addProjectDialog.close();
        renderScreen();
    });
})();

(function addTaskEventListener() {
    const addTaskDialog = document.querySelector('.add-task');
    const addTaskForm = document.querySelector('.add-task form');
    addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        projects.addTask(
            document.querySelector('.add-task input#title').value,
            document.querySelector('.add-task textarea#description').value,
            document.querySelector('.add-task input#due_date').value,
            document.querySelector('.add-task select#priority').value
        );
        Storage.populateStorage();
        addTaskDialog.close();
        renderScreen();
    });  
})();

(function editTaskEventListener() {
    const editTaskDialog = document.querySelector('.edit-task');
    const editTaskForm = document.querySelector('.edit-task form');
    editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        projects.setTaskTitle(document.querySelector('.edit-task input#title').value);
        projects.setTaskDescription(document.querySelector('.edit-task textarea#description').value);
        projects.setTaskDueDate(document.querySelector('.edit-task input#due_date').value);
        projects.setTaskPriority(document.querySelector('.edit-task select#priority').value);
        projects.setActiveTaskIndex(null);
        Storage.populateStorage();
        editTaskDialog.close();
        if (Object.values(defaultProjects).includes(true)) {
            appendInboxDOM();
        } else {
            renderScreen();  
        }
    });  
})();

function populateEditTask() {
    document.querySelector('.edit-task input#title').value = projects.getTaskTitle(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task textarea#description').value = projects.getTaskDescription(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task input#due_date').value = projects.getTaskDueDate(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task select#priority').value = projects.getTaskPriority(projects.activeProjectIndex, projects.activeTaskIndex);
}

// Default project list logic
const defaultProjects = {
    isInboxActive: null,
    isTodayActive: null,
    isThisWeekActive: null
};

function setDefaultProjectsInactive() {
    for (const key in defaultProjects) {
        defaultProjects[key] = null;
    }
}

(function defaultProjectEventListener() {
    document.querySelectorAll('.default-project-list button').forEach(button => button.addEventListener('click', (e) => {
        setDefaultProjectsInactive();
        projects.setActiveProjectIndex(null);
        projects.setActiveTaskIndex(null);
        switch (e.target.className) {
            case 'inbox':
                defaultProjects.isInboxActive = true
                break;
            case 'today':
                defaultProjects.isTodayActive = true
                break;
            case 'this-week':
                defaultProjects.isThisWeekActive = true
                break;
        }
        appendInboxDOM();
    }))
})();

function appendInboxDOM() {
    const content = document.querySelector('.content');
    content.textContent = '';

    for (let i = 0; i < projects.projectList.length; i++) {
        for (let j = 0; j < projects.projectList[i].taskList.length; j++) {
            // Filter projects due today
            if (defaultProjects.isTodayActive === true) {
                if (projects.getTaskDueDate(i, j) !== getTodayDate()) continue;
            }

            // Filter projects due this week 
            if (defaultProjects.isThisWeekActive === true) {
                if (!(projects.getTaskDueDate(i, j) >= getWeekStartingDate() && projects.getTaskDueDate(i, j) <= getWeekEndingDate())) continue;
            }

            const task = document.createElement('div');
            const taskElements = document.createElement('div');
            const taskActions = document.createElement('div');

            // Create task elements
            const taskTitle = document.createElement('p');
            taskTitle.textContent = projects.getTaskTitle(i, j);
            const taskDescription = document.createElement('p');
            taskDescription.textContent = projects.getTaskDescription(i, j);
            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = projects.getTaskDueDate(i, j);
            const taskPriority = document.createElement('p');
            taskPriority.textContent = projects.getTaskPriority(i, j);

            // Create task actions
            const editButton = document.createElement('button');
            editButton.textContent = '✎';
            editButton.addEventListener('click', () => {
                projects.setActiveProjectIndex(i);
                projects.setActiveTaskIndex(j);
                populateEditTask();
                document.querySelector('.edit-task').showModal();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', () => {
                projects.deleteTask(i, j);
                Storage.populateStorage();
                appendInboxDOM();
            });

            // Append DOM
            content.appendChild(task);
            task.appendChild(taskElements);
            task.appendChild(taskActions);
            taskElements.appendChild(taskTitle);
            taskElements.appendChild(taskDescription);
            taskElements.appendChild(taskDueDate);
            taskElements.appendChild(taskPriority);
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);
        }
    }
}

function getTodayDate() {
    const yyyy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd;
}

function getWeekStartingDate() {
    var today = new Date()
    var starting = new Date(today.setDate(today.getDate() - today.getDay()+1));

    const yyyy = starting.getFullYear();
    let mm = starting.getMonth() + 1;
    let dd = starting.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd;
}

function getWeekEndingDate() {
    var today = new Date()
    var ending = new Date(today.setDate(today.getDate() - today.getDay()+7));

    const yyyy = ending.getFullYear();
    let mm = ending.getMonth() + 1;
    let dd = ending.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd;
}