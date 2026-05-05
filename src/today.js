import { createHtmlElement, contentContainer } from "./index.js";
import { renderTodayTasks } from "./content.js";

function render() {
    const todayContent = createHtmlElement('div',null,['today-content']);
    const todayH1 = createHtmlElement('h1',null,null,'Today');

    contentContainer.append(todayH1, todayContent);

    renderTodayTasks(todayContent);
}

export { render as renderToday };