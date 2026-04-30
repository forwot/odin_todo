import { createHtmlElement, contentContainer } from "./index.js";


function render() {
    const todayContent = createHtmlElement('div',null,['today-content']);
    const todayH1 = createHtmlElement('h1',null,null,'Today');

    todayContent.append(todayH1);
    contentContainer.appendChild(todayContent);
}

export { render as renderToday }