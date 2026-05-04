import { createHtmlElement, contentContainer } from "./index.js";

function render(projName) {
    const inboxH1 = createHtmlElement('h1', null, null, projName);
    const taskContainer = createHtmlElement('div',null,['task-container'])
    const addTaskContainer = createHtmlElement('div', null, ['addTask-container']);
    renderAddTaskBtn(addTaskContainer, taskContainer);
    contentContainer.append(inboxH1, taskContainer, addTaskContainer);
}

function renderAddTaskBtn(addTaskContainer, taskContainer){
    const addTaskBtn = createHtmlElement('button', null, ['addTaskBtn']);

    addTaskBtn.innerHTML = `<svg id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    <div>Add Task</div>`;

    addTaskContainer.appendChild(addTaskBtn);

    // BTN EVENT LISTENER
    addTaskBtn.addEventListener('click', () => {
        renderPopUp(addTaskContainer, taskContainer);
    })
}

function renderPopUp(addTaskContainer, taskContainer) {
    addTaskContainer.replaceChildren();

    const popupContainer = createHtmlElement('div', null, ['popup-container']);
    const projInput = createHtmlElement('input', null, ['proj-input']);
    projInput.type = 'text';
    const popupBtnsContainer = createHtmlElement('div', null, ['pu-btns-container']);
    const addBtn = createHtmlElement('button', null, ['add'], 'Add');
    addBtn.type = 'submit';
    const cancelBtn = createHtmlElement('button', null, ['cancel'], 'Cancel');

    popupBtnsContainer.append(addBtn, cancelBtn);
    popupContainer.append(projInput, popupBtnsContainer);

    addTaskContainer.append(popupContainer);

    // BTN EVENT LISTENERS
    cancelBtn.addEventListener('click', () => {
        hidePopUp(addTaskContainer, taskContainer);
    })

    addBtn.addEventListener('click', () => {
        addTask(projInput.value, taskContainer);   // Pending
        hidePopUp(addTaskContainer, taskContainer);
    })
}

function hidePopUp(addTaskContainer, taskContainer) {
    addTaskContainer.replaceChildren();
    renderAddTaskBtn(addTaskContainer, taskContainer);
}

function addTask(name, taskContainer){
    const taskBtn = createHtmlElement('button',null,['taskBtn']);

    const taskBtnLeft = createHtmlElement('div',null,['taskBtnLeft']);
    const checkBox = createHtmlElement('div');
    checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-blank-circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
    const taskName = createHtmlElement('div',null,null,name);

    const taskBtnRight = createHtmlElement('div',null,['taskBtnRight']);
    const date = createHtmlElement('div',null,null,'No date');
    const dltTask = createHtmlElement('div');
    dltTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`

    taskBtnLeft.append(checkBox,taskName);
    taskBtnRight.append(date,dltTask);
    taskBtn.append(taskBtnLeft,taskBtnRight);
    taskContainer.appendChild(taskBtn);

    dltTask.addEventListener('click',(e)=>{
        e.stopPropagation();
        taskBtn.remove();
    })

    checkBox.addEventListener('click',(e)=>{
        e.stopPropagation();
        checkBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-marked-circle-outline</title><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>`;
    })
}

export { render as renderProjectContent }
