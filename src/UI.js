export { updateDOM };
import { projectList } from './project.js';

const projectListDOM = document.querySelector('.project-list');
const contentDOM = document.querySelector('.content');

function updateDOM() {
    console.log(projectList);
    addProjectDOM();
}

function addProjectDOM() {
    // Add project list to navbar
    for (let i = 0; i < projectList.length; i++) {
        const projectDOM = document.createElement('button');
        projectDOM.textContent = projectList[i].title;
        projectDOM.setAttribute('data-index', i);
        projectDOM.addEventListener('click', () => addTodoDOM(i));

        projectListDOM.appendChild(projectDOM);
    }
}

function addTodoDOM(projectIndex) {
    // Clear content
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

function addTodoButtonDOM() {
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = '+ Add Task';
    addTodoButton.addEventListener('click', () => {

    });

    contentDOM.appendChild(addTodoButton);
}