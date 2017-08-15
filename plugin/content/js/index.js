require('../css/content.css');
require('../../assets/css/font-awesome.min.css');

import { singlePageJSON } from './singlePageJSON';


// check if the page is only showing a JSON object
const theme = 'jp-dark-theme';

document.body.classList.add(theme);

function checkBodyForJSON() {
    const bodyText = document.body.innerText;
    let bodyJSON;

    try {
        bodyJSON = JSON.parse(bodyText);
    } catch (e) {
        // The text in the body isn't a valid JSON
        setTimeout(checkBodyForJSON, 3000);
    }

    bodyJSON && singlePageJSON.renderPage(bodyText);
}

checkBodyForJSON();

console.log('asdasd')