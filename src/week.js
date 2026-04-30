import { createHtmlElement, contentContainer } from "./index.js";


function render() {
    const weekContent = createHtmlElement('div',null,['week-content']);
    const weekH1 = createHtmlElement('h1',null,null,'This Week');

    weekContent.append(weekH1);
    contentContainer.appendChild(weekContent);
}

export { render as renderWeek }