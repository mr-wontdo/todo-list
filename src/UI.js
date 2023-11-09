export { updateDOM };
import { projectList } from './index.js';

function updateDOM() {
    console.log(projectList);
}





























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