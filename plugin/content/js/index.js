require('../css/content.css');
require('../css/jsonToHtml.css');
require('../../assets/css/font-awesome.min.css');

import { singlePageJSON } from './singlePageJSON';


// check if the page is only showing a JSON object
const bodyText = document.body.innerText;
const theme = 'jp-dark-theme';

document.body.classList.add(theme);

let bodyJSON;

try {
    bodyJSON = JSON.parse(bodyText);
} catch (e) {
    // The text in the body isn't a valid JSON
}

bodyJSON && singlePageJSON.renderPage(bodyText);
