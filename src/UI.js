export { loadHomepage };
import { projects } from './project-task.js';

// Initial load
function loadHomepage() {
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
            projects.setActiveProjectIndex(i);
            renderScreen();
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            projects.deleteProject(i);
            updateActiveProjectIndex(i);
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

// Form submission
(function addProjectEventListener() {
    const addProjectDialog = document.querySelector('.add-project'); 
    const addProjectForm = document.querySelector('.add-project form');
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        projects.addProject(document.querySelector('.add-project input#title').value);
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
        editTaskDialog.close();
        renderScreen();
    });  
})();

function populateEditTask() {
    document.querySelector('.edit-task input#title').value = projects.getTaskTitle(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task textarea#description').value = projects.getTaskDescription(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task input#due_date').value = projects.getTaskDueDate(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task select#priority').value = projects.getTaskPriority(projects.activeProjectIndex, projects.activeTaskIndex);
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