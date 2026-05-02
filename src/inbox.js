import { createHtmlElement, contentContainer } from "./index.js";


function render() {
    const inboxContent = createHtmlElement('div',null,['inbox-content']);
    const inboxH1 = createHtmlElement('h1',null,null,'Inbox');
    const addTaskBtn = createHtmlElement('button');

    addTaskBtn.innerHTML = `<svg id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    <div>Add Task</div>`;

    inboxContent.append(inboxH1, addTaskBtn);
    contentContainer.appendChild(inboxContent);

    // BTN EVENT LISTENER
    addTaskBtn.addEventListener('click',()=>{
        //pending
    })
}

function addPopUp(){
    //pending
}

export { render as renderInbox }
