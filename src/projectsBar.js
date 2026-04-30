import { createHtmlElement, projectsContainer } from "./index.js";


function render() {
    const addProjectBtn = createHtmlElement('button');
    addProjectBtn.innerHTML = `<svg id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    <div>Add Project</div>`;
    projectsContainer.appendChild(addProjectBtn)

    addProjectBtn.addEventListener('click', ()=>{
        addPopUp()
    })
}

function addPopUp(){
    projectsContainer.replaceChildren();

    const puContainer = createHtmlElement('div',null,['popup-container']);
    const projInput = createHtmlElement('input',null,['proj-input']);
    projInput.type = 'text';
    const puBtnsContainer = createHtmlElement('div',null,['pu-btns-container']);
    const addBtn = createHtmlElement('button',null,['add'],'Add');
    const cancelBtn = createHtmlElement('button',null,['cancel'],'Cancel');

    puBtnsContainer.append(addBtn,cancelBtn);
    puContainer.append(projInput,puBtnsContainer);
    
    projectsContainer.append(puContainer);

    // BTN EVENT LISTENERS
    cancelBtn.addEventListener('click', ()=>{
        cancel();
    })
}

function cancel(){
    projectsContainer.replaceChildren();
    render();
}


export { render as renderProjects }