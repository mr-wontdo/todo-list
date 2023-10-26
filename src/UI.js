export { updateDOM };
import { projectList } from './project.js';

const projectListDOM = document.querySelector('.project-list');
const contentDOM = document.querySelector('.content');

function updateDOM() {
    console.log(projectList);
    addProjectDOM();
    addTodoDOM(0);
}

function addProjectDOM() {
    // Add project list to navbar
    projectList.forEach(project => {
        const projectDOM = document.createElement('button');
        projectDOM.textContent = project.title;
        projectListDOM.appendChild(projectDOM);
    });
}

function addTodoDOM(projectIndex) {
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

    // Add 
}