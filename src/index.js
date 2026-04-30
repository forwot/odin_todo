import "./styles.css"
import { renderInbox } from './inbox.js'
import { renderToday } from "./today.js";
import { renderWeek } from "./week.js";

function createHtmlElement(type, id, arrayClasses, content){
    const element = document.createElement(type);

    if(id) {element.id = id;}

    if(arrayClasses) {element.classList.add(...arrayClasses);}

    if(content) {element.textContent = content;}

    return element
}

const contentContainer = document.querySelector('#content');

function clearContent(){
    contentContainer.replaceChildren();
}

export { createHtmlElement, contentContainer };

// EVENT LISTENERS
const inboxBtn = document.querySelector('button.inbox');
inboxBtn.addEventListener('click', ()=>{
    clearContent()
    renderInbox();
})

const todayBtn = document.querySelector('button.today');
todayBtn.addEventListener('click', ()=>{
    clearContent()
    renderToday();
})

const weekBtn = document.querySelector('button.week');
weekBtn.addEventListener('click', ()=>{
    clearContent()
    renderWeek();
})
