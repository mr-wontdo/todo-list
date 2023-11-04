export { updateDOM };
import { projectList, addProject, deleteProject } from './project.js';

const navBarDOM = document.querySelector('.project-list');
const contentDOM = document.querySelector('.content');
const projectModal = document.querySelector('.project-dialog');
const todoModal = document.querySelector('.todo-dialog');

let activeProjectIndex = null;

function updateDOM() {
    console.log(projectList);
    addProjectDOM();
    if (activeProjectIndex) addTodoDOM(activeProjectIndex);
}

// Add projects to navbar
function addProjectDOM() {
    navBarDOM.textContent = '';
    for (let i = 0; i < projectList.length; i++) {
        // Create project button
        const projectDOMContainer = document.createElement('div');
        const projectDOM = document.createElement('button');
        projectDOM.textContent = projectList[i].title;
        projectDOM.setAttribute('data-index', i);
        projectDOM.addEventListener('click', (e) => {
            addTodoDOM(i);
            setActiveProjectIndex(e);
        });

        // Create delete project button
        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.textContent = '-';
        deleteProjectButton.setAttribute('data-index', i);
        deleteProjectButton.addEventListener('click', (e) => {
            deleteProject(e.srcElement.getAttribute('data-index'));
            updateDOM();
        });

        // Append DOM elements
        navBarDOM.appendChild(projectDOMContainer);
        projectDOMContainer.appendChild(projectDOM);
        projectDOMContainer.appendChild(deleteProjectButton);
    }
    addProjectButtonDOM();
}

// Add todos to content DOM
function addTodoDOM(projectIndex) {
    contentDOM.textContent = '';

    // Add project title to content
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = projectList[projectIndex].title;
    contentDOM.appendChild(projectTitle);

    // Add todo list to content
    for (let i = 0; i < projectList[projectIndex].todoList.length; i++) {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');

        const leftPanel = document.createElement('div');
        leftPanel.classList.add('left-panel');

        const rightPanel = document.createElement('div');
        rightPanel.classList.add('right-panel');

        // Create todo details
        const todoTitle = document.createElement('p');
        todoTitle.textContent = projectList[projectIndex].todoList[i].title;

        const todoDescription = document.createElement('p');
        todoDescription.textContent = projectList[projectIndex].todoList[i].description;

        const todoDueDate = document.createElement('p');
        todoDueDate.textContent = projectList[projectIndex].todoList[i].dueDate;

        const todoPriority = document.createElement('p');
        todoPriority.textContent = projectList[projectIndex].todoList[i].title;

        // Create delete todo button
        const deleteTodoButton = document.createElement('button');
        deleteTodoButton.textContent = '-';
        deleteTodoButton.setAttribute('data-index', i);
        deleteTodoButton.addEventListener('click', () => {
            projectList[projectIndex].deleteTodo(projectList[projectIndex].todoList[i]);
            updateDOM();
        });

        // Append DOM elements
        contentDOM.appendChild(todoContainer);
        todoContainer.appendChild(leftPanel);
        todoContainer.appendChild(rightPanel);
        leftPanel.appendChild(todoTitle);
        leftPanel.appendChild(todoDescription);
        leftPanel.appendChild(todoDueDate);
        leftPanel.appendChild(todoPriority);
        rightPanel.appendChild(deleteTodoButton);  
    }

    addTodoButtonDOM();
    // projectList[projectIndex].todoList.forEach(todo => {
    //     const todoContainer = document.createElement('div');
    //     todoContainer.classList.add('todo-container');

    //     const leftPanel = document.createElement('div');
    //     leftPanel.classList.add('left-panel');

    //     const rightPanel = document.createElement('div');
    //     rightPanel.classList.add('right-panel');

    //     // Create todo details
    //     const todoTitle = document.createElement('p');
    //     todoTitle.textContent = todo.title;

    //     const todoDescription = document.createElement('p');
    //     todoDescription.textContent = todo.description;

    //     const todoDueDate = document.createElement('p');
    //     todoDueDate.textContent = todo.dueDate;

    //     const todoPriority = document.createElement('p');
    //     todoPriority.textContent = todo.priority;

    //     // Create delete todo button
    //     const deleteTodoButton = document.createElement('button');
    //     deleteTodoButton.textContent = '-';

    //     contentDOM.appendChild(todoContainer);
    //     todoContainer.appendChild(leftPanel);
    //     todoContainer.appendChild(rightPanel);
    //     leftPanel.appendChild(todoTitle);
    //     leftPanel.appendChild(todoDescription);
    //     leftPanel.appendChild(todoDueDate);
    //     leftPanel.appendChild(todoPriority);
    //     rightPanel.appendChild(deleteTodoButton);
    // });
}

// Create '+ Add Project' button
function addProjectButtonDOM() {
    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = '+ Add Project';
    addProjectButton.addEventListener('click', () => {
        addProjectFormEventListener();
        projectModal.showModal();
    });

    navBarDOM.appendChild(addProjectButton);
}

// Add event listener to '+ Add Project' form
function addProjectFormEventListener() {
    const projectForm = document.querySelector('.project-dialog form');
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addProject(document.querySelector('.project-dialog input#title').value);
        updateDOM();
        projectModal.close();
        projectForm.reset();
    });
}

// Create '+ Add Todo' button
function addTodoButtonDOM() {
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = '+ Add Task';
    addTodoButton.addEventListener('click', () => {
        document.querySelector('.modal-header').textContent = 'Add Task';
        addTodoFormEventListener();
        todoModal.showModal();
    });

    contentDOM.appendChild(addTodoButton);
}

// Add event listener to 'Add Todo' form
function addTodoFormEventListener() {
    const todoForm = document.querySelector('.todo-dialog form');
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        projectList[activeProjectIndex].addTodo(
            document.querySelector('.todo-dialog input#title').value,
            document.querySelector('.todo-dialog textarea#description').value,
            document.querySelector('.todo-dialog input#due_date').value,
            document.querySelector('.todo-dialog select#priority').value
        );
        updateDOM();
        todoModal.close();
        todoForm.reset();
    });
}

// Set active project
function setActiveProjectIndex(e) {
    activeProjectIndex = e.srcElement.getAttribute('data-index');
}