import { createHtmlElement, contentContainer } from "./index.js";
import { renderWeekTasks } from "./content.js";

function render() {
    const weekContent = createHtmlElement('div',null,['week-content']);
    const weekH1 = createHtmlElement('h1',null,null,'This Week');

    contentContainer.append(weekH1, weekContent);
    
    renderWeekTasks(weekContent);
}

export { render as renderWeek }