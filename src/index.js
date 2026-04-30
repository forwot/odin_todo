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

// BUTTON CLICKED STYLING
function setActiveBtn(clickedBtn){
    const catBtns = document.querySelectorAll('.cat-container button');
    catBtns.forEach(btn => btn.classList.remove('active-btn'));
    clickedBtn.classList.add('active-btn');
}

// EVENT LISTENERS
const inboxBtn = document.querySelector('button.inbox');
inboxBtn.addEventListener('click', ()=>{
    clearContent()
    renderInbox();
    setActiveBtn(inboxBtn);
})

const todayBtn = document.querySelector('button.today');
todayBtn.addEventListener('click', ()=>{
    clearContent()
    renderToday();
    setActiveBtn(todayBtn);
})

const weekBtn = document.querySelector('button.week');
weekBtn.addEventListener('click', ()=>{
    clearContent()
    renderWeek();
    setActiveBtn(weekBtn);
})
