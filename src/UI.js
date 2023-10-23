export { updateDOM };
import { projectList } from './project.js';

const projectListDOM = document.querySelector('.project-list');

function updateDOM() {
    addProjectDOM();
}

function addProjectDOM() {
    projectList.forEach(project => {
        const projectDOM = document.createElement('button');
        projectDOM.textContent = project.title;
        projectListDOM.appendChild(projectDOM);
    });
}