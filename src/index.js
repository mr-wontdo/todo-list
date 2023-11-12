export { projects };

import { ProjectList } from './project-task.js';
import { updateScreen } from './UI.js';

// Testing
const projects = new ProjectList();
projects.addProject('Project One');
projects.addProject('Project Two');

projects.setActiveProjectIndex(0);
projects.addTask('Item One', 'Description of Item One', '2023-01-01', 'high');
projects.addTask('Item Two', 'Description of Item Two', '2023-01-01', 'high');

projects.setActiveProjectIndex(1);
projects.addTask('Item Three', 'Description of Item Three', '2023-01-01', 'high');
projects.addTask('Item Four', 'Description of Item Four', '2023-01-01', 'high');

updateScreen();







// import { projectList, addProject } from './project.js';
// import { updateDOM } from './UI.js';



// // Testing
// addProject('Project One');
// projectList[0].addTodo('Item One', 'Description of Item One', '2023-01-01', 'high');
// projectList[0].addTodo('Item Two', 'Description of Item Two', '2023-01-01', 'high');

// addProject('Project Two');
// projectList[1].addTodo('Item Three', 'Description of Item Three', '2023-01-01', 'high');
// projectList[1].addTodo('Item Four', 'Description of Item Four', '2023-01-01', 'high');

// updateDOM();