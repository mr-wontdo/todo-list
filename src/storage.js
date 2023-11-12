import { projects } from './project-task.js';

export default class Storage {
    static populateStorage() {
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    static retrieveStorage() {
        if (!localStorage.getItem('projects')) return;
        Object.assign(projects, JSON.parse(localStorage.getItem('projects'))); 
        projects.setActiveProjectIndex(null);
        projects.setActiveTaskIndex(null);
    }
}