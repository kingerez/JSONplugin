import { helpers } from './helpers';
import { JSONtoHTML } from './jsonToHtml';

export const singlePageJSON = (() => {

    let container;
    let jsonHtml;
    
    function toggleOriginalView() {
        const isOriginal = document.body.className.indexOf('jp-hide-original') < 0;
        if(isOriginal) {
            document.body.classList.add('jp-hide-original');
        } else {
            document.body.classList.remove('jp-hide-original');
        }
    }

    function renderFonts() {
        const style = document.createElement('style');

        const eot = chrome.extension.getURL('assets/fonts/fontawesome-webfont.eot?v=4.7.0');
        const woff2 = chrome.extension.getURL('assets/fonts/fontawesome-webfont.woff2');
        const woff = chrome.extension.getURL('assets/fonts/fontawesome-webfont.woff');
        const ttf = chrome.extension.getURL('assets/fonts/fontawesome-webfont.ttf');
        const svg = chrome.extension.getURL('assets/fonts/fontawesome-webfont.svg');

        style.innerText = `
            @font-face{
                font-family:'FontAwesome';
                src:url('${ eot }');
                src:url('${ eot }?#iefix&v=4.7.0') format('embedded-opentype'),
                url('${ woff2 }?v=4.7.0') format('woff2'),
                url('${ woff }?v=4.7.0') format('woff'),
                url('${ ttf }?v=4.7.0') format('truetype'),
                url('${ svg }?v=4.7.0#fontawesomeregular') format('svg');
                font-weight:normal;
                font-style:normal
            }`;
        document.querySelector('head').appendChild(style);
    }

    function createContainer() {
        container = document.createElement('div');
        container.className = 'jp-json-container';
        document.body.appendChild(container);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'View JSON';
        toggleBtn.className = 'toggle-json';
        toggleBtn.onclick = function () {
            document.body.classList.add('jp-hide-original');
        };
        const firstChild = document.body.children[0];
        document.body.insertBefore(toggleBtn, firstChild);

        const template = `
            <div class="jp-top-bar">
                <img class="jp-top-bar-logo" src="${ chrome.extension.getURL('images/icon.png') }" />
                <button class="jp-top-button jp-collapse-all-btn">Collapse all</button>
                <button class="jp-top-button jp-expand-all-btn">Expand all</button>
                <button class="jp-top-button jp-origin-btn">View original</button>
                <div style="clear: both;"></div>
            </div>
            <div class="jp-body jp-noselect"></div>
        `;

        container.innerHTML = template;

        container.querySelector('.jp-collapse-all-btn').addEventListener('click', () => {
            jsonHtml.collapseAll(container.querySelector('.jp-body'));
        });

        container.querySelector('.jp-expand-all-btn').addEventListener('click', () => {
            jsonHtml.expandAll(container.querySelector('.jp-body'));
        });

        container.querySelector('.jp-origin-btn').addEventListener('click', () => {
            toggleOriginalView();
        });
    }

    return {
        renderPage: function (jsonObject) {
            document.body.classList.add('is-one-big-json');
            document.body.classList.add('jp-hide-original');
            renderFonts();

            const numElements = document.body.childElementCount;
            for(let i=0; i<numElements; i++) {
                const el = document.body.children[i];
                el.classList.add('jp-original-element');
            }

            createContainer();

            jsonHtml = new JSONtoHTML(jsonObject);

            container.querySelector('.jp-body').appendChild(jsonHtml.root);
        }
    };

})();