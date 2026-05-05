import "./styles.css";
import { renderProjectContent } from "./content.js";
import { renderToday } from "./today.js";
import { renderWeek } from "./week.js";
import { renderProjects } from "./projectsBar.js";

function createHtmlElement(type, id, arrayClasses, content) {
  const element = document.createElement(type);

  if (id) {
    element.id = id;
  }

  if (arrayClasses) {
    element.classList.add(...arrayClasses);
  }

  if (content) {
    element.textContent = content;
  }

  return element;
}

const contentContainer = document.querySelector("#content");

const projectsContainer = document.querySelector(".projects-container");
const addProjContainer = document.querySelector(".addProj-container");

function clearContent() {
  contentContainer.replaceChildren();
}

// ACTIVATE SELECTED BUTTON STYLING
function setActiveBtn(clickedBtn) {
  const allSidebarBtns = document.querySelectorAll(
    ".cat-container button, .projectBtn",
  );
  allSidebarBtns.forEach((btn) => btn.classList.remove("active-btn"));
  clickedBtn.classList.add("active-btn");
}

// EVENT LISTENERS
const inboxBtn = document.querySelector("button.inbox");
inboxBtn.addEventListener("click", () => {
  clearContent();
  renderProjectContent("Inbox");
  setActiveBtn(inboxBtn);
});

const todayBtn = document.querySelector("button.today");
todayBtn.addEventListener("click", () => {
  clearContent();
  renderToday();
  setActiveBtn(todayBtn);
});

const weekBtn = document.querySelector("button.week");
weekBtn.addEventListener("click", () => {
  clearContent();
  renderWeek();
  setActiveBtn(weekBtn);
});

export {
  createHtmlElement,
  contentContainer,
  projectsContainer,
  addProjContainer,
  setActiveBtn,
  clearContent,
};

// DEFAULT INITIAL RENDER
renderProjects();
renderProjectContent("Inbox");
setActiveBtn(inboxBtn);
