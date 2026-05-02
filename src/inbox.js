import { createHtmlElement, contentContainer } from "./index.js";

function render() {
    const inboxH1 = createHtmlElement('h1', null, null, 'Inbox');
    contentContainer.appendChild(inboxH1);
}

function renderAddBtn() {
    const addTaskContainer = createHtmlElement('div', null, ['addTask-container']);
    populateTaskContainer(addTaskContainer);
}

function populateTaskContainer(taskContainer){
    const addTaskBtn = createHtmlElement('button', null, ['addTaskBtn']);

    addTaskBtn.innerHTML = `<svg id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    <div>Add Task</div>`;

    taskContainer.appendChild(addTaskBtn);
    contentContainer.appendChild(taskContainer);

    // BTN EVENT LISTENER
    addTaskBtn.addEventListener('click', () => {
        addPopUp(taskContainer);
    })
}

function addPopUp(addBtnContainer) {
    addBtnContainer.replaceChildren();

    const puContainer = createHtmlElement('div', null, ['popup-container']);
    const projInput = createHtmlElement('input', null, ['proj-input']);
    projInput.type = 'text';
    const puBtnsContainer = createHtmlElement('div', null, ['pu-btns-container']);
    const addBtn = createHtmlElement('button', null, ['add'], 'Add');
    addBtn.type = 'submit';
    const cancelBtn = createHtmlElement('button', null, ['cancel'], 'Cancel');

    puBtnsContainer.append(addBtn, cancelBtn);
    puContainer.append(projInput, puBtnsContainer);

    addBtnContainer.append(puContainer);

    // BTN EVENT LISTENERS
    cancelBtn.addEventListener('click', () => {
        cancel(addBtnContainer);
    })

    addBtn.addEventListener('click', () => {
        addTask(projInput.value);   // Pending
        cancel(addBtnContainer);
    })
}

function cancel(container) {
    container.replaceChildren();
    populateTaskContainer(container);
}

function addTask(name){
    const taskBtn = createHtmlElement('button',null,['taskBtn']);

    const taskBarLeft = createHtmlElement();
    const checkBox = createHtmlElement;
    const taskName = createHtmlElement;

    const taskBarRight = createHtmlElement();
    const date = createHtmlElement();
    const dltTask = createHtmlElement();
}

export { render as renderInbox, renderAddBtn }
