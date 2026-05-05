import { createHtmlElement, contentContainer } from "./index.js";

function render(projName) {
    const inboxH1 = createHtmlElement('h1', null, null, projName);
    const taskContainer = createHtmlElement('div', null, ['task-container'])
    const addTaskContainer = createHtmlElement('div', null, ['addTask-container']);
    renderAddTaskBtn(addTaskContainer, taskContainer, projName);
    contentContainer.append(inboxH1, taskContainer, addTaskContainer);

    renderMyTasks(taskContainer, projName);
}

function renderAddTaskBtn(addTaskContainer, taskContainer, projName) {
    const addTaskBtn = createHtmlElement('button', null, ['addTaskBtn']);

    addTaskBtn.innerHTML = `<svg id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    <div>Add Task</div>`;

    addTaskContainer.appendChild(addTaskBtn);

    // BTN EVENT LISTENER
    addTaskBtn.addEventListener('click', () => {
        renderPopUp(addTaskContainer, taskContainer, projName);
    })
}

function renderPopUp(addTaskContainer, taskContainer, projName) {
    addTaskContainer.replaceChildren();

    const popupContainer = createHtmlElement('form', null, ['popup-container']);

    const projInput = createHtmlElement('input', null, ['proj-input']);
    projInput.type = 'text';

    const popupBtnsContainer = createHtmlElement('div', null, ['pu-btns-container']);

    const addBtn = createHtmlElement('button', null, ['add'], 'Add');
    addBtn.type = 'submit';

    const cancelBtn = createHtmlElement('button', null, ['cancel'], 'Cancel');
    cancelBtn.type = 'button';

    popupBtnsContainer.append(addBtn, cancelBtn);
    popupContainer.append(projInput, popupBtnsContainer);

    addTaskContainer.append(popupContainer);

    // BTN EVENT LISTENERS
    cancelBtn.addEventListener('click', () => {
        hidePopUp(addTaskContainer, taskContainer, projName);
    })

    popupContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(!projInput.value){
            alert("Task name can't be empty");
        }
        else{
            addTaskStorage(projInput.value, projName);
            renderMyTasks(taskContainer, projName);
            hidePopUp(addTaskContainer, taskContainer, projName);
        }
    })
}

function hidePopUp(addTaskContainer, taskContainer, projName) {
    addTaskContainer.replaceChildren();
    renderAddTaskBtn(addTaskContainer, taskContainer, projName);
}

function addTaskStorage(name, projName) {
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    let taskDetails = { "name": name,
                        "completed": false, 
                        "date": "No date",
                        "projName": projName
                    };
    tasksArray.push(taskDetails);
    localStorage.setItem('myTasks', JSON.stringify(tasksArray));
}

// UPDATE TASK DATE & STATUS
function updateTaskDate(name, projName, date){
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    const task = tasksArray.find(t => t.name === name && t.projName === projName);

    if(task){
        task.date = date;
        localStorage.setItem('myTasks', JSON.stringify(tasksArray));
    }

    updateTodayTasks();
}

function updateTaskStatus(name, projName, status){
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    const task = tasksArray.find(t => t.name === name && t.projName === projName);

    if(task){
        task.completed = status;

        localStorage.setItem('myTasks', JSON.stringify(tasksArray));
    }

    updateTodayTasks();
}

function removeTaskStorage(name, projName) {
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasksArray = tasksArray.filter(t => t.name !== name || t.projName !== projName);
    localStorage.setItem('myTasks', JSON.stringify(tasksArray));

    updateTodayTasks();
}

// CREATE AND UPDATE TODAY'S TASKS
function updateTodayTasks(){
    const todaysDate = "2026-05-05";    // HARD CODED DATE FOR NOW

    const allTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    
    const allTodayTasks = allTasks.filter(t => t.date === todaysDate);
        
    localStorage.setItem('todayTasks', JSON.stringify(allTodayTasks));
}


function renderTaskButtons(name, taskContainer, projName, date, status) {
    const taskBtn = createHtmlElement('button', null, ['taskBtn']);

    const taskBtnLeft = createHtmlElement('div', null, ['taskBtnLeft']);
    const checkBox = createHtmlElement('div');
    if(status){
        // checked
        checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-marked-circle-outline</title><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>`;
    }
    else{
        // unchecked
        checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-blank-circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
    }
    const taskName = createHtmlElement('div', null, null, name);

    const taskBtnRight = createHtmlElement('div', null, ['taskBtnRight']);
    const dateContainer = createHtmlElement('div', null, null, date);
    const dltTask = createHtmlElement('div');
    dltTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`

    taskBtnLeft.append(checkBox, taskName);
    taskBtnRight.append(dateContainer, dltTask);
    taskBtn.append(taskBtnLeft, taskBtnRight);
    taskContainer.appendChild(taskBtn);

    // EVENT LISTENERS
    dltTask.addEventListener('click', (e) => {
        e.stopPropagation();
        taskBtn.remove();
        removeTaskStorage(name, projName);
        renderMyTasks(taskContainer, projName);
    })

    let isChecked = status;
    checkBox.addEventListener('click', (e) => {
        e.stopPropagation();
        isChecked = !isChecked;
        if (isChecked) {
            checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-marked-circle-outline</title><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>`;
            updateTaskStatus(name, projName, true);     
        } else {
            checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-blank-circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
            updateTaskStatus(name, projName, false)
        }
    })

    dateContainer.addEventListener('click', (e) => {
        e.stopPropagation();

        const oldDate = dateContainer.textContent;

        dateContainer.textContent = '';
        const dateInput = createHtmlElement('input')
        dateInput.type = 'date'

        dateInput.addEventListener('click', (e) => e.stopPropagation());
        dateInput.focus();

        dateInput.addEventListener('change', (e) => {
            if (dateInput.value) {
                dateContainer.textContent = dateInput.value;
            }
            else {
                dateContainer.textContent = 'No date';
            }

            updateTaskDate(name, projName, dateContainer.textContent); 
        });

        dateInput.addEventListener('blur', (e) => {
            if (!dateInput.value) {
                dateContainer.textContent = oldDate || 'No date';
            }
            else {
                dateContainer.textContent = dateInput.value;
            }

            updateTaskDate(name, projName, dateContainer.textContent);  
        });

        dateContainer.appendChild(dateInput);
    })
}

function renderMyTasks(taskContainer, projName) {
    taskContainer.replaceChildren();
    let tasksArray = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasksArray.forEach(t => {
        if(t.projName === projName){
            renderTaskButtons(t.name, taskContainer, projName, t.date, t.completed);
        }
    });     
}

function renderTodayTasks(taskContainer){
    taskContainer.replaceChildren();
    let todayTasks = JSON.parse(localStorage.getItem('todayTasks')) || [];
    todayTasks.forEach(t => {
            renderTaskButtons(t.name, taskContainer, t.projName, t.date, t.completed);
        });  
}

export { render as renderProjectContent, renderTodayTasks }
