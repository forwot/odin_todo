import { renderProjectContent } from "./inbox.js";
import { createHtmlElement, projectsContainer,
    addProjContainer, setActiveBtn, clearContent } from "./index.js";


function render() {
    const addProjectBtn = createHtmlElement('button');
    addProjectBtn.innerHTML = `<svg id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    <div>Add Project</div>`;
    
    addProjContainer.appendChild(addProjectBtn);

    addProjectBtn.addEventListener('click', ()=>{
        addPopUp();
    })

    renderProjects();
}

function addPopUp(){
    addProjContainer.replaceChildren();

    const puContainer = createHtmlElement('div',null,['popup-container']);
    const projInput = createHtmlElement('input',null,['proj-input']);
    projInput.type = 'text';
    const puBtnsContainer = createHtmlElement('div',null,['pu-btns-container']);
    const addBtn = createHtmlElement('button',null,['add'],'Add');
    addBtn.type = 'submit';
    const cancelBtn = createHtmlElement('button',null,['cancel'],'Cancel');

    puBtnsContainer.append(addBtn,cancelBtn);
    puContainer.append(projInput,puBtnsContainer);
    
    addProjContainer.append(puContainer);

    // BTN EVENT LISTENERS
    cancelBtn.addEventListener('click', ()=>{
        hidePopUp(addProjContainer);
    })

    addBtn.addEventListener('click',()=>{
        addProjStorage(projInput.value);
        renderProjects();
        hidePopUp(addProjContainer);
    })
}

function hidePopUp(container){
    container.replaceChildren();
    render();
}

function addProjStorage(name){
    // GET or CREATE 'myProjects' LOCALSTORAGE ARRAY
    let projectsArray = JSON.parse(localStorage.getItem('myProjects')) || [];
    projectsArray.push(name);
    localStorage.setItem('myProjects', JSON.stringify(projectsArray));
}

function removeProjStorage(name){
    let projectsArray = JSON.parse(localStorage.getItem('myProjects')) || [];
    projectsArray = projectsArray.filter(project => project !== name);
    localStorage.setItem('myProjects', JSON.stringify(projectsArray));

    renderProjects();
}

function renderProjectButtons(name){
    // CREATE NEW CONTAINER
    const projectBtn = createHtmlElement('button',null,['projectBtn']);
    const projBtnLeft = createHtmlElement('div',null,['pb-left']);
    projBtnLeft.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>list-status</title><path d="M16.5 11L13 7.5L14.4 6.1L16.5 8.2L20.7 4L22.1 5.4L16.5 11M11 7H2V9H11V7M21 13.4L19.6 12L17 14.6L14.4 12L13 13.4L15.6 16L13 18.6L14.4 20L17 17.4L19.6 20L21 18.6L18.4 16L21 13.4M11 15H2V17H11V15Z" /></svg>
    <div>${name}</div>`;
    
    const projBtnRight = createHtmlElement('div',null,['pb-right']);
    projBtnRight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
    
    // ADD NEW PROJECT DOM  
    projectBtn.append(projBtnLeft,projBtnRight);
    projectsContainer.appendChild(projectBtn);

    // REMOVE PROJ
    projBtnRight.addEventListener('click',(e)=>{
        e.stopPropagation();
        removeProjStorage(name);
        projectBtn.remove();
    })

    projectBtn.addEventListener('click',()=>{
        setActiveBtn(projectBtn);
        clearContent();
        renderProjectContent(name);
    })
}

function renderProjects(){
    // RENDER SAVED PROJECTS
    projectsContainer.replaceChildren();
    let projectsArray = JSON.parse(localStorage.getItem('myProjects')) || [];
    projectsArray.forEach(name => renderProjectButtons(name));
}

export { render as renderProjects }
