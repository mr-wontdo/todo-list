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
    projectList.forEach(project => {
        const projectDOM = document.createElement('button');
        projectDOM.textContent = project.title;
        projectListDOM.appendChild(projectDOM);
    });
}

function addTodoDOM(projectIndex) {
    projectList[projectIndex].todoList.forEach(todo => {
        const todoTitle = document.createElement('h2');
        todoTitle.textContent = todo.title;
        contentDOM.appendChild(todoTitle);
    });
}