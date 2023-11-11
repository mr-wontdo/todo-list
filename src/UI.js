export { updateScreen };
import { projects } from './index.js';


// Update screen
function updateScreen() {
    console.log(projects);
    appendProjectDOM();
    if (projects.activeProjectIndex !== null) appendTaskDOM();
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
            updateScreen();
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            projects.deleteProject(i);
            updateScreen();
        });

        // Append DOM
        navBar.appendChild(project);
        project.appendChild(projectTitle);
        project.appendChild(deleteButton);
    }

    // Create add project button
    const addButton = document.createElement('button');
    addButton.textContent = '+ Add Project';
    addButton.addEventListener('click', () => {
        addProjectDialog.showModal();
    });
    navBar.appendChild(addButton);
}

// Add tasks to content
function appendTaskDOM() {
    const content = document.querySelector('.content');
    content.textContent = 'test';

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
        taskTitle.textContent = projects.projectList[projects.activeProjectIndex].taskList[i].title;
        const taskDescription = document.createElement('p');
        taskDescription.textContent = projects.projectList[projects.activeProjectIndex].taskList[i].description;
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = projects.projectList[projects.activeProjectIndex].taskList[i].dueDate;
        const taskPriority = document.createElement('p');
        taskPriority.textContent = projects.projectList[projects.activeProjectIndex].taskList[i].priority;

        // Create task actions
        const editButton = document.createElement('button');
        editButton.textContent = '✎';
        editButton.addEventListener('click', () => {

        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            projects.deleteTask(projects.activeProjectIndex, i);
            updateScreen();
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
    const addButton = document.querySelector('button');
    addButton.textContent = '+ Add Task';
    addButton.addEventListener('click', () => {
        addTaskDialog.showModal();
    });
    content.appendChild(addButton);
}

// Form submission
const addProjectDialog = document.querySelector('.add-project'); 
const addProjectForm = document.querySelector('.add-project form');
addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    projects.addProject(document.querySelector('.add-project input#title').value);
    addProjectDialog.close();
    updateScreen();
});

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
    updateScreen();
});























// export { updateDOM };
// import { projectList, addProject, deleteProject } from './project.js';

// const navBarDOM = document.querySelector('.project-list');
// const contentDOM = document.querySelector('.content');
// const projectModal = document.querySelector('.project-dialog');
// const todoModal = document.querySelector('.todo-dialog');

// let activeProjectIndex = null;

// function updateDOM() {
//     console.log(projectList);
//     addProjectDOM();
//     if (activeProjectIndex) addTodoDOM(activeProjectIndex);
// }

// // Add projects to navbar
// function addProjectDOM() {
//     navBarDOM.textContent = '';
//     for (let i = 0; i < projectList.length; i++) {
//         // Create project button
//         const projectDOMContainer = document.createElement('div');
//         const projectDOM = document.createElement('button');
//         projectDOM.textContent = projectList[i].title;
//         projectDOM.setAttribute('data-index', i);
//         projectDOM.addEventListener('click', (e) => {
//             addTodoDOM(i);
//             setActiveProjectIndex(e);
//         });

//         // Create delete project button
//         const deleteProjectButton = document.createElement('button');
//         deleteProjectButton.textContent = '-';
//         deleteProjectButton.setAttribute('data-index', i);
//         deleteProjectButton.addEventListener('click', (e) => {
//             deleteProject(e.srcElement.getAttribute('data-index'));
//             updateDOM();
//         });

//         // Append DOM elements
//         navBarDOM.appendChild(projectDOMContainer);
//         projectDOMContainer.appendChild(projectDOM);
//         projectDOMContainer.appendChild(deleteProjectButton);
//     }
//     addProjectButtonDOM();
// }

// // Add todos to content DOM
// function addTodoDOM(projectIndex) {
//     contentDOM.textContent = '';

//     // Add project title to content
//     const projectTitle = document.createElement('h2');
//     projectTitle.textContent = projectList[projectIndex].title;
//     contentDOM.appendChild(projectTitle);

//     // Add todo list to content
//     for (let i = 0; i < projectList[projectIndex].todoList.length; i++) {
//         const todoContainer = document.createElement('div');
//         todoContainer.classList.add('todo-container');

//         const leftPanel = document.createElement('div');
//         leftPanel.classList.add('left-panel');

//         const rightPanel = document.createElement('div');
//         rightPanel.classList.add('right-panel');

//         // Create todo details
//         const todoTitle = document.createElement('p');
//         todoTitle.textContent = projectList[projectIndex].todoList[i].title;

//         const todoDescription = document.createElement('p');
//         todoDescription.textContent = projectList[projectIndex].todoList[i].description;

//         const todoDueDate = document.createElement('p');
//         todoDueDate.textContent = projectList[projectIndex].todoList[i].dueDate;

//         const todoPriority = document.createElement('p');
//         todoPriority.textContent = projectList[projectIndex].todoList[i].priority;

//         // Create delete todo button
//         const deleteTodoButton = document.createElement('button');
//         deleteTodoButton.textContent = '-';
//         deleteTodoButton.setAttribute('data-index', i);
//         deleteTodoButton.addEventListener('click', () => {
//             projectList[projectIndex].deleteTodo(projectList[projectIndex].todoList[i]);
//             updateDOM();
//         });

//         // Create edit todo button
//         const editTodoButton = document.createElement('button');
//         editTodoButton.textContent = 'Edit';
//         editTodoButton.setAttribute('data-index', i);
//         editTodoButton.addEventListener('click', () => {
//             populateEditTodo(activeProjectIndex, i);
//             editTodoFormEventListener(i);
//             todoModal.showModal();
//             updateDOM();
//         });

//         // Append DOM elements
//         contentDOM.appendChild(todoContainer);
//         todoContainer.appendChild(leftPanel);
//         todoContainer.appendChild(rightPanel);
//         leftPanel.appendChild(todoTitle);
//         leftPanel.appendChild(todoDescription);
//         leftPanel.appendChild(todoDueDate);
//         leftPanel.appendChild(todoPriority);
//         rightPanel.appendChild(deleteTodoButton);  
//         rightPanel.appendChild(editTodoButton);  
//     }

//     addTodoButtonDOM();
// }

// // Create '+ Add Project' button
// function addProjectButtonDOM() {
//     const addProjectButton = document.createElement('button');
//     addProjectButton.textContent = '+ Add Project';
//     addProjectButton.addEventListener('click', () => {
//         addProjectFormEventListener();
//         projectModal.showModal();
//     });

//     navBarDOM.appendChild(addProjectButton);
// }

// // Add event listener to '+ Add Project' form
// function addProjectFormEventListener() {
//     const projectForm = document.querySelector('.project-dialog form');
//     projectForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         addProject(document.querySelector('.project-dialog input#title').value);
//         updateDOM();
//         projectModal.close();
//         projectForm.reset();
//     });
// }

// // Create '+ Add Todo' button
// function addTodoButtonDOM() {
//     const addTodoButton = document.createElement('button');
//     addTodoButton.textContent = '+ Add Task';
//     addTodoButton.addEventListener('click', () => {
//         document.querySelector('.modal-header').textContent = 'Add Task';
//         addTodoFormEventListener();
//         todoModal.showModal();
//     });

//     contentDOM.appendChild(addTodoButton);
// }

// // Add event listener to 'Add Todo' form
// function addTodoFormEventListener() {
//     const todoForm = document.querySelector('.todo-dialog form');
//     todoForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         projectList[activeProjectIndex].addTodo(
//             document.querySelector('.todo-dialog input#title').value,
//             document.querySelector('.todo-dialog textarea#description').value,
//             document.querySelector('.todo-dialog input#due_date').value,
//             document.querySelector('.todo-dialog select#priority').value
//         );
//         updateDOM();
//         todoModal.close();
//         todoForm.reset();
//     });
// }

// // Add event listener to 'Edit Todo' form
// function editTodoFormEventListener(todoIndex) {
//     const todoForm = document.querySelector('.todo-dialog form');
//     todoForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         projectList[activeProjectIndex].todoList[todoIndex].title = document.querySelector('.todo-dialog input#title').value;
//         projectList[activeProjectIndex].todoList[todoIndex].description = document.querySelector('.todo-dialog textarea#description').value;
//         projectList[activeProjectIndex].todoList[todoIndex].dueDate = document.querySelector('.todo-dialog input#due_date').value;
//         projectList[activeProjectIndex].todoList[todoIndex].priority = document.querySelector('.todo-dialog select#priority').value;
//         updateDOM();
//         todoModal.close();
//         todoForm.reset();
//     });
// }

// // Set active project
// function setActiveProjectIndex(e) {
//     activeProjectIndex = e.srcElement.getAttribute('data-index');
// }

// // Populate edit todo form
// function populateEditTodo(projectIndex, todoIndex) {
//     document.querySelector('.todo-dialog input#title').value = projectList[projectIndex].todoList[todoIndex].title;
//     document.querySelector('.todo-dialog textarea#description').value = projectList[projectIndex].todoList[todoIndex].description;
//     document.querySelector('.todo-dialog input#due_date').value = projectList[projectIndex].todoList[todoIndex].dueDate;
//     document.querySelector('.todo-dialog select#priority').value = projectList[projectIndex].todoList[todoIndex].priority;
// }