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
        // Create project button
        const project = document.createElement('button');
        project.textContent = projects.projectList[i].title;
        project.addEventListener('click', () => {
            setDefaultProjectsInactive();
            projects.setActiveProjectIndex(i);
            renderScreen();
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.style.visibility = 'hidden';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            projects.deleteProject(i);
            updateActiveProjectIndex(i);
            Storage.populateStorage();
            renderScreen();
        });

        // Unhide delete button when hovered
        project.addEventListener('mouseenter', () => {
            deleteButton.removeAttribute('style');
        })

        project.addEventListener('mouseleave', () => {
            deleteButton.style.visibility = 'hidden';
        })

        // Append DOM
        navBar.appendChild(project);
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
        taskTitle.classList.add('title');
        const taskDescription = document.createElement('p');
        taskDescription.textContent = projects.getTaskDescription(projects.activeProjectIndex, i);
        taskDescription.classList.add('description');
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = projects.getTaskDueDate(projects.activeProjectIndex, i);
        taskDueDate.classList.add('due-date');
        const taskPriority = document.createElement('p');
        taskPriority.textContent = capitalizeFirstLetter(projects.getTaskPriority(projects.activeProjectIndex, i));
        taskPriority.classList.add('priority');
        taskPriority.classList.add(projects.getTaskPriority(projects.activeProjectIndex, i));
        
        const taskComplete = document.createElement('input');
        taskComplete.setAttribute('type', 'checkbox');
        taskComplete.setAttribute('id', 'complete');
        taskComplete.setAttribute('name', 'complete');
        taskComplete.checked = projects.getTaskComplete(projects.activeProjectIndex, i);
        taskComplete.addEventListener('click', () => {
            projects.setActiveTaskIndex(i);
            const newTaskComplete = taskComplete.checked ? true : false;
            projects.setTaskComplete(newTaskComplete, projects.activeProjectIndex, projects.activeTaskIndex);
            Storage.populateStorage();
            projects.setActiveTaskIndex(null);
            renderScreen();
        });

        // Strike through text if task is complete
        if (projects.getTaskComplete(projects.activeProjectIndex, i)) {
            taskTitle.textContent = strikeThrough(projects.getTaskTitle(projects.activeProjectIndex, i));
            taskDescription.textContent = strikeThrough(projects.getTaskDescription(projects.activeProjectIndex, i));
        }

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
        taskElements.appendChild(taskComplete);
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
    addButton.textContent = 'Add Project';
    addButton.addEventListener('click', () => {
        document.querySelector('.add-project').showModal();
    });
    navBar.appendChild(addButton);
}

function createAddTaskButton() {
    const content = document.querySelector('.content');
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Task';
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
            appendDefaultProjectDOM();
        } else {
            renderScreen();  
        }
    });  
})();

(function closeFormEventListener() {
    const closeAddProjectButton = document.querySelector('.add-project svg');
    closeAddProjectButton.addEventListener('click', () => {
        document.querySelector('dialog.add-project').close();
        document.querySelector('.add-project > form').reset();
    })
    const closeAddTaskButton = document.querySelector('.add-task svg');
    closeAddTaskButton.addEventListener('click', () => {
        document.querySelector('dialog.add-task').close();
        document.querySelector('.add-task > form').reset();
    })
    const closeEditTaskButton = document.querySelector('.edit-task svg');
    closeEditTaskButton.addEventListener('click', () => {
        document.querySelector('dialog.edit-task').close();
        document.querySelector('.edit-task > form').reset();
    })
})();

function populateEditTask() {
    document.querySelector('.edit-task input#title').value = projects.getTaskTitle(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task textarea#description').value = projects.getTaskDescription(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task input#due_date').value = projects.getTaskDueDate(projects.activeProjectIndex, projects.activeTaskIndex);
    document.querySelector('.edit-task select#priority').value = projects.getTaskPriority(projects.activeProjectIndex, projects.activeTaskIndex);
}

// Default project list logic
const defaultProjects = {
    isAllActive: null,
    isTodayActive: null,
    isWeekActive: null
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
            case 'all':
                defaultProjects.isAllActive = true
                break;
            case 'today':
                defaultProjects.isTodayActive = true
                break;
            case 'week':
                defaultProjects.isWeekActive = true
                break;
        }
        appendDefaultProjectDOM();
    }))
})();

function appendDefaultProjectDOM() {
    const content = document.querySelector('.content');
    content.textContent = '';

    // Create project title
    const projectTitle = document.createElement('h2');
    if (defaultProjects.isAllActive === true) projectTitle.textContent = 'All Tasks';
    if (defaultProjects.isTodayActive === true) projectTitle.textContent = 'Today\'s Tasks';
    if (defaultProjects.isWeekActive === true) projectTitle.textContent = 'This Week\'s Task';
    content.appendChild(projectTitle);

    for (let i = 0; i < projects.projectList.length; i++) {
        for (let j = 0; j < projects.projectList[i].taskList.length; j++) {
            // Filter projects due today
            if (defaultProjects.isTodayActive === true) {
                if (projects.getTaskDueDate(i, j) !== getTodayDate()) continue;
            }

            // Filter projects due this week 
            if (defaultProjects.isWeekActive === true) {
                if (!(projects.getTaskDueDate(i, j) >= getWeekStartingDate() && projects.getTaskDueDate(i, j) <= getWeekEndingDate())) continue;
            }

            const task = document.createElement('div');
            const taskElements = document.createElement('div');
            const taskActions = document.createElement('div');

            // Create task elements
            const taskTitle = document.createElement('p');
            taskTitle.textContent = projects.getTaskTitle(i, j);
            taskTitle.classList.add('title');
            const taskDescription = document.createElement('p');
            taskDescription.classList.add('description');
            taskDescription.textContent = projects.getTaskDescription(i, j);
            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = projects.getTaskDueDate(i, j);
            taskDueDate.classList.add('due-date');
            const taskPriority = document.createElement('p');
            taskPriority.textContent = capitalizeFirstLetter(projects.getTaskPriority(i, j));
            taskPriority.classList.add('priority');
            taskPriority.classList.add(projects.getTaskPriority(i, j));

            const taskComplete = document.createElement('input');
            taskComplete.setAttribute('type', 'checkbox');
            taskComplete.setAttribute('id', 'complete');
            taskComplete.setAttribute('name', 'complete');
            taskComplete.checked = projects.getTaskComplete(i, j);
            taskComplete.addEventListener('click', () => {
                projects.setActiveProjectIndex(i);
                projects.setActiveTaskIndex(j);
                const newTaskComplete = taskComplete.checked ? true : false;
                projects.setTaskComplete(newTaskComplete, projects.activeProjectIndex, projects.activeTaskIndex);
                Storage.populateStorage();
                projects.setActiveProjectIndex(null);
                projects.setActiveTaskIndex(null);
                appendDefaultProjectDOM();
            });

            // Strike through text if task is complete
            if (projects.getTaskComplete(i, j)) {
                taskTitle.textContent = strikeThrough(projects.getTaskTitle(i, j));
                taskDescription.textContent = strikeThrough(projects.getTaskDescription(i, j));
            }

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
                appendDefaultProjectDOM();
            });

            // Append DOM
            content.appendChild(task);
            task.appendChild(taskElements);
            task.appendChild(taskActions);
            taskElements.appendChild(taskTitle);
            taskElements.appendChild(taskDescription);
            taskElements.appendChild(taskDueDate);
            taskElements.appendChild(taskPriority);
            taskElements.appendChild(taskComplete);
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);
        }
    }
}

// Other functions
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

function strikeThrough(string) {
    return string.split('').map(char => char + '\u0336').join('') 
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}