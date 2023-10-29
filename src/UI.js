export { updateDOM };
import { projectList, addProject } from './project.js';

const navBarDOM = document.querySelector('.project-list');
const contentDOM = document.querySelector('.content');
const projectModal = document.querySelector('.project-dialog');
const todoModal = document.querySelector('.todo-dialog');

let activeProjectIndex = null;

function updateDOM() {
    console.log(projectList);
    addProjectDOM();
}

// Add projects to navbar
function addProjectDOM() {
    navBarDOM.textContent = '';
    for (let i = 0; i < projectList.length; i++) {
        const projectDOM = document.createElement('button');
        projectDOM.textContent = projectList[i].title;
        projectDOM.setAttribute('data-index', i);
        projectDOM.addEventListener('click', (e) => {
            addTodoDOM(i);
            setActiveProject(e);
        });

        navBarDOM.appendChild(projectDOM);
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
    projectList[projectIndex].todoList.forEach(todo => {
        const todoContainer = document.createElement('div');

        const todoTitle = document.createElement('p');
        todoTitle.textContent = todo.title;

        const todoDescription = document.createElement('p');
        todoDescription.textContent = todo.description;

        const todoDueDate = document.createElement('p');
        todoDueDate.textContent = todo.dueDate;

        const todoPriority = document.createElement('p');
        todoPriority.textContent = todo.priority;

        contentDOM.appendChild(todoContainer);
        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoDescription);
        todoContainer.appendChild(todoDueDate);
        todoContainer.appendChild(todoPriority);
    });

    addTodoButtonDOM();
}

// Create '+ Add Project' button
function addProjectButtonDOM() {
    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = '+ Add Project';
    addProjectButton.addEventListener('click', () => {
        projectModal.showModal();
    });

    navBarDOM.appendChild(addProjectButton);
}

// Create '+ Add Todo' button
function addTodoButtonDOM() {
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = '+ Add Task';
    addTodoButton.addEventListener('click', () => {
        todoModal.showModal();
    });

    contentDOM.appendChild(addTodoButton);
}

// Add new project
const projectForm = document.querySelector('.project-dialog form');
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProject(document.querySelector('.project-dialog input').value);
    updateDOM();
    projectModal.close();
    projectForm.reset();
});

function setActiveProject(e) {
    activeProjectIndex = e.srcElement.getAttribute('data-index');
}